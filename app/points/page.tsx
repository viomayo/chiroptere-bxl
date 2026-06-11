import { Suspense } from 'react'
import { headers } from 'next/headers'
import AppShell from '@/app/components/app-shell'
import PointsList from './points-list'

export default async function PointsPage() {
  const h = await headers()
  const name = decodeURIComponent(h.get('x-user-name') ?? 'Utilisateur')
  const avatar = h.get('x-user-avatar') ?? null

  return (
    <AppShell name={name} avatar={avatar}>
      <main className="flex-1 flex flex-col px-4 py-6 pb-24 lg:pb-8 max-w-2xl mx-auto w-full">
        <h1 className="text-base font-semibold mb-6">Points d'écoute</h1>
        <Suspense fallback={
          <div className="flex-1 flex items-center justify-center">
            <p className="text-sm text-foreground/30">Chargement...</p>
          </div>
        }>
          <PointsList />
        </Suspense>
      </main>
    </AppShell>
  )
}
