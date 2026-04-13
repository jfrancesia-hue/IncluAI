"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-4 text-center">
      <div className="text-4xl">😥</div>
      <h2 className="font-display text-xl font-bold text-foreground">
        Algo salió mal
      </h2>
      <p className="max-w-md text-sm text-muted-foreground">
        Ocurrió un error inesperado. Por favor intentá de nuevo. Si el problema
        persiste, recargá la página.
      </p>
      <Button
        onClick={reset}
        className="bg-inclua-primary hover:bg-inclua-primary-light text-white"
      >
        Intentar de nuevo
      </Button>
    </div>
  )
}
