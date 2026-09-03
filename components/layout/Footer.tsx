import { company } from "@/lib/data";
import { Container } from "@/components/ui/Container";
import { ThemeToggleSwitch } from "@/components/ui/ThemeToggle";

const columns = [
  {
    title: "Company",
    links: [
      { label: "About", href: "#about" },
      { label: "Services", href: "#services" },
      { label: "Pricing", href: "#pricing" },
      { label: "Process", href: "#process" },
    ],
  },
  {
    title: "Work",
    links: [
      { label: "Projects", href: "#work" },
      { label: "Testimonials", href: "#testimonials" },
      { label: "FAQ", href: "#faq" },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: "Email", href: `mailto:${company.email}` },
      { label: "Call", href: `tel:+91${company.phoneRaw.slice(2)}` },
      { label: "Get in touch", href: "#contact" },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-[var(--border)] pb-8 pt-16">
      <Container>
        <div className="mb-10 flex flex-col justify-between gap-10 md:flex-row md:items-start">
          <div className="max-w-[280px]">
            <a href="#home" className="flex items-center gap-2 font-heading text-lg font-bold">
              Techs<span className="grad-text">Bridge</span>
            </a>
            <p className="mt-4 text-sm text-[var(--text-2)]">{company.tagline}</p>
          </div>
          <div className="flex flex-wrap gap-11">
            {columns.map((col) => (
              <div key={col.title}>
                <h4 className="mb-3.5 text-xs font-semibold uppercase tracking-wider text-[var(--text-3)]">
                  {col.title}
                </h4>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm text-[var(--text-2)] transition-colors hover:text-[var(--blue-2)]"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4 border-t border-[var(--border)] pt-6 text-xs text-[var(--text-3)] sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {year} {company.name}. All rights reserved.
          </span>
          <ThemeToggleSwitch />
          <span>Built by {company.founder}</span>
        </div>
      </Container>
    </footer>
  );
}
