"use client";

import { company } from "@/lib/data";

export function WhatsAppButton() {
  const message = encodeURIComponent(
    "Hi TechsBridge, I would like to discuss a project."
  );
  const href = `https://wa.me/${company.phoneRaw}?text=${message}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Message TechsBridge on WhatsApp"
      className="fixed bottom-4 right-4 z-40 inline-flex min-h-12 items-center justify-center gap-2 border border-[var(--border)] bg-[var(--surface)] px-3 text-sm font-semibold text-[var(--text-1)] shadow-none transition-colors hover:border-[var(--blue-1)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--blue-1)] sm:bottom-5 sm:right-5"
    >
      <svg aria-hidden="true" viewBox="0 0 32 32" width="23" height="23" fill="currentColor">
        <path d="M16 .8A15.1 15.1 0 0 0 3 23.6L.9 31l7.6-2A15.2 15.2 0 1 0 16 .8Zm0 27.5a12.3 12.3 0 0 1-6.3-1.7l-.5-.3-4.5 1.2 1.2-4.4-.3-.5a12.4 12.4 0 1 1 10.4 5.7Zm6.8-9.2c-.4-.2-2.2-1.1-2.5-1.2-.3-.1-.6-.2-.8.2-.2.4-1 1.2-1.2 1.4-.2.2-.4.3-.8.1-.4-.2-1.6-.6-3-1.9-1.1-1-1.9-2.2-2.1-2.6-.2-.4 0-.6.2-.8l.6-.7.4-.6c.1-.2.1-.5 0-.7l-1.1-2.7c-.3-.7-.6-.6-.8-.6h-.7c-.3 0-.7.1-1 .5s-1.3 1.3-1.3 3.1 1.4 3.7c.2.5 2.3 4 5.5 5.6.8.4 1.4.6 1.9.8.8.2 1.5.2 2.1.1.6-.1 2.2-.9 2.5-1.8.3-.9.3-1.7.2-1.8-.1-.2-.3-.3-.7-.5Z"/>
      </svg>
      <span>WhatsApp</span>
    </a>
  );
}
