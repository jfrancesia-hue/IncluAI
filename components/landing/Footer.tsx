import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-border bg-card px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <div>
            <span className="font-display text-lg font-bold text-inclua-primary">
              Inclu<span className="text-inclua-accent">IA</span>
            </span>
            <p className="mt-1 text-xs text-muted-foreground">
              Asistente de educación inclusiva con IA
            </p>
          </div>

          <nav className="flex gap-4 text-sm text-muted-foreground">
            <Link href="/registro" className="hover:text-foreground transition-colors">
              Crear cuenta
            </Link>
            <Link href="/login" className="hover:text-foreground transition-colors">
              Iniciar sesión
            </Link>
          </nav>
        </div>

        <div className="mt-6 border-t border-border pt-4 text-center text-xs text-muted-foreground">
          Hecho en Argentina &middot; {new Date().getFullYear()} IncluIA
        </div>
      </div>
    </footer>
  )
}
