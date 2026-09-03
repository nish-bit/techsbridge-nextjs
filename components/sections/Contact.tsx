"use client";

import { useRef, useState, type FormEvent } from "react";
import { Mail, Phone, MessageCircle, MapPin, ShieldCheck, User } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { budgetOptions, company, serviceOptions } from "@/lib/data";
import { isValidEmail, isValidPhone } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error";

type FieldErrors = Partial<
  Record<"name" | "email" | "phone" | "service" | "budget" | "details", string>
>;

function validateClientSide(data: Record<string, FormDataEntryValue>): FieldErrors {
  const errors: FieldErrors = {};
  const name = String(data.name ?? "").trim();
  const email = String(data.email ?? "").trim();
  const phone = String(data.phone ?? "").trim();
  const service = String(data.service ?? "").trim();
  const budget = String(data.budget ?? "").trim();
  const details = String(data.details ?? "").trim();

  if (!name) errors.name = "Name is required.";
  if (!email) errors.email = "Email is required.";
  else if (!isValidEmail(email)) errors.email = "Enter a valid email address.";
  if (!phone) errors.phone = "Phone is required.";
  else if (!isValidPhone(phone)) errors.phone = "Enter a valid phone number.";
  if (!service) errors.service = "Please select a service.";
  if (!budget) errors.budget = "Please select a budget range.";
  if (!details) errors.details = "Please describe your project.";

  return errors;
}

