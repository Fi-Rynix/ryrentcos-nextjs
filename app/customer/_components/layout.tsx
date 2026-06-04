"use client";

import type { ReactNode } from "react";

// container
export function Container({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-[1120px] px-4 lg:px-0">
      {children}
    </div>
  );
}

// divider
export function Divider() {
  return (
    <div className="w-full">
      <Container>
        <div className="h-px bg-brand-red/30" />
      </Container>
    </div>
  );
}

/**
 * TitleDivider — Divider pendek khusus di bawah title block.
 * Figma: w-[548.01px] (sama dengan lebar title block Otaku News / Lastest Update).
 * Berbeda dengan Divider biasa yang full-width + opacity 30%.
 */
export function TitleDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`mt-7 h-px w-full bg-brand-red ${className}`} />
  );
}

/**
 * Section — wrapper dengan padding konsisten.
 * - size "default" → py-12 md:py-16
 * - size "small"   → py-8
 * - id untuk scroll-mt-[88px] (offset untuk sticky header)
 */
export function Section({
  children,
  size = "default",
  id,
  className = "",
}: {
  children: ReactNode;
  size?: "small" | "default";
  id?: string;
  className?: string;
}) {
  const padding = size === "small" ? "py-8" : "py-12 md:py-16";

  return (
    <section id={id} className={`w-full scroll-mt-[88px] ${padding} ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}

/** PageShell — wrapper untuk keseluruhan halaman dengan bg-brand-base-soft. */
export function PageShell({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`min-h-screen w-full bg-red-50 ${className}`}
      style={{ background: "var(--color-brand-base-soft)" }}
    >
      {children}
    </div>
  );
}
