import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function VerificarEmailPage() {
  return (
    <Card>
      <CardHeader className="text-center">
        <div className="mx-auto mb-2 text-4xl">📧</div>
        <CardTitle className="font-display text-xl">
          Revisá tu email
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-center">
        <p className="text-muted-foreground">
          Te enviamos un enlace de verificación a tu correo electrónico.
          Revisá tu bandeja de entrada (y la carpeta de spam) para confirmar tu
          cuenta.
        </p>
        <p className="text-sm text-muted-foreground">
          Una vez verificado, podés iniciar sesión y empezar a generar tus guías
          inclusivas.
        </p>
        <Link
          href="/login"
          className={cn(buttonVariants({ variant: "default" }), "mt-4 w-full")}
        >
          Ir a iniciar sesión
        </Link>
      </CardContent>
    </Card>
  )
}
