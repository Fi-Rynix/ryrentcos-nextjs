"use client";

import Image from "next/image";
import Link from "next/link";
import { TitleDivider } from "@/app/customer/_components/layout";

/* ============================================================
   TYPES
   ============================================================ */
type ArticleItem = {
  id: string;
  title: string;
  image: string;
  date: string;
  time: string;
};

/* ============================================================
   MOCK DATA — replace with real API later
   ============================================================ */
const ARTICLES: ArticleItem[] = [
  {
    id: "a1",
    title:
      "Usai viral dan ramai dikritik, Motion Ime Festival batal menghadirkan Bulgogi sebagai Guest",
    image: "/images/article/bulgogi.png",
    date: "18 Desember 2025",
    time: "12.03",
  },
  {
    id: "a2",
    title:
      "Fans Meisho Doto Umamusume Berhasil Kumpulkan Dana ¥94 Juta untuk Bangun Kembali Kandang Kuda Aslinya",
    image: "/images/article/meisho-doto.png",
    date: "18 Desember 2025",
    time: "10.13",
  },
  {
    id: "a3",
    title:
      "Anime Makeine: Too Many Losing Heroines! Umumkan Musim Kedua, Ini Detail Lengkapnya",
    image: "/images/article/makeine.png",
    date: "18 Desember 2025",
    time: "09.10",
  },
  {
    id: "a4",
    title:
      "6 Rekomendasi Anime Isekai Terbaru 2025, Ada Isekai Quartet Season 3",
    image: "/images/article/isekai-quartet.png",
    date: "18 Desember 2025",
    time: "09.00",
  },
  {
    id: "a5",
    title:
      "Imbas Banyak Remaja Kecanduan Currency Wars, Pemerintah Berencana Batasi Game Honkai: Star Rail",
    image: "/images/article/currency-war.png",
    date: "18 Desember 2025",
    time: "08.12",
  },
  {
    id: "a6",
    title:
      "Status Facebook 6 Wibu Akut Berimajinasi Punya Istri Anime Ini Nyeleneh, Kocak Wibu-wibu ini sudah tak tertolong.",
    image: "/images/article/status-facebook.png",
    date: "18 Desember 2025",
    time: "07.00",
  },
];

/* ============================================================
   SECTION COMPONENTS
   ============================================================ */

/**
 * Page title — "Lastest Update" dengan display font + title divider.
 */
function PageTitle() {
  return (
    <div className="flex w-full max-w-[548px] flex-col items-center text-center">
      <h1 className="font-display text-5xl font-normal leading-[58px] text-brand-red">
        Lastest Update
      </h1>
      <TitleDivider />
    </div>
  );
}

/**
 * Breadcrumb navigation — Otaku News / Lastest Update.
 */
function Breadcrumb() {
  return (
    <div className="flex w-full items-center gap-2 text-base font-bold leading-5">
      <a
        href="#"
        className="text-brand-red underline transition-colors hover:text-brand-red-soft"
      >
        Otaku News
      </a>
      <span className="text-black">/</span>
      <span className="text-black">Lastest Update</span>
    </div>
  );
}

/**
 * Separator line — horizontal line dengan opacity.
 */
function SeparatorLine() {
  return (
    <div className="h-0 w-full outline outline-1 outline-brand-red opacity-40" />
  );
}

/**
 * Article list card — image left, content right.
 * Figma specs: h-56, rounded-[10px], shadow-[2px_2px_8px_0px_rgba(0,0,0,0.25)]
 */
function ArticleCard({ item }: { item: ArticleItem }) {
  return (
    <Link
      href="/customer/article/article-detail"
      className="group flex h-56 w-full flex-col gap-4 overflow-hidden rounded-[10px] bg-white p-4 shadow-[2px_2px_8px_0px_rgba(0,0,0,0.25)] transition-shadow hover:shadow-[4px_4px_12px_0px_rgba(0,0,0,0.3)] sm:h-44 sm:flex-row sm:items-center sm:gap-6 sm:p-5"
    >
      <div className="relative h-44 w-full overflow-hidden rounded-[5px] bg-zinc-100 sm:h-full sm:w-52">
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(min-width: 640px) 208px, 100vw"
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col items-start justify-center gap-3">
        <h3 className="line-clamp-2 text-2xl font-bold leading-9 text-black">
          {item.title}
        </h3>
        <p className="text-xl font-bold leading-6 text-brand-red">{item.date}</p>
        <p className="text-xl font-bold leading-6 text-brand-red">
          {item.time} WIB
        </p>
      </div>
    </Link>
  );
}

/**
 * Pagination — numbered circles + left arrow.
 * Active: filled red circle (bg-brand-red-soft)
 * Inactive: outlined circle (border brand-red-soft)
 */
function Pagination() {
  const pages = [1, 2, 3, 4];

  return (
    <div className="inline-flex items-center gap-5">
      {/* Page numbers */}
      {pages.map((page, index) => (
        <button
          key={page}
          type="button"
          className={`relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full text-2xl font-bold leading-8 transition-colors ${
            index === 0
              ? "bg-brand-red-soft text-white"
              : "border-2 border-brand-red-soft text-brand-red hover:bg-brand-red hover:text-white"
          }`}
        >
          {page}
        </button>
      ))}

      {/* Left arrow (prev) */}
      <button
        type="button"
        className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border-2 border-brand-red-soft transition-colors hover:bg-brand-red hover:text-white"
        aria-label="Previous page"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9 20L7 18L13 12L7 6L9 4L17 12L9 20Z"
            fill="currentColor"
          />
        </svg>
      </button>
    </div>
  );
}

/* ============================================================
   PAGE
   ============================================================ */
export default function ArticleListPage() {
  return (
    <div className="min-h-screen w-full bg-brand-base-soft">
      <div className="mx-auto w-full max-w-[1129px] px-4 pb-16 pt-10 md:px-6 lg:px-0">
        <div className="flex flex-col items-center gap-16">
          {/* Title */}
          <PageTitle />

          {/* Breadcrumb + Separator */}
          <div className="flex w-full flex-col gap-7">
            <Breadcrumb />
            <SeparatorLine />
          </div>

          {/* Article List */}
          <div className="flex w-full flex-col gap-12">
            {ARTICLES.map((item) => (
              <ArticleCard key={item.id} item={item} />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex w-full justify-center">
            <Pagination />
          </div>
        </div>
      </div>
    </div>
  );
}