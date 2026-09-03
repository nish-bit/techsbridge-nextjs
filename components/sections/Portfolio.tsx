"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { CaseStudyModal } from "@/components/ui/CaseStudyModal";
import { projects, type Project } from "@/lib/data";

export function Portfolio() {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <section id="work" className="py-[118px]">
      <Container>
        <SectionHeading
          eyebrow="Our Work"
          title="Selected Work"
          description="A snapshot of the kind of products we ship — each one designed, built, and deployed end to end."
        />
        <div className="grid gap-6 sm:grid-cols-2">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              onOpenCaseStudy={setActive}
            />
          ))}
        </div>
      </Container>
      <CaseStudyModal project={active} onClose={() => setActive(null)} />
    </section>
  );
}
