import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { services } from "@/lib/data";

export function Services() {
  return (
    <section id="services" className="bg-[var(--bg-soft)] py-[118px]">
      <Container>
        <SectionHeading
          eyebrow="What We Do"
          title="Services built around outcomes"
          description="From a landing page to a full product, every engagement is scoped around what actually moves your business forward."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}
