import { Suspense } from 'react'
import AppShell from '@/app/components/app-shell'
import CompteurScreen from './compteur-screen'

export default function CompteurPage() {
  return (
    <AppShell>
      <main className="flex-1 flex flex-col px-4 py-6 pb-24 lg:pb-8 max-w-2xl mx-auto w-full">
        <Suspense
          fallback={
            <div className="flex-1 flex items-center justify-center">
              <p className="text-sm text-foreground/30">Chargement...</p>
            </div>
          }
        >
          <CompteurScreen />
        </Suspense>
      </main>
    </AppShell>
  )
}
