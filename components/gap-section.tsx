"use client";

import { X, Check } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";

export function GapSection() {
  const { t } = useI18n();
  return (
    <section className="border-b border-border/60 bg-background">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs uppercase tracking-wider text-primary">
            {t.gap.label}
          </p>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
            {t.gap.heading}
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            {t.gap.description}
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-4xl gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-border bg-card/40 p-6">
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-destructive/15 ring-1 ring-destructive/30">
                <X className="h-4 w-4 text-destructive" aria-hidden="true" />
              </div>
              <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                {t.gap.staticLabel}
              </span>
            </div>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <span className="text-destructive/70">—</span>
                {t.gap.staticItems[0]}
              </li>
              <li className="flex gap-2">
                <span className="text-destructive/70">—</span>
                {t.gap.staticItems[1]}
              </li>
              <li className="flex gap-2">
                <span className="text-destructive/70">—</span>
                {t.gap.staticItems[2]}
              </li>
              <li className="flex gap-2">
                <span className="text-destructive/70">—</span>
                {t.gap.staticItems[3]}
              </li>
            </ul>
          </div>

          <div className="rounded-xl border border-primary/40 bg-gradient-to-b from-primary/5 to-transparent p-6 ring-1 ring-primary/20">
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/15 ring-1 ring-primary/40">
                <Check className="h-4 w-4 text-primary" aria-hidden="true" />
              </div>
              <span className="font-mono text-xs uppercase tracking-wider text-primary">
                {t.gap.pixelforgeLabel}
              </span>
            </div>
            <ul className="space-y-2.5 text-sm text-foreground/90">
              <li className="flex gap-2">
                <span className="text-primary">+</span>
                {t.gap.pixelforgeItems[0]}
              </li>
              <li className="flex gap-2">
                <span className="text-primary">+</span>
                {t.gap.pixelforgeItems[1]}
              </li>
              <li className="flex gap-2">
                <span className="text-primary">+</span>
                {t.gap.pixelforgeItems[2]}
              </li>
              <li className="flex gap-2">
                <span className="text-primary">+</span>
                {t.gap.pixelforgeItems[3]}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
