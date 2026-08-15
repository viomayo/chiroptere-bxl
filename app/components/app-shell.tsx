'use client'

import Link from 'next/link'
import Image from 'next/image'
import LogoutButton from './logout-button'
import SubNavbar from './sub-navbar'
import SyncButton from './sync-button'
import { useOfflineAuth } from './offline-auth-provider'
import OfflineStatusIndicator from './offline-status'

interface AppShellProps {
  children: React.ReactNode
}

export default function AppShell({ children }: AppShellProps) {
  const { status, user, isOnlineAuthenticated } = useOfflineAuth()

  if (status === 'loading') {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <p className="text-sm text-foreground/45">Chargement de l&apos;identité…</p>
      </main>
    )
  }

  if (status === 'unauthenticated' || !user) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center gap-3 bg-background text-foreground px-6 text-center">
        <p className="text-sm text-foreground/60">Application verrouillée.</p>
        <Link href="/login" className="text-sm underline underline-offset-2">
          Se connecter
        </Link>
      </main>
    )
  }

  const remoteUserId = isOnlineAuthenticated ? user.ownerId : null
  const avatar = isOnlineAuthenticated ? user.avatarUrl : null

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="border-b border-foreground/8 px-4 sm:px-6">
        <nav className="max-w-5xl mx-auto h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Chiroptère BXL"
              width={28}
              height={28}
              loading="eager"
              unoptimized
              className="rounded-lg"
            />
            <span className="text-sm font-medium hidden sm:inline">Chiroptère BXL</span>
          </Link>

          <div className="flex items-center gap-2">
            <OfflineStatusIndicator />
            <SyncButton userId={remoteUserId} />

            <div className="flex items-center gap-2.5">
              {avatar ? (
                <Image
                  src={avatar}
                  alt={user.displayName}
                  width={28}
                  height={28}
                  className="rounded-full"
                />
              ) : (
                <div className="w-7 h-7 rounded-full bg-foreground/10 flex items-center justify-center">
                  <span className="text-xs font-medium text-foreground/60">
                    {user.displayName[0]?.toUpperCase()}
                  </span>
                </div>
              )}
              <span className="text-sm text-foreground/70 hidden sm:block">{user.displayName}</span>
            </div>

            <div className="w-px h-4 bg-foreground/10" />
            <LogoutButton />
          </div>
        </nav>
      </header>

      {(status === 'offline' || status === 'expired') && (
        <p className="border-b border-foreground/8 px-4 py-1.5 text-center text-xs text-foreground/50">
          {status === 'expired'
            ? 'Session en ligne expirée — travail local disponible'
            : 'Mode hors ligne — travail local disponible'}
        </p>
      )}

      <SubNavbar />

      {children}

      <footer className="text-center py-4 px-4 border-t border-foreground/8 pb-20 lg:pb-4">
        <p className="text-sm text-foreground/45">
          Développé par{' '}
          <a href="https://www.github.com/thedasken" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-foreground/70 transition-colors">
            thedasken
          </a>
          {' '}et{' '}
          <a href="https://www.github.com/viomayo" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-foreground/70 transition-colors">
            viomayo
          </a>
          {' '}avec l&apos;aide de l&apos;IA
        </p>
      </footer>
    </div>
  )
}
