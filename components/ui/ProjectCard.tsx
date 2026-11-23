"use client";

import type { Project } from "@/lib/data";
import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { Badge } from "@/components/ui/Badge";

export function ProjectCard({
  project,
  index,
  onOpenCaseStudy,
}: {
  project: Project;
  index: number;
  onOpenCaseStudy: (project: Project) => void;
}) {
  const visuals = [
    "/images/product-dashboard-light.webp",
    "/images/product-commerce.webp",
    "/images/product-task-app.webp",
    "/images/product-responsive-dashboard.webp",
    "/images/product-dashboard-dark.webp",
  ];
  return (
    <Reveal delay={(index % 2) * 0.1}>
      <div className="group flex h-full flex-col overflow-hidden rounded-[22px] border border-[var(--border)] bg-[var(--surface-3)] backdrop-blur transition-all duration-300 hover:-translate-y-1">
        <div className="relative h-52 overflow-hidden border-b border-[var(--border)] bg-[var(--surface-2)]">
          <Image src={visuals[index % visuals.length]} alt={`Illustrative interface concept for ${project.category}`} fill sizes="(max-width: 640px) 100vw, 50vw" className="object-cover" />
          <span className="absolute bottom-3 left-3 bg-[var(--surface)] px-3 py-1 text-xs font-semibold text-[var(--text-1)]">{project.category}</span>
        </div>
        <div className="flex flex-1 flex-col p-6">
          <div className="mb-3 flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <Badge key={t}>{t}</Badge>
            ))}
          </div>
          <h3 className="font-heading text-lg font-semibold text-[var(--text-1)]">
            {project.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-[var(--text-2)]">
            {project.description}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.features.map((f) => (
              <span
                key={f}
                className="rounded-full bg-[var(--surface-2)] px-3 py-1 text-xs text-[var(--text-2)]"
              >
                {f}
              </span>
            ))}
          </div>
          {project.caseStudy && (
            <button
              onClick={() => onOpenCaseStudy(project)}
              className="mt-6 inline-flex w-fit items-center gap-1.5 rounded-full border border-[var(--border)] px-4 py-2 text-xs font-semibold text-[var(--text-1)] transition-colors hover:border-[var(--blue-2)]"
            >
              View Case Study
            </button>
          )}
        </div>
      </div>
    </Reveal>
  );
}
