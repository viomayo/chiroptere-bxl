import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import Dashboard from './dashboard'
import type { OfflineAuthState } from './offline-auth-provider'
import { defaultCounts, type PointData, type RemotePointData, type RemoteSessionData, type SessionData } from '@/lib/idb'

let authState: OfflineAuthState
const logout = vi.fn()
const updateDisplayName = vi.fn()

const mocks = vi.hoisted(() => ({
  getSessions: vi.fn(),
  getAllPoints: vi.fn(),
  getRemoteSessions: vi.fn(),
  getAllRemotePoints: vi.fn(),
  getLegacySessions: vi.fn(),
  deleteSession: vi.fn(),
  claimLegacyData: vi.fn(),
  fetchSupervisorStatus: vi.fn(),
  pullAllSessionsForSupervisor: vi.fn(),
  getStoredConflicts: vi.fn(() => []),
  downloadText: vi.fn(),
  sessionsToCSV: vi.fn(() => 'csv'),
  sessionsToJSON: vi.fn(() => 'json'),
  sessionsToGeoJSON: vi.fn(() => 'geojson'),
}))

vi.mock('./offline-auth-provider', () => ({ useOfflineAuth: () => authState }))
vi.mock('next/navigation', () => ({ useRouter: () => ({ push: vi.fn() }) }))
vi.mock('@/lib/idb', async (importOriginal) => ({
  ...await importOriginal<typeof import('@/lib/idb')>(),
  getSessions: mocks.getSessions,
  getAllPoints: mocks.getAllPoints,
  getRemoteSessions: mocks.getRemoteSessions,
  getAllRemotePoints: mocks.getAllRemotePoints,
  getLegacySessions: mocks.getLegacySessions,
  deleteSession: mocks.deleteSession,
  claimLegacyData: mocks.claimLegacyData,
}))
vi.mock('@/lib/supabase/sync', () => ({
  getStoredConflicts: mocks.getStoredConflicts,
  fetchSupervisorStatus: mocks.fetchSupervisorStatus,
  pullAllSessionsForSupervisor: mocks.pullAllSessionsForSupervisor,
  SYNC_STATE_EVENT: 'chiroptere-sync-state',
}))
vi.mock('@/lib/exports', async (importOriginal) => ({
  ...await importOriginal<typeof import('@/lib/exports')>(),
  downloadText: mocks.downloadText,
  sessionsToCSV: mocks.sessionsToCSV,
  sessionsToJSON: mocks.sessionsToJSON,
  sessionsToGeoJSON: mocks.sessionsToGeoJSON,
}))

function session(id: string, ownerId: string, extra: Partial<SessionData> = {}): SessionData {
  return {
    id,
    ownerId,
    typeSite: 'Parc',
    nomSite: `Site ${id}`,
    acronyme: id.toUpperCase(),
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
    ...extra,
  }
}

function point(sessionId: string, ownerId: string, extra: Partial<PointData> = {}): PointData {
  return {
    id: `${sessionId}-pt-1`,
    ownerId,
    sessionId,
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
    ...extra,
  }
}

const mySession = session('s1', 'me')
const myPoint = point('s1', 'me')

function remoteSession(id: string, userId: string, userName: string | null): RemoteSessionData {
  return { ...session(id, userId), userId, userName, cachedBy: 'me' }
}

function remotePoint(sessionId: string, userId: string, userName: string | null): RemotePointData {
  return { ...point(sessionId, userId), userId, userName, cachedBy: 'me' }
}

function authStateFor(online: boolean): OfflineAuthState {
  return {
    status: online ? 'online' : 'offline',
    user: { ownerId: 'me', displayName: 'Alice Renard', avatarUrl: null },
    isOnlineAuthenticated: online,
    logout,
    updateDisplayName,
  }
}

describe('Dashboard global export', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mocks.getSessions.mockResolvedValue([mySession])
    mocks.getAllPoints.mockResolvedValue([myPoint])
    mocks.getRemoteSessions.mockResolvedValue([])
    mocks.getAllRemotePoints.mockResolvedValue([])
    mocks.getLegacySessions.mockResolvedValue([])
    mocks.getStoredConflicts.mockReturnValue([])
    mocks.fetchSupervisorStatus.mockResolvedValue(false)
  })
  afterEach(cleanup)

  it('exports every own session with the owner identity attached', async () => {
    authState = authStateFor(false)
    render(<Dashboard />)

    const button = await screen.findByRole('button', { name: /Exporter en CSV de mes données/ })
    fireEvent.click(button)

    expect(mocks.sessionsToCSV).toHaveBeenCalledWith(
      [{ session: mySession, points: [myPoint] }],
      { id: 'me', name: 'Alice Renard' },
    )
    expect(mocks.downloadText).toHaveBeenCalledWith('csv', 'chiro-bxl-alice-renard.csv', 'text/csv;charset=utf-8')
  })

  it('names the GeoJSON export after the owner too', async () => {
    authState = authStateFor(false)
    render(<Dashboard />)

    fireEvent.click(await screen.findByRole('button', { name: /Exporter en GeoJSON de mes données/ }))

    expect(mocks.sessionsToGeoJSON).toHaveBeenCalledWith(
      [{ session: mySession, points: [myPoint] }],
      undefined,
      { id: 'me', name: 'Alice Renard' },
      'chiro-bxl-alice-renard',
    )
    expect(mocks.downloadText).toHaveBeenCalledWith('geojson', 'chiro-bxl-alice-renard.geojson', 'application/geo+json')
  })

  it('hides the export section when the account has no session', async () => {
    mocks.getSessions.mockResolvedValue([])
    authState = authStateFor(false)
    render(<Dashboard />)

    await screen.findByText('Aucune session enregistrée')
    expect(screen.queryByRole('button', { name: /Exporter en CSV de mes données/ })).not.toBeInTheDocument()
  })

  it('exports quarantined data in a separate file in all three formats', async () => {
    const legacy = session('legacy', '__legacy__')
    const legacyPoint = point('legacy', '__legacy__')
    mocks.getLegacySessions.mockResolvedValue([legacy])
    mocks.getAllPoints.mockImplementation(async (ownerId: string) => (ownerId === '__legacy__' ? [legacyPoint] : [myPoint]))
    authState = authStateFor(false)
    render(<Dashboard />)

    fireEvent.click(await screen.findByRole('button', { name: 'Exporter en CSV' }))

    await waitFor(() => expect(mocks.sessionsToCSV).toHaveBeenCalledWith([{ session: legacy, points: [legacyPoint] }]))
    expect(mocks.downloadText).toHaveBeenCalledWith('csv', 'chiro-bxl-donnees-locales-en-quarantaine.csv', 'text/csv;charset=utf-8')
  })
})

