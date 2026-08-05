import { beforeEach, describe, expect, it } from 'vitest'
import { addTranche, buildTimerState, cloneCounts, countSpecies, fillGroup, removeTranche, toggleSpecies } from './counter'
import { defaultCounts } from './idb'

describe('counter domain', () => {
  let counts = defaultCounts()
  beforeEach(() => { counts = defaultCounts() })

  it('adds each tranche once', () => {
    const added = addTranche(counts, 'pipistrelles', 2)
    expect(added.pipistrelles).toMatchObject({ total: 1, trancheHistory: [2] })
    expect(addTranche(added, 'pipistrelles', 2)).toBe(added)
  })

  it('removes a tranche and associated species', () => {
    let next = addTranche(counts, 'murins', 1)
    next = toggleSpecies(next, 'murins', 'M. de Daubenton', 1)
    expect(removeTranche(next, 'murins', 1).murins).toEqual({ total: 0, trancheHistory: [], species: [] })
  })

  it('toggles species independently', () => {
    const added = toggleSpecies(counts, 'autres', 'Oreillard sp', 3)
    expect(added.autres.species[0]).toEqual({ name: 'Oreillard sp', count: 1, trancheHistory: [3] })
    expect(toggleSpecies(added, 'autres', 'Oreillard sp', 3).autres.species).toEqual([])
  })

  it('fills a group and counts identified species', () => {
    const filled = fillGroup(counts, 'serotules', 3)
    expect(filled.serotules.trancheHistory).toEqual([1, 2, 3])
    expect(countSpecies(filled)).toBe(1)
    expect(countSpecies(toggleSpecies(filled, 'serotules', 'Noctule commune', 1))).toBe(1)
  })

  it('clones nested counts', () => {
    const source = toggleSpecies(addTranche(counts, 'pipistrelles', 1), 'pipistrelles', 'Pip. commune', 1)
    const clone = cloneCounts(source)
    clone.pipistrelles.species[0].trancheHistory.push(2)
    expect(source.pipistrelles.species[0].trancheHistory).toEqual([1])
  })

  it('serializes timer state or returns null before start', () => {
    const now = new Date('2026-08-05T12:00:00Z')
    expect(buildTimerState({ started: false, paused: false, finished: false, currentTranche: 1, trancheElapsed: 0, pointStartTime: null, trancheStartTime: null }, now)).toBeNull()
    expect(buildTimerState({ started: true, paused: true, finished: false, currentTranche: 2, trancheElapsed: 4, pointStartTime: now, trancheStartTime: now }, now)).toMatchObject({ currentTranche: 2, paused: true, updatedAt: now.toISOString() })
  })
})
