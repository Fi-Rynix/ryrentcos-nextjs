"use client";

import Link from "next/link";
import Image from "next/image";
import { TitleDivider } from "@/app/customer/_components/layout";

/* ============================================================
   TYPES
   ============================================================ */
type Level = "For Beginner" | "For Expert";

type VideoItem = {
  id: string;
  title: string;
  image: string;
  /** Tailwind classes to mimic Figma image object-position behavior */
  imageSizing: {
    width: number;
    height: number;
    objectPosition: string;
  };
  duration: string;
  level: Level;
};

/* ============================================================
   MOCK DATA — replace with real API later
   Images mapped ke asset yang sudah ada di /public/images
   ============================================================ */
const VIDEOS: VideoItem[] = [
  {
    id: "v1",
    title:
      "Cosplay Columbina Hyposelena (Genshin Impact) Costume, Accessories & Makeup Tutorial",
    image: "/images/cosplay-guide/columbina.png",
    imageSizing: { width: 384, height: 216, objectPosition: "center" },
    duration: "7 min 12 sec",
    level: "For Expert",
  },
  {
    id: "v2",
    title:
      "Cosplay Durin (Genshin Impact) Costume, Accessories & Makeup Tutorial",
    image: "/images/cosplay-guide/durin.png",
    imageSizing: { width: 384, height: 216, objectPosition: "center" },
    duration: "6 min 22 sec",
    level: "For Expert",
  },
  {
    id: "v3",
    title:
      "Cosplay Arthuria Pendragon - Saber (Fate Grand Order) Costume, Accessories & Makeup Tutorial",
    image: "/images/cosplay-guide/arthuria.png",
    imageSizing: { width: 384, height: 256, objectPosition: "center" },
    duration: "11 min 12 sec",
    level: "For Expert",
  },
  {
    id: "v4",
    title:
      "Cosplay Kirigaya Kazuto / Kirito (Sword Art Online) Costume, Accessories & Makeup Tutorial",
    image: "/images/cosplay-guide/kirito.png",
    imageSizing: { width: 387, height: 387, objectPosition: "center top" },
    duration: "5 min 12 sec",
    level: "For Beginner",
  },
  {
    id: "v5",
    title:
      "Cosplay Waguri Kaoruko (Kaoru Hana Wa Rin To Saku) Costume & Makeup Tutorial",
    image: "/images/cosplay-guide/waguri.png",
    imageSizing: { width: 391, height: 313, objectPosition: "center top" },
    duration: "6 min 12 sec",
    level: "For Beginner",
  },
  {
    id: "v6",
    title:
      "Cosplay Mizuki Akiyama (Project Sekai) Costume, Accessories & Makeup Tutorial",
    image: "/images/cosplay-guide/mizuki.png",
    imageSizing: { width: 384, height: 216, objectPosition: "center" },
    duration: "7 min 12 sec",
    level: "For Beginner",
  },
];

/* ============================================================
   PAGE TITLE — "Cosplay Guide" (display font, 548px width)
   ============================================================ */
function PageTitle() {
  return (
    <div className="mx-auto flex w-full max-w-[548px] flex-col items-center text-center">
      <h1 className="font-display text-4xl font-normal leading-tight text-brand-red sm:text-5xl sm:leading-[58px]">
        Cosplay Guide
      </h1>
      <TitleDivider />
    </div>
  );
}

/* ============================================================
   VIDEO CARD
   Figma: self-stretch h-56, rounded-[10px], shadow halus
   Inner: image 384×208 (left) | content 705px (right)
   ============================================================ */
function VideoCard({ item }: { item: VideoItem }) {
  return (
    <Link
      href="/customer/video/video-detail"
      className="group block w-full overflow-hidden rounded-[10px] bg-white shadow-[2px_2px_8px_0px_rgba(0,0,0,0.25)] transition-shadow hover:shadow-[4px_4px_12px_0px_rgba(0,0,0,0.3)]"
    >
      <div className="flex flex-col items-stretch gap-3 p-3 sm:h-56 sm:flex-row sm:items-center sm:gap-6 sm:p-1 lg:gap-10">
        {/* Image */}
        <div className="relative h-40 w-full shrink-0 overflow-hidden rounded-[5px] sm:h-52 sm:w-96">
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="(max-width: 640px) 100vw, 384px"
            className="object-cover"
            style={{ objectPosition: item.imageSizing.objectPosition }}
          />
          {/* Play button overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/40 sm:h-12 sm:w-12">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white" className="sm:h-5 sm:w-5">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex w-full flex-col items-start gap-2 sm:w-[705px] sm:gap-3">
          <h3 className="line-clamp-2 w-full text-base font-bold leading-6 text-black sm:text-xl sm:leading-7 lg:text-2xl lg:leading-9">
            {item.title}
          </h3>
          <div className="flex w-full items-center justify-between">
            <span className="text-sm font-bold leading-5 text-brand-red sm:text-base sm:leading-6 lg:text-xl">
              {item.duration}
            </span>
          </div>
          <div className="flex w-full items-center justify-between">
            <span className="text-sm font-bold leading-5 text-brand-red sm:text-base sm:leading-6 lg:text-xl">
              {item.level}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

/* ============================================================
   PAGINATION — numbered circles + left arrow
   Active page: filled bg-brand-red-soft white text
   Inactive: outlined circle brand-red-soft text-brand-red-soft
   ============================================================ */
function Pagination() {
  const pages = [1, 2, 3, 4];

  return (
    <div className="inline-flex items-center gap-5">
      {pages.map((page, index) => (
        <button
          key={page}
          type="button"
          className={`relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full text-2xl font-bold leading-8 transition-colors ${
            index === 0
              ? "bg-brand-red-soft text-white"
              : "border-2 border-brand-red-soft text-brand-red-soft hover:bg-brand-red-soft hover:text-white"
          }`}
        >
          {page}
        </button>
      ))}

      {/* Left arrow (prev) — same outlined style */}
      <button
        type="button"
        className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border-2 border-brand-red-soft text-brand-red-soft transition-colors hover:bg-brand-red-soft hover:text-white"
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
export default function VideoArchivePage() {
  return (
    <div className="min-h-screen w-full bg-red-50">
      <div className="mx-auto w-full max-w-[1129px] px-4 pb-16 pt-10 md:px-6 lg:px-0">
        <div className="flex flex-col items-center gap-16">
          {/* Title */}
          <PageTitle />

          {/* Video list */}
          <div className="flex w-full flex-col gap-6 sm:gap-12">
            {VIDEOS.map((item) => (
              <VideoCard key={item.id} item={item} />
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
