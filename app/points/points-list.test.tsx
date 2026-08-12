import { cleanup, render, screen, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import PointsList from './points-list'
import type { OfflineAuthState } from '@/app/components/offline-auth-provider'
import type { PointData, SessionData } from '@/lib/idb'

let authState: OfflineAuthState
const logout = vi.fn()

const mocks = vi.hoisted(() => ({
  getSessions: vi.fn(),
  initSessionPoints: vi.fn(),
}))

vi.mock('@/app/components/offline-auth-provider', () => ({
  useOfflineAuth: () => authState,
}))
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn() }),
  useSearchParams: () => ({ get: () => null }),
}))
vi.mock('@/lib/idb', () => ({
  getSessions: mocks.getSessions,
  initSessionPoints: mocks.initSessionPoints,
  getSessionById: vi.fn(),
  getRemoteSessionById: vi.fn(),
  getRemotePointsBySession: vi.fn(),
}))
vi.mock('@/lib/exports', () => ({
  downloadText: vi.fn(),
  sessionToCSV: vi.fn(),
  sessionToJSON: vi.fn(),
}))

const emptyGroup = { total: 0, trancheHistory: [], species: [] }

function session(ownerId: string): SessionData {
  return {
    id: `session-${ownerId}`,
    ownerId,
    typeSite: 'Parc',
    nomSite: `Site ${ownerId}`,
    acronyme: ownerId.toUpperCase(),
    debutSession: '2026-08-05T20:00:00Z',
    finSession: '',
    compteurPrincipal: ownerId,
    autresCompteurs: '',
    nbPointsEcoute: 1,
    detecteurs: [],
    commentaire: '',
    createdAt: '2026-08-05T20:00:00Z',
    updatedAt: '2026-08-05T20:00:00Z',
    syncedAt: null,
    dirty: true,
    lastSyncedRemoteRevision: null,
    syncError: null,
  }
}

function point(ownerId: string): PointData {
  return {
    id: `point-${ownerId}`,
    ownerId,
    sessionId: `session-${ownerId}`,
    numero: 1,
    heureDebut: null,
    heureFin: null,
    nbEspeces: 0,
    statut: 'non_demarre',
    counts: { pipistrelles: emptyGroup, murins: emptyGroup, serotules: emptyGroup, autres: emptyGroup },
    localisation: '',
    commentaire: '',
    timerState: null,
    coordX: null,
    coordY: null,
    chouetteHulotte: false,
    updatedAt: '2026-08-05T20:00:00Z',
  }
}

describe('PointsList identity isolation', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mocks.getSessions.mockImplementation(async (ownerId: string) => ownerId === 'a' ? [session('a')] : [])
    mocks.initSessionPoints.mockImplementation(async (value: SessionData) => [point(value.ownerId)])
  })
  afterEach(cleanup)

  it('reloads IndexedDB with the resolved owner and clears the previous owner view', async () => {
    authState = {
      status: 'offline',
      user: { ownerId: 'a', displayName: 'Utilisateur A', avatarUrl: null },
      isOnlineAuthenticated: false,
      logout,
    }
    const view = render(<PointsList />)

    await screen.findByText('Session · Site a')
    expect(mocks.getSessions).toHaveBeenCalledWith('a')

    authState = {
      status: 'offline',
      user: { ownerId: 'b', displayName: 'Utilisateur B', avatarUrl: null },
      isOnlineAuthenticated: false,
      logout,
    }
    view.rerender(<PointsList />)

    expect(screen.queryByText('Session · Site a')).not.toBeInTheDocument()
    await waitFor(() => expect(mocks.getSessions).toHaveBeenCalledWith('b'))
    expect(await screen.findByText('Aucune session en cours.')).toBeVisible()
  })
})
