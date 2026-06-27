"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { TitleDivider } from "@/app/customer/_components/layout";
import { Badge, SectionTitle } from "@/app/customer/_components/ui";

/* ============================================================
   TYPES
   ============================================================ */
type Category = "AniManga" | "IRL Event" | "Gorengan";

type NewsItem = {
  id: string;
  title: string;
  image: string;
  category: Category;
  date?: string;
  time?: string;
};

type TrendingItem = {
  id: string;
  title: string;
  image: string;
};

type LatestItem = {
  id: string;
  title: string;
  image: string;
  date: string;
  time: string;
};

/* ============================================================
   MOCK DATA — replace with real API later
   Images paired to uploaded assets
   ============================================================ */
const TRENDING: TrendingItem[] = [
  {
    id: "t1",
    title:
      "Anime Makeine: Too Many Losing Heroines! Umumkan Musim Kedua, Ini Detail Lengkapnya",
    image: "/images/article/makeine.png",
  },
  {
    id: "t2",
    title:
      "Demon Slayer: Infinity Castle Sukses Besar, Film Terlaris ke-3 Dalam Penayangan Pertamanya",
    image: "/images/article/kimetsu.png",
  },
  {
    id: "t3",
    title:
      "Presiden Prabowo Larang Rakyat Spam Spiki Cuayo Di Sosmed, Mengganggu Kedaulatan",
    image: "/images/article/prabowo-spiki.png",
  },
  {
    id: "t4",
    title:
      "Bukankah Ini MY? Inilah Sosok Hiura Mihate Waifu Admin RyRentCos Yang Imup Kyut",
    image: "/images/article/hiura.png",
  },
];

const POPULAR_ANIMANGA: NewsItem[] = [
  {
    id: "a1",
    title:
      "Demon Slayer: Infinity Castle Sukses Besar, Film Terlaris ke-3 di Jepang",
    image: "/images/article/kimetsu.png",
    category: "AniManga",
  },
  {
    id: "a2",
    title:
      "Anime Makeine: Too Many Losing Heroines! Umumkan Musim Kedua, Ini Detail Lengkapnya",
    image: "/images/article/makeine.png",
    category: "AniManga",
  },
  {
    id: "a3",
    title:
      "6 Rekomendasi Anime Isekai Terbaru 2025, Ada Isekai Quartet Season 3",
    image: "/images/article/isekai-quartet.png",
    category: "AniManga",
  },
  {
    id: "a4",
    title:
      "Tayang Tahun 2026, Fire Force Season 3 Part 2 Siap Akhiri Perjalanan Company 8!",
    image: "/images/article/fire-force.png",
    category: "AniManga",
  },
];

const POPULAR_IRL: NewsItem[] = [
  {
    id: "i1",
    title:
      "Fans Meisho Doto Umamusume Berhasil Kumpulkan Dana ¥94 Juta untuk Bangun Kembali Kandang Kuda Aslinya",
    image: "/images/article/meisho-doto.png",
    category: "IRL Event",
  },
  {
    id: "i2",
    title:
      "Status Facebook 6 Wibu Akut Berimajinasi Punya Istri Anime Ini Nyeleneh, Kocak Wibu-wibu ini sudah tak tertolong.",
    image: "/images/article/status-facebook.png",
    category: "IRL Event",
  },
  {
    id: "i3",
    title: "Ada Wibu hingga Wota, 10 Kata Bahasa Jepang Ini Telah Diakui KBBI",
    image: "/images/article/bahasa-jepang-kbbi.png",
    category: "IRL Event",
  },
  {
    id: "i4",
    title:
      "Imbas Banyak Remaja Kecanduan Currency Wars, Pemerintah Berencana Batasi Game Honkai: Star Rail",
    image: "/images/article/currency-war.png",
    category: "IRL Event",
  },
];

const POPULAR_GORENGAN: NewsItem[] = [
  {
    id: "g1",
    title:
      "Usai viral dan ramai dikritik, Motion Ime Festival batal menghadirkan Bulgogi sebagai Guest",
    image: "/images/article/bulgogi.png",
    category: "Gorengan",
  },
  {
    id: "g2",
    title:
      "Genshin Digoreng GPU Nangis Di Pojokan. Wuthering Waves Dan Uma Musume Raih Penghargaan Game Of The Year",
    image: "/images/article/genshin-digoreng.png",
    category: "Gorengan",
  },
  {
    id: "g3",
    title:
      "Waduh Gosong Chef Drama Cosplayer Rental Pacar Bikin Ulah Lagi, Thalia Lia",
    image: "/images/article/drama-rental-pacar.png",
    category: "Gorengan",
  },
  {
    id: "g4",
    title:
      "Edan Taktik Dukun Drama Cosplayer Momoruchan Selingkuh Ama Gus Samsudin",
    image: "/images/article/edan-taktik.png",
    category: "Gorengan",
  },
];