function LinkedInIcon({ size = 19 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const submittingRef = useRef(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Guard against duplicate submissions from double-clicks or repeated
    // Enter presses while a request is already in flight.
    if (submittingRef.current) return;

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    const fieldErrors = validateClientSide(data);
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      setStatus("idle");
      return;
    }

    setErrors({});
    submittingRef.current = true;
    setStatus("submitting");

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = (await res.json().catch(() => null)) as
        | { ok?: boolean; error?: string }
        | null;

      if (!res.ok || !result?.ok) {
        throw new Error(result?.error ?? "Request failed");
      }

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    } finally {
      submittingRef.current = false;
    }
  }

  const contactCards = [
    {
      icon: Mail,
      label: "Email",
      value: company.email,
      href: `https://mail.google.com/mail/?view=cm&fs=1&to=${company.email}`,
    },
    {
      icon: Phone,
      label: "Phone",
      value: company.phone,
      href: `tel:+${company.phoneRaw}`,
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: "Message us",
      href: `https://wa.me/${company.phoneRaw}`,
    },
    {
      icon: LinkedInIcon,
      label: "LinkedIn",
      value: "Connect on LinkedIn",
      href: company.linkedin,
    },
  ];

  return (
    <section id="contact" className="py-[118px]">
      <Container>
        <SectionHeading
          eyebrow="Get In Touch"
          title="Let's Build Something Great Together"
          description="Tell us about your project and we'll get back to you with next steps, usually within one business day."
        />

        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <Reveal>
            <form onSubmit={handleSubmit} className="glass-card space-y-5 p-7 md:p-8">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label htmlFor="cf-name" className="text-sm font-medium text-[var(--text-2)]">
                    Name
                  </label>
                  <input
                    id="cf-name"
                    name="name"
                    type="text"
                    required
                    aria-invalid={Boolean(errors.name)}
                    placeholder="Your full name"
                    className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-2)] px-4 py-3 text-sm text-[var(--text-1)] outline-none transition-colors focus:border-[var(--blue-2)] placeholder:text-[var(--text-3)]"
                  />
                  {errors.name && <p className="text-xs text-red-400">{errors.name}</p>}
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="cf-email" className="text-sm font-medium text-[var(--text-2)]">
                    Email
                  </label>
                  <input
                    id="cf-email"
                    name="email"
                    type="email"
                    required
                    aria-invalid={Boolean(errors.email)}
                    placeholder="you@company.com"
                    className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-2)] px-4 py-3 text-sm text-[var(--text-1)] outline-none transition-colors focus:border-[var(--blue-2)] placeholder:text-[var(--text-3)]"
                  />
                  {errors.email && <p className="text-xs text-red-400">{errors.email}</p>}
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label htmlFor="cf-phone" className="text-sm font-medium text-[var(--text-2)]">
                    Phone
                  </label>
                  <input
                    id="cf-phone"
                    name="phone"
                    type="tel"
                    required
                    aria-invalid={Boolean(errors.phone)}
                    placeholder="+91 00000 00000"
                    className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-2)] px-4 py-3 text-sm text-[var(--text-1)] outline-none transition-colors focus:border-[var(--blue-2)] placeholder:text-[var(--text-3)]"
                  />
                  {errors.phone && <p className="text-xs text-red-400">{errors.phone}</p>}
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="cf-company" className="text-sm font-medium text-[var(--text-2)]">
                    Company / Organization
                  </label>
                  <input
                    id="cf-company"
                    name="company"
                    type="text"
                    placeholder="Company / college name"
                    className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-2)] px-4 py-3 text-sm text-[var(--text-1)] outline-none transition-colors focus:border-[var(--blue-2)] placeholder:text-[var(--text-3)]"
                  />
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label htmlFor="cf-service" className="text-sm font-medium text-[var(--text-2)]">
                    Service
                  </label>
                  <select
                    id="cf-service"
                    name="service"
                    required
                    defaultValue=""
                    aria-invalid={Boolean(errors.service)}
                    className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-2)] px-4 py-3 text-sm text-[var(--text-1)] outline-none transition-colors focus:border-[var(--blue-2)]"
                  >
                    <option value="" disabled>
                      Select a service
                    </option>
                    {serviceOptions.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                  {errors.service && <p className="text-xs text-red-400">{errors.service}</p>}
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="cf-budget" className="text-sm font-medium text-[var(--text-2)]">
                    Budget
                  </label>
                  <select
                    id="cf-budget"
                    name="budget"
                    required
                    defaultValue=""
                    aria-invalid={Boolean(errors.budget)}
                    className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-2)] px-4 py-3 text-sm text-[var(--text-1)] outline-none transition-colors focus:border-[var(--blue-2)]"
                  >
                    <option value="" disabled>
                      Select a budget range
                    </option>
                    {budgetOptions.map((b) => (
                      <option key={b}>{b}</option>
                    ))}
                  </select>
                  {errors.budget && <p className="text-xs text-red-400">{errors.budget}</p>}
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="cf-details" className="text-sm font-medium text-[var(--text-2)]">
                  Project Description
                </label>
                <textarea
                  id="cf-details"
                  name="details"
                  rows={4}
                  required
                  aria-invalid={Boolean(errors.details)}
                  placeholder="What are you looking to build?"
                  className="w-full resize-none rounded-xl border border-[var(--border)] bg-[var(--surface-2)] px-4 py-3 text-sm text-[var(--text-1)] outline-none transition-colors focus:border-[var(--blue-2)] placeholder:text-[var(--text-3)]"
                />
                {errors.details && <p className="text-xs text-red-400">{errors.details}</p>}
              </div>

              <div className="flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] px-4 py-3 text-xs text-[var(--text-2)]">
                <ShieldCheck size={16} className="shrink-0 text-[var(--blue-2)]" />
                We usually reply with a quote within 24 hours.
              </div>

              <button
                type="submit"
                disabled={status === "submitting"}
                className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-[var(--blue-1)] to-[var(--blue-2)] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_14px_34px_-12px_var(--glow)] transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
              >
                {status === "submitting" ? "Sending..." : "Send Project Enquiry"}
              </button>

              {status === "success" && (
                <p className="text-center text-sm text-[var(--blue-2)]">
                  Thank you! Your project enquiry has been received. We&apos;ll get back to you
                  shortly.
                </p>
              )}
              {status === "error" && (
                <p className="text-center text-sm text-red-400">
                  Something went wrong while sending your enquiry. Please try again or contact us
                  directly.
                </p>
              )}
            </form>
          </Reveal>

          <Reveal delay={0.1} className="flex flex-col gap-5">
            <div className="grid grid-cols-2 gap-4">
              {contactCards.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="glass-card flex flex-col gap-2.5 p-5 transition-colors hover:border-[var(--blue-2)]/50"
                >
                  <c.icon size={19} className="text-[var(--blue-2)]" />
                  <div>
                    <span className="block text-xs text-[var(--text-3)]">{c.label}</span>
                    <strong className="text-sm text-[var(--text-1)]">{c.value}</strong>
                  </div>
                </a>
              ))}
            </div>

            <a
              href="https://www.google.com/maps/search/?api=1&query=New+Delhi%2C+India"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card flex items-center gap-4 p-5 transition-colors hover:border-[var(--blue-2)]/50"
            >
              <MapPin size={20} className="shrink-0 text-[var(--blue-2)]" />
              <div>
                <strong className="block text-sm text-[var(--text-1)]">{company.location}</strong>
                <span className="text-xs text-[var(--text-3)]">
                  Get directions on Google Maps
                </span>
              </div>
            </a>

            <div className="glass-card flex items-center gap-4 p-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[var(--blue-1)] to-[var(--blue-2)]">
                <User size={20} className="text-white" />
              </div>
              <div>
                <strong className="block text-sm text-[var(--text-1)]">{company.founder}</strong>
                <span className="text-xs text-[var(--text-3)]">{company.founderRole}</span>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
