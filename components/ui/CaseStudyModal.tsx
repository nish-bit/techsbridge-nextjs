"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import type { Project } from "@/lib/data";
import { Badge } from "@/components/ui/Badge";

export function CaseStudyModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
      const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
      window.addEventListener("keydown", onKey);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", onKey);
      };
    }
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && project.caseStudy && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.2, 0.8, 0.2, 1] }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={`Case study: ${project.title}`}
            className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-[26px] border border-[var(--border)] bg-[var(--bg-soft)] p-8 shadow-2xl"
          >
            <button
              onClick={onClose}
              aria-label="Close case study"
              className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] text-[var(--text-2)] hover:text-[var(--text-1)]"
            >
              <X size={17} />
            </button>

            <div className="mb-4 flex flex-wrap gap-2">
              {project.tags.map((t) => (
                <Badge key={t}>{t}</Badge>
              ))}
            </div>
            <h3 className="font-heading text-2xl font-semibold text-[var(--text-1)]">
              {project.title}
            </h3>
            <p className="mt-1 text-sm text-[var(--text-3)]">{project.caseStudy.role}</p>

            <div className="mt-6 space-y-5">
              <div>
                <h4 className="mb-1.5 font-heading text-sm font-semibold text-[var(--blue-2)]">
                  The Problem
                </h4>
                <p className="text-sm leading-relaxed text-[var(--text-2)]">
                  {project.caseStudy.problem}
                </p>
              </div>
              <div>
                <h4 className="mb-1.5 font-heading text-sm font-semibold text-[var(--blue-2)]">
                  Our Approach
                </h4>
                <p className="text-sm leading-relaxed text-[var(--text-2)]">
                  {project.caseStudy.approach}
                </p>
              </div>
              <div>
                <h4 className="mb-1.5 font-heading text-sm font-semibold text-[var(--blue-2)]">
                  The Result
                </h4>
                <p className="text-sm leading-relaxed text-[var(--text-2)]">
                  {project.caseStudy.result}
                </p>
              </div>
            </div>

            <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {project.caseStudy.stats.map((s) => (
                <div key={s.l} className="glass-card px-4 py-4 text-center">
                  <strong className="font-heading text-lg text-[var(--text-1)]">{s.n}</strong>
                  <p className="mt-1 text-xs text-[var(--text-3)]">{s.l}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
