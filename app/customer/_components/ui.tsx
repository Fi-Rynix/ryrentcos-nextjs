"use client";

import type { ReactNode } from "react";

/**
 * Badge — komponen label kategori (AniManga, IRL Event, Gorengan, dll).
 * - variant "brand"    → border-2 brand-red outline (kategori news)
 * - variant "filled"   → bg-brand-red text-white (active category button)
 */
export function Badge({
  variant = "brand",
  className = "",
  children,
}: {
  variant?: "brand" | "filled";
  className?: string;
  children: ReactNode;
}) {
  const styles = {
    brand: "border-2 border-brand-red text-brand-red",
    filled: "bg-brand-red text-white",
  }[variant];

  return (
    <span
      className={`inline-flex h-5 w-fit items-center justify-center rounded-sm px-1.5 py-0.5 text-xs font-bold leading-3 ${styles} ${className}`}
    >
      {children}
    </span>
  );
}

/** Section title + optional "See All" link, pakai Nunito (body font). */
export function SectionTitle({
  title,
  seeAllLabel = "See All >>>",
  onSeeAll,
  showSeeAll = true,
}: {
  title: string;
  seeAllLabel?: string;
  onSeeAll?: () => void;
  showSeeAll?: boolean;
}) {
  return (
    <div className="flex w-full flex-col gap-1">
      <div className="flex w-full items-start justify-between gap-2">
        <h2 className="text-2xl font-bold leading-8 text-black">{title}</h2>
        {showSeeAll && (
          <button
            type="button"
            onClick={onSeeAll}
            className="text-base font-bold leading-5 text-orange-800 transition-colors hover:underline"
          >
            {seeAllLabel}
          </button>
        )}
      </div>
    </div>
  );
}
