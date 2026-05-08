"use client";

import { useState } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useI18n } from "@/lib/i18n/context";

export function WaitlistCta() {
  const { t } = useI18n();

  const [email, setEmail] = useState("");
  const [role, setRole] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const roles = t.waitlist.roles as readonly string[];

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || loading) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, role }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setSubmitted(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to join. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      id="waitlist"
      className="relative overflow-hidden border-b border-border/60 bg-background"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,oklch(0.76_0.17_55_/_0.12),transparent_60%)]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-3xl px-6 py-24 md:py-32">
        <div className="text-center">
          <p className="font-mono text-xs uppercase tracking-wider text-primary">
            {t.waitlist.badge}
          </p>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight md:text-5xl">
            {t.waitlist.heading}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty leading-relaxed text-muted-foreground">
            {t.waitlist.description}
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-xl">
          {submitted ? (
            <div className="flex items-center justify-center gap-3 rounded-xl border border-primary/40 bg-primary/5 px-6 py-5 text-sm text-foreground">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/20 ring-1 ring-primary/40">
                <Check className="h-4 w-4 text-primary" aria-hidden="true" />
              </span>
              <span>
                {t.waitlist.success}{" "}
                <span className="text-muted-foreground">
                  {t.waitlist.successNote}
                </span>
              </span>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-3">
              <div className="flex flex-col gap-2 sm:flex-row">
                <Input
                  type="email"
                  required
                  placeholder={t.waitlist.emailPlaceholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-label="Email address"
                  className="h-12 flex-1 border-border bg-card/40 text-base placeholder:text-muted-foreground/60 focus-visible:border-primary"
                />
                <Button
                  type="submit"
                  size="lg"
                  className="group h-12 gap-2 px-6"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      {t.waitlist.joining}
                    </>
                  ) : (
                    <>
                      {t.waitlist.cta}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </>
                  )}
                </Button>
              </div>

              {error && <p className="text-sm text-destructive">{error}</p>}

              <fieldset>
                <legend className="sr-only">Your role</legend>
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                    {t.waitlist.roleLabel}
                  </span>
                  {roles.map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setRole(r)}
                      className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                        role === r
                          ? "border-primary/50 bg-primary/10 text-primary"
                          : "border-border bg-card/40 text-muted-foreground hover:border-border/80 hover:text-foreground"
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </fieldset>
            </form>
          )}
        </div>

        <div className="mx-auto mt-10 flex max-w-xl flex-wrap items-center justify-center gap-x-6 gap-y-2 font-mono text-[11px] text-muted-foreground">
          <span>{t.waitlist.noSpam}</span>
          <span className="text-border">•</span>
          <span>{t.waitlist.unsubscribe}</span>
          <span className="text-border">•</span>
          <span>{t.waitlist.lifetimePricing}</span>
        </div>
      </div>
    </section>
  );
}
