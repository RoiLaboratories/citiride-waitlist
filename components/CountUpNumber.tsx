"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type CountUpNumberProps = {
  durationMs?: number;
  end: number | string;
  suffix?: string;
};

function normalizeTarget(end: number | string) {
  if (typeof end === "number") {
    return Number.isFinite(end) ? Math.max(1, Math.round(end)) : 1;
  }

  const parsed = Number.parseInt(end.replace(/[^0-9-]/g, ""), 10);
  return Number.isFinite(parsed) ? Math.max(1, parsed) : 1;
}

export function CountUpNumber({
  durationMs = 1400,
  end,
  suffix = "",
}: CountUpNumberProps) {
  const target = useMemo(() => normalizeTarget(end), [end]);
  const [value, setValue] = useState(1);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = ref.current;

    if (!element || hasAnimated) {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      const frame = requestAnimationFrame(() => {
        setValue(target);
        setHasAnimated(true);
      });

      return () => cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return;
        }

        setHasAnimated(true);
        const startedAt = performance.now();

        function tick(now: number) {
          const progress = Math.min((now - startedAt) / durationMs, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const nextValue = Math.round(1 + (target - 1) * eased);

          setValue(Number.isFinite(nextValue) ? nextValue : target);

          if (progress < 1) {
            requestAnimationFrame(tick);
          }
        }

        requestAnimationFrame(tick);
        observer.disconnect();
      },
      { threshold: 0.45 },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [durationMs, hasAnimated, target]);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}

