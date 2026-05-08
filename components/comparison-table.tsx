import { Check, Minus } from "lucide-react"
import { cn } from "@/lib/utils"

const TOOLS = ["v0", "Locofy", "Same.dev", "Figma Make", "PixelForge"] as const

const ROWS: { label: string; values: Record<(typeof TOOLS)[number], "yes" | "partial" | "no"> }[] = [
  {
    label: "Screenshot → static page",
    values: { v0: "yes", Locofy: "yes", "Same.dev": "yes", "Figma Make": "yes", PixelForge: "yes" },
  },
  {
    label: "Production React + Tailwind",
    values: { v0: "yes", Locofy: "yes", "Same.dev": "yes", "Figma Make": "partial", PixelForge: "yes" },
  },
  {
    label: "Recording → multi-state UI",
    values: { v0: "no", Locofy: "no", "Same.dev": "no", "Figma Make": "no", PixelForge: "yes" },
  },
  {
    label: "Inferred state machine",
    values: { v0: "no", Locofy: "no", "Same.dev": "no", "Figma Make": "no", PixelForge: "yes" },
  },
  {
    label: "Editable transition timeline",
    values: { v0: "no", Locofy: "no", "Same.dev": "no", "Figma Make": "no", PixelForge: "yes" },
  },
  {
    label: "Optimistic / async states preserved",
    values: { v0: "partial", Locofy: "no", "Same.dev": "no", "Figma Make": "no", PixelForge: "yes" },
  },
  {
    label: "Per-state regenerate",
    values: { v0: "no", Locofy: "no", "Same.dev": "no", "Figma Make": "no", PixelForge: "yes" },
  },
]

export function ComparisonTable() {
  return (
    <section className="border-b border-border/60 bg-background">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs uppercase tracking-wider text-primary">
            Head to head
          </p>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
            What no other tool does today
          </h2>
        </div>

        <div className="mt-12 overflow-hidden rounded-2xl border border-border bg-card/40">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th
                    scope="col"
                    className="px-6 py-4 text-left font-mono text-[11px] uppercase tracking-widest text-muted-foreground"
                  >
                    Capability
                  </th>
                  {TOOLS.map((t) => (
                    <th
                      key={t}
                      scope="col"
                      className={cn(
                        "px-4 py-4 text-center font-mono text-[11px] uppercase tracking-widest",
                        t === "PixelForge"
                          ? "text-primary"
                          : "text-muted-foreground",
                      )}
                    >
                      {t}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row, i) => (
                  <tr
                    key={row.label}
                    className={cn(
                      "border-b border-border/60 last:border-0",
                      i % 2 === 1 && "bg-muted/10",
                    )}
                  >
                    <td className="px-6 py-4 text-foreground/90">{row.label}</td>
                    {TOOLS.map((t) => (
                      <td
                        key={t}
                        className={cn(
                          "px-4 py-4 text-center",
                          t === "PixelForge" && "bg-primary/5",
                        )}
                      >
                        <Mark v={row.values[t]} highlighted={t === "PixelForge"} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}

function Mark({
  v,
  highlighted,
}: {
  v: "yes" | "partial" | "no"
  highlighted: boolean
}) {
  if (v === "yes") {
    return (
      <span
        className={cn(
          "inline-flex h-6 w-6 items-center justify-center rounded-full",
          highlighted
            ? "bg-primary/20 ring-1 ring-primary/40"
            : "bg-muted/50 ring-1 ring-border",
        )}
        aria-label="Yes"
      >
        <Check
          className={cn(
            "h-3.5 w-3.5",
            highlighted ? "text-primary" : "text-foreground/70",
          )}
        />
      </span>
    )
  }
  if (v === "partial") {
    return (
      <span
        className="inline-flex items-center justify-center font-mono text-[10px] text-muted-foreground"
        aria-label="Partial"
      >
        ~
      </span>
    )
  }
  return (
    <span
      className="inline-flex h-6 w-6 items-center justify-center text-muted-foreground/40"
      aria-label="No"
    >
      <Minus className="h-3.5 w-3.5" />
    </span>
  )
}
