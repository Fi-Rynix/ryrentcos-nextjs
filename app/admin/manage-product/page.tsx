"use client";

import Image from "next/image";
import { useState } from "react";
import ProductCreateModal from "./_components/ProductCreateModal";
import ProductEditModal from "./_components/ProductEditModal";
import ProductDeleteDialog from "./_components/ProductDeleteDialog";

/* ============================================================
   TYPES
   ============================================================ */
type Badge = "trending" | "brandNew" | "topSelling";
type Size = "S" | "M" | "L" | "XL" | "XXL";

interface Product {
  id: string;
  name: string;
  price: number;
  discount: number;
  description: string;
  sizes: Size[];
  images: string[];
  detailImage: string;
  badges: Badge[];
  category: "fullset" | "wig" | "props";
}

/* ============================================================
   MOCK DATA
   ============================================================ */
const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "(Fullset) Cosplay Columbina - Genshin Impact",
    price: 105000,
    discount: 30,
    description:
      "Cosplay fullset Columbina dari game Genshin Impact ini dirancang untuk menghidupkan karakter Fatui Harbinger yang misterius dan elegan. Kostum berwarna dominan putih dan biru muda dengan detail sayap malaikat, ornamen kristal, dan elemen fantasi yang rumit.",
    sizes: ["M", "L", "XL"] as Size[],
    images: [
      "/images/fullset/columbina.png",
    ],
    detailImage: "/images/product-detail/columbina-size.png",
    badges: ["trending", "brandNew"],
    category: "fullset",
  },
  {
    id: "2",
    name: "(Fullset) Cosplay Durin - Genshin Impact",
    price: 105000,
    discount: 30,
    description:
      "Cosplay fullset Durin dari game Genshin Impact. Kostum dengan desain yang detal dan premium.",
    sizes: ["M", "L", "XL"] as Size[],
    images: [
      "/images/fullset/durin.png",
    ],
    detailImage: "/images/product-detail/columbina-size.png",
    badges: ["trending", "brandNew"],
    category: "fullset",
  },
  {
    id: "3",
    name: "(Fullset) Cosplay Firefly My Istri - Honkai: Star Rail",
    price: 150000,
    discount: 0,
    description:
      "Cosplay fullset Firefly dari Honkai: Star Rail dengan desain yang detail dan warna yang akurat.",
    sizes: ["M", "L", "XL"] as Size[],
    images: [
      "/images/fullset/firefly.png",
    ],
    detailImage: "/images/product-detail/columbina-size.png",
    badges: ["trending"],
    category: "fullset",
  },
  {
    id: "4",
    name: "(Fullset) Cosplay Hosou Marine - Hololive",
    price: 150000,
    discount: 0,
    description:
      "Cosplay fullset Hosou Marine dari Hololive dengan desain yang unik dan menarik.",
    sizes: ["M", "L", "XL"] as Size[],
    images: [
      "/images/fullset/marine.png",
    ],
    detailImage: "/images/product-detail/columbina-size.png",
    badges: [],
    category: "fullset",
  },
];

/* ============================================================
   CONSTANTS
   ============================================================ */
const TABS = [
  { key: "all", label: "Semua", count: MOCK_PRODUCTS.length },
  { key: "fullset", label: "Fullset", count: MOCK_PRODUCTS.filter((p) => p.category === "fullset").length },
  { key: "wig", label: "Wig", count: MOCK_PRODUCTS.filter((p) => p.category === "wig").length },
  { key: "props", label: "Props", count: MOCK_PRODUCTS.filter((p) => p.category === "props").length },
];

/* ============================================================
   HELPERS
   ============================================================ */
function formatPrice(price: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
}

/* ============================================================
   PRODUCT CARD
   ============================================================ */
