import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-card px-5 py-10">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          <div>
            <span className="font-display text-xl font-bold text-inclua-primary">
              Inclu<span className="text-inclua-accent">IA</span>
            </span>
            <p className="mt-1.5 text-xs text-muted-foreground max-w-xs">
              Inteligencia artificial al servicio de la educacion inclusiva argentina
            </p>
          </div>

          <nav className="flex gap-6 text-sm text-muted-foreground">
            <Link href="/registro" className="hover:text-foreground transition-colors">
              Crear cuenta
            </Link>
            <Link href="/login" className="hover:text-foreground transition-colors">
              Iniciar sesion
            </Link>
          </nav>
        </div>

        <div className="mt-8 border-t border-border/40 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <span>Hecho con dedicacion en Argentina</span>
          <span>{new Date().getFullYear()} IncluIA. Todos los derechos reservados.</span>
        </div>
      </div>
    </footer>
  )
}
