"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { TitleDivider } from "@/app/customer/_components/layout";

/* ============================================================
   TYPES
   ============================================================ */
type ProductLabel = "Trending" | "Brand New" | "Top Selling" | "HQ Wig" | "HQ Prop" | "M, L, XL";

type ProductItem = {
  id: string;
  title: string;
  image: string;
  originalPrice?: number;
  discountPrice?: number;
  price: number;
  labels: ProductLabel[];
};

/* ============================================================
   MOCK DATA — replace with real API later
   ============================================================ */
const POPULAR_PRODUCTS: ProductItem[] = [
  {
    id: "p1",
    title: "(Fullset) Cosplay Columbina - Genshin Impact",
    image: "/images/fullset/columbina.png",
    originalPrice: 150000,
    discountPrice: 105000,
    price: 105000,
    labels: ["Trending", "Brand New"],
  },
  {
    id: "p2",
    title: "(Fullset) Cosplay Durin - Genshin Impact",
    image: "/images/fullset/durin.png",
    originalPrice: 150000,
    discountPrice: 105000,
    price: 105000,
    labels: ["Trending", "Brand New"],
  },
  {
    id: "p3",
    title: "(Fullset) Cosplay Firefly My Istri - Honkai: Star Rail",
    image: "/images/fullset/firefly.png",
    price: 150000,
    labels: ["Trending", "Brand New"],
  },
  {
    id: "p4",
    title: "(Fullset) Cosplay Archetype: Earth - Fate G...",
    image: "/images/fullset/archetype.png",
    price: 150000,
    labels: ["Trending", "Brand New"],
  },
  {
    id: "p5",
    title: "(Fullset) Cosplay Phainon - Honkai: Star Rail",
    image: "/images/fullset/phainon.png",
    price: 150000,
    labels: ["Trending", "Brand New"],
  },
];

const CATALOG_PRODUCTS: ProductItem[] = [
  {
    id: "c1",
    title: "(Fullset) Cosplay Columbina - Genshin Imp...",
    image: "/images/fullset/columbina.png",
    originalPrice: 150000,
    discountPrice: 105000,
    price: 105000,
    labels: ["Trending", "Brand New", "M, L, XL"],
  },
  {
    id: "c2",
    title: "(Fullset) Cosplay Durin - Genshin Impact",
    image: "/images/fullset/durin.png",
    originalPrice: 150000,
    discountPrice: 105000,
    price: 105000,
    labels: ["Trending", "Brand New", "M, L, XL"],
  },
  {
    id: "c3",
    title: "(Fullset) Cosplay Firefly My Istri - Honkai: Star Rail",
    image: "/images/fullset/firefly.png",
    price: 150000,
    labels: ["Trending", "M, L, XL"],
  },
  {
    id: "c4",
    title: "(Fullset) Cosplay Kirigaya Kazuto - Sword Art Online",
    image: "/images/fullset/kirito.png",
    price: 150000,
    labels: ["Top Selling", "M, L, XL"],
  },
  {
    id: "c5",
    title: "(Fullset) Cosplay Suisei Hoshimachi - Hololive",
    image: "/images/fullset/suisei.png",
    price: 150000,
    labels: ["M, L, XL"],
  },
  {
    id: "c6",
    title: "(Fullset) Cosplay Hosou Marine - Hololive",
    image: "/images/fullset/marine.png",
    price: 150000,
    labels: ["M, L, XL"],
  },
  {
    id: "c7",
    title: "(Wig) Cosplay Rafayel - Love And Deepspace",
    image: "/images/wig/rafayel.png",
    price: 60000,
    labels: ["HQ Wig"],
  },
  {
    id: "c8",
    title: "(Wig) Cosplay Venti - Genshin Impact",
    image: "/images/wig/venti.png",
    price: 60000,
    labels: ["HQ Wig"],
  },
  {
    id: "c9",
    title: "(Wig) Cosplay Akiyama Mizuki - Project Sekai Col...",
    image: "/images/wig/mizuki.png",
    price: 60000,
    labels: ["HQ Wig"],
  },
  {
    id: "c10",
    title: "(Props) Phainon Sword - Honkai: Star Rail",
    image: "/images/prop/phainon.png",
    price: 50000,
    labels: ["HQ Prop"],
  },
  {
    id: "c11",
    title: "(Props) Arlecchino Spear - Genshin Impact",
    image: "/images/prop/arlecchino.png",
    price: 50000,
    labels: ["HQ Prop"],
  },
  {
    id: "c12",
    title: "(Props) Durin Sword - Genshin Impact",
    image: "/images/prop/durin.png",
    price: 50000,
    labels: ["HQ Prop"],
  },
];