function ProductCard({
  product,
  onEdit,
  onDelete,
}: {
  product: Product;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="w-64 overflow-hidden rounded-[10px] bg-white shadow-[0px_4px_8px_0px_rgba(0,0,0,0.12)]">
      {/* Image - top-left aligned */}
      <div className="relative h-56 overflow-hidden rounded-[10px] bg-red-50">
        <Image
          src={product.images[0] || "/images/placeholder.png"}
          alt={product.name}
          fill
          className="object-cover object-left-top"
        />
      </div>

      {/* Description */}
      <div className="flex flex-col gap-[5px] p-4">
        {/* Badges */}
        <div className="flex flex-wrap items-center gap-[5px]">
          {product.badges.includes("trending") && (
            <span className="inline-flex h-5 items-center justify-center rounded-sm bg-orange-800 px-2 text-xs font-bold text-white">
              Trending
            </span>
          )}
          {product.badges.includes("brandNew") && (
            <span className="inline-flex h-5 items-center justify-center rounded-sm bg-orange-300 px-2 text-xs font-bold text-red-800">
              Brand New
            </span>
          )}
          {product.badges.includes("topSelling") && (
            <span className="inline-flex h-5 items-center justify-center rounded-sm bg-teal-300 px-2 text-xs font-bold text-red-800">
              Top Selling
            </span>
          )}
          {product.sizes.length > 0 && (
            <span className="inline-flex h-5 items-center justify-center rounded-sm bg-teal-300 px-2 text-xs font-bold text-red-800">
              {product.sizes.join(", ")}
            </span>
          )}
        </div>

        {/* Title */}
        <div className="h-9">
          <p className="line-clamp-2 text-sm font-bold leading-[18px] text-black">
            {product.name}
          </p>
        </div>

        {/* Price */}
        <div className="flex flex-col gap-[5px]">
          <span className="text-sm font-bold leading-4 text-orange-800">
            {formatPrice(product.price)}
          </span>
          <span className="text-xs leading-3 text-neutral-600">
            For 3 Days
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-2 px-4 pb-4">
        <button
          type="button"
          onClick={onDelete}
          className="flex h-8 w-full items-center justify-center gap-2 rounded-lg border border-red-200 bg-white text-sm font-bold text-red-600 transition hover:bg-red-50"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path
              d="M6.66211 7.32812V11.3253M9.32715 7.32812V11.3253M12.6578 3.99707V13.3238C12.6578 13.6772 12.5174 14.0161 12.2675 14.2659C12.0177 14.5158 11.6788 14.6562 11.3254 14.6562H4.66344C4.31007 14.6562 3.97117 14.5158 3.7213 14.2659C3.47143 14.0161 3.33105 13.6772 3.33105 13.3238V3.99707M1.99902 3.99707H13.9905M5.3291 3.9973V2.66491C5.3291 2.31154 5.46948 1.97264 5.71935 1.72277C5.96922 1.4729 6.30812 1.33252 6.66149 1.33252H9.32627C9.67964 1.33252 10.0185 1.4729 10.2684 1.72277C10.5183 1.97264 10.6587 2.31154 10.6587 2.66491V3.9973"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Hapus
        </button>
        <button
          type="button"
          onClick={onEdit}
          className="flex h-8 w-full items-center justify-center gap-2 rounded-lg border border-black/10 bg-white text-sm font-bold text-neutral-950 transition hover:bg-zinc-50"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path
              d="M7.99477 1.99854H3.33141C2.97804 1.99854 2.63914 2.13891 2.38927 2.38878C2.1394 2.63865 1.99902 2.97755 1.99902 3.33092V12.6576C1.99902 13.011 2.1394 13.3499 2.38927 13.5998C2.63914 13.8497 2.97804 13.99 3.33141 13.99H12.6581C13.0115 13.99 13.3504 13.8497 13.6003 13.5998C13.8501 13.3499 13.9905 13.011 13.9905 12.6576V7.99428M12.2416 1.74888C12.5066 1.48385 12.8661 1.33496 13.2409 1.33496C13.6157 1.33496 13.9751 1.48385 14.2402 1.74888C14.5052 2.01391 14.6541 2.37337 14.6541 2.74817C14.6541 3.12298 14.5052 3.48243 14.2402 3.74746L8.23575 9.75254C8.07756 9.91059 7.88214 10.0263 7.66749 10.089L5.75351 10.6486C5.69619 10.6653 5.63542 10.6663 5.57758 10.6515C5.51973 10.6366 5.46693 10.6066 5.42471 10.5643C5.38249 10.5221 5.35239 10.4693 5.33757 10.4115C5.32275 10.3536 5.32375 10.2929 5.34047 10.2355L5.90008 8.32155C5.96305 8.10707 6.07897 7.91188 6.23717 7.75395L12.2416 1.74888Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Edit
        </button>
      </div>
    </div>
  );
}

