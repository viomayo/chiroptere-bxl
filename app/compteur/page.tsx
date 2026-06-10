import { Suspense } from 'react'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import AppShell from '@/app/components/app-shell'
import CompteurScreen from './compteur-screen'

export default async function CompteurPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const name: string =
    user.user_metadata?.full_name ??
    user.user_metadata?.name ??
    user.email ??
    'Utilisateur'
  const avatar: string | null = user.user_metadata?.avatar_url ?? null

  return (
    <AppShell name={name} avatar={avatar}>
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
