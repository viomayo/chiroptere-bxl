import AppShell from '@/app/components/app-shell'
import SiteForm from './site-form'

export default function SitePage() {
  return (
    <AppShell>
      <main className="flex-1 px-4 py-6 pb-24 lg:pb-8 max-w-2xl mx-auto w-full">
        <h1 className="text-base font-semibold mb-6">Nouvelle session</h1>
        <SiteForm />
      </main>
    </AppShell>
  )
}
