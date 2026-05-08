import { SiteNav } from "@/components/site-nav"
import { Hero } from "@/components/hero"
import { GapSection } from "@/components/gap-section"
import { ModuleShowcase } from "@/components/module-showcase"
import { HowItWorks } from "@/components/how-it-works"
import { CompetitiveQuadrant } from "@/components/competitive-quadrant"
import { ComparisonTable } from "@/components/comparison-table"
import { WaitlistCta } from "@/components/waitlist-cta"
import { Faq } from "@/components/faq"
import { SiteFooter } from "@/components/site-footer"

export default function Page() {
  return (
    <main className="min-h-svh bg-background">
      <SiteNav />
      <Hero />
      <GapSection />
      <ModuleShowcase />
      <HowItWorks />
      <CompetitiveQuadrant />
      <ComparisonTable />
      <WaitlistCta />
      <Faq />
      <SiteFooter />
    </main>
  )
}