const LATEST: LatestItem[] = [
  {
    id: "l1",
    title:
      "Usai viral dan ramai dikritik, Motion Ime Festival batal menghadirkan Bulgogi sebagai Guest",
    image: "/images/article/bulgogi.png",
    date: "18 Desember 2025",
    time: "12.03",
  },
  {
    id: "l2",
    title:
      "Fans Meisho Doto Umamusume Berhasil Kumpulkan Dana ¥94 Juta untuk Bangun Kembali Kandang Kuda Aslinya",
    image: "/images/article/meisho-doto.png",
    date: "18 Desember 2025",
    time: "10.13",
  },
  {
    id: "l3",
    title:
      "Anime Makeine: Too Many Losing Heroines! Umumkan Musim Kedua, Ini Detail Lengkapnya",
    image: "/images/article/makeine.png",
    date: "18 Desember 2025",
    time: "09.10",
  },
];

/* ============================================================
   SECTION-SPECIFIC COMPONENTS
   ============================================================ */

/**
 * Otaku News title — display font, text-center, dengan title divider pendek.
 */
function OtakuTitle() {
  return (
    <div className="flex w-full max-w-[548px] flex-col items-center text-center">
      <h1 className="font-display text-4xl font-normal leading-tight text-brand-red sm:text-5xl sm:leading-[58px]">
        Otaku News
      </h1>
      <TitleDivider />
    </div>
  );
}

/**
 * Search bar — solid white (95% opacity) untuk kontras lebih baik di atas pink bg.
 */
function SearchBar() {
  return (
    <div className="mx-auto flex h-12 w-full max-w-[739px] items-center justify-between overflow-hidden rounded-3xl bg-white/95 px-7 shadow-[0_1px_2px_2px_rgba(0,0,0,0.20)] backdrop-blur-sm">
      <input
        type="text"
        placeholder="Cari Berita atau Gorengan yang lagi panas"
        className="flex-1 bg-transparent text-sm font-bold leading-5 text-black outline-none placeholder:text-black/80"
      />
      <button
        type="button"
        aria-label="Search"
        className="shrink-0 text-black transition-colors hover:text-brand-red active:scale-95"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </button>
    </div>
  );
}

/**
 * Big featured trending card — full-width single image.
 * Overlay: solid black/45 (bukan gradient — text lebih konsisten terbaca).
 */
function TrendingHeroCard({ item }: { item: TrendingItem }) {
  return (
    <article className="group relative h-64 w-full overflow-hidden rounded-[20px] bg-zinc-300 shadow-[0_0_16px_2px_rgba(0,0,0,0.12)] md:h-[465px]">
      <Image
        src={item.image}
        alt={item.title}
        fill
        sizes="(min-width: 768px) 1120px, 100vw"
        priority
        className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
      />

      {/* Solid overlay (bukan gradient) — text terbaca konsisten di semua image */}
      <div className="absolute inset-x-0 bottom-0 flex h-28 flex-col justify-end bg-black/45 px-4 pb-3 pt-10 md:h-40 md:px-6">
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-brand-red-soft px-2 py-0.5 text-xs font-bold uppercase tracking-wider text-white">
            Editor&apos;s Pick
          </span>
          <span className="text-xs text-white/70">Desember 2025</span>
        </div>
        <h3 className="line-clamp-2 mt-1 text-base font-bold leading-tight text-white drop-shadow-md md:mt-2 md:text-3xl md:leading-tight">
          {item.title}
        </h3>
      </div>
    </article>
  );
}

/**
 * Small trending card — image + solid black/45 bottom + mint accent bar.
 * + subtle hover: scale image (biar kerasa interaktif)
 */
