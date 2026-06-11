export interface SiteTypeConfig {
  trancheDurationSec: number
  nbTranches: number
}

const DEFAULT: SiteTypeConfig = { trancheDurationSec: 10, nbTranches: 12 }

export const SITE_TYPE_CONFIG: Record<string, SiteTypeConfig> = {
  'Plan d\'eau (2 min)':        { trancheDurationSec: 10, nbTranches: 12 },
  'Transect forestier (3 min)': { trancheDurationSec: 10, nbTranches: 18 },
}

export function getSiteConfig(typeSite: string): SiteTypeConfig {
  return SITE_TYPE_CONFIG[typeSite] ?? DEFAULT
}
