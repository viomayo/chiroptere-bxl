import { headers } from 'next/headers'
import AppShell from './components/app-shell'
import Dashboard from './components/dashboard'

export default async function Page() {
  const h = await headers()
  const name = decodeURIComponent(h.get('x-user-name') ?? 'Utilisateur')
  const avatar = h.get('x-user-avatar') ?? null
  const userId = h.get('x-user-id') ?? null

  return (
    <AppShell name={name} avatar={avatar} userId={userId}>
      <main className="flex-1 flex flex-col px-4 py-6 pb-24 lg:pb-8 max-w-2xl mx-auto w-full">
        <Dashboard name={name} />
      </main>
    </AppShell>
  )
}
