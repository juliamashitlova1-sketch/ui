import { Upload, Brain, GitBranch, PlayCircle } from "lucide-react"

const STEPS = [
  {
    n: "01",
    icon: Upload,
    title: "Drop a recording",
    description:
      "Screen recording, Loom link, or click-through video. 5 to 90 seconds works best. No annotations needed — just record yourself using the thing.",
    code: "input.mov  →  PixelForge",
  },
  {
    n: "02",
    icon: Brain,
    title: "Flow extraction",
    description:
      "A vision model segments frames into discrete UI states. A reasoning model labels transitions, intents, and async boundaries — building a typed state machine.",
    code: "states: 7  ·  transitions: 9  ·  effects: 3",
  },
  {
    n: "03",
    icon: GitBranch,
    title: "Edit the timeline",
    description:
      "Inspect every detected state on a horizontal timeline. Rename, merge, branch, or add states the model missed. This is the source of truth.",
    code: "state.modal_open  →  Slide-up · 240ms · ease-out",
  },
  {
    n: "04",
    icon: PlayCircle,
    title: "Ship a working app",
    description:
      "Generates production React + Tailwind with proper hooks, state management, optimistic updates, and the loading/error/empty states the original had — or should have had.",
    code: "→ TaskList.tsx  ·  AddTaskModal.tsx  ·  api.ts",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="border-b border-border/60 bg-background">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs uppercase tracking-wider text-primary">
            How Flow Capture works
          </p>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
            Recording in. Working app out. Four steps.
          </h2>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s) => {
            const Icon = s.icon
            return (
              <div
                key={s.n}
                className="relative flex flex-col bg-card/60 p-7 transition-colors hover:bg-card"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-primary">{s.n}</span>
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 ring-1 ring-primary/30">
                    <Icon className="h-4 w-4 text-primary" aria-hidden="true" />
                  </div>
                </div>

                <h3 className="mt-6 text-base font-semibold tracking-tight">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {s.description}
                </p>

                <div className="mt-6 rounded-md border border-border bg-background/60 px-3 py-2 font-mono text-[11px] text-foreground/70">
                  {s.code}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
