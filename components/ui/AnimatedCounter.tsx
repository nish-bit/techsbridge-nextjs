"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

export function AnimatedCounter({
  value,
  suffix = "",
  duration = 1.4,
}: {
  value: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start: number | null = null;
    let raf: number;

    function step(ts: number) {
      if (start === null) start = ts;
      const progress = Math.min((ts - start) / (duration * 1000), 1);
      setDisplay(Math.round(progress * value));
      if (progress < 1) raf = requestAnimationFrame(step);
    }
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}
