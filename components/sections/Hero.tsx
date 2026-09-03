"use client";

import { motion } from "framer-motion";
import { Zap, Cpu, Smartphone, Search } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { heroStats } from "@/lib/data";

const trustIndicators = [
  { icon: Zap, label: "Fast Development" },
  { icon: Cpu, label: "Modern Technology" },
  { icon: Search, label: "SEO Optimized" },
  { icon: Smartphone, label: "Responsive Design" },
];

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pb-24 pt-[172px]">
      <div className="pointer-events-none absolute -right-40 -top-64 h-[760px] w-[760px] rounded-full bg-[radial-gradient(circle,var(--glow),transparent_65%)] opacity-55 blur-[10px]" />
      <div className="pointer-events-none absolute -bottom-56 -left-56 h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle,rgba(43,108,255,0.35),transparent_65%)]" />

      <Container className="relative z-10 grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <div className="mb-4 inline-flex items-center gap-2 font-heading text-xs font-semibold uppercase tracking-[0.16em] text-[var(--blue-2)]">
            <span className="h-[7px] w-[7px] rounded-full bg-[var(--blue-2)] shadow-[0_0_10px_var(--glow)]" />
            Digital Products Built For Growth
          </div>
          <h1 className="font-heading text-[clamp(2.5rem,4.6vw+0.8rem,4.3rem)] font-bold leading-[1.07] text-[var(--text-1)]">
            We Build Digital Products <span className="grad-text">That Grow Businesses.</span>
          </h1>
          <p className="mt-6 max-w-[520px] text-[1.12rem] text-[var(--text-2)]">
            TechsBridge designs and develops high-performance websites, web applications, AI
            solutions and startup products for businesses that want to grow.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[var(--blue-1)] to-[var(--blue-2)] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_14px_34px_-12px_var(--glow)] transition-transform hover:-translate-y-0.5"
            >
              Start Your Project
            </a>
            <a
              href="#work"
              className="inline-flex items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface-3)] px-7 py-3.5 text-sm font-semibold text-[var(--text-1)] backdrop-blur transition-transform hover:-translate-y-0.5 hover:border-[var(--blue-2)]"
            >
              View Our Work
            </a>
          </div>

          <div className="mt-11 flex flex-wrap gap-x-8 gap-y-4">
            {trustIndicators.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-sm text-[var(--text-3)]">
                <Icon size={16} className="text-[var(--blue-2)]" />
                {label}
              </div>
            ))}
          </div>

          <div className="mt-11 flex flex-wrap gap-9">
            {heroStats.map((s) => (
              <div key={s.label} className="flex flex-col gap-0.5">
                <strong className="font-heading text-2xl text-[var(--text-1)]">{s.value}</strong>
                <span className="text-xs uppercase tracking-wider text-[var(--text-3)]">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.2, 0.8, 0.2, 1] }}
          className="relative hidden h-[480px] md:block"
        >
          <div className="glass-card float-1 absolute left-2.5 top-5 w-[390px] overflow-hidden shadow-2xl">
            <div className="flex gap-1.5 border-b border-[var(--border)] px-3.5 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-[var(--text-3)]/40" />
              <span className="h-2.5 w-2.5 rounded-full bg-[var(--text-3)]/40" />
              <span className="h-2.5 w-2.5 rounded-full bg-[var(--text-3)]/40" />
            </div>
            <div className="space-y-2.5 p-5">
              <div className="h-2.5 w-2/5 rounded bg-gradient-to-r from-[var(--surface-2)] to-[var(--surface-3)]" />
              <div className="h-2.5 w-4/5 rounded bg-gradient-to-r from-[var(--surface-2)] to-[var(--surface-3)]" />
              <div className="h-2.5 w-3/5 rounded bg-gradient-to-r from-[var(--surface-2)] to-[var(--surface-3)]" />
              <div className="mt-4 flex gap-2">
                <div className="h-13 flex-1 rounded-lg border border-[var(--border)] bg-[var(--surface-2)]" />
                <div className="h-13 flex-1 rounded-lg border border-[var(--border)] bg-[var(--surface-2)]" />
                <div className="h-13 flex-1 rounded-lg border border-[var(--border)] bg-[var(--surface-2)]" />
              </div>
            </div>
          </div>

          <div className="glass-card float-2 absolute right-0 top-0 w-[230px] p-4.5 font-mono text-[11.5px] leading-loose text-[var(--text-2)] shadow-2xl">
            <div>
              <span className="text-[var(--blue-2)]">const</span> app = <span className="text-[var(--blue-2)]">new</span> App();
            </div>
            <div>
              app.<span className="text-[var(--blue-2)]">deploy</span>(<span className="text-[#7ee787]">&apos;prod&apos;</span>);
            </div>
            <div className="text-[var(--text-3)]">{"// AI agent online ✓"}</div>
            <div>
              <span className="text-[var(--blue-2)]">export</span> default app;
            </div>
          </div>

          <div className="glass-card float-3 absolute bottom-3.5 right-9 flex w-[210px] items-center gap-3 p-4.5 shadow-2xl">
            <div className="flex h-9.5 w-9.5 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[var(--blue-1)] to-[var(--blue-2)]">
              <Cpu size={18} className="text-white" />
            </div>
            <div>
              <strong className="block text-[13px] text-[var(--text-1)]">AI Agent</strong>
              <span className="text-[11px] text-[var(--text-3)]">Responding live</span>
            </div>
          </div>

          <div className="glass-card float-2 absolute bottom-0 left-6.5 w-[150px] p-4 shadow-2xl [animation-direction:reverse]">
            <strong className="font-heading text-2xl grad-text">3+ yrs</strong>
            <span className="mt-1 block text-[11px] uppercase tracking-wider text-[var(--text-3)]">
              Learning &amp; Building
            </span>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
