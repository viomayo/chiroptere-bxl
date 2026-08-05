import { expect, test } from '@playwright/test'

function token() {
  const encode = (value: object) => Buffer.from(JSON.stringify(value)).toString('base64url')
  return `${encode({ alg: 'none', typ: 'JWT' })}.${encode({ sub: '00000000-0000-0000-0000-000000000001', email: 'terrain@example.test', exp: Math.floor(Date.now() / 1000) + 3600, user_metadata: { full_name: 'Test Terrain' } })}.signature`
}

test.beforeEach(async ({ context }) => {
  await context.addCookies([{ name: 'sb-test-auth-token', value: token(), domain: '127.0.0.1', path: '/' }])
})

test('loads the authenticated shell and keeps account data isolated', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByText('Test Terrain')).toBeVisible()
  await page.goto('/site')
  await expect(page.getByRole('heading', { name: 'Nouvelle session' })).toBeVisible()
})

test('reopens a previously visited counter route while offline', async ({ page, context }) => {
  await page.goto('/compteur?pointId=missing-point')
  await expect(page.getByText('Point introuvable.')).toBeVisible()
  await page.waitForFunction(() => Boolean(navigator.serviceWorker?.controller), null, { timeout: 15_000 })
  await page.waitForFunction(async () => {
    const cache = await caches.open('pages-navigate')
    return Boolean(await cache.match(window.location.href, { ignoreSearch: true }))
  }, null, { timeout: 15_000 })
  await context.setOffline(true)
  await page.reload()
  await expect(page.locator('body')).toContainText(/Point introuvable|Chiroptère BXL/)
})
