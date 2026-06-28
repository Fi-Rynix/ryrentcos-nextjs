"use client";

import { useState, useRef, useEffect } from "react";

type Category = "fullset" | "wig" | "props";
type Badge = "trending" | "brandNew" | "topSelling";
type Size = "S" | "M" | "L" | "XL" | "XXL";

const CATEGORIES: Category[] = ["fullset", "wig", "props"];
const BADGES: Badge[] = ["trending", "brandNew", "topSelling"];
const SIZES: Size[] = ["S", "M", "L", "XL", "XXL"];

interface Product {
  id: string;
  name: string;
  category: Category;
  badges: Badge[];
  price: number;
  discount: number;
  sizes: Size[];
  images: string[];
  detailImage: string;
  description: string;
}

interface ProductEditModalProps {
  product: Product;
  onClose: () => void;
}

export default function ProductEditModal({ product, onClose }: ProductEditModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: product.name,
    category: product.category,
    badges: product.badges,
    price: product.price.toString(),
    discount: product.discount.toString(),
    images: product.images,
    detailImage: product.detailImage,
  });
  const [selectedSizes, setSelectedSizes] = useState<Size[]>(product.sizes);
  const [imagePreviews, setImagePreviews] = useState<string[]>(product.images);
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = product.description;
    }
  }, [product.description]);

  const execCommand = (command: string, value: string | undefined = undefined) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Update product:", product.id, {
      ...formData,
      sizes: selectedSizes,
      description: editorRef.current?.innerHTML || "",
    });
    setIsSubmitting(false);
    onClose();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, field: "images" | "detailImage") => {
    const files = e.target.files;
    if (!files) return;

    if (field === "images") {
      const newPreviews: string[] = [];
      const newUrls: string[] = [];

      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          newPreviews.push(reader.result as string);
          newUrls.push(file.name);
          if (newPreviews.length === files.length) {
            setImagePreviews((prev) => [...prev, ...newPreviews]);
            setFormData((prev) => ({ ...prev, images: [...prev.images, ...newUrls] }));
          }
        };
        reader.readAsDataURL(file);
      });
    } else {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, detailImage: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (index: number, field: "images" | "detailImage") => {
    if (field === "images") {
      const newPreviews = [...imagePreviews];
      newPreviews.splice(index, 1);
      setImagePreviews(newPreviews);
      const newImages = [...formData.images];
      newImages.splice(index, 1);
      setFormData((prev) => ({ ...prev, images: newImages }));
    } else {
      setFormData((prev) => ({ ...prev, detailImage: "" }));
    }
  };

  const toggleBadge = (badge: Badge) => {
    setFormData((prev) => ({
      ...prev,
      badges: prev.badges.includes(badge)
        ? prev.badges.filter((b) => b !== badge)
        : [...prev.badges, badge],
    }));
  };

  const toggleSize = (size: Size) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const ToolbarButton = ({
    icon,
    command,
    title,
  }: {
    icon: React.ReactNode;
    command: string;
    title: string;
  }) => (
    <button
      type="button"
      onClick={() => execCommand(command)}
      title={title}
      className="flex h-8 w-8 items-center justify-center rounded text-zinc-600 transition-colors hover:bg-zinc-100"
    >
      {icon}
    </button>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />

      <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-xl scrollbar-hide">
        <style jsx>{`
          .scrollbar-hide::-webkit-scrollbar {
            width: 6px;
          }
          .scrollbar-hide::-webkit-scrollbar-track {
            background: transparent;
          }
          .scrollbar-hide::-webkit-scrollbar-thumb {
            background: transparent;
          }
          .scrollbar-hide:hover::-webkit-scrollbar-thumb {
            background: rgba(0, 0, 0, 0.1);
          }
          .editor-content {
            min-height: 150px;
            outline: none;
          }
          .editor-content:focus {
            outline: none;
          }
          .editor-content ul {
            list-style-type: disc;
            padding-left: 1.5rem;
          }
          .editor-content ol {
            list-style-type: decimal;
            padding-left: 1.5rem;
          }
        `}</style>

        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-brand-red">Edit Produk</h2>
            <p className="mt-1 text-sm text-zinc-500">
              Edit informasi produk
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-600"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Product ID Badge */}
        <div className="mb-4 inline-flex items-center gap-2 rounded-lg bg-zinc-100 px-3 py-1.5">
          <span className="text-xs font-semibold text-zinc-500">ID:</span>
          <span className="text-sm font-bold text-zinc-700">{product.id}</span>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Name */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-zinc-700">
              Nama Produk <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="h-12 rounded-xl border-2 border-zinc-200 bg-zinc-50 px-4 text-sm text-zinc-800 focus:border-brand-red focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-red/20"
            />
          </div>

          {/* Category - Radio */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-zinc-700">Kategori</label>
            <div className="flex gap-3">
              {CATEGORIES.map((cat) => (
                <label
                  key={cat}
                  className={`flex cursor-pointer items-center gap-2 rounded-lg border-2 px-4 py-2 transition ${
                    formData.category === cat
                      ? "border-brand-red bg-brand-red/5 text-brand-red"
                      : "border-zinc-200 text-zinc-600 hover:border-zinc-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="edit-category"
                    value={cat}
                    checked={formData.category === cat}
                    onChange={() => setFormData({ ...formData, category: cat })}
                    className="sr-only"
                  />
                  <span className="text-sm font-semibold capitalize">{cat}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Badges - Checkbox */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-zinc-700">Badge</label>
            <div className="flex flex-wrap gap-3">
              {BADGES.map((badge) => (
                <label
                  key={badge}
                  className={`flex cursor-pointer items-center gap-2 rounded-lg border-2 px-4 py-2 transition ${
                    formData.badges.includes(badge)
                      ? "border-brand-red bg-brand-red/5 text-brand-red"
                      : "border-zinc-200 text-zinc-600 hover:border-zinc-300"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={formData.badges.includes(badge)}
                    onChange={() => toggleBadge(badge)}
                    className="sr-only"
                  />
                  <span className="text-sm font-semibold capitalize">{badge.replace(/([A-Z])/g, " $1").trim()}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price & Discount */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-zinc-700">
                Harga Sewa <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-zinc-500">Rp</span>
                <input
                  type="text"
                  required
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="h-12 w-full rounded-xl border-2 border-zinc-200 bg-zinc-50 pl-10 pr-4 text-sm text-zinc-800 focus:border-brand-red focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-red/20"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-zinc-700">Diskon</label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.discount}
                  onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                  placeholder="30"
                  className="h-12 w-full rounded-xl border-2 border-zinc-200 bg-zinc-50 px-4 pr-10 text-sm text-zinc-800 placeholder:text-zinc-400 focus:border-brand-red focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-red/20"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-zinc-500">%</span>
              </div>
            </div>
          </div>

          {/* Sizes - Checkbox */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-zinc-700">Ukuran</label>
            <div className="flex flex-wrap gap-3">
              {SIZES.map((size) => (
                <label
                  key={size}
                  className={`flex h-10 w-14 cursor-pointer items-center justify-center rounded-lg border-2 transition ${
                    selectedSizes.includes(size)
                      ? "border-brand-red bg-brand-red/5 text-brand-red"
                      : "border-zinc-200 text-zinc-600 hover:border-zinc-300"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedSizes.includes(size)}
                    onChange={() => toggleSize(size)}
                    className="sr-only"
                  />
                  <span className="text-sm font-bold">{size}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Images Upload */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-zinc-700">Upload Gambar</label>
            <div className="flex flex-wrap gap-3">
              {imagePreviews.map((preview, index) => (
                <div key={index} className="relative h-20 w-20 overflow-hidden rounded-lg border-2 border-zinc-200">
                  <img
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index, "images")}
                    className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white shadow"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>
              ))}
              <label className="flex h-20 w-20 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-zinc-300 text-zinc-400 transition hover:border-brand-red hover:text-brand-red">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => handleImageUpload(e, "images")}
                  className="sr-only"
                />
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                </svg>
              </label>
            </div>
          </div>

          {/* Detail Image Upload */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-zinc-700">Upload Detail Image (Size Chart)</label>
            {formData.detailImage ? (
              <div className="relative h-32 w-32 overflow-hidden rounded-lg border-2 border-zinc-200">
                <img
                  src={formData.detailImage}
                  alt="Detail Preview"
                  className="h-full w-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeImage(0, "detailImage")}
                  className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white shadow"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            ) : (
              <label className="flex h-20 w-full cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-zinc-300 text-zinc-400 transition hover:border-brand-red hover:text-brand-red">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, "detailImage")}
                  className="sr-only"
                />
                <span className="text-sm">Klik untuk upload</span>
              </label>
            )}
          </div>

          {/* Description with Rich Text Editor */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-zinc-700">Deskripsi</label>
            <div className="flex flex-col rounded-xl border-2 border-zinc-200 overflow-hidden focus-within:border-brand-red focus-within:ring-2 focus-within:ring-brand-red/20">
              {/* Toolbar */}
              <div className="flex flex-wrap items-center gap-1 border-b border-zinc-200 bg-zinc-50 px-2 py-1">
                <ToolbarButton
                  command="bold"
                  title="Bold (Ctrl+B)"
                  icon={
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M6 4h8a4 4 0 014 4 4 4 0 01-4 4H6z" />
                      <path d="M6 12h9a4 4 0 014 4 4 4 0 01-4 4H6z" />
                    </svg>
                  }
                />
                <ToolbarButton
                  command="italic"
                  title="Italic (Ctrl+I)"
                  icon={
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="19" y1="4" x2="10" y2="4" />
                      <line x1="14" y1="20" x2="5" y2="20" />
                      <line x1="15" y1="4" x2="9" y2="20" />
                    </svg>
                  }
                />
                <ToolbarButton
                  command="underline"
                  title="Underline (Ctrl+U)"
                  icon={
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M6 3v7a6 6 0 006 6 6 6 0 006-6V3" />
                      <line x1="4" y1="21" x2="20" y2="21" />
                    </svg>
                  }
                />
                <div className="mx-1 h-5 w-px bg-zinc-300" />
                <ToolbarButton
                  command="insertUnorderedList"
                  title="Bullet List"
                  icon={
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="9" y1="6" x2="20" y2="6" />
                      <line x1="9" y1="12" x2="20" y2="12" />
                      <line x1="9" y1="18" x2="20" y2="18" />
                      <circle cx="4" cy="6" r="1.5" fill="currentColor" stroke="none" />
                      <circle cx="4" cy="12" r="1.5" fill="currentColor" stroke="none" />
                      <circle cx="4" cy="18" r="1.5" fill="currentColor" stroke="none" />
                    </svg>
                  }
                />
                <ToolbarButton
                  command="insertOrderedList"
                  title="Numbered List"
                  icon={
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="10" y1="6" x2="21" y2="6" />
                      <line x1="10" y1="12" x2="21" y2="12" />
                      <line x1="10" y1="18" x2="21" y2="18" />
                      <path d="M4 6h1v4" />
                      <path d="M4 10H6" />
                      <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />
                    </svg>
                  }
                />
                <div className="mx-1 h-5 w-px bg-zinc-300" />
                <button
                  type="button"
                  onClick={() => {
                    const url = prompt("Enter image URL:");
                    if (url) execCommand("insertImage", url);
                  }}
                  title="Insert Image"
                  className="flex h-8 w-8 items-center justify-center rounded text-zinc-600 transition-colors hover:bg-zinc-100"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <path d="M21 15l-5-5L5 21" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const url = prompt("Enter link URL:");
                    if (url) execCommand("createLink", url);
                  }}
                  title="Insert Link"
                  className="flex h-8 w-8 items-center justify-center rounded text-zinc-600 transition-colors hover:bg-zinc-100"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
                    <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
                  </svg>
                </button>
              </div>
              {/* Editor */}
              <div
                ref={editorRef}
                contentEditable
                className="editor-content w-full resize-none bg-white p-4 text-sm text-zinc-800 placeholder:text-zinc-400"
                style={{ minHeight: "150px" }}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="mt-2 flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-end sm:gap-3">
            <button
              type="button"
              onClick={onClose}
              className="h-11 rounded-xl border-2 border-zinc-200 px-6 text-sm font-semibold text-zinc-600 transition hover:bg-zinc-50 sm:h-12"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex h-11 items-center justify-center gap-2 rounded-xl bg-brand-red px-6 text-sm font-bold text-white shadow-[3px_3px_0_0_rgba(0,0,0,0.15)] transition hover:bg-brand-red-soft disabled:cursor-not-allowed disabled:opacity-70 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none sm:h-12"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin" width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Menyimpan...
                </>
              ) : (
                <>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M17 21v-8H7v8M7 3v5h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Simpan Perubahan
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
