import { describe, expect, it, vi } from 'vitest'
import {
  TERRAIN_SHELL_ROUTES,
  canonicalTerrainShellPath,
  createOfflineStatus,
  resolveTerrainShell,
} from './readiness'

const complete = Object.fromEntries(
  TERRAIN_SHELL_ROUTES.map((route) => [route, true]),
) as Record<(typeof TERRAIN_SHELL_ROUTES)[number], boolean>

describe('offline shell readiness', () => {
  it('is ready when every terrain shell exists for the current version', () => {
    expect(createOfflineStatus('build-2', 'build-2', complete)).toEqual({
      version: 'build-2',
      ready: true,
      routes: complete,
    })
  })

  it('is not ready when /compteur is missing', () => {
    const status = createOfflineStatus('build-2', 'build-2', { ...complete, '/compteur': false })
    expect(status.ready).toBe(false)
    expect(status.routes['/compteur']).toBe(false)
  })

  it('is not ready for an older cached version', () => {
    expect(createOfflineStatus('build-2', 'build-1', complete).ready).toBe(false)
  })

  it('uses the canonical shell for a terrain query string', () => {
    expect(canonicalTerrainShellPath('/compteur?pointId=abc')).toBe('/compteur')
    expect(canonicalTerrainShellPath('/points?sessionId=abc')).toBe('/points')
  })

  it('never substitutes the home shell for a missing terrain route', () => {
    const available: Record<(typeof TERRAIN_SHELL_ROUTES)[number], boolean> = {
      ...complete,
      '/site': false,
    }
    const requested = canonicalTerrainShellPath('/site')

    expect(requested).toBe('/site')
    expect(available[requested!]).toBe(false)
    expect(requested).not.toBe('/')
  })

  it('only asks for the canonical requested route when a shell is missing', async () => {
    const match = vi.fn().mockResolvedValue(undefined)

    expect(await resolveTerrainShell('/site?from=home', match)).toBeUndefined()
    expect(match).toHaveBeenCalledOnce()
    expect(match).toHaveBeenCalledWith('/site')
    expect(match).not.toHaveBeenCalledWith('/')
  })
})
