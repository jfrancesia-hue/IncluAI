"use client"

import { useMemo } from "react"
import { SeccionGuia } from "./SeccionGuia"

type Props = {
  texto: string
}

type Seccion = {
  titulo: string
  contenido: string
}

function parseSecciones(texto: string): Seccion[] {
  // Separar por headers ## con número y emoji
  const regex = /^##\s+(.+)$/gm
  const secciones: Seccion[] = []
  let lastIndex = 0
  let lastTitulo = ""

  const matches = [...texto.matchAll(regex)]

  for (let i = 0; i < matches.length; i++) {
    const match = matches[i]
    if (lastTitulo && match.index !== undefined) {
      secciones.push({
        titulo: lastTitulo,
        contenido: texto.slice(lastIndex, match.index).trim(),
      })
    }
    lastTitulo = match[1].trim()
    lastIndex = (match.index ?? 0) + match[0].length
  }

  // Última sección
  if (lastTitulo) {
    secciones.push({
      titulo: lastTitulo,
      contenido: texto.slice(lastIndex).trim(),
    })
  }

  return secciones
}

export function GuiaCompleta({ texto }: Props) {
  const secciones = useMemo(() => parseSecciones(texto), [texto])

  if (secciones.length === 0) {
    return (
      <div className="prose prose-sm max-w-none whitespace-pre-wrap text-foreground">
        {texto}
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {secciones.map((sec, i) => (
        <SeccionGuia key={i} titulo={sec.titulo} contenido={sec.contenido} />
      ))}
    </div>
  )
}