/* ============================================================
   HELPER FUNCTIONS
   ============================================================ */
function formatPrice(price: number): string {
  return `IDR ${price.toLocaleString("id-ID")}`;
}

/* ============================================================
   SECTION COMPONENTS
   ============================================================ */

/**
 * Page title — "Product Catalog" dengan display font + title divider.
 */
function PageTitle() {
  return (
    <div className="flex w-full max-w-[548px] flex-col items-center text-center">
      <h1 className="font-display text-5xl font-normal leading-[58px] text-brand-red">
        Product Catalog
      </h1>
      <TitleDivider />
    </div>
  );
}

/**
 * Search bar — solid white dengan icon search.
 */
function SearchBar() {
  return (
    <div className="mx-auto flex h-12 w-full max-w-[739px] items-center justify-between overflow-hidden rounded-3xl bg-white px-7 shadow-[0px_1px_2px_2px_rgba(0,0,0,0.20)]">
      <input
        type="text"
        placeholder="Temukan Kebutuhan Cosplay-mu!"
        className="flex-1 bg-transparent text-sm font-bold leading-5 text-black outline-none placeholder:text-black/80"
      />
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="shrink-0 text-black"
        aria-hidden="true"
      >
        <path d="M10.7599 13.2401C8.41988 10.9001 8.41988 7.10012 10.7599 4.75012C13.0999 2.41012 16.8999 2.41012 19.2499 4.75012C21.5899 7.09012 21.5899 10.8901 19.2499 13.2401C16.9099 15.5801 13.1099 15.5801 10.7599 13.2401Z" />
        <path d="M10.5 13.5L3 21" />
      </svg>
    </div>
  );
}

/**
 * Label badge berdasarkan jenisnya.
 */
function ProductLabelBadge({ label }: { label: ProductLabel }) {
  const styles = {
    "Trending": "bg-orange-800 text-white",
    "Brand New": "bg-orange-300 text-brand-red",
    "Top Selling": "bg-orange-300 text-brand-red",
    "HQ Wig": "bg-orange-800 text-white",
    "HQ Prop": "bg-orange-800 text-white",
    "M, L, XL": "bg-teal-300 text-brand-red",
  };

  return (
    <span className={`inline-flex h-5 w-fit items-center rounded-sm px-1.5 text-xs font-bold leading-3 ${styles[label]}`}>
      {label}
    </span>
  );
}

/**
 * Price display — dengan optional discount strikethrough.
 */
