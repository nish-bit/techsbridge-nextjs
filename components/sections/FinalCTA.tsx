import { MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { company } from "@/lib/data";

export function FinalCTA() {
  const message = encodeURIComponent("Hi TechsBridge, I would like to discuss a project.");

  return (
    <section className="py-24">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-[28px] border border-[var(--border)] bg-[var(--surface)] px-8 py-16 text-center">
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,var(--glow),transparent_65%)] opacity-40 blur-2xl" />
            <div className="relative">
              <h2 className="mx-auto max-w-xl font-heading text-[clamp(1.9rem,3vw+1rem,2.7rem)] font-semibold text-[var(--text-1)]">
                Have an Idea? Let&apos;s Turn It Into a{" "}
                <span className="grad-text">Digital Product.</span>
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-[1.05rem] text-[var(--text-2)]">
                Whether you&apos;re launching a startup, modernizing your business or building an
                AI-powered solution, TechsBridge can help you take it from idea to launch.
              </p>
              <div className="mt-9 flex flex-wrap justify-center gap-4">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[var(--blue-1)] to-[var(--blue-2)] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_14px_34px_-12px_var(--glow)] transition-transform hover:-translate-y-0.5"
                >
                  Start Your Project
                </a>
                <a
                  href={`https://wa.me/${company.phoneRaw}?text=${message}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface-3)] px-7 py-3.5 text-sm font-semibold text-[var(--text-1)] backdrop-blur transition-transform hover:-translate-y-0.5 hover:border-[var(--blue-2)]"
                >
                  <MessageCircle size={16} />
                  WhatsApp Us
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
