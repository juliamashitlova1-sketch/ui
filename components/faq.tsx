import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const FAQS = [
  {
    q: "How is this different from v0, Bolt, or Lovable?",
    a: "Those tools take prompts or screenshots and generate single screens or full apps in one shot. PixelForge takes a video — meaning we have a temporal signal nobody else uses. We extract the state machine implied by the recording, so the output is interactive by construction. They do frames; we do flows.",
  },
  {
    q: "Why a recording instead of a Figma file?",
    a: "Figma describes static layouts. Recordings describe behavior. A 5-second video of you using a UI contains more information about how it should work than 50 Figma frames stitched together. And recordings are far easier to capture — you don't need a designer in the loop.",
  },
  {
    q: "What kind of recordings work best?",
    a: "5–90 second clips of a single user flow at consistent zoom, no overlays. We handle web apps best today. Native iOS / Android, internal tools, and Loom-style recordings are all on the roadmap.",
  },
  {
    q: "Will the generated code be production-ready?",
    a: "Our goal is yes — typed React, proper state management, accessible markup, Tailwind utility classes, and the loading / error / empty states the recording implies. You'll still want to wire up real APIs and review, but you should not be rewriting from scratch.",
  },
  {
    q: "What does Frame Reforge (Module A) do, then?",
    a: "It's the screenshot-to-page engine that powers Flow Capture under the hood. We expose it as a standalone module because sometimes you really do just need one screen, fast. It's table stakes — Flow Capture is the differentiator.",
  },
  {
    q: "When can I try it?",
    a: "Private beta starts Q2 2026. Sign up for the waitlist and we'll onboard the first 200 teams personally. Public launch follows.",
  },
]

export function Faq() {
  return (
    <section className="border-b border-border/60 bg-background">
      <div className="mx-auto max-w-3xl px-6 py-20 md:py-28">
        <div className="text-center">
          <p className="font-mono text-xs uppercase tracking-wider text-primary">
            FAQ
          </p>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
            The questions everyone asks
          </h2>
        </div>

        <Accordion
          type="single"
          collapsible
          className="mt-12 divide-y divide-border rounded-2xl border border-border bg-card/40"
        >
          {FAQS.map((f, i) => (
            <AccordionItem
              key={f.q}
              value={`item-${i}`}
              className="border-b-0 px-6"
            >
              <AccordionTrigger className="py-5 text-left text-base font-medium hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="pb-5 pr-6 text-sm leading-relaxed text-muted-foreground">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
