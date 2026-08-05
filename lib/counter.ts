import type { GroupCount, PointCounts, PointTimerState } from './idb'

export type GroupKey = keyof PointCounts
export const GROUP_KEYS: GroupKey[] = ['pipistrelles', 'serotules', 'murins', 'autres']

export function cloneGroupCount(group: GroupCount): GroupCount {
  return {
    total: group.total,
    trancheHistory: [...group.trancheHistory],
    species: group.species.map((species) => ({ ...species, trancheHistory: [...species.trancheHistory] })),
  }
}

export function cloneCounts(counts: PointCounts): PointCounts {
  return {
    pipistrelles: cloneGroupCount(counts.pipistrelles),
    murins: cloneGroupCount(counts.murins),
    serotules: cloneGroupCount(counts.serotules),
    autres: cloneGroupCount(counts.autres),
  }
}

export function countSpecies(counts: PointCounts): number {
  return GROUP_KEYS.reduce((total, group) => total + counts[group].species.filter((species) => species.count > 0).length, 0)
    || GROUP_KEYS.filter((group) => counts[group].total > 0).length
}

export function addTranche(counts: PointCounts, group: GroupKey, tranche: number): PointCounts {
  const current = counts[group]
  if (current.trancheHistory.includes(tranche)) return counts
  return { ...counts, [group]: { ...current, total: current.total + 1, trancheHistory: [...current.trancheHistory, tranche] } }
}

export function removeTranche(counts: PointCounts, group: GroupKey, tranche: number): PointCounts {
  const current = counts[group]
  if (!current.trancheHistory.includes(tranche)) return counts
  return {
    ...counts,
    [group]: {
      ...current,
      total: Math.max(0, current.total - 1),
      trancheHistory: current.trancheHistory.filter((item) => item !== tranche),
      species: current.species.map((species) => species.trancheHistory.includes(tranche)
        ? { ...species, count: species.count - 1, trancheHistory: species.trancheHistory.filter((item) => item !== tranche) }
        : species).filter((species) => species.count > 0),
    },
  }
}

export function toggleSpecies(counts: PointCounts, group: GroupKey, name: string, tranche: number): PointCounts {
  const current = counts[group]
  const existing = current.species.find((species) => species.name === name)
  if (existing?.trancheHistory.includes(tranche)) {
    return {
      ...counts,
      [group]: {
        ...current,
        species: current.species.map((species) => species.name === name
          ? { ...species, count: species.count - 1, trancheHistory: species.trancheHistory.filter((item) => item !== tranche) }
          : species).filter((species) => species.count > 0),
      },
    }
  }
  const species = existing
    ? current.species.map((item) => item.name === name ? { ...item, count: item.count + 1, trancheHistory: [...item.trancheHistory, tranche] } : item)
    : [...current.species, { name, count: 1, trancheHistory: [tranche] }]
  return { ...counts, [group]: { ...current, species } }
}

export function fillGroup(counts: PointCounts, group: GroupKey, trancheCount: number): PointCounts {
  return {
    ...counts,
    [group]: { ...counts[group], total: trancheCount, trancheHistory: Array.from({ length: trancheCount }, (_, index) => index + 1) },
  }
}

export function buildTimerState(input: {
  started: boolean
  paused: boolean
  finished: boolean
  currentTranche: number
  trancheElapsed: number
  pointStartTime: Date | null
  trancheStartTime: Date | null
}, now = new Date()): PointTimerState | null {
  if (!input.started) return null
  return {
    ...input,
    pointStartTime: input.pointStartTime?.toISOString() ?? null,
    trancheStartTime: input.trancheStartTime?.toISOString() ?? null,
    updatedAt: now.toISOString(),
  }
}
