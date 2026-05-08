"use client";
import { Video, Camera, Sparkles, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n/context";

type ModuleData = {
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  icon: typeof Video | typeof Camera | typeof Sparkles;
  primary: boolean;
  bullets: string[];
  learnMore?: string;
};

export function ModuleShowcase() {
  const { t } = useI18n();

  const MODULES: ModuleData[] = [
    {
      badge: t.modules.items.flowCapture.badge,
      title: t.modules.items.flowCapture.title,
      subtitle: t.modules.items.flowCapture.subtitle,
      description: t.modules.items.flowCapture.description,
      icon: Video,
      primary: true,
      bullets: t.modules.items.flowCapture.bullets,
      learnMore: t.modules.items.flowCapture.learnMore,
    },
    {
      badge: t.modules.items.frameReforge.badge,
      title: t.modules.items.frameReforge.title,
      subtitle: t.modules.items.frameReforge.subtitle,
      description: t.modules.items.frameReforge.description,
      icon: Camera,
      primary: false,
      bullets: t.modules.items.frameReforge.bullets,
    },
    {
      badge: t.modules.items.ideaFoundry.badge,
      title: t.modules.items.ideaFoundry.title,
      subtitle: t.modules.items.ideaFoundry.subtitle,
      description: t.modules.items.ideaFoundry.description,
      icon: Sparkles,
      primary: false,
      bullets: t.modules.items.ideaFoundry.bullets,
    },
  ];

  return (
    <section
      id="flow-capture"
      className="border-b border-border/60 bg-background"
    >
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs uppercase tracking-wider text-primary">
            {t.modules.label}
          </p>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
            {t.modules.heading}
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            {t.modules.description}
          </p>
        </div>

        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          {MODULES.map((m) => (
            <ModuleCard key={m.title} module={m} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ModuleCard({ module: m }: { module: ModuleData }) {
  const Icon = m.icon;
  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border p-7 transition-colors",
        m.primary
          ? "border-primary/40 bg-gradient-to-b from-primary/5 to-card/40 ring-1 ring-primary/20 lg:row-span-1"
          : "border-border bg-card/40 hover:border-border/80",
      )}
    >
      {m.primary && (
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-[radial-gradient(ellipse_at_top,oklch(0.76_0.17_55_/_0.18),transparent_70%)]"
          aria-hidden="true"
        />
      )}
      <div className="relative flex items-center justify-between">
        <span
          className={cn(
            "font-mono text-[10px] uppercase tracking-widest",
            m.primary ? "text-primary" : "text-muted-foreground",
          )}
        >
          {m.badge}
        </span>
        <div
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-lg",
            m.primary
              ? "bg-primary/15 ring-1 ring-primary/40"
              : "bg-muted/40 ring-1 ring-border",
          )}
        >
          <Icon
            className={cn(
              "h-4 w-4",
              m.primary ? "text-primary" : "text-muted-foreground",
            )}
            aria-hidden="true"
          />
        </div>
      </div>

      <h3 className="relative mt-6 text-xl font-semibold tracking-tight">
        {m.title}
      </h3>
      <p
        className={cn(
          "relative mt-1 font-mono text-xs",
          m.primary ? "text-primary/90" : "text-muted-foreground",
        )}
      >
        {m.subtitle}
      </p>
      <p className="relative mt-4 text-sm leading-relaxed text-muted-foreground">
        {m.description}
      </p>

      <ul className="relative mt-6 space-y-2">
        {m.bullets.map((b) => (
          <li
            key={b}
            className="flex items-start gap-2 text-sm text-foreground/80"
          >
            <span
              className={cn(
                "mt-1.5 h-1 w-1 rounded-full",
                m.primary ? "bg-primary" : "bg-muted-foreground/60",
              )}
              aria-hidden="true"
            />
            {b}
          </li>
        ))}
      </ul>

      {m.primary && m.learnMore && (
        <div className="relative mt-7 flex items-center gap-1.5 font-mono text-xs text-primary">
          {m.learnMore}
          <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      )}
    </article>
  );
}
