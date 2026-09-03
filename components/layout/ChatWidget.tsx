"use client";

import { useState } from "react";
import { MessageSquare, X, Send } from "lucide-react";
import { company } from "@/lib/data";

type Message = { from: "bot" | "user"; text: string };

const OPTIONS = [
  "Build a Website",
  "Develop a Web App",
  "AI Solution",
  "Pricing",
  "Talk on WhatsApp",
];

const RESPONSES: Record<string, string> = {
  "Build a Website":
    "Great — head to the Services section to see what's included, or jump straight to the contact form and tell us what you need.",
  "Develop a Web App":
    "We build custom web applications end to end. Check out the Growth pricing tier, or share your idea in the contact form.",
  "AI Solution":
    "We build AI chatbots, agents and automation. Tell us more via the contact form and we'll scope it with you.",
  Pricing:
    "Pricing starts at ₹10,000 for landing pages. Try the cost estimator above the Work section for a ballpark range.",
  "Talk on WhatsApp": "Opening WhatsApp for you now.",
};

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      from: "bot",
      text: "Hi! I'm a guided enquiry assistant, not a live AI agent. Pick an option or type your question and I'll point you the right way.",
    },
  ]);
  const [input, setInput] = useState("");

  function handleOption(option: string) {
    setMessages((m) => [...m, { from: "user", text: option }]);
    if (option === "Talk on WhatsApp") {
      const msg = encodeURIComponent("Hi TechsBridge, I would like to discuss a project.");
      window.open(`https://wa.me/${company.phoneRaw}?text=${msg}`, "_blank");
    }
    setMessages((m) => [...m, { from: "bot", text: RESPONSES[option] }]);
  }

  function handleSend() {
    if (!input.trim()) return;
    setMessages((m) => [
      ...m,
      { from: "user", text: input },
      {
        from: "bot",
        text: "Thanks — for a proper answer, the fastest route is the contact form or WhatsApp. I can only guide you to the right section, not chat freely.",
      },
    ]);
    setInput("");
  }

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Open chat assistant"
        className="fixed bottom-24 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[var(--blue-1)] to-[var(--blue-2)] text-white shadow-[0_14px_30px_-10px_var(--glow)] transition-transform hover:scale-105"
      >
        {open ? <X size={22} /> : <MessageSquare size={22} />}
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="TechsBridge chat assistant"
          className="fixed bottom-[104px] right-6 z-40 flex max-h-[70vh] w-[min(360px,calc(100vw-3rem))] flex-col overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--bg-soft)] shadow-2xl"
        >
          <div className="border-b border-[var(--border)] px-5 py-4">
            <p className="font-heading text-sm font-semibold text-[var(--text-1)]">
              Guided Enquiry Assistant
            </p>
            <p className="text-xs text-[var(--text-3)]">Not a live AI — points you to the right place</p>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm ${
                  m.from === "bot"
                    ? "bg-[var(--surface-2)] text-[var(--text-2)]"
                    : "ml-auto bg-gradient-to-r from-[var(--blue-1)] to-[var(--blue-2)] text-white"
                }`}
              >
                {m.text}
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 border-t border-[var(--border)] px-5 py-3">
            {OPTIONS.map((opt) => (
              <button
                key={opt}
                onClick={() => handleOption(opt)}
                className="rounded-full border border-[var(--border)] px-3 py-1.5 text-xs text-[var(--text-2)] transition-colors hover:border-[var(--blue-2)] hover:text-[var(--text-1)]"
              >
                {opt}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 border-t border-[var(--border)] p-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask about services, pricing, timeline…"
              className="flex-1 rounded-full bg-[var(--surface-2)] px-4 py-2.5 text-sm text-[var(--text-1)] outline-none placeholder:text-[var(--text-3)]"
            />
            <button
              onClick={handleSend}
              aria-label="Send message"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-[var(--blue-1)] to-[var(--blue-2)] text-white"
            >
              <Send size={15} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
