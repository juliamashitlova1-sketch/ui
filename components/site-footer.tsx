import Link from "next/link"
import { Flame } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="bg-background">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-[1fr_auto_auto_auto]">
          <div className="max-w-sm">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/15 ring-1 ring-primary/30">
                <Flame className="h-4 w-4 text-primary" aria-hidden="true" />
              </div>
              <span className="font-mono text-sm font-semibold tracking-tight">
                PixelForge
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Recording → interactive prototype. The first design-to-code tool
              that understands flows, not just frames.
            </p>
          </div>

          <FooterCol
            title="Product"
            items={[
              { label: "Flow Capture", href: "#flow-capture" },
              { label: "How it works", href: "#how-it-works" },
              { label: "Landscape", href: "#landscape" },
              { label: "PRD", href: "/prd" },
            ]}
          />
          <FooterCol
            title="Company"
            items={[
              { label: "Waitlist", href: "#waitlist" },
              { label: "Changelog", href: "#" },
              { label: "Contact", href: "mailto:hi@pixelforge.app" },
            ]}
          />
          <FooterCol
            title="Resources"
            items={[
              { label: "Docs", href: "#" },
              { label: "Blog", href: "#" },
              { label: "Twitter / X", href: "#" },
            ]}
          />
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-2 border-t border-border pt-6 md:flex-row md:items-center">
          <p className="font-mono text-[11px] text-muted-foreground">
            © {new Date().getFullYear()} PixelForge. Built for people who ship.
          </p>
          <p className="font-mono text-[11px] text-muted-foreground">
            v0.1 · landing for early-access funnel
          </p>
        </div>
      </div>
    </footer>
  )
}

function FooterCol({
  title,
  items,
}: {
  title: string
  items: { label: string; href: string }[]
}) {
  return (
    <div>
      <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
        {title}
      </p>
      <ul className="mt-4 space-y-2">
        {items.map((it) => (
          <li key={it.label}>
            <Link
              href={it.href}
              className="text-sm text-foreground/80 transition-colors hover:text-foreground"
            >
              {it.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
