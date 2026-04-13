import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center">
      <div className="text-5xl">🔍</div>
      <h1 className="font-display text-3xl font-bold text-foreground">
        Página no encontrada
      </h1>
      <p className="max-w-md text-muted-foreground">
        La página que buscás no existe o fue movida.
      </p>
      <Link
        href="/landing"
        className={cn(
          buttonVariants(),
          "bg-inclua-primary hover:bg-inclua-primary-light text-white"
        )}
      >
        Volver al inicio
      </Link>
    </div>
  )
}
