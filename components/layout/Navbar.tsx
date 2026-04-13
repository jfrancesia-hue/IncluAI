"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/hooks/useAuth"
import { usePerfil } from "@/hooks/usePerfil"
import { PlanBadge } from "./PlanBadge"
import { Button } from "@/components/ui/button"
import { Menu, X, LogOut, User, History, Home, Plus } from "lucide-react"
import { cn } from "@/lib/utils"

const NAV_LINKS = [
  { href: "/inicio", label: "Inicio", icon: Home },
  { href: "/nueva-consulta", label: "Nueva consulta", icon: Plus },
  { href: "/historial", label: "Historial", icon: History },
  { href: "/perfil", label: "Perfil", icon: User },
]

export function Navbar() {
  const { user, signOut } = useAuth()
  const { perfil } = usePerfil(user?.id)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <nav className="sticky top-0 z-50 border-b border-border/60 bg-card/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5">
        {/* Logo */}
        <Link href="/inicio" className="flex items-center gap-2">
          <span className="font-display text-xl font-bold text-inclua-primary">
            Inclu<span className="text-inclua-accent">IA</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-inclua-primary-bg text-inclua-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <link.icon className="size-4" />
                {link.label}
              </Link>
            )
          })}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {perfil && <PlanBadge plan={perfil.plan} />}

          {perfil && (
            <span className="hidden text-sm font-medium text-foreground md:block">
              {perfil.nombre}
            </span>
          )}

          <Button
            variant="ghost"
            size="icon-sm"
            onClick={signOut}
            aria-label="Cerrar sesion"
            className="hidden md:flex text-muted-foreground hover:text-foreground"
          >
            <LogOut className="size-4" />
          </Button>

          {/* Mobile hamburger */}
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Cerrar menu" : "Abrir menu"}
            className="md:hidden"
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t border-border/60 bg-card px-5 py-3 md:hidden">
          <div className="space-y-1">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-2.5 rounded-xl px-3 py-3 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-inclua-primary-bg text-inclua-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <link.icon className="size-4" />
                  {link.label}
                </Link>
              )
            })}
            <button
              onClick={() => {
                setMenuOpen(false)
                signOut()
              }}
              className="flex w-full items-center gap-2.5 rounded-xl px-3 py-3 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10"
            >
              <LogOut className="size-4" />
              Cerrar sesion
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}
