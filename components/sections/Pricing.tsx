import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { pricingPlans } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Pricing() {
  return (
    <section id="pricing" className="py-[118px]">
      <Container>
        <SectionHeading
          eyebrow="Pricing"
          title="Simple packages, honest pricing"
          description="A starting point to gauge scope — every project still gets a tailored, itemized quote once we talk requirements."
        />
        <div className="grid gap-6 lg:grid-cols-3">
          {pricingPlans.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 0.08}>
              <div
                className={cn(
                  "glass-card relative flex h-full flex-col p-8",
                  plan.popular && "border-[var(--blue-2)]/60 shadow-[0_0_0_1px_var(--blue-2)]"
                )}
              >
                {plan.popular && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-[var(--blue-1)] to-[var(--blue-2)] px-4 py-1 text-xs font-semibold text-white">
                    Most Popular
                  </span>
                )}
                <h3 className="font-heading text-xl font-semibold text-[var(--text-1)]">
                  {plan.name}
                </h3>
                <p className="mt-1 text-sm text-[var(--text-3)]">{plan.subtitle}</p>
                <div className="mt-5 flex items-baseline gap-1">
                  <span className="font-heading text-3xl font-bold text-[var(--text-1)]">
                    {plan.price}
                  </span>
                  <span className="text-sm text-[var(--text-3)]">{plan.priceSuffix}</span>
                </div>
                <ul className="mt-6 flex-1 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-[var(--text-2)]">
                      <Check size={16} className="mt-0.5 shrink-0 text-[var(--blue-2)]" />
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  className={cn(
                    "mt-7 inline-flex w-full items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-transform hover:-translate-y-0.5",
                    plan.popular
                      ? "bg-gradient-to-r from-[var(--blue-1)] to-[var(--blue-2)] text-white shadow-[0_14px_34px_-12px_var(--glow)]"
                      : "border border-[var(--border)] bg-[var(--surface-3)] text-[var(--text-1)] hover:border-[var(--blue-2)]"
                  )}
                >
                  {plan.cta}
                </a>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-8 text-center text-xs text-[var(--text-3)]">
          Final pricing depends on scope, integrations, and timeline — the contact form gets you
          an exact quote.
        </p>
      </Container>
    </section>
  );
}
