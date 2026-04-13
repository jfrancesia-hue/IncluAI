import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "IncluIA — Planificá clases inclusivas en minutos",
  description:
    "IA especializada en educación inclusiva para docentes argentinos. Generá guías pedagógicas personalizadas para alumnos con discapacidad en 3 minutos.",
  keywords: [
    "educación inclusiva",
    "discapacidad",
    "docentes argentinos",
    "IA educativa",
    "planificación inclusiva",
    "DUA",
    "TEA",
    "adecuaciones curriculares",
    "guía pedagógica",
  ],
  openGraph: {
    title: "IncluIA — Planificá clases inclusivas en minutos",
    description:
      "IA especializada en educación inclusiva para docentes argentinos. Generá guías pedagógicas personalizadas.",
    type: "website",
    locale: "es_AR",
    siteName: "IncluIA",
  },
  twitter: {
    card: "summary_large_image",
    title: "IncluIA — Clases inclusivas con IA",
    description:
      "Generá guías pedagógicas inclusivas personalizadas para alumnos con discapacidad.",
  },
}

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
