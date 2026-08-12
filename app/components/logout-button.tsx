'use client'

import { useRouter } from 'next/navigation'
import { useOfflineAuth } from './offline-auth-provider'

export default function LogoutButton() {
  const router = useRouter()
  const { logout } = useOfflineAuth()

  const signOut = async () => {
    try {
      await logout()
    } finally {
      router.push('/login')
    }
  }

  return (
    <button
      onClick={signOut}
      className="text-sm text-foreground/50 hover:text-foreground transition-colors cursor-pointer"
    >
      Se déconnecter
    </button>
  )
}
