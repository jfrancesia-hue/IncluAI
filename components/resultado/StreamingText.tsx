"use client"

type Props = {
  text: string
  isStreaming: boolean
}

export function StreamingText({ text, isStreaming }: Props) {
  return (
    <div className="relative" aria-live="polite">
      <div className="prose prose-sm max-w-none whitespace-pre-wrap text-foreground">
        {text}
        {isStreaming && (
          <span className="inline-block h-5 w-0.5 animate-pulse bg-inclua-primary ml-0.5" aria-hidden="true" />
        )}
      </div>
      {isStreaming && (
        <p className="sr-only">Generando guía, por favor esperá...</p>
      )}
    </div>
  )
}
