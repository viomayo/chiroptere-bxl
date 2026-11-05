'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Check, MapPin } from 'lucide-react'
import { saveSession, saveSessionWithPoints, defaultCounts, type SessionData, type PointData } from '@/lib/idb'
import { SITE_POINTS } from '@/lib/site-points'
import { useOfflineAuth } from '@/app/components/offline-auth-provider'

const PROTOCOLES = ['Plan d\'eau (2 min)', 'Transect forestier (3 min)'] as const
const ANNEES = [1, 2, 3] as const

const SITES_BY_ANNEE: Record<number, Record<string, { nom: string; acronyme: string }[]>> = {
  1: {
    'Plan d\'eau (2 min)': [
      { nom: 'Mare aux canards (Watermael-Boitsfort)', acronyme: 'HMC' },
      { nom: 'Étang des Pêcheries Royales (Watermael-Boitsfort)', acronyme: 'HPR' },
      { nom: 'Étang Ter Linden (Watermael-Boitsfort)', acronyme: 'HTL' },
      { nom: 'Parc du Leybeek (Watermael-Boitsfort)', acronyme: 'LEY' },
      { nom: 'Axa / Royale Belge, grand bassin (Watermael-Boitsfort)', acronyme: 'ROY' },
      { nom: 'Parc Ten Reuken (Watermael-Boitsfort)', acronyme: 'TEN' },
      { nom: 'Parc Malou et RN du Struybeek (Woluwe-Saint-Lambert)', acronyme: 'MAL' },
      { nom: 'Étang Mellaerts, grand (Woluwe-Saint-Pierre)', acronyme: 'MEG' },
      { nom: 'Étang Mellaerts, petit (Woluwe-Saint-Pierre)', acronyme: 'MEP' },
      { nom: 'Parc Parmentier (Woluwe-Saint-Pierre)', acronyme: 'PAR' },
      { nom: 'Parc des Sources (Woluwe-Saint-Lambert)', acronyme: 'SOU' },
      { nom: 'Parc de Woluwe, étang long (Woluwe-Saint-Pierre)', acronyme: 'WOL' },
      { nom: 'Parc de Woluwe, étang rond (Woluwe-Saint-Pierre)', acronyme: 'WOR' },
    ],
    'Transect forestier (3 min)': [
      { nom: 'Kauwberg', acronyme: 'KAU' },
      { nom: 'Kinsendaal', acronyme: 'KIN' },
      { nom: 'Roze molen / Buysdelle', acronyme: 'BUY' },
      { nom: 'Plateau Engeland (Uccle)', acronyme: 'ENG' },
      { nom: 'Verrewinkel', acronyme: 'VER' },
      { nom: 'Bois du Laerbeek', acronyme: 'LAA' },
      { nom: 'Bois de Dieleghem', acronyme: 'DGB' },
      { nom: 'Parc Roi Baudouin, phase 1', acronyme: 'RB1' },
      { nom: 'Poelbos', acronyme: 'POE' },
      { nom: 'Moeras de Ganshoren', acronyme: 'GAN' },
    ],
  },
  2: {
    'Plan d\'eau (2 min)': [
      { nom: 'Étang du Bergoje', acronyme: 'BER' },
      { nom: 'Étang du Blankedelle', acronyme: 'BLA' },
      { nom: 'Étang du Clos des Chênes', acronyme: 'CDC' },
      { nom: 'Étang des Enfants Noyés', acronyme: 'ENF' },
      { nom: 'Étang de l\'Ermite, amont (sans île)', acronyme: 'ERM' },
      { nom: 'Étang de l\'Ermite, aval (avec île)', acronyme: 'ERV' },
      { nom: 'Étang du Fer à Cheval', acronyme: 'FER' },
      { nom: 'Kinsendael', acronyme: 'KIN' },
      { nom: 'Étang du Moulin (Boitsfort)', acronyme: 'MOU' },
      { nom: 'Étang Sec', acronyme: 'SEC' },
      { nom: 'Étang du Silex', acronyme: 'SIL' },
      { nom: 'Étang des 3 Fontaines', acronyme: 'TFO' },
      { nom: 'Parc Tournay-Solvay', acronyme: 'TOS' },
      { nom: 'Étang du Plateau Engeland', acronyme: 'ENG' },
      { nom: 'Étang du Parc de la Sauvagère', acronyme: 'SAU' },
    ],
    'Transect forestier (3 min)': [
      { nom: 'Blankedelle', acronyme: 'BLA' },
      { nom: 'Bunzingen', acronyme: 'BNZ' },
      { nom: 'Trois Couleurs', acronyme: 'DKL' },
      { nom: 'Parc des Sources', acronyme: 'TBN' },
      { nom: 'Tambour', acronyme: 'TMB' },
      { nom: 'Grasdelle', acronyme: 'GRA' },
      { nom: 'Grippendelle', acronyme: 'GIP' },
      { nom: 'Korporaal', acronyme: 'KOR' },
      { nom: 'Lindekemaele', acronyme: 'LIN' },
      { nom: 'Vuilbeek', acronyme: 'VUI' },
    ],
  },
  3: {
    'Plan d\'eau (2 min)': [
      { nom: 'Bois de la Cambre (Bruxelles)', acronyme: 'CAM' },
      { nom: 'Canal Willebroeck - Charleroi', acronyme: 'CNL' },
      { nom: 'Bois de Laerbeek (Jette)', acronyme: 'LAA'},
      { nom: 'Marais de Jette', acronyme: 'MDJ' },
      { nom: 'Moeraske (Evere) / parc Walckiers (Schaerbeek)', acronyme: 'MRK' },
      { nom: 'Bassin d\'orage de Neerpede (Anderlecht)', acronyme: 'NEE' },
      { nom: 'Poelbos (Jette)', acronyme: 'POE' },
      { nom: 'Parc Roi Baudouin phase 1 (Jette)', acronyme: 'RB1' },
      { nom: 'Parc Roi Baudouin phase 2 (Jette)', acronyme: 'RB2' },
      { nom: 'Parc Sobieski (Bruxelles)', acronyme: 'SBK' },
      { nom: 'Bois du Wilder (Berchem-Sainte-Agathe)', acronyme: 'WLR' },
    ],
    'Transect forestier (3 min)': [
      { nom: 'Bois de la Cambre', acronyme: 'CAM' },
      { nom: 'Damenrust', acronyme: 'DAR' },
      { nom: 'Chemin de Diependelle', acronyme: 'DPD' },
      { nom: 'Drève de l\'Infante', acronyme: 'INF' },
      { nom: 'Parc Malou', acronyme: 'MAL' },
      { nom: 'Rouge-Cloître', acronyme: 'RCL' },
      { nom: 'Terrest (Jezus-Eik)', acronyme: 'TRT' },
      { nom: 'Vuursteen (Silex)', acronyme: 'VUU' },
      { nom: 'Wollenborre', acronyme: 'WLB' },
      { nom: 'Parc de Woluwe', acronyme: 'WUP' },
    ],
  },
}

