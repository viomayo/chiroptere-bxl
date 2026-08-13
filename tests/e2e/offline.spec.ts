import { expect, test, type BrowserContext, type Page } from '@playwright/test'
import { readFileSync } from 'node:fs'
import { SUPABASE_AUTH_STORAGE_KEY } from '../../lib/supabase/client'

const USER_ID = '00000000-0000-0000-0000-000000000001'
const TERRAIN_PATHS = new Set(['/site', '/points', '/compteur'])
const EXPECTED_SHELL_VERSION = readFileSync('.next/BUILD_ID', 'utf8').trim()

test.describe.configure({ mode: 'serial' })

function token() {
  const encode = (value: object) => Buffer.from(JSON.stringify(value)).toString('base64url')
  return `${encode({ alg: 'none', typ: 'JWT' })}.${encode({ sub: USER_ID, email: 'terrain@example.test', exp: Math.floor(Date.now() / 1000) + 3600, user_metadata: { full_name: 'Test Terrain' } })}.signature`
}

test.beforeEach(async ({ context }) => {
  const accessToken = token()
  const session = {
    access_token: accessToken,
    refresh_token: 'terrain-refresh-token',
    expires_at: Math.floor(Date.now() / 1000) + 3600,
    expires_in: 3600,
    token_type: 'bearer',
    user: {
      id: USER_ID,
      email: 'terrain@example.test',
      user_metadata: { full_name: 'Test Terrain' },
    },
  }
  await context.addInitScript(({ storageKey, session }) => {
    window.localStorage.setItem(storageKey, JSON.stringify(session))
  }, { storageKey: SUPABASE_AUTH_STORAGE_KEY, session })
  await context.route('**/auth/v1/user', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        id: USER_ID,
        email: 'terrain@example.test',
        user_metadata: { full_name: 'Test Terrain' },
      }),
    })
  })
  await context.route('**/auth/v1/logout**', (route) => route.fulfill({ status: 204 }))
  await context.route('**/rest/v1/sessions**', (route) => route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: '[]',
  }))
})

test.afterEach(async ({ context, page }) => {
  await context.setOffline(false).catch(() => undefined)
  await page.waitForFunction(() => navigator.onLine).catch(() => undefined)
})

async function waitForOfflineReadiness(page: Page) {
  await expect(page.getByText('En ligne — Prêt hors ligne')).toBeVisible({ timeout: 15_000 })
  await expect.poll(() => page.evaluate(async (expectedVersion) => {
    const registration = await navigator.serviceWorker.ready
    const worker = navigator.serviceWorker.controller ?? registration.active
    if (!worker) return null
    return new Promise((resolve) => {
      const channel = new MessageChannel()
      const timeout = window.setTimeout(() => resolve(null), 1_000)
      channel.port1.onmessage = (event) => {
        window.clearTimeout(timeout)
        resolve(event.data)
      }
      worker.postMessage({ type: 'OFFLINE_STATUS', expectedVersion }, [channel.port2])
    })
  }, EXPECTED_SHELL_VERSION)).toMatchObject({
    ready: true,
    routes: { '/': true, '/site': true, '/points': true, '/compteur': true },
  })
}

async function openOnlyHomeWithoutTerrainPrefetch(page: Page, context: BrowserContext) {
  const terrainNavigations: string[] = []
  context.on('request', (request) => {
    const pathname = new URL(request.url()).pathname
    if (request.isNavigationRequest() && TERRAIN_PATHS.has(pathname)) terrainNavigations.push(pathname)
  })
  await context.route('**/*', async (route) => {
    const request = route.request()
    const pathname = new URL(request.url()).pathname
    if (TERRAIN_PATHS.has(pathname) && request.headers()['next-router-prefetch'] === '1') {
      await route.abort()
      return
    }
    await route.fallback()
  })

  await page.goto('/')
  await expect(page.getByText('Test Terrain')).toBeVisible()
  await waitForOfflineReadiness(page)
  expect(terrainNavigations).toEqual([])
}

async function goOffline(page: Page, context: BrowserContext) {
  await context.setOffline(true)
  await expect(page.getByText('Hors ligne — application prête')).toBeVisible()
}

async function readLocalData(page: Page) {
  return page.evaluate(async () => {
    const db = await new Promise<IDBDatabase>((resolve, reject) => {
      const request = indexedDB.open('chiroptere-bxl')
      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    })
    const readAll = <T>(storeName: string) => new Promise<T[]>((resolve, reject) => {
      const request = db.transaction(storeName).objectStore(storeName).getAll()
      request.onsuccess = () => resolve(request.result as T[])
      request.onerror = () => reject(request.error)
    })
    const readProfile = () => new Promise<Record<string, unknown> | undefined>((resolve, reject) => {
      const request = db.transaction('offline_profile').objectStore('offline_profile').get('active')
      request.onsuccess = () => resolve(request.result as Record<string, unknown> | undefined)
      request.onerror = () => reject(request.error)
    })
    const [sessions, points, profile] = await Promise.all([
      readAll<Record<string, unknown>>('sessions'),
      readAll<Record<string, unknown>>('points'),
      readProfile(),
    ])
    db.close()
    return { sessions, points, profile }
  })
}