/* ============================================================
   PAGE COMPONENT
   ============================================================ */
export default function ManageProductPage() {
  // State
  const [products] = useState<Product[]>(MOCK_PRODUCTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  // Modal state
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Filter logic
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeTab === "all" || product.category === activeTab;
    return matchesSearch && matchesCategory;
  });

  // Modal handlers
  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setShowEditModal(true);
  };

  const handleDelete = (product: Product) => {
    setSelectedProduct(product);
    setShowDeleteDialog(true);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header Actions */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Search */}
        <div className="relative flex-1 lg:max-w-md">
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M13.9899 13.9899L11.0986 11.0986M7.32858 12.6576C10.272 12.6576 12.6581 10.2715 12.6581 7.32809C12.6581 4.38466 10.272 1.99854 7.32858 1.99854C4.38515 1.99854 1.99902 4.38466 1.99902 7.32809C1.99902 10.2715 4.38515 12.6576 7.32858 12.6576Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <input
            type="text"
            placeholder="Cari produk..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-9 w-full rounded-lg border border-zinc-100 bg-zinc-100 pl-10 pr-3 text-sm text-zinc-800 placeholder:text-zinc-400 focus:border-brand-red focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-red/20"
          />
        </div>

        {/* Add Button */}
        <button
          type="button"
          onClick={() => setShowCreateModal(true)}
          className="flex h-9 items-center justify-center gap-2 rounded-lg bg-orange-800 px-4 text-sm font-bold text-white transition hover:bg-orange-700"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M3.33105 7.99414H12.6578M7.99414 3.33105V12.6578"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Tambah Produk
        </button>
      </div>

      {/* Tab List */}
      <div className="flex justify-center gap-1 overflow-x-auto rounded-2xl bg-red-50 p-1">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(tab.key)}
            className={`relative flex h-7 min-w-[120px] shrink-0 items-center justify-center gap-2 rounded-xl px-4 text-sm font-bold transition-all duration-200 ${
              activeTab === tab.key
                ? "bg-white text-orange-800 shadow-sm"
                : "text-neutral-500 hover:text-neutral-800"
            }`}
          >
            <span>{tab.label}</span>
            <span className={`flex h-5 min-w-[20px] items-center justify-center rounded-full px-1.5 text-xs transition-colors ${
              activeTab === tab.key
                ? "bg-orange-800 text-white"
                : "bg-neutral-200 text-neutral-600"
            }`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="flex flex-wrap justify-center gap-5">
        {filteredProducts.length === 0 ? (
          <div className="flex w-full flex-col items-center justify-center gap-3 py-12">
            <svg
              className="text-zinc-300"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="text-sm text-zinc-500">
              Tidak ada produk yang ditemukan
            </p>
          </div>
        ) : (
          filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onEdit={() => handleEdit(product)}
              onDelete={() => handleDelete(product)}
            />
          ))
        )}
      </div>

      {/* Modals */}
      {showCreateModal && (
        <ProductCreateModal onClose={() => setShowCreateModal(false)} />
      )}

      {showEditModal && selectedProduct && (
        <ProductEditModal
          product={selectedProduct}
          onClose={() => {
            setShowEditModal(false);
            setSelectedProduct(null);
          }}
        />
      )}

      {showDeleteDialog && selectedProduct && (
        <ProductDeleteDialog
          product={selectedProduct}
          onClose={() => {
            setShowDeleteDialog(false);
            setSelectedProduct(null);
          }}
        />
      )}
    </div>
  );
}
