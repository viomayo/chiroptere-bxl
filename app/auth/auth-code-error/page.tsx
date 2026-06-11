import Link from 'next/link'

export default function AuthCodeErrorPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-4 text-foreground">
      <div className="w-full max-w-sm flex flex-col items-center gap-5 text-center">
        <div className="w-10 h-10 rounded-xl bg-foreground flex items-center justify-center">
          <span className="text-background text-lg font-bold">C</span>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-semibold tracking-tight">Connexion impossible</h1>
          <p className="text-sm text-foreground/50">
            La connexion Google n&apos;a pas pu être finalisée. Réessayez depuis la page de connexion.
          </p>
        </div>
        <Link
          href="/login"
          className="inline-flex items-center justify-center rounded-lg bg-foreground px-4 py-2.5 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
        >
          Retour à la connexion
        </Link>
      </div>
    </main>
  )
}