describe('Dashboard supervisor gating', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mocks.getSessions.mockResolvedValue([mySession])
    mocks.getAllPoints.mockResolvedValue([myPoint])
    mocks.getRemoteSessions.mockResolvedValue([])
    mocks.getAllRemotePoints.mockResolvedValue([])
    mocks.getLegacySessions.mockResolvedValue([])
    mocks.getStoredConflicts.mockReturnValue([])
    mocks.fetchSupervisorStatus.mockResolvedValue(false)
  })
  afterEach(cleanup)

  it('never asks Supabase for the supervisor role while offline', async () => {
    authState = authStateFor(false)
    render(<Dashboard />)

    await screen.findByText(/Bon/)
    expect(mocks.fetchSupervisorStatus).not.toHaveBeenCalled()
    expect(screen.queryByText('Données des autres utilisateurs')).not.toBeInTheDocument()
  })

  it('hides the remote section when the remote role is not granted', async () => {
    authState = authStateFor(true)
    render(<Dashboard />)

    await waitFor(() => expect(mocks.fetchSupervisorStatus).toHaveBeenCalledWith())
    expect(screen.queryByText('Données des autres utilisateurs')).not.toBeInTheDocument()
  })

  it('reveals the remote section once the role is confirmed online', async () => {
    mocks.fetchSupervisorStatus.mockResolvedValue(true)
    authState = authStateFor(true)
    render(<Dashboard />)

    expect(await screen.findByText('Données des autres utilisateurs')).toBeVisible()
  })
})

describe('Dashboard supervisor exports', () => {
  const alice = remoteSession('r1', 'user-alice', 'Alice')
  const bob = remoteSession('r2', 'user-bob', null)

  beforeEach(() => {
    vi.clearAllMocks()
    mocks.getSessions.mockResolvedValue([mySession])
    mocks.getAllPoints.mockResolvedValue([myPoint])
    mocks.getLegacySessions.mockResolvedValue([])
    mocks.getStoredConflicts.mockReturnValue([])
    mocks.fetchSupervisorStatus.mockResolvedValue(true)
    mocks.getRemoteSessions.mockResolvedValue([alice, bob])
    mocks.getAllRemotePoints.mockResolvedValue([
      remotePoint('r1', 'user-alice', 'Alice'),
      remotePoint('r2', 'user-bob', null),
    ])
  })
  afterEach(cleanup)

  it('groups remote sessions per owner and exports only that owner', async () => {
    authState = authStateFor(true)
    render(<Dashboard />)

    fireEvent.click(await screen.findByRole('button', { name: /Exporter en CSV de Alice/ }))

    expect(mocks.sessionsToCSV).toHaveBeenCalledWith([{ session: alice, points: [expect.objectContaining({ sessionId: 'r1' })] }], { id: 'user-alice', name: 'Alice' })
    expect(mocks.downloadText).toHaveBeenCalledWith('csv', 'chiro-bxl-alice.csv', 'text/csv;charset=utf-8')
  })

  it('falls back to a truncated identifier when the profile name is missing', async () => {
    authState = authStateFor(true)
    render(<Dashboard />)

    fireEvent.click(await screen.findByRole('button', { name: /Exporter en JSON de user-bob/ }))

    expect(mocks.sessionsToJSON).toHaveBeenCalledWith([{ session: bob, points: [expect.objectContaining({ sessionId: 'r2' })] }], undefined, { id: 'user-bob', name: null })
    expect(mocks.downloadText).toHaveBeenCalledWith('json', 'chiro-bxl-user-bob.json', 'application/json')
  })

  it('pulls remote data on demand', async () => {
    mocks.pullAllSessionsForSupervisor.mockResolvedValue({ imported: 2 })
    authState = authStateFor(true)
    render(<Dashboard />)

    fireEvent.click(await screen.findByRole('button', { name: /Récupérer/ }))

    await waitFor(() => expect(mocks.pullAllSessionsForSupervisor).toHaveBeenCalledWith('me'))
  })
})
