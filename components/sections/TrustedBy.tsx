import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { trustedLogos, trustedNote } from "@/lib/data";

export function TrustedBy() {
  return (
    <section className="py-14">
      <Container>
        <Reveal>
          <p className="mb-7 text-center text-xs uppercase tracking-[0.14em] text-[var(--text-3)]">
            Trusted by teams building with TechsBridge
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {trustedLogos.map((logo) => (
              <span
                key={logo}
                className="font-heading text-sm font-semibold text-[var(--text-3)]"
              >
                {logo}
              </span>
            ))}
          </div>
          <p className="mt-5 text-center text-xs text-[var(--text-3)]">{trustedNote}</p>
        </Reveal>
      </Container>
    </section>
  );
}
