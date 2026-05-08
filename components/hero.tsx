import Link from "next/link"
import { ArrowRight, Play, Code2, MousePointerClick } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border/60">
      <div className="absolute inset-0 grid-bg opacity-40" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[600px] bg-[radial-gradient(ellipse_at_top,oklch(0.76_0.17_55_/_0.18),transparent_60%)]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-6 pt-20 pb-24 md:pt-28 md:pb-32">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-3 py-1 backdrop-blur">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
            </span>
            <span className="font-mono text-xs text-muted-foreground">
              Now in private beta · Module C
            </span>
          </div>

          <h1 className="text-balance font-sans text-5xl font-semibold tracking-tight md:text-7xl">
            Record once.
            <br />
            <span className="bg-gradient-to-br from-primary via-primary to-primary/60 bg-clip-text text-transparent">
              Ship the prototype.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            Every design-to-code tool turns frames into UI. PixelForge turns{" "}
            <span className="text-foreground">flows</span> into working prototypes —
            screen recording in, interactive React app out, with state, transitions,
            and edge cases intact.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="group h-12 gap-2 px-6 text-sm font-medium">
              <Link href="#waitlist">
                Get early access
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 gap-2 border-border bg-card/40 px-6 text-sm font-medium backdrop-blur hover:bg-card"
            >
              <Link href="#how-it-works">
                <Play className="h-4 w-4" />
                Watch 90s demo
              </Link>
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-mono text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Play className="h-3 w-3 text-primary" /> Recording → State machine
            </span>
            <span className="text-border">•</span>
            <span className="flex items-center gap-1.5">
              <MousePointerClick className="h-3 w-3 text-primary" /> Real interactions
            </span>
            <span className="text-border">•</span>
            <span className="flex items-center gap-1.5">
              <Code2 className="h-3 w-3 text-primary" /> Production React
            </span>
          </div>
        </div>

        <HeroPreview />
      </div>
    </section>
  )
}

function HeroPreview() {
  return (
    <div className="relative mx-auto mt-20 max-w-5xl">
      <div className="absolute -inset-x-8 -inset-y-4 rounded-[2rem] bg-gradient-to-b from-primary/10 via-transparent to-transparent blur-2xl" />
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
        {/* window chrome */}
        <div className="flex items-center gap-2 border-b border-border bg-background/40 px-4 py-3">
          <div className="flex gap-1.5">
            <div className="h-3 w-3 rounded-full bg-muted-foreground/30" />
            <div className="h-3 w-3 rounded-full bg-muted-foreground/30" />
            <div className="h-3 w-3 rounded-full bg-muted-foreground/30" />
          </div>
          <div className="ml-4 flex-1 rounded-md border border-border bg-background/40 px-3 py-1 font-mono text-xs text-muted-foreground">
            pixelforge.app/studio
          </div>
        </div>

        {/* split view */}
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* recording timeline */}
          <div className="border-b border-border p-6 md:border-b-0 md:border-r">
            <div className="mb-3 flex items-center justify-between">
              <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                Input · screen.mov
              </span>
              <span className="flex items-center gap-1.5 font-mono text-[11px] text-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Detected 7 states
              </span>
            </div>

            <div className="space-y-2">
              {[
                { t: "00:01", label: "Idle / empty list", color: "bg-muted-foreground/40" },
                { t: "00:04", label: "Click 'Add task' button", color: "bg-primary" },
                { t: "00:05", label: "Modal opens (slide-up)", color: "bg-accent" },
                { t: "00:09", label: "Type into input field", color: "bg-primary" },
                { t: "00:12", label: "Submit → loading state", color: "bg-accent" },
                { t: "00:13", label: "Optimistic insert", color: "bg-primary" },
                { t: "00:15", label: "Settled · 1 task", color: "bg-muted-foreground/40" },
              ].map((s, i) => (
                <div key={i} className="flex items-center gap-3 rounded-md border border-transparent px-2 py-1.5 hover:border-border hover:bg-muted/30">
                  <span className="font-mono text-[10px] text-muted-foreground">{s.t}</span>
                  <span className={`h-1.5 w-1.5 rounded-full ${s.color}`} />
                  <span className="text-xs text-foreground/90">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* generated output */}
          <div className="bg-background/40 p-6">
            <div className="mb-3 flex items-center justify-between">
              <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                Output · TaskList.tsx
              </span>
              <span className="font-mono text-[11px] text-primary">live</span>
            </div>

            <pre className="overflow-x-auto rounded-md border border-border bg-background/60 p-4 font-mono text-[11px] leading-relaxed text-foreground/80">
              <code>{`const [tasks, setTasks] = useState<Task[]>([])
const [open, setOpen] = useState(false)

async function addTask(title: string) {
  const optimistic = { id: tmpId(), title }
  setTasks((t) => [...t, optimistic])  // optimistic
  setOpen(false)
  const real = await api.create({ title })
  setTasks((t) => t.map(x =>
    x.id === optimistic.id ? real : x
  ))
}`}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}