async function createSessionThroughUi(page: Page) {
  await page.goto('/site')
  await expect(page.getByRole('heading', { name: 'Nouvelle session' })).toBeVisible()
  await page.locator('select').nth(0).selectOption({ index: 1 })
  await page.locator('select').nth(1).selectOption({ index: 1 })
  await page.locator('input[type="number"]').fill('1')
  await page.getByPlaceholder('Notes, observations particulières...').fill('Session créée entièrement hors ligne')
  await page.getByRole('button', { name: 'Enregistrer la session' }).click()
  await expect(page).toHaveURL(/\/points$/)
  await expect(page.getByRole('button').filter({ hasText: /-01/ })).toBeVisible()
}

async function openFirstPointAndEdit(page: Page) {
  await page.getByRole('button').filter({ hasText: /-01/ }).click()
  await expect(page).toHaveURL(/\/compteur\?pointId=/)
  await expect(page.getByRole('heading', { name: /-01/ })).toBeVisible()
  await page.getByPlaceholder('Observations particulières pour ce point...').fill('Relevé persistant hors ligne')
  await page.getByText('Cri(s) de Chouette hulotte').locator('..').getByRole('checkbox').check()
  await expect.poll(async () => {
    const { points } = await readLocalData(page)
    return points.some((point) => point.commentaire === 'Relevé persistant hors ligne' && point.chouetteHulotte === true)
  }).toBe(true)
}

test('valide le parcours terrain intégré de la readiness au logout offline', async ({ page, context }) => {
  await openOnlyHomeWithoutTerrainPrefetch(page, context)

  const cachedSupabaseUrls = await page.evaluate(async () => {
    const urls: string[] = []
    for (const name of await caches.keys()) {
      const cache = await caches.open(name)
      for (const request of await cache.keys()) {
        if (new URL(request.url).hostname.includes('supabase')) urls.push(request.url)
      }
    }
    return urls
  })
  expect(cachedSupabaseUrls).toEqual([])

  await goOffline(page, context)
  await page.goto('/site')
  await expect(page.getByRole('heading', { name: 'Nouvelle session' })).toBeVisible()
  await page.goto('/points')
  await expect(page.getByText('Aucune session en cours.')).toBeVisible()
  await page.goto('/compteur?pointId=never-cached-point')
  await expect(page.getByText('Point introuvable.')).toBeVisible()

  await createSessionThroughUi(page)
  await openFirstPointAndEdit(page)

  const beforeReload = await readLocalData(page)
  expect(beforeReload.sessions).toHaveLength(1)
  expect(beforeReload.sessions[0]).toMatchObject({ ownerId: USER_ID, dirty: true })
  expect(beforeReload.points).toHaveLength(1)
  expect(beforeReload.points[0]).toMatchObject({
    ownerId: USER_ID,
    commentaire: 'Relevé persistant hors ligne',
    chouetteHulotte: true,
  })

  const counterUrl = page.url()
  await page.reload()
  await expect(page).toHaveURL(counterUrl)
  await expect(page.getByPlaceholder('Observations particulières pour ce point...')).toHaveValue('Relevé persistant hors ligne')
  await expect(page.getByText('Cri(s) de Chouette hulotte').locator('..').getByRole('checkbox')).toBeChecked()

  await page.getByRole('link', { name: 'Site' }).first().click()
  await expect(page).toHaveURL(/\/site$/)
  await page.getByRole('link', { name: 'Points' }).first().click()
  await expect(page).toHaveURL(/\/points$/)
  await page.getByRole('button').filter({ hasText: /-01/ }).click()
  await expect(page).toHaveURL(/\/compteur\?pointId=/)
  await page.getByRole('link', { name: 'Points' }).first().click()
  await expect(page).toHaveURL(/\/points$/)
  await page.locator('header a[href="/"]').click()
  await expect(page).toHaveURL(/\/$/)

  const resumedPage = await context.newPage()
  await resumedPage.goto(counterUrl)
  await expect(resumedPage.getByPlaceholder('Observations particulières pour ce point...')).toHaveValue('Relevé persistant hors ligne')
  await resumedPage.close()

  await page.goto('/points')
  await page.reload()
  await expect(page.getByText('Mode hors ligne — travail local disponible')).toBeVisible()
  await expect(page.getByRole('button').filter({ hasText: /-01/ })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Sync' })).toBeDisabled()
  expect((await readLocalData(page)).sessions[0]).toMatchObject({ dirty: true })

  await context.setOffline(false)
  await page.evaluate(() => window.dispatchEvent(new Event('online')))
  await expect(page.getByText('En ligne — Prêt hors ligne')).toBeVisible()
  await expect(page.getByText(/travail local disponible/)).toBeVisible()
  await expect(page.getByRole('button', { name: 'Sync' })).toBeDisabled()
  expect((await readLocalData(page)).sessions[0]).toMatchObject({ dirty: true, syncedAt: null })

  await goOffline(page, context)
  await page.getByRole('button', { name: 'Se déconnecter' }).click()
  await expect(page.getByText('Application verrouillée.')).toBeVisible()
  await page.goto('/')
  await expect(page.getByText('Application verrouillée.')).toBeVisible()

  const local = await readLocalData(page)
  expect(local.sessions).toHaveLength(1)
  expect(local.points).toHaveLength(1)
  expect(local.profile).toMatchObject({ ownerId: USER_ID, offlineEnabled: false })
})
