"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function DashboardError({
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
      <div className="text-4xl">😥</div>
      <h2 className="font-display text-xl font-bold text-foreground">
        Error inesperado
      </h2>
      <p className="max-w-md text-sm text-muted-foreground">
        Algo salió mal. Intentá de nuevo o volvé al inicio.
      </p>
      <div className="flex gap-3">
        <Button
          onClick={reset}
          className="bg-inclua-primary hover:bg-inclua-primary-light text-white"
        >
          Reintentar
        </Button>
        <Link
          href="/inicio"
          className={cn(buttonVariants({ variant: "outline" }))}
        >
          Ir al inicio
        </Link>
      </div>
    </div>
  )
}
