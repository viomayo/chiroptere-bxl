import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import AppShell from './components/app-shell'
import Dashboard from './components/dashboard'

export default async function Page() {
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
        <Dashboard name={name} />
      </main>
    </AppShell>
  )
}
