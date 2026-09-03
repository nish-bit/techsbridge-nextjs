"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { navLinks, company } from "@/lib/data";
import { cn } from "@/lib/utils";
import { ThemeToggle, ThemeToggleSwitch } from "@/components/ui/ThemeToggle";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks
      .map((l) => document.querySelector(l.href))
      .filter(Boolean) as Element[];
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 h-[76px] border-b border-transparent bg-[var(--bg)]/55 backdrop-blur-xl transition-colors duration-400",
          scrolled && "border-[var(--border)]"
        )}
      >
        <div className="mx-auto flex h-full w-full max-w-[1180px] items-center justify-between px-6 md:px-7">
          <a
            href="#home"
            className="flex items-center gap-2.5 font-heading text-lg font-bold text-[var(--text-1)]"
          >
            <svg viewBox="0 0 220 130" className="h-7 w-7">
              <defs>
                <linearGradient id="navGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2b6cff" />
                  <stop offset="100%" stopColor="#38bdf8" />
                </linearGradient>
              </defs>
              <path
                d="M20,20 H95 M57,20 V95"
                stroke="url(#navGrad)"
                strokeWidth="16"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M115,18 H170 Q195,18 195,42 Q195,60 175,62 Q198,64 198,86 Q198,110 170,110 H115 V80 H160 Q170,80 170,72 Q170,64 160,64 H130 V42 H158 Q166,42 166,34 Q166,26 158,26 H115 Z"
                fill="url(#navGrad)"
              />
            </svg>
            Techs<span className="grad-text">Bridge</span>
          </a>

          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  "relative text-sm font-medium text-[var(--text-2)] transition-colors hover:text-[var(--text-1)]",
                  active === link.href && "text-[var(--text-1)]"
                )}
              >
                {link.label}
                {active === link.href && (
                  <span className="absolute -bottom-1.5 left-0 h-[1.5px] w-full bg-[var(--blue-2)]" />
                )}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3.5">
            <ThemeToggle />
            <a
              href="#contact"
              className="hidden rounded-full bg-gradient-to-r from-[var(--blue-1)] to-[var(--blue-2)] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_14px_34px_-12px_var(--glow)] transition-transform hover:-translate-y-0.5 md:inline-flex"
            >
              Start a Project
            </a>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Open menu"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface-3)] text-[var(--text-1)] lg:hidden"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      <div
        className={cn(
          "fixed inset-x-0 top-[76px] z-40 flex origin-top flex-col gap-5 border-b border-[var(--border)] bg-[var(--bg-soft)] px-6 pb-8 pt-6 transition-all duration-300 lg:hidden",
          open ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-3 opacity-0"
        )}
      >
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => setOpen(false)}
            className="text-base font-medium text-[var(--text-2)]"
          >
            {link.label}
          </a>
        ))}
        <a
          href="#contact"
          onClick={() => setOpen(false)}
          className="inline-flex w-fit rounded-full bg-gradient-to-r from-[var(--blue-1)] to-[var(--blue-2)] px-5 py-2.5 text-sm font-semibold text-white"
        >
          Start a Project
        </a>
        <ThemeToggleSwitch />
        <span className="text-xs text-[var(--text-3)]">{company.tagline}</span>
      </div>
    </>
  );
}
