import Link from "next/link"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      {/* Left panel - branding */}
      <div className="hidden lg:flex lg:w-[45%] relative overflow-hidden bg-inclua-primary">
        <div className="absolute inset-0 bg-gradient-to-br from-inclua-primary via-[#1a3355] to-[#0f2440]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
        <div className="absolute top-1/3 -left-20 size-80 rounded-full bg-inclua-accent/10 blur-[100px]" />
        <div className="absolute bottom-1/3 -right-20 size-80 rounded-full bg-blue-400/10 blur-[100px]" />

        <div className="relative flex flex-col justify-center px-12 xl:px-16">
          <Link href="/landing">
            <h1 className="font-display text-4xl font-extrabold text-white">
              Inclu<span className="text-inclua-accent-light">IA</span>
            </h1>
          </Link>
          <p className="mt-4 text-lg text-white/70 max-w-sm leading-relaxed">
            Inteligencia artificial al servicio de la educacion inclusiva argentina
          </p>
          <div className="mt-10 space-y-4">
            {[
              { icon: "📝", text: "Formulario simple de 3 pasos" },
              { icon: "🤖", text: "Guias generadas por IA en segundos" },
              { icon: "🏫", text: "Estrategias concretas para tu aula" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-3 text-white/60">
                <span className="text-xl">{item.icon}</span>
                <span className="text-sm">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel - form */}
      <div className="flex flex-1 flex-col items-center justify-center bg-background px-5 py-10">
        <Link href="/landing" className="mb-8 lg:hidden">
          <h1 className="font-display text-3xl font-extrabold text-inclua-primary">
            Inclu<span className="text-inclua-accent">IA</span>
          </h1>
        </Link>
        <div className="w-full max-w-[420px]">{children}</div>
      </div>
    </div>
  )
}
