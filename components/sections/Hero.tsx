"use client";

import Image from "next/image";
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
    <section id="home" className="relative overflow-hidden pb-16 pt-[136px] sm:pb-20 sm:pt-[148px]">

      <Container className="relative z-10 grid items-center gap-9 lg:gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <div className="mb-4 inline-flex items-center gap-2 font-heading text-xs font-semibold uppercase tracking-[0.16em] text-[var(--blue-2)]">
            <span className="h-[7px] w-[7px] rounded-full bg-[var(--blue-2)] shadow-[0_0_10px_var(--glow)]" />
            Digital Products Built For Growth
          </div>
          <h1 className="font-heading text-[clamp(2.35rem,3.6vw+0.75rem,3.75rem)] font-bold leading-[1.12] text-[var(--text-1)]">
            We Build Digital Products <span className="grad-text">That Grow Businesses.</span>
          </h1>
          <p className="mt-6 max-w-[520px] text-[1.12rem] text-[var(--text-2)]">
            TechsBridge designs and develops high-performance websites, web applications, AI
            solutions and startup products for businesses that want to grow.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[var(--blue-1)] to-[var(--blue-2)] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_14px_34px_-12px_var(--glow)] transition-transform hover:-translate-y-0.5"
            >
              Start Your Project
            </a>
            <a
              href="/work"
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
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative min-h-[260px] overflow-hidden border border-[var(--border)] sm:min-h-[380px] lg:min-h-[460px]"
        >
          <Image
            src="/images/hero-workspace.webp"
            alt="Contemporary software development workspace"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 48vw"
            className="object-cover"
          />
        </motion.div>
      </Container>
    </section>
  );
}
