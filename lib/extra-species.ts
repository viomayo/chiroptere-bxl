export const EXTRA_GROUP_KEYS = ['oiseaux', 'mammiferes', 'insectes', 'amphibiens'] as const
export type ExtraGroupKey = typeof EXTRA_GROUP_KEYS[number]

export const EXTRA_GROUP_LABELS: Record<ExtraGroupKey, string> = {
  oiseaux: 'Oiseaux',
  mammiferes: 'Autres mammifères',
  insectes: 'Insectes',
  amphibiens: 'Amphibiens',
}

export const EXTRA_GROUP_COLORS: Record<ExtraGroupKey, string> = {
  oiseaux: '#cfc3b3',
  mammiferes: '#cfc3b3',
  insectes: '#cfc3b3',
  amphibiens: '#cfc3b3',
}

export const MAMMAL_SPECIES = [
  "Chevreuil d'Europe",
  'Hérisson commun',
  'Renard roux',
  'Fouine',
  'Sanglier',
  'Lérot',
] as const

export interface ExtraCounterSection {
  label?: string
  species: string[]
}

export interface ExtraCounterConfig {
  sections: ExtraCounterSection[]
}

export const EXTRA_COUNTERS: Record<ExtraGroupKey, ExtraCounterConfig> = {
  oiseaux: {
    sections: [{
      species: [
        'Chouette hulotte',
        'Chouette effraie',
        "Chevêche d'Athéna",
        'Hibou moyen-duc',
      ],
    }],
  },
  mammiferes: {
    sections: [{
      species: [...MAMMAL_SPECIES],
    }],
  },
  insectes: {
    sections: [
      {
        label: 'Vers luisants',
        species: ['Lamprohiza splendidula', 'Lampyris noctiluca'],
      },
      {
        label: 'Orthoptères communs',
        species: [
          'Grande Sauterelle verte',
          'Conocéphale commun',
          'Leptophye ponctuée',
          'Pholidoptère cendrée',
        ],
      },
      {
        label: 'Orthoptères exceptionnels',
        species: [
          "Grillon d'Italie",
          'Decticelle bariolée',
          'Phanéroptère commun',
          'Ruspolie à tête de cône',
          'Decticelle chagrinée',
          'Barbitiste des bois',
          'Conocéphale des roseaux',
          'Courtilière commune',
          'Phanéroptère méridional',
        ],
      },
    ],
  },
  amphibiens: {
    sections: [{
      species: [
        'Grenouille rousse',
        'Grenouille verte',
        'Crapaud commun',
        'Salamandre tachetée',
        'Triton alpestre',
        'Triton ponctué',
        'Triton palmé',
      ],
    }],
  },
}
