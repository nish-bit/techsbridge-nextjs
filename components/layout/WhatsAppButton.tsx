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
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_14px_30px_-10px_rgba(37,211,102,0.6)] transition-transform hover:scale-105"
    >
      <MessageCircle size={24} strokeWidth={2} />
    </a>
  );
}
