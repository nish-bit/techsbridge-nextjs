"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { testimonials } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const go = (dir: 1 | -1) => {
    setDirection(dir);
    setIndex((prev) => (prev + dir + testimonials.length) % testimonials.length);
  };

  const current = testimonials[index];

  return (
    <section id="testimonials" className="py-[118px]">
      <Container>
        <SectionHeading eyebrow="Testimonials" title="What clients say" />
        <div className="mx-auto flex max-w-2xl items-center gap-4">
          <button
            onClick={() => go(-1)}
            aria-label="Previous testimonial"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[var(--border)] text-[var(--text-2)] transition-colors hover:border-[var(--blue-2)] hover:text-[var(--text-1)]"
          >
            <ChevronLeft size={18} />
          </button>

          <div className="glass-card relative min-h-[220px] flex-1 overflow-hidden px-8 py-10 text-center">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={index}
                custom={direction}
                initial={{ opacity: 0, x: 24 * direction }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 * direction }}
                transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
              >
                <div className="mb-4 flex justify-center gap-1 text-[var(--blue-2)]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" strokeWidth={0} />
                  ))}
                </div>
                <p className="text-[1.05rem] leading-relaxed text-[var(--text-1)]">
                  &ldquo;{current.quote}&rdquo;
                </p>
                <div className="mt-5 text-sm text-[var(--text-3)]">
                  {current.name} — {current.role}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            onClick={() => go(1)}
            aria-label="Next testimonial"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[var(--border)] text-[var(--text-2)] transition-colors hover:border-[var(--blue-2)] hover:text-[var(--text-1)]"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        <div className="mt-6 flex justify-center gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to testimonial ${i + 1}`}
              onClick={() => {
                setDirection(i > index ? 1 : -1);
                setIndex(i);
              }}
              className={cn(
                "h-2 w-2 rounded-full transition-all",
                i === index ? "w-6 bg-[var(--blue-2)]" : "bg-[var(--border)]"
              )}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
