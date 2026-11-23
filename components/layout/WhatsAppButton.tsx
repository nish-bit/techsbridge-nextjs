"use client";

import { MessageCircle } from "lucide-react";
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
      className="fixed bottom-4 right-4 z-40 flex h-12 w-12 sm:bottom-5 sm:right-5 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--blue-1)] transition-transform hover:scale-105"
    >
      <MessageCircle size={24} strokeWidth={2} />
    </a>
  );
}
