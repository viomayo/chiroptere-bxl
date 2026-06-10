'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Check } from 'lucide-react'
import { saveSession, type SessionData } from '@/lib/idb'

const TYPES_SITE = [
  'Forêt',
  'Zone humide',
  'Prairie',
  'Bocage',
  'Zone urbaine',
  'Zone périurbaine',
  'Lisière',
  'Parc',
  'Jardin',
  'Autre',
]

const SITES: { nom: string; acronyme: string }[] = [
  { nom: 'Forêt de Soignes', acronyme: 'FSO' },
  { nom: 'Bois de la Cambre', acronyme: 'CAM' },
  { nom: 'Parc de Laeken', acronyme: 'LAE' },
  { nom: 'Parc du Cinquantenaire', acronyme: 'CIN' },
  { nom: 'Parc Josaphat', acronyme: 'JOS' },
  { nom: 'Bois de Hal', acronyme: 'HAL' },
  { nom: 'Parc de Bruxelles', acronyme: 'BRU' },
  { nom: 'Jardin Botanique', acronyme: 'BOT' },
  { nom: 'Parc de la Woluwe', acronyme: 'WOL' },
  { nom: 'Parc Tenbosch', acronyme: 'TEN' },
  { nom: 'Parc du Wolvendael', acronyme: 'WLV' },
  { nom: 'Parc de Forest', acronyme: 'FOR' },
]

const DETECTEURS = [
  'SM4',
  'SM Mini',
  'Anabat Swift',
  'D500x',
  'Echo Meter Touch 2',
  'Batlogger M',
  'Pettersson D240X',
  'Elekon Batscanner',
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
  'w-full rounded-lg border border-foreground/10 bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-foreground/30'

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

  function handleNomSiteChange(nom: string) {
    setNomSite(nom)
    const site = SITES.find((s) => s.nom === nom)
    setAcronyme(site ? site.acronyme : '')
  }

  function toggleDetecteur(d: string) {
    setDetecteurs((prev) =>
      prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]
    )
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    const session: SessionData = {
      id: crypto.randomUUID(),
      typeSite,
      nomSite,
      acronyme,
      debutSession,
      finSession,
      compteurPrincipal,
      autresCompteurs,
      nbPointsEcoute: typeof nbPointsEcoute === 'number' ? nbPointsEcoute : 0,
      detecteurs,
      commentaire,
      createdAt: new Date().toISOString(),
      syncedAt: null,
    }

    try {
      await saveSession(session)
      router.push('/points')
    } catch {
      setError('Erreur lors de la sauvegarde locale.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium">
          Type de site <span className="text-foreground/40">*</span>
        </label>
        <select
          value={typeSite}
          onChange={(e) => setTypeSite(e.target.value)}
          required
          className={inputClass}
        >
          <option value="">Sélectionner...</option>
          {TYPES_SITE.map((t) => (
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
          className={inputClass}
        >
          <option value="">Sélectionner...</option>
          {SITES.map((s) => (
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
          className="w-full rounded-lg border border-foreground/10 bg-foreground/5 px-3 py-2.5 text-sm text-foreground/50 cursor-not-allowed"
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
        <label className="text-sm font-medium">Nombre de points d'écoute</label>
        <input
          type="number"
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
