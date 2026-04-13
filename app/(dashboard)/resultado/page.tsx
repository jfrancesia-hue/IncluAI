"use client"

import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { StreamingText } from "@/components/resultado/StreamingText"
import { GuiaCompleta } from "@/components/resultado/GuiaCompleta"
import { AccionesGuia } from "@/components/resultado/AccionesGuia"
import { FeedbackEstrellas } from "@/components/resultado/FeedbackEstrellas"
import { Skeleton } from "@/components/ui/skeleton"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { FormularioConsulta } from "@/lib/types"

export default function ResultadoPage() {
  const [texto, setTexto] = useState("")
  const [isStreaming, setIsStreaming] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [limitReached, setLimitReached] = useState(false)
  const startedRef = useRef(false)
  const router = useRouter()

  useEffect(() => {
    if (startedRef.current) return
    startedRef.current = true

    const raw = sessionStorage.getItem("inclua_form")
    if (!raw) {
      router.push("/nueva-consulta")
      return
    }

    let formData: FormularioConsulta
    try {
      formData = JSON.parse(raw)
    } catch {
      router.push("/nueva-consulta")
      return
    }
    sessionStorage.removeItem("inclua_form")

    const fetchStream = async () => {
      setIsStreaming(true)
      setError(null)

      try {
        const res = await fetch("/api/generar-guia", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        })

        if (!res.ok) {
          const data = await res.json().catch(() => ({}))
          if (res.status === 403) {
            setLimitReached(true)
            setError(data.error || "Alcanzaste el límite de tu plan.")
          } else {
            setError(data.error || "Error al generar la guía. Intentá de nuevo.")
          }
          setIsStreaming(false)
          return
        }

        const reader = res.body?.getReader()
        if (!reader) {
          setError("Error de conexión")
          setIsStreaming(false)
          return
        }

        const decoder = new TextDecoder()
        let accumulated = ""

        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          accumulated += decoder.decode(value, { stream: true })
          setTexto(accumulated)
        }

        setIsStreaming(false)
      } catch {
        setError("Error de conexión. Verificá tu internet e intentá de nuevo.")
        setIsStreaming(false)
      }
    }

    fetchStream()
  }, [router])

  // Estado de carga inicial
  if (!texto && !error && isStreaming) {
    return (
      <div className="mx-auto max-w-3xl space-y-4">
        <h1 className="font-display text-2xl font-bold text-foreground">
          Generando tu guía inclusiva...
        </h1>
        <p className="text-muted-foreground">
          Esto puede tomar unos segundos. La guía aparecerá progresivamente.
        </p>
        <div className="space-y-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/6" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/6" />
        </div>
      </div>
    )
  }

  // Error o límite
  if (error) {
    return (
      <div className="mx-auto max-w-3xl space-y-4">
        <h1 className="font-display text-2xl font-bold text-foreground">
          {limitReached ? "Límite alcanzado" : "Error"}
        </h1>
        <div role="alert" className="rounded-lg bg-destructive/10 p-4 text-destructive">
          {error}
        </div>
        <div className="flex gap-3">
          {limitReached ? (
            <Link
              href="/planes"
              className={cn(
                buttonVariants(),
                "bg-inclua-accent hover:bg-inclua-accent-dark text-white"
              )}
            >
              Ver planes
            </Link>
          ) : (
            <Link
              href="/nueva-consulta"
              className={cn(buttonVariants({ variant: "outline" }))}
            >
              Intentar de nuevo
            </Link>
          )}
        </div>
      </div>
    )
  }

  // Sin datos
  if (!texto && !isStreaming) {
    return (
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-muted-foreground">No hay guía para mostrar.</p>
        <Link
          href="/nueva-consulta"
          className={cn(buttonVariants({ variant: "outline" }), "mt-4")}
        >
          Crear nueva consulta
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6 guia-resultado">
      <h1 className="font-display text-2xl font-bold text-foreground">
        {isStreaming ? "Generando tu guía..." : "Tu guía inclusiva"}
      </h1>

      {isStreaming ? (
        <StreamingText text={texto} isStreaming={isStreaming} />
      ) : (
        <>
          <AccionesGuia texto={texto} />
          <GuiaCompleta texto={texto} />
          <div className="border-t border-border pt-4">
            <FeedbackEstrellas />
          </div>
          <div className="flex gap-3 no-print">
            <Link
              href="/nueva-consulta"
              className={cn(
                buttonVariants(),
                "bg-inclua-accent hover:bg-inclua-accent-dark text-white"
              )}
            >
              Nueva consulta
            </Link>
            <Link
              href="/inicio"
              className={cn(buttonVariants({ variant: "outline" }))}
            >
              Volver al inicio
            </Link>
          </div>
        </>
      )}
    </div>
  )
}
