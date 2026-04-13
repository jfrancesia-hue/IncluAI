import { cn } from "@/lib/utils"

type Props = {
  className?: string
  text?: string
}

export function LoadingSpinner({ className, text }: Props) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-12" role="status">
      <div
        className={cn(
          "size-8 animate-spin rounded-full border-3 border-border border-t-inclua-primary",
          className
        )}
      />
      {text && <p className="text-sm text-muted-foreground">{text}</p>}
      <span className="sr-only">Cargando...</span>
    </div>
  )
}