function TrendingSmallCard({ item }: { item: TrendingItem }) {
  return (
    <article className="group relative h-48 w-full overflow-hidden rounded-[20px] bg-zinc-300 shadow-[0_0_16px_2px_rgba(0,0,0,0.12)] transition-shadow hover:shadow-[0_0_20px_2px_rgba(0,0,0,0.18)]">
      <Image
        src={item.image}
        alt={item.title}
        fill
        sizes="(min-width: 768px) 320px, 100vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-x-0 bottom-0 h-16 overflow-hidden">
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute left-0 top-0 h-full w-1 bg-brand-mint-soft" />
        <div className="absolute left-4 top-2 right-4 bottom-0 flex items-center">
          <h3 className="line-clamp-2 text-base font-bold leading-6 text-white drop-shadow-sm md:text-xl">
            {item.title}
          </h3>
        </div>
      </div>
    </article>
  );
}

/**
 * Trending News wrapper.
 */
function TrendingSection() {
  const [hero, ...small] = TRENDING;

  return (
    <div className="flex w-full flex-col gap-4">
      <h2 className="text-2xl font-bold leading-8 text-black">Trending News</h2>

      <div className="flex w-full flex-col gap-10">
        <TrendingHeroCard item={hero} />

        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-3 md:gap-10">
          {small.map((item) => (
            <TrendingSmallCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Category "pajangan" button — DECORATIVE ONLY.
 */
function CategoryPajanganButton({ label }: { label: string }) {
  return (
    <div
      aria-hidden="true"
      className="flex h-12 w-full items-center justify-center rounded-[20px] bg-brand-red px-3 sm:h-16 sm:px-5"
    >
      <span className="text-center text-sm font-extrabold leading-tight text-white sm:text-lg md:text-2xl">
        {label}
      </span>
    </div>
  );
}

/**
 * 3 Category "pajangan" row.
 */
function CategoryPajanganRow() {
  return (
    <div className="flex w-full flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:justify-center sm:gap-12">
      <CategoryPajanganButton label="Berita AniManga" />
      <CategoryPajanganButton label="Berita IRL / Event" />
      <CategoryPajanganButton label='Drama "Gorengan"' />
    </div>
  );
}

/**
 * Popular news card — compact 260×335, responsively distributed.
 * - Card: 260×335 (w-[260px] h-[335px])
 * - Image: ~210×168 (maintain ~1.25 ratio, scaled 5% down)
 * - Container: flex-1 dengan max-w (4 cards muat di 1120px container)
 * - Title: min-h tetap reserve 3 baris (konsistensi layout)
 */
function PopularCard({ item }: { item: NewsItem }) {
  return (
    <article className="flex w-full max-w-[260px] shrink-0 grow basis-0 flex-col gap-2 overflow-hidden rounded-[10px] bg-white md:w-[210px]">
      <div className="relative aspect-[5/4] w-full shrink-0 overflow-hidden rounded-[5px] bg-zinc-100 shadow-[2px_-2px_4px_0_rgba(0,0,0,0.25)]">
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(max-width: 768px) 260px, 210px"
          className="object-cover"
        />
      </div>

      <div className="flex flex-col gap-1">
        <Badge>{item.category}</Badge>
        <h3 className="line-clamp-3 min-h-[2.75rem] text-sm font-bold leading-tight text-black">
          {item.title}
        </h3>
      </div>
    </article>
  );
}

/**
 * Single Popular section — Figma: 1120×367 wrapper dengan ring halus untuk depth.
 * - Mobile: carousel 1 card + prev/next arrows
 * - Desktop: 4 cards centered
 */
function PopularSection({
  title,
  items,
}: {
  title: string;
  items: NewsItem[];
}) {
  const [step, setStep] = useState(0);
  const total = items.length;
  const prev = () => setStep((s) => (s - 1 + total) % total);
  const next = () => setStep((s) => (s + 1) % total);

  return (
    <div className="flex w-full flex-col gap-4">
      <SectionTitle title={title} />

      {/* Mobile carousel — 1 card centered with arrows */}
      <div className="relative overflow-hidden rounded-[20px] bg-white p-4 shadow-[0_0_16px_2px_rgba(0,0,0,0.12)] ring-1 ring-zinc-100 md:hidden">
        <div className="flex items-center justify-center">
          <PopularCard item={items[step]} />
        </div>

        {/* Prev button */}
        <button
          type="button"
          onClick={prev}
          aria-label="Previous article"
          className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full border-[3px] border-brand-red-soft bg-white p-1.5 text-brand-red shadow-lg transition hover:scale-105"
        >
          <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Next button */}
        <button
          type="button"
          onClick={next}
          aria-label="Next article"
          className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full border-[3px] border-brand-red-soft bg-white p-1.5 text-brand-red shadow-lg transition hover:scale-105"
        >
          <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
            <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Dots */}
        <div className="mt-3 flex justify-center gap-1.5">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setStep(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2 rounded-full transition-all ${
                step === i ? "w-6 bg-brand-red-soft" : "w-2 bg-brand-red-soft/40"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Desktop — original 4-card row */}
      <div className="relative hidden h-[380px] w-full overflow-hidden rounded-[20px] bg-white shadow-[0_0_16px_2px_rgba(0,0,0,0.12)] ring-1 ring-zinc-100 md:block">
        <div className="absolute inset-x-[26px] top-1/2 flex -translate-y-1/2 flex-row items-center justify-between gap-10 overflow-x-auto pb-4 lg:overflow-visible lg:pb-0">
          {items.map((item) => (
            <PopularCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Latest Update card — compact, snug layout (no excess whitespace).
 * - Image: 208×176 left
 * - Content: items-start (top-aligned), tight gap, no center-justify
 */
function LatestCard({ item }: { item: LatestItem }) {
  return (
    <article className="flex w-full flex-col gap-4 overflow-hidden rounded-[10px] bg-white p-4 shadow-[2px_2px_8px_0_rgba(0,0,0,0.25)] sm:h-44 sm:flex-row sm:items-stretch sm:gap-5 sm:p-5">
      <div className="relative h-44 w-full shrink-0 overflow-hidden rounded-[5px] bg-zinc-100 sm:h-full sm:w-52">
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(min-width: 640px) 208px, 100vw"
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col items-start justify-center gap-2 sm:gap-3">
        <h3 className="line-clamp-2 text-base font-bold leading-snug text-black md:text-xl">
          {item.title}
        </h3>
        <p className="text-sm font-bold leading-5 text-brand-red md:text-base">
          {item.date}
        </p>
        <p className="text-sm font-bold leading-5 text-brand-red md:text-base">
          {item.time}
        </p>
      </div>
    </article>
  );
}

/**
 * "Lihat Selengkapnya" CTA — icon panah dikecilkan sedikit supaya proporsional.
 */
function SeeAllButton() {
  return (
    <Link
      href="/customer/article/article-list"
      className="inline-flex h-12 w-full max-w-[472px] items-center gap-3 overflow-hidden rounded-[43px] bg-brand-red px-6 text-base font-bold text-white shadow-md transition-all hover:bg-brand-red-soft hover:shadow-lg active:scale-[0.98] sm:h-14 sm:gap-4 sm:px-8 sm:text-xl md:h-16 md:text-2xl"
    >
      <span className="flex-1 text-center md:text-left">Lihat Selanjutnya</span>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        className="hidden shrink-0 md:block md:h-8 md:w-8"
      >
        <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
      </svg>
    </Link>
  );
}

/**
 * Latest Update section.
 */
function LatestSection() {
  return (
    <div className="flex w-full flex-col items-center gap-16">
      <div className="flex w-full max-w-[548px] flex-col items-center text-center">
        <h2 className="font-display text-4xl font-normal leading-tight text-brand-red sm:text-5xl sm:leading-[58px]">
          Lastest Update
        </h2>
        <TitleDivider />
      </div>

      <div className="flex w-full flex-col gap-12">
        {LATEST.map((item) => (
          <LatestCard key={item.id} item={item} />
        ))}
      </div>

      <SeeAllButton />
    </div>
  );
}

/* ============================================================
   PAGE
   ============================================================ */
export default function ArticleArchivePage() {
  return (
    <div className="min-h-screen w-full bg-brand-base-soft">
      <div className="mx-auto w-full max-w-[1129px] px-4 pb-16 pt-10 md:px-6 lg:px-0">
        <div className="flex flex-col items-center gap-16">
          {/* Title */}
          <OtakuTitle />

          {/* Search */}
          <SearchBar />

          {/* Trending + Categories (pajangan) */}
          <div className="flex w-full flex-col items-center gap-12">
            <TrendingSection />
            <CategoryPajanganRow />
          </div>

          {/* 3 Popular Sections — semua tampil statis */}
          <div className="flex w-full flex-col gap-12">
            <PopularSection
              title="Popular AniManga News"
              items={POPULAR_ANIMANGA}
            />
            <PopularSection
              title="Popular IRL Event News"
              items={POPULAR_IRL}
            />
            <PopularSection
              title='Popular Drama "Gorengan" News'
              items={POPULAR_GORENGAN}
            />
          </div>

          {/* Latest Update */}
          <div className="w-full">
            <LatestSection />
          </div>
        </div>
      </div>
    </div>
  );
}
