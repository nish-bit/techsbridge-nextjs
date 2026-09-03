import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { aboutStats, specialties } from "@/lib/data";

export function About() {
  return (
    <section id="about" className="py-[118px]">
      <Container className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <Reveal>
          <div className="mb-4 inline-flex items-center gap-2 font-heading text-xs font-semibold uppercase tracking-[0.16em] text-[var(--blue-2)]">
            <span className="h-[7px] w-[7px] rounded-full bg-[var(--blue-2)] shadow-[0_0_10px_var(--glow)]" />
            Who We Are
          </div>
          <h2 className="font-heading text-[clamp(1.9rem,3vw+1rem,2.7rem)] font-semibold leading-tight text-[var(--text-1)]">
            Technology That Solves Real Business Problems
          </h2>
          <p className="mt-4 text-[1.05rem] text-[var(--text-2)]">
            TechsBridge is a modern software development studio helping businesses turn ideas
            into powerful digital products — websites, applications, and AI systems built to be
            used, not just launched.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-3.5 sm:grid-cols-3">
            {specialties.map((s) => (
              <div key={s} className="flex items-center gap-2.5 text-sm text-[var(--text-2)]">
                <Check size={16} className="shrink-0 text-[var(--blue-2)]" />
                {s}
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="grid grid-cols-2 gap-4">
            {aboutStats.map((stat) => (
              <div
                key={stat.label}
                className="glass-card flex flex-col gap-1 px-6 py-8 text-center"
              >
                <strong className="font-heading text-3xl text-[var(--text-1)]">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </strong>
                <span className="text-xs uppercase tracking-wider text-[var(--text-3)]">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
