import Link from 'next/link'
import Image from 'next/image'
import LogoutButton from './logout-button'
import SubNavbar from './sub-navbar'

interface AppShellProps {
  name: string
  avatar: string | null
  children: React.ReactNode
}

export default function AppShell({ name, avatar, children }: AppShellProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="border-b border-foreground/8 px-4 sm:px-6">
        <nav className="max-w-5xl mx-auto h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-foreground flex items-center justify-center">
              <span className="text-background text-xs font-bold">C</span>
            </div>
            <span className="text-sm font-medium">Chiroptère</span>
          </Link>

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

      {children}
    </div>
  )
}
