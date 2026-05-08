"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useI18n } from "@/lib/i18n/context";

export function Faq() {
  const { t } = useI18n();
  const FAQS = t.faq.items;

  return (
    <section className="border-b border-border/60 bg-background">
      <div className="mx-auto max-w-3xl px-6 py-20 md:py-28">
        <div className="text-center">
          <p className="font-mono text-xs uppercase tracking-wider text-primary">
            {t.faq.label}
          </p>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
            {t.faq.heading}
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
  );
}
