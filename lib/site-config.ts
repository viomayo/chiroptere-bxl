export interface SiteTypeConfig {
  trancheDurationSec: number
  nbTranches: number
}

const D: SiteTypeConfig = { trancheDurationSec: 10, nbTranches: 12 }

export const SITE_TYPE_CONFIG: Record<string, SiteTypeConfig> = {
  'Forêt':            { trancheDurationSec: 10, nbTranches: 12 },
  'Zone humide':      { trancheDurationSec: 10, nbTranches: 12 },
  'Prairie':          { trancheDurationSec: 10, nbTranches: 12 },
  'Bocage':           { trancheDurationSec: 10, nbTranches: 12 },
  'Zone urbaine':     { trancheDurationSec: 10, nbTranches: 12 },
  'Zone périurbaine': { trancheDurationSec: 10, nbTranches: 12 },
  'Lisière':          { trancheDurationSec: 10, nbTranches: 12 },
  'Parc':             { trancheDurationSec: 10, nbTranches: 12 },
  'Jardin':           { trancheDurationSec: 10, nbTranches: 12 },
  'Autre':            { trancheDurationSec: 10, nbTranches: 12 },
}

export function getSiteConfig(typeSite: string): SiteTypeConfig {
  return SITE_TYPE_CONFIG[typeSite] ?? D
}
