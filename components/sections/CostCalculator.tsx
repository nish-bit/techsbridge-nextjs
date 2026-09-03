"use client";

import { useMemo, useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { calculatorProjectTypes, calculatorFeatures } from "@/lib/data";

function formatINR(n: number) {
  return "₹" + n.toLocaleString("en-IN");
}

export function CostCalculator() {
  const [typeIndex, setTypeIndex] = useState(0);
  const [selectedFeatures, setSelectedFeatures] = useState<Set<string>>(new Set());

  const toggleFeature = (label: string) => {
    setSelectedFeatures((prev) => {
      const next = new Set(prev);
      if (next.has(label)) next.delete(label);
      else next.add(label);
      return next;
    });
  };

  const { low, high } = useMemo(() => {
    const base = calculatorProjectTypes[typeIndex].base;
    const extra = calculatorFeatures
      .filter((f) => selectedFeatures.has(f.label))
      .reduce((sum, f) => sum + f.cost, 0);
    const lowVal = base + extra;
    const highVal = Math.round(((base + extra) * 1.35) / 500) * 500;
    return { low: lowVal, high: highVal };
  }, [typeIndex, selectedFeatures]);

  return (
    <section id="estimate" className="bg-[var(--bg-soft)] py-[118px]">
      <Container>
        <SectionHeading
          eyebrow="Cost Estimator"
          title="Get a rough estimate in seconds"
          description="Pick a project type and the features you need to see a ballpark range instantly. The contact form gets you an exact quote."
        />
        <div className="glass-card grid gap-8 p-7 md:p-9 lg:grid-cols-[1.3fr_1fr]">
          <div className="space-y-8">
            <div>
              <h4 className="mb-3.5 font-heading text-sm font-semibold text-[var(--text-1)]">
                1. Project type
              </h4>
              <div className="flex flex-wrap gap-2.5">
                {calculatorProjectTypes.map((type, i) => (
                  <button
                    key={type.label}
                    type="button"
                    onClick={() => setTypeIndex(i)}
                    className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                      i === typeIndex
                        ? "border-transparent bg-gradient-to-r from-[var(--blue-1)] to-[var(--blue-2)] text-white"
                        : "border-[var(--border)] text-[var(--text-2)] hover:border-[var(--blue-2)]"
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="mb-3.5 font-heading text-sm font-semibold text-[var(--text-1)]">
                2. Add features
              </h4>
              <div className="grid gap-2.5 sm:grid-cols-2">
                {calculatorFeatures.map((f) => (
                  <label
                    key={f.label}
                    className="flex cursor-pointer items-center justify-between gap-2 rounded-xl border border-[var(--border)] px-3.5 py-3 text-sm text-[var(--text-2)] transition-colors has-[:checked]:border-[var(--blue-2)] has-[:checked]:text-[var(--text-1)]"
                  >
                    <span className="flex items-center gap-2.5">
                      <input
                        type="checkbox"
                        checked={selectedFeatures.has(f.label)}
                        onChange={() => toggleFeature(f.label)}
                        className="h-4 w-4 accent-[var(--blue-2)]"
                      />
                      {f.label}
                    </span>
                    <em className="not-italic text-xs text-[var(--text-3)]">
                      +{formatINR(f.cost)}
                    </em>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <Reveal className="flex flex-col justify-center rounded-2xl border border-[var(--border)] bg-[var(--surface-2)] p-7 text-center">
            <span className="text-xs uppercase tracking-wider text-[var(--text-3)]">
              Estimated Range
            </span>
            <div className="my-3 font-heading text-2xl font-bold grad-text">
              {formatINR(low)} – {formatINR(high)}
            </div>
            <p className="mb-6 text-xs text-[var(--text-3)]">
              This is an approximate estimate. Final pricing is provided after discussing the
              project requirements.
            </p>
            <a
              href="#contact"
              className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-[var(--blue-1)] to-[var(--blue-2)] px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_34px_-12px_var(--glow)] transition-transform hover:-translate-y-0.5"
            >
              Get Exact Quote
            </a>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
