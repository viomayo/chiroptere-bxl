import AppShell from './components/app-shell'
import Dashboard from './components/dashboard'

export default function Page() {
  return (
    <AppShell>
      <main className="flex-1 flex flex-col px-4 py-6 pb-24 lg:pb-8 max-w-2xl mx-auto w-full">
        <Dashboard />
      </main>
    </AppShell>
  )
}
