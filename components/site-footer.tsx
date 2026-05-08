"use client";

import Link from "next/link";
import { Flame } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";

export function SiteFooter() {
  const { t } = useI18n();

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
              {t.footer.description}
            </p>
          </div>

          <FooterCol
            title={t.footer.product}
            items={[
              { label: t.footer.flowCapture, href: "#flow-capture" },
              { label: t.footer.howItWorks, href: "#how-it-works" },
              { label: t.footer.landscape, href: "#landscape" },
              { label: t.footer.prd, href: "/prd" },
            ]}
          />
          <FooterCol
            title={t.footer.company}
            items={[
              { label: t.footer.waitlist, href: "#waitlist" },
              { label: t.footer.changelog, href: "#" },
              { label: t.footer.contact, href: "mailto:hi@pixelforge.app" },
            ]}
          />
          <FooterCol
            title={t.footer.resources}
            items={[
              { label: t.footer.docs, href: "#" },
              { label: t.footer.blog, href: "#" },
              { label: t.footer.twitter, href: "#" },
            ]}
          />
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-2 border-t border-border pt-6 md:flex-row md:items-center">
          <p className="font-mono text-[11px] text-muted-foreground">
            {t.site.footer.replace("{year}", String(new Date().getFullYear()))}
          </p>
          <p className="font-mono text-[11px] text-muted-foreground">
            {t.site.version}
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  items,
}: {
  title: string;
  items: { label: string; href: string }[];
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
  );
}
