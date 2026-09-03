import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { techStack } from "@/lib/data";

export function TechStack() {
  const doubled = [...techStack, ...techStack];

  return (
    <section id="tech" className="bg-[var(--bg-soft)] pb-[100px] pt-[118px]">
      <Container>
        <SectionHeading eyebrow="Tech Stack" title="Tools we build with" />
      </Container>
      <div className="group overflow-hidden py-2">
        <div className="animate-marquee flex w-max gap-4 group-hover:[animation-play-state:paused]">
          {doubled.map((tech, i) => (
            <div
              key={`${tech}-${i}`}
              className="glass-card whitespace-nowrap px-5 py-3 text-sm font-medium text-[var(--text-2)]"
            >
              {tech}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
