"use client";

import type { Project } from "@/lib/data";
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
  return (
    <Reveal delay={(index % 2) * 0.1}>
      <div className="group flex h-full flex-col overflow-hidden rounded-[22px] border border-[var(--border)] bg-[var(--surface-3)] backdrop-blur transition-all duration-300 hover:-translate-y-1">
        <div
          className="relative flex h-40 items-end overflow-hidden p-5"
          style={{
            background: `linear-gradient(135deg, ${project.accent}22, var(--surface))`,
          }}
        >
          <div
            className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-40 blur-2xl transition-opacity duration-500 group-hover:opacity-70"
            style={{ background: project.accent }}
          />
          <span className="relative font-heading text-sm font-semibold text-[var(--text-1)]">
            {project.category}
          </span>
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
