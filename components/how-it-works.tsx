"use client";

import { Upload, Brain, GitBranch, PlayCircle } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";

export function HowItWorks() {
  const { t } = useI18n();
  const STEPS = [
    {
      n: "01",
      icon: Upload,
      title: t.howItWorks.steps.drop.title,
      description: t.howItWorks.steps.drop.description,
      code: t.howItWorks.steps.drop.code,
    },
    {
      n: "02",
      icon: Brain,
      title: t.howItWorks.steps.extract.title,
      description: t.howItWorks.steps.extract.description,
      code: t.howItWorks.steps.extract.code,
    },
    {
      n: "03",
      icon: GitBranch,
      title: t.howItWorks.steps.edit.title,
      description: t.howItWorks.steps.edit.description,
      code: t.howItWorks.steps.edit.code,
    },
    {
      n: "04",
      icon: PlayCircle,
      title: t.howItWorks.steps.ship.title,
      description: t.howItWorks.steps.ship.description,
      code: t.howItWorks.steps.ship.code,
    },
  ];

  return (
    <section
      id="how-it-works"
      className="border-b border-border/60 bg-background"
    >
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs uppercase tracking-wider text-primary">
            {t.howItWorks.label}
          </p>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
            {t.howItWorks.heading}
          </h2>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.n}
                className="relative flex flex-col bg-card/60 p-7 transition-colors hover:bg-card"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-primary">{s.n}</span>
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 ring-1 ring-primary/30">
                    <Icon className="h-4 w-4 text-primary" aria-hidden="true" />
                  </div>
                </div>

                <h3 className="mt-6 text-base font-semibold tracking-tight">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {s.description}
                </p>

                <div className="mt-6 rounded-md border border-border bg-background/60 px-3 py-2 font-mono text-[11px] text-foreground/70">
                  {s.code}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
