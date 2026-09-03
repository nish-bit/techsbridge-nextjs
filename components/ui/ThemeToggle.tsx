"use client";

import { useCallback, useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

type Theme = "dark" | "light";

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "dark";
  return (localStorage.getItem("theme") as Theme | null) ?? "dark";
}

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  window.dispatchEvent(new CustomEvent<Theme>("themechange", { detail: theme }));
}

/** Icon-only toggle, used in the navbar. */
export function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    const onChange = (e: Event) => setTheme((e as CustomEvent<Theme>).detail);
    window.addEventListener("themechange", onChange);
    return () => window.removeEventListener("themechange", onChange);
  }, []);

  const toggle = useCallback(() => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    applyTheme(next);
  }, [theme]);

  return (
    <button
      onClick={toggle}
      aria-label="Toggle color theme"
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface-3)] text-[var(--text-1)] transition-transform hover:rotate-12 hover:border-[var(--blue-2)]",
        className
      )}
    >
      {theme === "dark" ? <Moon size={17} /> : <Sun size={17} />}
    </button>
  );
}

/** Labeled dark/light switch, used in the footer. */
export function ThemeToggleSwitch({ className }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    const onChange = (e: Event) => setTheme((e as CustomEvent<Theme>).detail);
    window.addEventListener("themechange", onChange);
    return () => window.removeEventListener("themechange", onChange);
  }, []);

  const select = useCallback((next: Theme) => {
    setTheme(next);
    applyTheme(next);
  }, []);

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-full border border-[var(--border)] bg-[var(--surface-2)] p-1",
        className
      )}
      role="group"
      aria-label="Color theme"
    >
      <button
        onClick={() => select("dark")}
        aria-pressed={theme === "dark"}
        className={cn(
          "flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors",
          theme === "dark"
            ? "bg-gradient-to-r from-[var(--blue-1)] to-[var(--blue-2)] text-white"
            : "text-[var(--text-3)] hover:text-[var(--text-1)]"
        )}
      >
        <Moon size={13} />
        Dark
      </button>
      <button
        onClick={() => select("light")}
        aria-pressed={theme === "light"}
        className={cn(
          "flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors",
          theme === "light"
            ? "bg-gradient-to-r from-[var(--blue-1)] to-[var(--blue-2)] text-white"
            : "text-[var(--text-3)] hover:text-[var(--text-1)]"
        )}
      >
        <Sun size={13} />
        Light
      </button>
    </div>
  );
}
