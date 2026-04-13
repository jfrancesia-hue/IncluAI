import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export default function ExitoPagoPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <Card className="mx-auto max-w-md text-center">
        <CardHeader>
          <div className="mx-auto mb-2 text-5xl">🎉</div>
          <CardTitle className="font-display text-2xl">
            ¡Bienvenido/a al Plan Pro!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Tu pago fue procesado exitosamente. Ya podés generar hasta 40 guías
            inclusivas por mes, guardar tu historial y mucho más.
          </p>
          <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
            <Link
              href="/nueva-consulta"
              className={cn(
                buttonVariants({ size: "lg" }),
                "bg-inclua-accent hover:bg-inclua-accent-dark text-white px-6 h-auto py-3"
              )}
            >
              Crear mi primera guía Pro
            </Link>
            <Link
              href="/inicio"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-auto py-3"
              )}
            >
              Ir al inicio
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
