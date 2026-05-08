import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { SiteNav } from "@/components/site-nav"
import { SiteFooter } from "@/components/site-footer"
import { PrdContent } from "@/components/prd-content"

export const metadata = {
  title: "PixelForge PRD v2 — Flow Capture First",
  description:
    "Rewritten PRD outline. Module C (Flow Capture) is the wedge. Modules A & B support.",
}

export default function PrdPage() {
  return (
    <main className="min-h-svh bg-background">
      <SiteNav />

      <section className="border-b border-border/60">
        <div className="mx-auto max-w-3xl px-6 pt-16 pb-10 md:pt-20">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-3 w-3" />
            Back to landing
          </Link>

          <p className="mt-8 font-mono text-xs uppercase tracking-wider text-primary">
            PRD v2 · Internal · Draft
          </p>
          <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight md:text-5xl">
            PixelForge — Flow Capture First
          </h1>
          <p className="mt-5 text-pretty leading-relaxed text-muted-foreground">
            A re-prioritized PRD outline. The original v1 led with Module A
            (screenshot-to-code), which lands us in a red ocean against v0,
            Locofy, Same.dev, and Builder.io. v2 leads with Module C (Flow
            Capture / recording-to-prototype) — the only quadrant in the
            landscape that is currently empty.
          </p>
        </div>
      </section>

      <PrdContent />

      <SiteFooter />
    </main>
  )
}
