"use client";

import Link from "next/link";
import { Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n/context";
import { LanguageSwitcher } from "@/components/language-switcher";

export function SiteNav() {
  const { t } = useI18n();

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/15 ring-1 ring-primary/30">
            <Flame className="h-4 w-4 text-primary" aria-hidden="true" />
          </div>
          <span className="font-mono text-sm font-semibold tracking-tight">
            PixelForge
          </span>
          <span className="ml-2 rounded-full border border-border bg-muted/40 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            {t.nav.beta}
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="#flow-capture"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            {t.nav.flowCapture}
          </Link>
          <Link
            href="#how-it-works"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            {t.nav.howItWorks}
          </Link>
          <Link
            href="#landscape"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            {t.nav.landscape}
          </Link>
          <Link
            href="/prd"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            PRD
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <Link
            href="#waitlist"
            className="hidden text-sm text-muted-foreground transition-colors hover:text-foreground sm:inline"
          >
            {t.nav.signIn}
          </Link>
          <Button asChild size="sm" className="font-medium">
            <Link href="#waitlist">{t.nav.joinWaitlist}</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
