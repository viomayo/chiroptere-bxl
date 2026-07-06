'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Check, MapPin } from 'lucide-react'
import { saveSession, saveSessionWithPoints, defaultCounts, type SessionData, type PointData } from '@/lib/idb'
import { SITE_POINTS } from '@/lib/site-points'

const PROTOCOLES = ['Plan d\'eau (2 min)', 'Transect forestier (3 min)'] as const

const SITES_BY_PROTOCOLE: Record<string, { nom: string; acronyme: string }[]> = {
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

export default function SiteForm({ compteurPrincipal }: { compteurPrincipal: string }) {
  const router = useRouter()
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

  function handleTypeSiteChange(type: string) {
    setTypeSite(type)
    setNomSite('')
    setAcronyme('')
    setNbPointsEcoute('')
  }

  function handleNomSiteChange(nom: string) {
    setNomSite(nom)
    const sites = SITES_BY_PROTOCOLE[typeSite] ?? []
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
    }

    try {
      const predefined = acronyme ? SITE_POINTS[acronyme]?.[typeSite] : undefined
      if (predefined && predefined.length > 0) {
        const now = new Date().toISOString()
        const points: PointData[] = predefined.slice(0, nbPoints).map((p, i) => ({
          id: `${sessionId}-pt-${i + 1}`,
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
          {(SITES_BY_PROTOCOLE[typeSite] ?? []).map((s) => (
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
