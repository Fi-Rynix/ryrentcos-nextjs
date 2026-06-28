"use client";

import Image from "next/image";
import { useState } from "react";
import ArticleCreateModal from "./_components/ArticleCreateModal";
import ArticleEditModal from "./_components/ArticleEditModal";
import ArticleDeleteDialog from "./_components/ArticleDeleteDialog";

/* ============================================================
   TYPES
   ============================================================ */
type Category = "AniManga" | "IRL Event" | "Gorengan";

interface Article {
  id: string;
  title: string;
  image: string;
  category: Category;
  createdAt: string;
}

/* ============================================================
   MOCK DATA
   ============================================================ */
const MOCK_ARTICLES: Article[] = [
  {
    id: "a1",
    title: "Anime Makeine: Too Many Losing Heroines! Umumkan Musim Kedua, Ini Detail Lengkapnya",
    image: "/images/article/makeine.png",
    category: "AniManga",
    createdAt: "18 Des 2025",
  },
  {
    id: "a2",
    title: "Demon Slayer: Infinity Castle Sukses Besar, Film Terlaris ke-3 Dalam Penayangan Pertamanya",
    image: "/images/article/kimetsu.png",
    category: "AniManga",
    createdAt: "17 Des 2025",
  },
  {
    id: "a3",
    title: "Fans Meisho Doto Umamusume Berhasil Kumpulkan Dana ¥94 Juta untuk Bangun Kembali Kandang Kuda Aslinya",
    image: "/images/article/meisho-doto.png",
    category: "IRL Event",
    createdAt: "16 Des 2025",
  },
  {
    id: "a4",
    title: "Usai viral dan ramai dikritik, Motion Ime Festival batal menghadirkan Bulgogi sebagai Guest",
    image: "/images/article/bulgogi.png",
    category: "Gorengan",
    createdAt: "15 Des 2025",
  },
  {
    id: "a5",
    title: "6 Rekomendasi Anime Isekai Terbaru 2025, Ada Isekai Quartet Season 3",
    image: "/images/article/isekai-quartet.png",
    category: "AniManga",
    createdAt: "14 Des 2025",
  },
  {
    id: "a6",
    title: "Imbas Banyak Remaja Kecanduan Currency Wars, Pemerintah Berencana Batasi Game Honkai: Star Rail",
    image: "/images/article/currency-war.png",
    category: "Gorengan",
    createdAt: "13 Des 2025",
  },
];

/* ============================================================
   CONSTANTS
   ============================================================ */
const CATEGORIES: { key: Category | "all"; label: string }[] = [
  { key: "all", label: "Semua" },
  { key: "AniManga", label: "AniManga" },
  { key: "IRL Event", label: "IRL Event" },
  { key: "Gorengan", label: "Gorengan" },
];

/* ============================================================
   ARTICLE CARD
   ============================================================ */
function ArticleCard({
  article,
  onEdit,
  onDelete,
}: {
  article: Article;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="flex w-full flex-col overflow-hidden rounded-[10px] bg-white p-3 shadow-md sm:h-44 sm:flex-row sm:items-center sm:gap-5 sm:p-5">
      {/* Image */}
      <div className="relative h-40 w-full shrink-0 overflow-hidden rounded-[5px] bg-zinc-100 sm:h-full sm:w-52">
        <Image
          src={article.image}
          alt={article.title}
          fill
          sizes="(min-width: 640px) 208px, 100vw"
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="mt-3 flex flex-1 flex-col items-start justify-center gap-2 sm:mt-0 sm:gap-3">
        {/* Category Badge */}
        <span className={`inline-flex h-5 items-center justify-center rounded-sm px-2 text-xs font-bold ${
          article.category === "AniManga"
            ? "bg-brand-mint-soft text-brand-red"
            : article.category === "IRL Event"
            ? "bg-brand-accent text-brand-red"
            : "bg-red-100 text-red-600"
        }`}>
          {article.category}
        </span>

        {/* Title */}
        <h3 className="line-clamp-2 text-sm font-bold leading-snug text-black sm:text-base">
          {article.title}
        </h3>

        {/* Meta */}
        <span className="text-xs font-bold text-brand-red sm:text-sm">{article.createdAt}</span>
      </div>

      {/* Action Buttons */}
      <div className="mt-3 flex gap-2 sm:mt-0 sm:flex-col sm:gap-2">
        <button
          type="button"
          onClick={onEdit}
          className="flex h-8 flex-1 items-center justify-center gap-2 rounded-lg border border-black/10 bg-white text-sm font-bold text-neutral-950 transition hover:bg-zinc-50 sm:flex-none sm:px-4"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
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
        <button
          type="button"
          onClick={onDelete}
          className="flex h-8 flex-1 items-center justify-center gap-2 rounded-lg border border-red-200 bg-white text-sm font-bold text-red-600 transition hover:bg-red-50 sm:flex-none sm:px-4"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
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
      </div>
    </div>
  );
}

