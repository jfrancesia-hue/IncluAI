"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, Star, Trash2, Copy, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Consulta } from "@/lib/types"

type Props = {
  consulta: Consulta
  esFavorita?: boolean
  onToggleFavorita?: (id: string) => void
  onEliminar?: (id: string) => void
}

export function HistorialCard({
  consulta,
  esFavorita = false,
  onToggleFavorita,
  onEliminar,
}: Props) {
  const [expanded, setExpanded] = useState(false)
  const [copied, setCopied] = useState(false)

  const fecha = new Date(consulta.created_at).toLocaleDateString("es-AR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })

  const handleCopy = async () => {
    await navigator.clipboard.writeText(consulta.respuesta_ia)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card>
      <CardContent className="py-4">
        {/* Header */}
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="flex w-full items-start justify-between gap-3 text-left"
          aria-expanded={expanded}
        >
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-semibold text-foreground">
                {consulta.materia}
              </span>
              <span className="text-xs text-muted-foreground">&middot;</span>
              <span className="text-xs text-muted-foreground">{fecha}</span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground line-clamp-1">
              {consulta.contenido}
            </p>
            <div className="mt-2 flex flex-wrap gap-1">
              {consulta.discapacidades.map((d) => (
                <Badge key={d} variant="secondary" className="text-xs">
                  {d}
                </Badge>
              ))}
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-1">
            {consulta.feedback_estrellas && (
              <span className="flex items-center gap-0.5 text-xs text-amber-500">
                <Star className="size-3 fill-amber-400" />
                {consulta.feedback_estrellas}
              </span>
            )}
            {expanded ? (
              <ChevronUp className="size-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="size-4 text-muted-foreground" />
            )}
          </div>
        </button>

        {/* Contenido expandido */}
        {expanded && (
          <div className="mt-4 border-t border-border pt-4">
            <div className="prose prose-sm max-w-none whitespace-pre-wrap text-foreground max-h-96 overflow-y-auto">
              {consulta.respuesta_ia}
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <Button variant="outline" size="sm" onClick={handleCopy}>
                {copied ? (
                  <>
                    <Check className="size-3.5 text-inclua-accent" data-icon="inline-start" />
                    Copiado
                  </>
                ) : (
                  <>
                    <Copy className="size-3.5" data-icon="inline-start" />
                    Copiar
                  </>
                )}
              </Button>

              {onToggleFavorita && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onToggleFavorita(consulta.id)}
                >
                  <Star
                    className={cn(
                      "size-3.5",
                      esFavorita && "fill-amber-400 text-amber-400"
                    )}
                    data-icon="inline-start"
                  />
                  {esFavorita ? "Favorita" : "Favorita"}
                </Button>
              )}

              {onEliminar && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEliminar(consulta.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="size-3.5" data-icon="inline-start" />
                  Eliminar
                </Button>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
