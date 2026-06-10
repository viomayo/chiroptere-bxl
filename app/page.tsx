import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import LogoutButton from './components/logout-button'
import SubNavbar from './components/sub-navbar'
import Image from 'next/image'

export default async function Page() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const name: string = user.user_metadata?.full_name ?? user.user_metadata?.name ?? user.email ?? 'Utilisateur'
  const avatar: string | null = user.user_metadata?.avatar_url ?? null

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="border-b border-foreground/8 px-4 sm:px-6">
        <nav className="max-w-5xl mx-auto h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-foreground flex items-center justify-center">
              <span className="text-background text-xs font-bold">C</span>
            </div>
            <span className="text-sm font-medium">Chiroptère</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2.5">
              {avatar ? (
                <Image
                  src={avatar}
                  alt={name}
                  width={28}
                  height={28}
                  className="rounded-full"
                />
              ) : (
                <div className="w-7 h-7 rounded-full bg-foreground/10 flex items-center justify-center">
                  <span className="text-xs font-medium text-foreground/60">
                    {name[0]?.toUpperCase()}
                  </span>
                </div>
              )}
              <span className="text-sm text-foreground/70 hidden sm:block">{name}</span>
            </div>

            <div className="w-px h-4 bg-foreground/10" />

            <LogoutButton />
          </div>
        </nav>
      </header>

      <SubNavbar />

      <main className="flex-1 flex items-center justify-center px-4 pb-16 lg:pb-0">
        <div className="text-center">
          <p className="text-foreground/40 text-sm">Bienvenue, {name.split(' ')[0]} !</p>
        </div>
      </main>
    </div>
  )
}
