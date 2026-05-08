import { Separator } from "@/components/ui/separator"

type Section = {
  num: string
  title: string
  body: React.ReactNode
}

const SECTIONS: Section[] = [
  {
    num: "1",
    title: "Vision & positioning",
    body: (
      <>
        <p>
          PixelForge is the first design-to-code tool that takes{" "}
          <strong className="text-foreground">screen recordings</strong> as
          input and produces{" "}
          <strong className="text-foreground">interactive, production-grade React prototypes</strong>{" "}
          as output. Where the rest of the market converts frames, we convert
          flows.
        </p>
        <p className="mt-3">
          One-line pitch:{" "}
          <em className="text-foreground/90">
            &ldquo;Record once. Ship the prototype.&rdquo;
          </em>
        </p>
      </>
    ),
  },
  {
    num: "2",
    title: "Why the strategy changed (v1 → v2)",
    body: (
      <>
        <ul className="space-y-2">
          <li>
            <strong className="text-foreground">v1 priority order:</strong> A (screenshot→code) → B (idea→9up) → C (recording→interactive).
          </li>
          <li>
            <strong className="text-foreground">v2 priority order:</strong> C → A → B.
          </li>
        </ul>
        <p className="mt-4">Reasons:</p>
        <ul className="mt-2 space-y-2 list-disc pl-5">
          <li>
            Module A is a red ocean. v0, Locofy, Same.dev, Builder.io,
            Figma Make all credibly do screenshot-to-code today. A 5–10%
            fidelity edge is invisible to users.
          </li>
          <li>
            Module C is a blue ocean. No production tool turns recordings
            into working prototypes. The IWR-Bench academic work hints at
            feasibility but no one has shipped.
          </li>
          <li>
            Recordings carry temporal information that frames don&apos;t.
            That&apos;s a structural moat, not a model-quality moat.
          </li>
          <li>
            &ldquo;Watch the demo&rdquo; sells itself on Twitter / Product
            Hunt. Static design-to-code demos no longer turn heads.
          </li>
        </ul>
      </>
    ),
  },
  {
    num: "3",
    title: "Target users (in order of priority)",
    body: (
      <ol className="space-y-3 list-decimal pl-5">
        <li>
          <strong className="text-foreground">Frontend engineers at startups (P0):</strong>{" "}
          They build interactive UIs daily, hate writing state-machine
          boilerplate, and pay for tools that save hours.
        </li>
        <li>
          <strong className="text-foreground">Solo / indie devs &amp; founders (P0):</strong>{" "}
          Need to ship working prototypes for users, investors, and design
          partners — fast.
        </li>
        <li>
          <strong className="text-foreground">Product designers who code (P1):</strong>{" "}
          They want their interactive ideas to translate to working code
          without a developer round-trip.
        </li>
        <li>
          <strong className="text-foreground">Internal tools / ops teams (P2):</strong>{" "}
          Recording-to-prototype is a perfect fit for &ldquo;automate this
          spreadsheet workflow&rdquo; use cases.
        </li>
      </ol>
    ),
  },
  {
    num: "4",
    title: "Module C · Flow Capture (headliner)",
    body: (
      <>
        <p>
          The wedge product. Everything else exists to support this.
        </p>
        <h4 className="mt-5 font-mono text-xs uppercase tracking-wider text-primary">
          C-1 · Recording ingestion
        </h4>
        <ul className="mt-2 space-y-1.5 list-disc pl-5">
          <li>Accepts MP4, MOV, WebM up to 90s / 100MB</li>
          <li>Loom URL / Tella URL ingestion</li>
          <li>Auto frame extraction at adaptive sample rate (more on transitions)</li>
          <li>Cursor &amp; click overlay detection</li>
        </ul>

        <h4 className="mt-5 font-mono text-xs uppercase tracking-wider text-primary">
          C-2 · Flow extraction pipeline
        </h4>
        <ul className="mt-2 space-y-1.5 list-disc pl-5">
          <li>
            <strong className="text-foreground">State segmentation:</strong>{" "}
            visual model clusters frames into discrete UI states
          </li>
          <li>
            <strong className="text-foreground">Transition labeling:</strong>{" "}
            reasoning model labels intents (click, type, drag, async-load,
            error)
          </li>
          <li>
            <strong className="text-foreground">Timing &amp; easing:</strong>{" "}
            extract animation duration / easing from frame deltas
          </li>
          <li>
            <strong className="text-foreground">Async detection:</strong>{" "}
            spinners, skeletons, debounced inputs → flagged as effects
          </li>
          <li>
            Output: typed JSON state machine (states, events, effects,
            transitions)
          </li>
        </ul>

        <h4 className="mt-5 font-mono text-xs uppercase tracking-wider text-primary">
          C-3 · Editable timeline (the differentiator UI)
        </h4>
        <ul className="mt-2 space-y-1.5 list-disc pl-5">
          <li>Horizontal timeline of detected states with thumbnails</li>
          <li>Inline edit: rename state, merge, split, branch, delete</li>
          <li>Add states the model missed (drop a screenshot in)</li>
          <li>Per-state regenerate (don&apos;t blow up the whole app)</li>
          <li>Side-by-side: timeline ↔ generated React preview</li>
        </ul>

        <h4 className="mt-5 font-mono text-xs uppercase tracking-wider text-primary">
          C-4 · Code generation
        </h4>
        <ul className="mt-2 space-y-1.5 list-disc pl-5">
          <li>
            React + TypeScript + Tailwind + shadcn/ui by default; pluggable targets
          </li>
          <li>State management: useState / useReducer / XState (auto-pick)</li>
          <li>Optimistic updates, loading / error / empty states preserved</li>
          <li>API stubs for inferred async boundaries (typed, MSW-ready)</li>
          <li>One-click deploy to Vercel preview</li>
        </ul>
      </>
    ),
  },
  {
    num: "5",
    title: "Module A · Frame Reforge (foundation)",
    body: (
      <>
        <p>
          Standalone screenshot/Figma → page tool, but primarily the engine
          underneath Flow Capture. A high-fidelity single-frame generator
          isn&apos;t the differentiator any more — it&apos;s table stakes.
        </p>
        <ul className="mt-3 space-y-1.5 list-disc pl-5">
          <li>Screenshot or Figma frame in</li>
          <li>Component-aware extraction (re-use detected primitives)</li>
          <li>Playwright pixel-diff verification loop (target ≥ 95%)</li>
          <li>Tailwind / shadcn output, optional inline-CSS / vanilla</li>
        </ul>
      </>
    ),
  },
  {
    num: "6",
    title: "Module B · Idea Foundry (top of funnel)",
    body: (
      <>
        <p>
          Free-tier acquisition tool. Keyword / mood input → 9 visual
          directions → hand-off to Frame Reforge or Flow Capture.
        </p>
        <ul className="mt-3 space-y-1.5 list-disc pl-5">
          <li>9-grid style explorations, sharable URL</li>
          <li>Brand color / mood / industry inputs</li>
          <li>One-click hand-off to A or C modules</li>
          <li>Public gallery for SEO &amp; community discovery</li>
        </ul>
      </>
    ),
  },
  {
    num: "7",
    title: "Out of scope (v2 launch)",
    body: (
      <ul className="space-y-1.5 list-disc pl-5">
        <li>Native iOS / Android recording support</li>
        <li>Multi-user collaborative editing on the timeline</li>
        <li>Backend / database codegen (front-end only at launch)</li>
        <li>Self-hosted / on-prem deployments</li>
        <li>VS Code extension (post-launch)</li>
      </ul>
    ),
  },
  {
    num: "8",
    title: "Success metrics",
    body: (
      <>
        <h4 className="font-mono text-xs uppercase tracking-wider text-primary">
          North-star metric
        </h4>
        <p className="mt-2">
          % of recordings that produce a prototype the user keeps editing
          beyond 60 seconds (proxy for &ldquo;output is good enough to be useful&rdquo;).
        </p>

        <h4 className="mt-5 font-mono text-xs uppercase tracking-wider text-primary">
          Activation
        </h4>
        <ul className="mt-2 space-y-1.5 list-disc pl-5">
          <li>≥ 60% of waitlist signups complete first recording-to-app run</li>
          <li>Median time-to-first-prototype ≤ 3 min from upload</li>
        </ul>

        <h4 className="mt-5 font-mono text-xs uppercase tracking-wider text-primary">
          Retention
        </h4>
        <ul className="mt-2 space-y-1.5 list-disc pl-5">
          <li>W2 retention ≥ 35% on paid tier</li>
          <li>≥ 40% of paid users do ≥ 5 recordings / month</li>
        </ul>

        <h4 className="mt-5 font-mono text-xs uppercase tracking-wider text-primary">
          Quality
        </h4>
        <ul className="mt-2 space-y-1.5 list-disc pl-5">
          <li>≥ 80% of detected states correct without manual edits</li>
          <li>≥ 90% of generated apps run without runtime errors</li>
        </ul>
      </>
    ),
  },
  {
    num: "9",
    title: "Roadmap",
    body: (
      <ol className="space-y-3 list-decimal pl-5">
        <li>
          <strong className="text-foreground">M1 (Q2):</strong> Private beta — Module C end-to-end with editable timeline; web-only flows; 200 hand-picked teams.
        </li>
        <li>
          <strong className="text-foreground">M2 (Q3):</strong> Public launch — pricing, gallery, Vercel deploy, Module A as standalone surface.
        </li>
        <li>
          <strong className="text-foreground">M3 (Q4):</strong> Module B (Idea Foundry) free tier; Loom integration; teams plan.
        </li>
        <li>
          <strong className="text-foreground">M4 (next year):</strong> Native mobile recordings, VS Code extension, MSW + Storybook export.
        </li>
      </ol>
    ),
  },
  {
    num: "10",
    title: "Risks &amp; mitigations",
    body: (
      <ul className="space-y-3 list-disc pl-5">
        <li>
          <strong className="text-foreground">v0 / Bolt copy us within 6 months.</strong>{" "}
          Mitigation: build the editable-timeline UX moat &amp; a recording-quality
          pipeline that&apos;s hard to replicate without our data flywheel.
        </li>
        <li>
          <strong className="text-foreground">Output quality plateaus below &ldquo;production-ready&rdquo;.</strong>{" "}
          Mitigation: ship as &ldquo;prototype scaffold&rdquo;, not &ldquo;finished app&rdquo;; tight integration with Cursor / v0 for last-mile editing.
        </li>
        <li>
          <strong className="text-foreground">Inference cost too high.</strong>{" "}
          Mitigation: cache state segmentation, use small models for trivial
          transitions, gate heavy reasoning behind paid tier.
        </li>
        <li>
          <strong className="text-foreground">Designers don&apos;t care.</strong>{" "}
          Mitigation: that&apos;s fine — frontend engineers are the P0 audience.
          Designer flow is a P2 follow-up.
        </li>
      </ul>
    ),
  },
]

export function PrdContent() {
  return (
    <article className="border-b border-border/60 bg-background">
      <div className="mx-auto max-w-3xl px-6 py-16 md:py-20">
        <div className="space-y-12">
          {SECTIONS.map((s, i) => (
            <section key={s.num}>
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-xs text-primary">
                  {s.num.padStart(2, "0")}
                </span>
                <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                  {s.title}
                </h2>
              </div>
              <div className="mt-5 leading-relaxed text-muted-foreground">
                {s.body}
              </div>
              {i < SECTIONS.length - 1 && (
                <Separator className="mt-12 bg-border/60" />
              )}
            </section>
          ))}
        </div>
      </div>
    </article>
  )
}
