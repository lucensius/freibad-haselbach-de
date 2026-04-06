import { useState, useEffect, useRef } from "react";

// ── useInView Hook ─────────────────────────────────────────────────
export function useInView(ref: React.RefObject<HTMLElement | null>) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return inView;
}

// ── FadeIn ─────────────────────────────────────────────────────────
export function FadeIn({
  children,
  delay = 0,
  style = {},
}: {
  children: React.ReactNode;
  delay?: number;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.55s ease ${delay}ms, transform 0.55s ease ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ── SectionLabel ───────────────────────────────────────────────────
export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontSize: "0.72rem",
        fontWeight: 700,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: "#1d6fa4",
        margin: "0 0 0.5rem",
      }}
    >
      {children}
    </p>
  );
}

// ── SectionHeading ─────────────────────────────────────────────────
export function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      style={{
        fontFamily: "'Lora', serif",
        fontSize: "clamp(1.55rem, 3.5vw, 2.1rem)",
        color: "#1a3a52",
        fontWeight: 700,
        margin: "0 0 0.75rem",
        lineHeight: 1.25,
      }}
    >
      {children}
    </h2>
  );
}

// ── Divider ────────────────────────────────────────────────────────
export function Divider() {
  return (
    <div
      style={{
        width: 44,
        height: 3,
        background: "#1d6fa4",
        borderRadius: 2,
        margin: "0.75rem 0 1.75rem",
      }}
    />
  );
}

// ── ImageOrPlaceholder ─────────────────────────────────────────────
export function ImageOrPlaceholder({
  src,
  alt,
  style,
}: {
  src?: string;
  alt: string;
  style?: React.CSSProperties;
}) {
  if (!src) return null;

  const imageBase = import.meta.env.VITE_IMAGE_BASE_URL || "";
  const resolvedSrc = src.startsWith("http") ? src : `${imageBase}${src}`;

  return (
    <img
      src={resolvedSrc}
      alt={alt}
      loading="lazy"
      style={{
        width: "100%",
        borderRadius: 6,
        objectFit: "cover",
        ...style,
      }}
    />
  );
}
