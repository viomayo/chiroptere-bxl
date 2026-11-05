import { act, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import CompteurScreen from './compteur-screen'
import type { OfflineAuthState } from '@/app/components/offline-auth-provider'
import { defaultCounts, type PointData, type SessionData } from '@/lib/idb'

let authState: OfflineAuthState
const logout = vi.fn()
const updateDisplayName = vi.fn()
const push = vi.fn()

const mocks = vi.hoisted(() => ({
  getPointById: vi.fn(),
  getSessionById: vi.fn(),
  getPointsBySession: vi.fn(),
  updatePoint: vi.fn(),
}))

vi.mock('@/app/components/offline-auth-provider', () => ({
  useOfflineAuth: () => authState,
}))
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push }),
  useSearchParams: () => ({ get: (key: string) => (key === 'pointId' ? 'point-1' : null) }),
}))
vi.mock('@/lib/idb', async (importOriginal) => ({
  ...await importOriginal<typeof import('@/lib/idb')>(),
  getPointById: mocks.getPointById,
  getSessionById: mocks.getSessionById,
  getPointsBySession: mocks.getPointsBySession,
  updatePoint: mocks.updatePoint,
}))
vi.mock('@/lib/site-config', () => ({
  getSiteConfig: () => ({ trancheDurationSec: 1, nbTranches: 2 }),
}))

const session: SessionData = {
  id: 'session-1',
  ownerId: 'me',
  annee: 1,
  typeSite: 'Parc',
  nomSite: 'Bois',
  acronyme: 'BT',
  debutSession: '2026-08-05T20:00:00Z',
  finSession: '',
  compteurPrincipal: 'Alice',
  autresCompteurs: '',
  nbPointsEcoute: 1,
  detecteurs: [],
  commentaire: '',
  createdAt: '2026-08-05T20:00:00Z',
  updatedAt: '2026-08-05T20:00:00Z',
  syncedAt: null,
  dirty: false,
  lastSyncedRemoteRevision: null,
  syncError: null,
}

function basePoint(): PointData {
  return {
    id: 'point-1',
    ownerId: 'me',
    sessionId: session.id,
    numero: 1,
    heureDebut: null,
    heureFin: null,
    nbEspeces: 0,
    statut: 'non_demarre',
    counts: defaultCounts(),
    localisation: '',
    commentaire: '',
    timerState: null,
    coordX: null,
    coordY: null,
    chouetteHulotte: false,
    updatedAt: '2026-08-05T20:00:00Z',
  }
}

function updatesWith(predicate: (point: PointData) => boolean): PointData[] {
  return mocks.updatePoint.mock.calls.map((call) => call[1] as PointData).filter(predicate)
}

describe('CompteurScreen timer times', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    authState = {
      status: 'offline',
      user: { ownerId: 'me', displayName: 'Alice', avatarUrl: null },
      isOnlineAuthenticated: false,
      logout,
      updateDisplayName,
    }
    mocks.getPointById.mockResolvedValue(basePoint())
    mocks.getSessionById.mockResolvedValue(session)
    mocks.getPointsBySession.mockResolvedValue([basePoint()])
    mocks.updatePoint.mockResolvedValue(undefined)
  })

  afterEach(() => {
    cleanup()
    vi.useRealTimers()
  })

  it('stamps heureDebut at start and heureFin at finish, and keeps them on validation', async () => {
    render(<CompteurScreen />)
    await screen.findByRole('button', { name: 'Démarrer' })

    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-08-05T20:00:00Z'))

    fireEvent.click(screen.getByRole('button', { name: 'Démarrer' }))
    await act(async () => {
      await vi.advanceTimersByTimeAsync(3000)
    })

    const started = updatesWith((p) => p.statut === 'en_cours' && p.heureDebut !== null)[0]
    expect(started).toBeDefined()
    expect(started.heureFin).toBeNull()
    expect(started.heureDebut).toBe('2026-08-05T22:00:03.000+02:00')
    expect(new Date(started.heureDebut!).toISOString()).toBe('2026-08-05T20:00:03.000Z')

    await act(async () => {
      await vi.advanceTimersByTimeAsync(2000)
    })
    await act(async () => {
      await vi.advanceTimersByTimeAsync(600)
    })

    const finished = updatesWith((p) => p.heureFin !== null)[0]
    expect(finished).toBeDefined()
    expect(finished.heureDebut).toBe(started.heureDebut)
    expect(finished.heureFin).toBe('2026-08-05T22:00:05.000+02:00')
    expect(new Date(finished.heureFin!).toISOString()).toBe('2026-08-05T20:00:05.000Z')

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'modification après coup' } })
    await act(async () => {
      await vi.advanceTimersByTimeAsync(600)
    })

    fireEvent.click(screen.getByRole('button', { name: 'Valider le point' }))
    await act(async () => {
      await vi.advanceTimersByTimeAsync(0)
    })

    const validated = updatesWith((p) => p.statut === 'termine')[0]
    expect(validated).toBeDefined()
    expect(validated.heureDebut).toBe(started.heureDebut)
    expect(validated.heureFin).toBe(finished.heureFin)
    expect(validated.commentaire).toBe('modification après coup')
  })

  it('counts extra species without tranches and derives the owl flag', async () => {
    render(<CompteurScreen />)

    fireEvent.click(await screen.findByRole('button', { name: 'Oiseaux' }))
    fireEvent.click(screen.getByRole('checkbox', { name: 'Chouette hulotte' }))

    await waitFor(() => {
      expect(updatesWith((p) => p.counts.oiseaux.total === 1 && p.chouetteHulotte)).not.toHaveLength(0)
    })
  })

  it('moves to the next point by list order when numbers are not consecutive', async () => {
    const finishedPoint: PointData = {
      ...basePoint(),
      statut: 'termine',
      heureDebut: '2026-08-05T20:00:00.000Z',
      heureFin: '2026-08-05T20:00:02.000Z',
    }
    const nextPoint: PointData = {
      ...basePoint(),
      id: 'point-3',
      numero: 3,
    }
    mocks.getPointById.mockResolvedValue(finishedPoint)
    mocks.getPointsBySession.mockResolvedValue([finishedPoint, nextPoint])

    render(<CompteurScreen />)
    fireEvent.click(await screen.findByRole('button', { name: 'Valider le point' }))

    await waitFor(() => expect(push).toHaveBeenCalledWith('/compteur?pointId=point-3'))
  })
})
