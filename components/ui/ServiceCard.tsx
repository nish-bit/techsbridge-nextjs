"use client";

import {
  MonitorSmartphone,
  GraduationCap,
  Rocket,
  BrainCircuit,
  BarChart3,
  Settings,
  Check,
} from "lucide-react";
import type { Service } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";

const icons: Record<Service["icon"], React.ElementType> = {
  browser: MonitorSmartphone,
  graduation: GraduationCap,
  rocket: Rocket,
  brain: BrainCircuit,
  chart: BarChart3,
  settings: Settings,
};

export function ServiceCard({ service, index }: { service: Service; index: number }) {
  const Icon = icons[service.icon];
  return (
    <Reveal delay={(index % 3) * 0.08}>
      <div className="group relative flex h-full flex-col rounded-[22px] border border-[var(--border)] bg-[var(--surface-3)] p-7 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-[var(--blue-2)]/50">
        <span className="font-heading text-xs font-semibold text-[var(--text-3)]">
          {service.number}
        </span>
        <div className="mb-5 mt-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--blue-1)]/15 to-[var(--blue-2)]/15 text-[var(--blue-2)]">
          <Icon size={22} strokeWidth={1.8} />
        </div>
        <h3 className="font-heading text-lg font-semibold text-[var(--text-1)]">
          {service.title}
        </h3>
        <p className="mt-2.5 text-sm leading-relaxed text-[var(--text-2)]">
          {service.description}
        </p>
        <ul className="mt-5 space-y-2.5">
          {service.features.map((f) => (
            <li key={f} className="flex items-center gap-2.5 text-sm text-[var(--text-2)]">
              <Check size={15} className="shrink-0 text-[var(--blue-2)]" />
              {f}
            </li>
          ))}
        </ul>
        <a
          href="#contact"
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--blue-2)] transition-transform group-hover:translate-x-1"
        >
          Discuss Project →
        </a>
      </div>
    </Reveal>
  );
}