/* ============================================================
   PAGE COMPONENT
   ============================================================ */
export default function ManageArticlePage() {
  // State
  const [articles] = useState<Article[]>(MOCK_ARTICLES);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category | "all">("all");

  // Modal state
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  // Filter logic
  const filteredArticles = articles.filter((article) => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "all" || article.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  // Modal handlers
  const handleEdit = (article: Article) => {
    setSelectedArticle(article);
    setShowEditModal(true);
  };

  const handleDelete = (article: Article) => {
    setSelectedArticle(article);
    setShowDeleteDialog(true);
  };

  // Get count for each category
  const getCategoryCount = (category: Category | "all") => {
    if (category === "all") return articles.length;
    return articles.filter((a) => a.category === category).length;
  };

  return (
    <div className="flex flex-col gap-4 sm:gap-6">
      {/* Header Actions */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Search */}
        <div className="relative w-full sm:flex-1 sm:max-w-md">
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M13.9899 13.9899L11.0986 11.0986M7.32858 12.6576C10.272 12.6576 12.6581 10.2715 12.6581 7.32809C12.6581 4.38466 10.272 1.99854 7.32858 1.99854C4.38515 1.99854 1.99902 4.38466 1.99902 7.32809C1.99902 10.2715 4.38515 12.6576 7.32858 12.6576Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <input
            type="text"
            placeholder="Cari artikel..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-9 w-full rounded-lg border border-zinc-100 bg-zinc-100 pl-10 pr-3 text-sm text-zinc-800 placeholder:text-zinc-400 focus:border-brand-red focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-red/20"
          />
        </div>

        {/* Add Button */}
        <button
          type="button"
          onClick={() => setShowCreateModal(true)}
          className="flex h-9 w-full shrink-0 items-center justify-center gap-2 rounded-lg bg-orange-800 px-4 text-sm font-bold text-white transition hover:bg-orange-700 sm:w-auto"
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
          Tambah Artikel
        </button>
      </div>

      {/* Category Tabs */}
      <div className="grid grid-cols-2 gap-2 rounded-2xl bg-red-50 p-2 sm:flex sm:justify-center sm:gap-1 sm:p-1">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.key}
            type="button"
            onClick={() => setActiveCategory(cat.key)}
            className={`relative flex h-9 shrink-0 items-center justify-center gap-2 rounded-xl px-3 text-sm font-bold transition-all duration-200 sm:h-7 sm:px-4 ${
              activeCategory === cat.key
                ? "bg-white text-orange-800 shadow-sm"
                : "text-neutral-500 hover:text-neutral-800"
            }`}
          >
            <span>{cat.label}</span>
            <span className={`flex h-5 min-w-[20px] items-center justify-center rounded-full px-1.5 text-xs transition-colors ${
              activeCategory === cat.key
                ? "bg-orange-800 text-white"
                : "bg-neutral-200 text-neutral-600"
            }`}>
              {getCategoryCount(cat.key)}
            </span>
          </button>
        ))}
      </div>

      {/* Article List */}
      <div className="flex flex-col gap-3 sm:gap-4">
        {filteredArticles.length === 0 ? (
          <div className="flex w-full flex-col items-center justify-center gap-3 py-12">
            <svg
              className="text-zinc-300"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM5 4.999h14v2H5v-2zm0 4.999h14v10H5v-10z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="text-sm text-zinc-500">
              Tidak ada artikel yang ditemukan
            </p>
          </div>
        ) : (
          filteredArticles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              onEdit={() => handleEdit(article)}
              onDelete={() => handleDelete(article)}
            />
          ))
        )}
      </div>

      {/* Modals */}
      {showCreateModal && (
        <ArticleCreateModal onClose={() => setShowCreateModal(false)} />
      )}

      {showEditModal && selectedArticle && (
        <ArticleEditModal
          article={selectedArticle}
          onClose={() => {
            setShowEditModal(false);
            setSelectedArticle(null);
          }}
        />
      )}

      {showDeleteDialog && selectedArticle && (
        <ArticleDeleteDialog
          article={selectedArticle}
          onClose={() => {
            setShowDeleteDialog(false);
            setSelectedArticle(null);
          }}
        />
      )}
    </div>
  );
}
