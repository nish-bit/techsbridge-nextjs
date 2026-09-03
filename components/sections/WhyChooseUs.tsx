import { Zap, LayoutGrid, Search, Smartphone, Wallet, Clock, Layers, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { whyUs } from "@/lib/data";

const icons = [Zap, LayoutGrid, Search, Smartphone, Wallet, Clock, Layers, Sparkles];

export function WhyChooseUs() {
  return (
    <section id="why" className="py-[118px]">
      <Container>
        <SectionHeading eyebrow="Why TechsBridge" title="What you actually get" />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {whyUs.map((reason, i) => {
            const Icon = icons[i % icons.length];
            return (
              <Reveal key={reason} delay={(i % 4) * 0.06}>
                <div className="glass-card flex h-full flex-col items-center gap-3 px-5 py-8 text-center transition-colors hover:border-[var(--blue-2)]/50">
                  <Icon size={24} className="text-[var(--blue-2)]" strokeWidth={1.8} />
                  <span className="text-sm font-medium text-[var(--text-1)]">{reason}</span>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
