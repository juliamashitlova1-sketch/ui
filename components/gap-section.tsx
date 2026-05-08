import { X, Check } from "lucide-react"

export function GapSection() {
  return (
    <section className="border-b border-border/60 bg-background">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs uppercase tracking-wider text-primary">
            The gap
          </p>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
            Today&apos;s tools see screens. Not flows.
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            v0, Locofy, Same.dev, Builder.io — they all turn one frame into one
            page. But your product isn&apos;t a frame. It&apos;s loading states,
            optimistic updates, modal transitions, error toasts, and the seven
            edge cases QA finds at 11pm.
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-4xl gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-border bg-card/40 p-6">
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-destructive/15 ring-1 ring-destructive/30">
                <X className="h-4 w-4 text-destructive" aria-hidden="true" />
              </div>
              <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                Static design-to-code
              </span>
            </div>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <span className="text-destructive/70">—</span>
                One screenshot in, one stateless page out
              </li>
              <li className="flex gap-2">
                <span className="text-destructive/70">—</span>
                You wire up state, transitions, and APIs by hand
              </li>
              <li className="flex gap-2">
                <span className="text-destructive/70">—</span>
                Loading, error, and empty states get forgotten
              </li>
              <li className="flex gap-2">
                <span className="text-destructive/70">—</span>
                A dozen prompts to describe what 5 seconds of video shows
              </li>
            </ul>
          </div>

          <div className="rounded-xl border border-primary/40 bg-gradient-to-b from-primary/5 to-transparent p-6 ring-1 ring-primary/20">
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/15 ring-1 ring-primary/40">
                <Check className="h-4 w-4 text-primary" aria-hidden="true" />
              </div>
              <span className="font-mono text-xs uppercase tracking-wider text-primary">
                PixelForge · Flow Capture
              </span>
            </div>
            <ul className="space-y-2.5 text-sm text-foreground/90">
              <li className="flex gap-2">
                <span className="text-primary">+</span>
                Recording in, working interactive prototype out
              </li>
              <li className="flex gap-2">
                <span className="text-primary">+</span>
                State machine inferred from your actions
              </li>
              <li className="flex gap-2">
                <span className="text-primary">+</span>
                Transitions, optimistic updates, and async states preserved
              </li>
              <li className="flex gap-2">
                <span className="text-primary">+</span>
                Editable timeline — tweak any state, regenerate just that branch
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
