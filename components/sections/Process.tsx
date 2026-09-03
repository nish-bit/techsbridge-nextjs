import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { process } from "@/lib/data";

export function Process() {
  return (
    <section id="process" className="bg-[var(--bg-soft)] py-[118px]">
      <Container>
        <SectionHeading
          eyebrow="How We Work"
          title="A process built for momentum"
          description="Six stages, one continuous thread from your first message to a product that's live."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {process.map((step, i) => (
            <Reveal key={step.number} delay={(i % 3) * 0.08}>
              <div className="glass-card h-full p-6">
                <span className="font-heading text-2xl font-bold text-[var(--blue-2)]/60">
                  {step.number}
                </span>
                <h3 className="mt-3 font-heading text-base font-semibold text-[var(--text-1)]">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-2)]">
                  {step.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
