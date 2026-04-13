import { Navbar } from "@/components/layout/Navbar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Ir al contenido principal
      </a>
      <Navbar />
      <main id="main-content" className="mx-auto w-full max-w-5xl flex-1 px-4 py-6">
        {children}
      </main>
    </>
  )
}
