"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Copy, Check, Printer } from "lucide-react"

type Props = {
  texto: string
}

export function AccionesGuia({ texto }: Props) {
  const [copied, setCopied] = useState(false)

  const handleCopyAll = async () => {
    try {
      await navigator.clipboard.writeText(texto)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback silencioso si clipboard no disponible
    }
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="flex flex-wrap gap-2 no-print">
      <Button variant="outline" size="sm" onClick={handleCopyAll}>
        {copied ? (
          <>
            <Check className="size-4 text-inclua-accent" data-icon="inline-start" />
            Copiado
          </>
        ) : (
          <>
            <Copy className="size-4" data-icon="inline-start" />
            Copiar todo
          </>
        )}
      </Button>
      <Button variant="outline" size="sm" onClick={handlePrint}>
        <Printer className="size-4" data-icon="inline-start" />
        Imprimir
      </Button>
    </div>
  )
}
