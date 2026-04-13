"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, Copy, Check } from "lucide-react"

type Props = {
  titulo: string
  contenido: string
  defaultOpen?: boolean
}

export function SeccionGuia({ titulo, contenido, defaultOpen = true }: Props) {
  const [open, setOpen] = useState(defaultOpen)
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(contenido)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-2 px-4 py-3 text-left transition-colors hover:bg-muted/50"
        aria-expanded={open}
      >
        <h3 className="text-sm font-bold text-foreground sm:text-base">{titulo}</h3>
        {open ? (
          <ChevronUp className="size-4 shrink-0 text-muted-foreground" />
        ) : (
          <ChevronDown className="size-4 shrink-0 text-muted-foreground" />
        )}
      </button>

      {open && (
        <div className="relative border-t border-border px-4 py-3">
          <div className="prose prose-sm max-w-none whitespace-pre-wrap text-foreground">
            {contenido}
          </div>
          <Button
            variant="ghost"
            size="icon-xs"
            onClick={handleCopy}
            className="absolute right-2 top-2"
            aria-label="Copiar esta sección"
          >
            {copied ? (
              <Check className="size-3.5 text-inclua-accent" />
            ) : (
              <Copy className="size-3.5" />
            )}
          </Button>
        </div>
      )}
    </div>
  )
}
