"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { faqs } from "@/lib/data";
import { cn } from "@/lib/utils";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-[var(--bg-soft)] py-[118px]">
      <Container>
        <SectionHeading eyebrow="FAQ" title="Common questions" />
        <Reveal className="mx-auto max-w-2xl divide-y divide-[var(--border)] rounded-[22px] border border-[var(--border)] bg-[var(--surface-3)]">
          {faqs.map((faq, i) => {
            const open = openIndex === i;
            return (
              <div key={faq.q}>
                <button
                  onClick={() => setOpenIndex(open ? null : i)}
                  aria-expanded={open}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="font-heading text-[15px] font-medium text-[var(--text-1)]">
                    {faq.q}
                  </span>
                  <Plus
                    size={18}
                    className={cn(
                      "shrink-0 text-[var(--blue-2)] transition-transform duration-300",
                      open && "rotate-45"
                    )}
                  />
                </button>
                <div
                  className={cn(
                    "grid overflow-hidden transition-all duration-300 ease-out",
                    open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  )}
                >
                  <div className="overflow-hidden px-6">
                    <p className="pb-5 text-sm leading-relaxed text-[var(--text-2)]">{faq.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </Reveal>
      </Container>
    </section>
  );
}