const DETECTEURS = [
  'D240X',
  'M500',
  'TeensyBat',
  'Active Recorder',
  'D200',
  'D100',
  'Batbox Duet',
]

function nowLocal(): string {
  const d = new Date()
  return [
    d.getFullYear(),
    String(d.getMonth() + 1).padStart(2, '0'),
    String(d.getDate()).padStart(2, '0'),
  ].join('-') + 'T' + [
    String(d.getHours()).padStart(2, '0'),
    String(d.getMinutes()).padStart(2, '0'),
  ].join(':')
}

const inputClass =
  'w-full rounded-lg border border-foreground/10 bg-background px-3 py-2.5 text-base text-foreground focus:outline-none focus:ring-1 focus:ring-foreground/30'

export default function SiteForm() {
  const { user } = useOfflineAuth()
  if (!user) return null
  return <SiteFormForOwner key={user.ownerId} compteurPrincipal={user.displayName} ownerId={user.ownerId} />
}

function SiteFormForOwner({ compteurPrincipal, ownerId }: { compteurPrincipal: string; ownerId: string }) {
  const router = useRouter()
  const [annee, setAnnee] = useState<number>(1)
  const [typeSite, setTypeSite] = useState('')
  const [nomSite, setNomSite] = useState('')
  const [acronyme, setAcronyme] = useState('')
  const [debutSession, setDebutSession] = useState(nowLocal)
  const [finSession, setFinSession] = useState('')
  const [autresCompteurs, setAutresCompteurs] = useState('')
  const [nbPointsEcoute, setNbPointsEcoute] = useState<number | ''>('')
  const [detecteurs, setDetecteurs] = useState<string[]>([])
  const [commentaire, setCommentaire] = useState('')
  const [error, setError] = useState('')

  function handleAnneeChange(value: number) {
    setAnnee(value)
    setTypeSite('')
    setNomSite('')
    setAcronyme('')
    setNbPointsEcoute('')
  }

  function handleTypeSiteChange(type: string) {
    setTypeSite(type)
    setNomSite('')
    setAcronyme('')
    setNbPointsEcoute('')
  }

  function handleNomSiteChange(nom: string) {
    setNomSite(nom)
    const sites = SITES_BY_ANNEE[annee]?.[typeSite] ?? []
    const site = sites.find((s) => s.nom === nom)
    const acr = site ? site.acronyme : ''
    setAcronyme(acr)
    const pts = acr ? SITE_POINTS[acr]?.[typeSite] : undefined
    setNbPointsEcoute(pts ? pts.length : 1)
  }

  function toggleDetecteur(d: string) {
    setDetecteurs((prev) =>
      prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]
    )
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    const sessionId = crypto.randomUUID()
    const nbPoints = typeof nbPointsEcoute === 'number' ? nbPointsEcoute : 0

    const session: SessionData = {
      id: sessionId,
      ownerId,
      annee,
      typeSite,
      nomSite,
      acronyme,
      debutSession,
      finSession,
      compteurPrincipal,
      autresCompteurs,
      nbPointsEcoute: nbPoints,
      detecteurs,
      commentaire,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      syncedAt: null,
      dirty: true,
      lastSyncedRemoteRevision: null,
      syncError: null,
    }

    try {
      const predefined = acronyme ? SITE_POINTS[acronyme]?.[typeSite] : undefined
      if (predefined && predefined.length > 0) {
        const now = new Date().toISOString()
        const points: PointData[] = predefined.slice(0, nbPoints).map((p, i) => ({
          id: `${sessionId}-pt-${i + 1}`,
          ownerId,
          sessionId,
          numero: p.numero,
          heureDebut: null,
          heureFin: null,
          nbEspeces: 0,
          statut: 'non_demarre' as const,
          counts: defaultCounts(),
          localisation: p.commentaire,
          commentaire: '',
          timerState: null,
          coordX: p.x,
          coordY: p.y,
          chouetteHulotte: false,
          updatedAt: now,
        }))
        await saveSessionWithPoints(session, points)
      } else {
        await saveSession(session)
      }
      router.push('/points')
    } catch {
      setError('Erreur lors de la sauvegarde locale.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {acronyme && typeSite && SITE_POINTS[acronyme]?.[typeSite] && (
        <div className="flex items-center gap-2 text-xs text-foreground/50 bg-foreground/[0.03] rounded-lg px-3 py-2">
          <MapPin size={13} />
          <span>
            {SITE_POINTS[acronyme][typeSite]!.length} point{SITE_POINTS[acronyme][typeSite]!.length > 1 ? 's' : ''} prédéfini{SITE_POINTS[acronyme][typeSite]!.length > 1 ? 's' : ''} avec coordonnées et descriptions
          </span>
        </div>
      )}

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium">
          Année <span className="text-foreground/40">*</span>
        </label>
        <select
          value={annee}
          onChange={(e) => handleAnneeChange(Number(e.target.value))}
          required
          className={inputClass}
        >
          {ANNEES.map((n) => (
            <option key={n} value={n}>Année {n}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium">
          Type de site <span className="text-foreground/40">*</span>
        </label>
        <select
          value={typeSite}
          onChange={(e) => handleTypeSiteChange(e.target.value)}
          required
          className={inputClass}
        >
          <option value="">— Choisir un type —</option>
          {PROTOCOLES.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium">
          Nom du site <span className="text-foreground/40">*</span>
        </label>
        <select
          value={nomSite}
          onChange={(e) => handleNomSiteChange(e.target.value)}
          required
          disabled={!typeSite}
          className={`${inputClass} disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          <option value="">— Choisir un site —</option>
          {(SITES_BY_ANNEE[annee]?.[typeSite] ?? []).map((s) => (
            <option key={s.nom} value={s.nom}>{s.nom}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium">Acronyme</label>
        <input
          type="text"
          value={acronyme}
          onChange={(e) => setAcronyme(e.target.value.toUpperCase())}
          maxLength={10}
          placeholder="—"
          className={`${inputClass} font-mono tracking-widest`}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium">
            Début de session <span className="text-foreground/40">*</span>
          </label>
          <input
            type="datetime-local"
            value={debutSession}
            onChange={(e) => setDebutSession(e.target.value)}
            required
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium">Fin de session</label>
          <input
            type="datetime-local"
            value={finSession}
            onChange={(e) => setFinSession(e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium">Compteur principal</label>
        <input
          type="text"
          value={compteurPrincipal}
          readOnly
          className="w-full rounded-lg border border-foreground/10 bg-foreground/5 px-3 py-2.5 text-base text-foreground/50 cursor-not-allowed"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium">Autres compteurs</label>
        <input
          type="text"
          value={autresCompteurs}
          onChange={(e) => setAutresCompteurs(e.target.value)}
          placeholder="Ex : Jean Dupont, Marie Martin"
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium">Nombre de points d&apos;écoute</label>
        <input
          type="number"
          inputMode="numeric"
          min="1"
          max="99"
          value={nbPointsEcoute}
          onChange={(e) =>
            setNbPointsEcoute(e.target.value === '' ? '' : parseInt(e.target.value, 10))
          }
          placeholder="0"
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">Détécteurs utilisés</label>
        <div className="flex flex-wrap gap-2">
          {DETECTEURS.map((d) => {
            const active = detecteurs.includes(d)
            return (
              <button
                key={d}
                type="button"
                onClick={() => toggleDetecteur(d)}
                className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors cursor-pointer ${
                  active
                    ? 'bg-foreground text-background border-foreground'
                    : 'bg-transparent text-foreground/55 border-foreground/15 hover:border-foreground/30 hover:text-foreground/80'
                }`}
              >
                {active && <Check size={10} strokeWidth={3} />}
                {d}
              </button>
            )
          })}
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium">
          Commentaire <span className="text-foreground/40 font-normal text-xs">(optionnel)</span>
        </label>
        <textarea
          value={commentaire}
          onChange={(e) => setCommentaire(e.target.value)}
          rows={3}
          placeholder="Notes, observations particulières..."
          className={`${inputClass} resize-none`}
        />
      </div>

      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}

      <button
        type="submit"
        className="w-full flex items-center justify-center gap-2 rounded-lg py-3 text-sm font-medium bg-foreground text-background hover:bg-foreground/90 transition-all active:scale-[0.99] cursor-pointer"
      >
        Enregistrer la session
      </button>
    </form>
  )
}
