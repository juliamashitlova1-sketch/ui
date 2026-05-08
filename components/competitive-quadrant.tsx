"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

type Competitor = {
  id: string
  name: string
  // 0 = Static (single frame) → 100 = Dynamic (flows / interactions)
  x: number
  // 0 = Designer-focused → 100 = Developer-focused
  y: number
  note: string
  highlighted?: boolean
}

const COMPETITORS: Competitor[] = [
  { id: "figma-make", name: "Figma Make", x: 18, y: 22, note: "Figma → code, designer-first" },
  { id: "anima", name: "Anima", x: 14, y: 30, note: "Figma plugin, design handoff" },
  { id: "galileo", name: "Galileo", x: 10, y: 14, note: "Prompt → UI mocks" },
  { id: "uizard", name: "Uizard", x: 22, y: 12, note: "Sketch / wireframe → mock" },
  { id: "locofy", name: "Locofy", x: 32, y: 62, note: "Figma → React/Tailwind" },
  { id: "builder", name: "Builder.io", x: 36, y: 58, note: "Visual Copilot, headless CMS" },
  { id: "v0", name: "v0", x: 44, y: 78, note: "Prompt + screenshot → app" },
  { id: "bolt", name: "Bolt.new", x: 50, y: 80, note: "Full-stack from prompt" },
  { id: "lovable", name: "Lovable", x: 52, y: 76, note: "Full-stack from prompt" },
  { id: "same", name: "Same.dev", x: 56, y: 70, note: "Pixel-clone existing sites" },
  {
    id: "pixelforge",
    name: "PixelForge",
    x: 86,
    y: 84,
    note: "Recording → interactive prototype",
    highlighted: true,
  },
]

export function CompetitiveQuadrant() {
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <section id="landscape" className="border-b border-border/60 bg-background">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs uppercase tracking-wider text-primary">
            The landscape
          </p>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
            Where everyone else is fighting. And where we&apos;re not.
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            The static / developer-focused quadrant is a bloodbath. The
            dynamic / developer-focused quadrant is empty. That&apos;s where
            PixelForge lives.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_280px]">
          {/* Chart */}
          <div className="relative">
            <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-border bg-card/40">
              {/* grid bg */}
              <div className="absolute inset-0 grid-bg opacity-40" aria-hidden="true" />

              {/* axes (dashed center lines) */}
              <div
                className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 border-l border-dashed border-border"
                aria-hidden="true"
              />
              <div
                className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 border-t border-dashed border-border"
                aria-hidden="true"
              />

              {/* Empty quadrant glow (top-right = dynamic + developer) */}
              <div
                className="pointer-events-none absolute right-0 top-0 h-1/2 w-1/2 bg-[radial-gradient(ellipse_at_center,oklch(0.76_0.17_55_/_0.18),transparent_70%)]"
                aria-hidden="true"
              />

              {/* Quadrant labels */}
              <QuadrantLabel
                position="top-left"
                title="Static · Developer"
                note="Crowded · Locofy, Builder, v0, Bolt"
              />
              <QuadrantLabel
                position="top-right"
                title="Dynamic · Developer"
                note="Open territory"
                highlighted
              />
              <QuadrantLabel
                position="bottom-left"
                title="Static · Designer"
                note="Figma Make, Anima, Galileo"
              />
              <QuadrantLabel
                position="bottom-right"
                title="Dynamic · Designer"
                note="Mostly motion / prototyping tools"
              />

              {/* axis labels */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Static frame → Dynamic flow
              </div>
              <div className="absolute left-3 top-1/2 -translate-y-1/2 -rotate-90 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Designer → Developer
              </div>

              {/* Dots */}
              {COMPETITORS.map((c) => (
                <Dot
                  key={c.id}
                  competitor={c}
                  hovered={hovered === c.id}
                  onHover={(h) => setHovered(h ? c.id : null)}
                />
              ))}
            </div>
          </div>

          {/* Legend / details */}
          <div className="flex flex-col gap-3">
            <div className="rounded-xl border border-border bg-card/40 p-4">
              <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                Read the chart
              </p>
              <p className="mt-2 text-sm leading-relaxed text-foreground/80">
                X-axis: how much of the <span className="text-foreground">flow</span>{" "}
                the tool understands. Y-axis: who the output serves —
                designer (mocks) or developer (production code).
              </p>
            </div>

            <ul className="rounded-xl border border-border bg-card/40 p-2">
              {COMPETITORS.map((c) => (
                <li
                  key={c.id}
                  onMouseEnter={() => setHovered(c.id)}
                  onMouseLeave={() => setHovered(null)}
                  className={cn(
                    "flex items-start gap-3 rounded-lg px-3 py-2 transition-colors",
                    hovered === c.id ? "bg-muted/50" : "",
                    c.highlighted && "bg-primary/5",
                  )}
                >
                  <span
                    className={cn(
                      "mt-1.5 h-2 w-2 shrink-0 rounded-full",
                      c.highlighted ? "bg-primary ring-2 ring-primary/30" : "bg-muted-foreground/50",
                    )}
                    aria-hidden="true"
                  />
                  <div className="min-w-0 flex-1">
                    <p
                      className={cn(
                        "text-sm font-medium",
                        c.highlighted ? "text-primary" : "text-foreground/90",
                      )}
                    >
                      {c.name}
                    </p>
                    <p className="font-mono text-[10px] leading-snug text-muted-foreground">
                      {c.note}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

function QuadrantLabel({
  position,
  title,
  note,
  highlighted,
}: {
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right"
  title: string
  note: string
  highlighted?: boolean
}) {
  const positionClasses: Record<typeof position, string> = {
    "top-left": "top-4 left-4 text-left",
    "top-right": "top-4 right-4 text-right",
    "bottom-left": "bottom-10 left-4 text-left",
    "bottom-right": "bottom-10 right-4 text-right",
  }
  return (
    <div className={cn("absolute max-w-[42%]", positionClasses[position])}>
      <p
        className={cn(
          "font-mono text-[10px] uppercase tracking-widest",
          highlighted ? "text-primary" : "text-muted-foreground",
        )}
      >
        {title}
      </p>
      <p
        className={cn(
          "mt-1 text-[11px] leading-tight",
          highlighted ? "text-foreground/80" : "text-muted-foreground/70",
        )}
      >
        {note}
      </p>
    </div>
  )
}

function Dot({
  competitor,
  hovered,
  onHover,
}: {
  competitor: Competitor
  hovered: boolean
  onHover: (h: boolean) => void
}) {
  // y is flipped because CSS top grows downward
  const left = `${competitor.x}%`
  const top = `${100 - competitor.y}%`

  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left, top }}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
    >
      <div className="relative">
        {competitor.highlighted && (
          <span
            className="absolute inset-0 -m-2 animate-ping rounded-full bg-primary/40"
            aria-hidden="true"
          />
        )}
        <div
          className={cn(
            "relative h-3 w-3 rounded-full ring-2 transition-all",
            competitor.highlighted
              ? "bg-primary ring-primary/30"
              : "bg-foreground/60 ring-background",
            hovered && !competitor.highlighted && "scale-125 bg-foreground",
            hovered && competitor.highlighted && "scale-125",
          )}
        />
        <span
          className={cn(
            "absolute left-4 top-1/2 -translate-y-1/2 whitespace-nowrap font-mono text-[10px] transition-opacity",
            competitor.highlighted ? "text-primary" : "text-foreground/70",
            hovered ? "opacity-100" : "opacity-90",
          )}
        >
          {competitor.name}
        </span>
      </div>
    </div>
  )
}