function PriceDisplay({
  originalPrice,
  discountPrice,
  price,
}: {
  originalPrice?: number;
  discountPrice?: number;
  price: number;
}) {
  if (discountPrice && originalPrice) {
    return (
      <div className="flex flex-col gap-0.5">
        <div className="flex items-center gap-1">
          <span className="text-sm font-bold leading-4 text-orange-800 line-through">
            {formatPrice(originalPrice)}
          </span>
          <span className="text-xs font-bold leading-4 text-brand-red">
            {formatPrice(discountPrice)}
          </span>
        </div>
        <span className="text-xs leading-3 text-zinc-600">For 3 Days</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-sm font-bold leading-4 text-orange-800">
        {formatPrice(price)}
      </span>
      <span className="text-xs leading-3 text-zinc-600">For 3 Days</span>
    </div>
  );
}

/**
 * Popular product card — compact (208×320), sesuai Figma reference.
 */
function PopularProductCard({ item }: { item: ProductItem }) {
  return (
    <Link
      href="#"
      className="group flex h-[320px] w-[176px] shrink-0 flex-col overflow-hidden rounded-[10px] bg-white"
    >
      {/* Image */}
      <div className="relative h-[176px] w-full overflow-hidden rounded-[5px] bg-zinc-100 shadow-[2px_-2px_4px_0_rgba(0,0,0,0.25)]">
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="176px"
          className="object-cover"
        />
      </div>

      {/* Description */}
      <div className="mt-3 flex w-full flex-col gap-[5px]">
        {/* Labels */}
        <div className="flex flex-wrap items-center gap-[5px]">
          {item.labels.slice(0, 2).map((label) => (
            <ProductLabelBadge key={label} label={label} />
          ))}
        </div>

        {/* Title */}
        <h3 className="line-clamp-2 h-9 text-sm font-bold leading-[18px] text-black">
          {item.title}
        </h3>

        {/* Price */}
        <div className="flex flex-col gap-[5px]">
          <div className="flex items-center gap-[5px]">
            {item.originalPrice && item.discountPrice ? (
              <>
                <span className="text-sm font-bold leading-4 text-orange-800 line-through">
                  {formatPrice(item.originalPrice)}
                </span>
                <span className="text-xs font-bold leading-4 text-brand-red">
                  {formatPrice(item.discountPrice)}
                </span>
              </>
            ) : (
              <span className="text-sm font-bold leading-4 text-orange-800">
                {formatPrice(item.price)}
              </span>
            )}
          </div>
          <span className="text-xs leading-3 text-neutral-600">For 3 Days</span>
        </div>
      </div>
    </Link>
  );
}

/**
 * Catalog product card — larger (256×384).
 */
function CatalogProductCard({ item }: { item: ProductItem }) {
  return (
    <Link
      href="#"
      className="group flex h-[384px] w-[256px] shrink-0 flex-col overflow-hidden rounded-[10px] bg-white shadow-[0px_4px_8px_0px_rgba(0,0,0,0.12)]"
    >
      <div className="relative h-[224px] w-full overflow-hidden rounded-[10px] bg-brand-base-soft">
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="256px"
          className="object-cover object-left-top"
        />
      </div>

      <div className="mt-5 flex w-full flex-col gap-[5px] px-3">
        <div className="flex flex-wrap items-center gap-1">
          {item.labels.map((label) => (
            <ProductLabelBadge key={label} label={label} />
          ))}
        </div>
        <h3 className="line-clamp-2 text-sm font-bold leading-5 text-black">
          {item.title}
        </h3>
        <PriceDisplay
          originalPrice={item.originalPrice}
          discountPrice={item.discountPrice}
          price={item.price}
        />
      </div>
    </Link>
  );
}

/**
 * Popular Now section — horizontal scroll dengan 5 cards.
 */
function PopularSection() {
  return (
    <div className="flex w-full flex-col gap-4">
      <h3 className="text-2xl font-bold leading-8 text-black">Popular Now</h3>

      <div className="relative overflow-hidden rounded-[20px] bg-white p-[15px] pb-0 shadow-[0px_0px_16px_2px_rgba(0,0,0,0.12)]">
        <div className="flex items-center justify-center gap-10">
          {POPULAR_PRODUCTS.map((item) => (
            <PopularProductCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Filter option button.
 */
function FilterOption({
  label,
  isActive = false,
  onClick,
}: {
  label: string;
  isActive?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex h-8 w-full items-center rounded-[5px] px-4 text-sm font-bold leading-5 transition-colors ${
        isActive
          ? "bg-orange-300 text-black shadow-[0px_0px_4px_0px_rgba(0,0,0,0.00)]"
          : "bg-gray-200 text-black shadow-[0px_0px_4px_0px_rgba(0,0,0,0.00)]"
      }`}
    >
      {label}
    </button>
  );
}

/**
 * Filter panel — Kategori + Ukuran.
 */
function FilterPanel() {
  const [activeKategori, setActiveKategori] = useState("Semua");
  const [activeUkuran, setActiveUkuran] = useState<string | null>(null);

  return (
    <div className="flex w-56 shrink-0 flex-col gap-6">
      {/* Kategori filter */}
      <div className="flex flex-col gap-3 rounded-3xl bg-white p-6 shadow-[0px_0px_16px_2px_rgba(0,0,0,0.12)]">
        <div className="flex items-center gap-2.5">
          <svg
            width="19"
            height="18"
            viewBox="0 0 19 18"
            fill="none"
            className="text-brand-red"
          >
            <path
              d="M7.49986 15C7.49979 15.1549 7.54287 15.3067 7.62427 15.4385C7.70567 15.5702 7.82217 15.6767 7.9607 15.7459L9.62736 16.5792C9.75444 16.6427 9.89565 16.6727 10.0376 16.6662C10.1795 16.6598 10.3174 16.6172 10.4382 16.5425C10.559 16.4678 10.6588 16.3634 10.7279 16.2393C10.797 16.1152 10.8333 15.9754 10.8332 15.8334V10C10.8334 9.58703 10.9869 9.18879 11.264 8.88254L17.2832 2.22504C17.3911 2.10551 17.462 1.95728 17.4874 1.79828C17.5129 1.63928 17.4917 1.47632 17.4264 1.3291C17.3612 1.18189 17.2547 1.05673 17.1199 0.96875C16.985 0.880775 16.8275 0.833754 16.6665 0.833374H1.66653C1.50537 0.833432 1.34768 0.88022 1.21257 0.968071C1.07746 1.05592 0.97072 1.18107 0.905283 1.32834C0.839846 1.47562 0.818518 1.63871 0.843883 1.79787C0.869248 1.95702 0.940218 2.1054 1.0482 2.22504L7.06903 8.88254C7.34614 9.18879 7.49968 9.58703 7.49986 10V15Z"
              stroke="currentColor"
              strokeWidth="1.66667"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="font-display text-base leading-5 text-brand-red">
            Filter
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-sm font-extrabold leading-5 text-black">
            Kategori
          </span>
          <div className="flex flex-col gap-2">
            <FilterOption
              label="Semua"
              isActive={activeKategori === "Semua"}
              onClick={() => setActiveKategori("Semua")}
            />
            <FilterOption
              label="Fullset"
              isActive={activeKategori === "Fullset"}
              onClick={() => setActiveKategori("Fullset")}
            />
            <FilterOption
              label="Wig"
              isActive={activeKategori === "Wig"}
              onClick={() => setActiveKategori("Wig")}
            />
            <FilterOption
              label="Properties"
              isActive={activeKategori === "Properties"}
              onClick={() => setActiveKategori("Properties")}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-sm font-extrabold leading-5 text-black">
            Ukuran (Fullset)
          </span>
          <div className="flex flex-col gap-2">
            <FilterOption
              label="M"
              isActive={activeUkuran === "M"}
              onClick={() => setActiveUkuran(activeUkuran === "M" ? null : "M")}
            />
            <FilterOption
              label="L"
              isActive={activeUkuran === "L"}
              onClick={() => setActiveUkuran(activeUkuran === "L" ? null : "L")}
            />
            <FilterOption
              label="XL"
              isActive={activeUkuran === "XL"}
              onClick={() => setActiveUkuran(activeUkuran === "XL" ? null : "XL")}
            />
          </div>
        </div>
      </div>

      {/* Tanggal filter */}
      <div className="flex flex-col gap-3 rounded-3xl bg-white p-6 shadow-[0px_0px_16px_2px_rgba(0,0,0,0.12)]">
        <div className="flex items-center gap-2.5">
          <svg
            width="19"
            height="18"
            viewBox="0 0 19 18"
            fill="none"
            className="text-brand-red"
          >
            <path
              d="M7.49986 15C7.49979 15.1549 7.54287 15.3067 7.62427 15.4385C7.70567 15.5702 7.82217 15.6767 7.9607 15.7459L9.62736 16.5792C9.75444 16.6427 9.89565 16.6727 10.0376 16.6662C10.1795 16.6598 10.3174 16.6172 10.4382 16.5425C10.559 16.4678 10.6588 16.3634 10.7279 16.2393C10.797 16.1152 10.8333 15.9754 10.8332 15.8334V10C10.8334 9.58703 10.9869 9.18879 11.264 8.88254L17.2832 2.22504C17.3911 2.10551 17.462 1.95728 17.4874 1.79828C17.5129 1.63928 17.4917 1.47632 17.4264 1.3291C17.3612 1.18189 17.2547 1.05673 17.1199 0.96875C16.985 0.880775 16.8275 0.833754 16.6665 0.833374H1.66653C1.50537 0.833432 1.34768 0.88022 1.21257 0.968071C1.07746 1.05592 0.97072 1.18107 0.905283 1.32834C0.839846 1.47562 0.818518 1.63871 0.843883 1.79787C0.869248 1.95702 0.940218 2.1054 1.0482 2.22504L7.06903 8.88254C7.34614 9.18879 7.49968 9.58703 7.49986 10V15Z"
              stroke="currentColor"
              strokeWidth="1.66667"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="font-display text-base leading-5 text-brand-red">
            Filter Tanggal<br />Ketersediaan
          </span>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <span className="text-sm font-extrabold leading-5 text-black">
              Tanggal Mulai Sewa:
            </span>
            <div className="flex h-8 items-center rounded-[5px] bg-gray-200 px-4 text-sm font-bold leading-5 text-black">
              22/12/2025
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-sm font-extrabold leading-5 text-black">
              Tanggal Berakhir Sewa:
            </span>
            <div className="flex h-8 items-center rounded-[5px] bg-gray-200 px-4 text-sm font-bold leading-5 text-black">
              25/12/2025
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Catalog grid — menampilkan produk dengan filter.
 */
function CatalogGrid() {
  return (
    <div className="flex w-full flex-wrap items-start justify-center gap-2.5">
      {CATALOG_PRODUCTS.map((item) => (
        <CatalogProductCard key={item.id} item={item} />
      ))}
    </div>
  );
}

/**
 * Coming soon footer.
 */
function ComingSoon() {
  return (
    <div className="flex w-full items-center gap-7">
      <div className="h-0 flex-1 outline outline-1 outline-black opacity-30" />
      <span className="font-display text-2xl leading-8 text-brand-red opacity-30">
        More Items Coming Soon
      </span>
      <div className="h-0 flex-1 outline outline-1 outline-black opacity-30" />
    </div>
  );
}

/* ============================================================
   PAGE
   ============================================================ */
export default function ProductCatalogPage() {
  return (
    <div className="min-h-screen w-full bg-brand-base-soft">
      <div className="mx-auto w-full max-w-[1129px] px-4 pb-16 pt-10 md:px-6 lg:px-0">
        <div className="flex flex-col items-center gap-12">
          {/* Title */}
          <PageTitle />

          {/* Search */}
          <SearchBar />

          {/* Popular Now */}
          <PopularSection />

          {/* Separator */}
          <div className="h-0 w-full outline outline-1 outline-brand-red opacity-30" />

          {/* Filter + Catalog */}
          <div className="flex w-full flex-col gap-12 lg:flex-row lg:items-start">
            <FilterPanel />
            <div className="flex-1">
              <CatalogGrid />
            </div>
          </div>

          {/* Coming Soon */}
          <ComingSoon />
        </div>
      </div>
    </div>
  );
}