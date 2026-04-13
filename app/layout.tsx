import type { Metadata } from "next"
import { DM_Sans, Fraunces } from "next/font/google"
import { Toaster } from "@/components/ui/sonner"
import "./globals.css"

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
})

export const metadata: Metadata = {
  title: "IncluIA — Planificá clases inclusivas en minutos",
  description:
    "Asistente de educación inclusiva con IA para docentes argentinos. Generá guías pedagógicas personalizadas para alumnos con discapacidad.",
  keywords: [
    "educación inclusiva",
    "discapacidad",
    "docentes",
    "Argentina",
    "IA",
    "planificación",
    "DUA",
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="es-AR"
      className={`${dmSans.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground">
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  )
}
