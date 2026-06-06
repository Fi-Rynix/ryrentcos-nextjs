"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

/* ============================================================
   TYPES
   ============================================================ */
type Product = {
  name: string;
  originalPrice: number;
  price: number;
  discount: number;
  description: string;
  includes: string[];
  sizes: string[];
  images: string[];
  detailImage: string;
};

/* ============================================================
   MOCK DATA
   ============================================================ */
const product: Product = {
  name: "(Fullset) Cosplay Columbina - Genshin Impact",
  originalPrice: 150000,
  price: 105000,
  discount: 30,
  description:
    "Cosplay fullset Columbina dari game Genshin Impact ini dirancang untuk menghidupkan karakter Fatui Harbinger yang misterius dan elegan. Kostum berwarna dominan putih dan biru muda dengan detail sayap malaikat, ornamen kristal, dan elemen fantasi yang rumit, cocok untuk event cosplay, photoshoot, atau konvensi anime. Terbuat dari bahan berkualitas tinggi yang nyaman dipakai, dengan varian ukuran M, L, dan XL untuk menyesuaikan bentuk tubuh. Sewa kostum ini akan membuatmu tampil seperti Columbina asli, lengkap dengan aksesoris detail yang membuat penampilan semakin autentik.",
  includes: [
    "Dress utama (atas dan bawah dengan desain flowing cape)",
    "Wig brand Manmei",
    "Sayap malaikat (wings) yang bisa dilepas-pasang",
    "Masker mata (eye mask) dengan desain unik",
    "Aksesoris rambut (headpiece, bows, dan ornamen)",
    "Kalung (necklace) dengan pendant kristal",
    "Gelang tangan (bracelets) dan lengan (arm bands)",
    "Cincin (rings) dan ornamen jari",
    "Stocking kaki (legwear) dengan detail garis",
    "Celana pendek dalam (shorts/panties) untuk kenyamanan",
    "Aksesoris tambahan seperti bros, ikat pinggang, dan ornamen kecil lainnya",
  ],
  sizes: ["Size M", "Size L", "Size XL"],
  images: [
    "/images/product-detail/columbina1.png",
    "/images/product-detail/columbina2.png",
    "/images/product-detail/columbina3.png",
    "/images/product-detail/columbina4.png",
    "/images/product-detail/columbina5.png",
  ],
  detailImage: "/images/product-detail/columbina-size.png",
};

/* ============================================================
   HELPER
   ============================================================ */
function formatPrice(price: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
}

/* ============================================================
   PAGE
   ============================================================ */
export default function ProductDetailPage() {
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="min-h-screen bg-red-50 pb-20">
      {/* Breadcrumb */}
      <div className="mx-auto max-w-[1120px] px-4 pt-6">
        <div className="flex items-center gap-2 text-sm">
          <Link
            href="/customer/product/product-catalog"
            className="font-bold text-brand-red underline"
          >
            Catalog Product
          </Link>
          <span className="font-bold text-black">/</span>
          <span className="font-bold text-black line-clamp-1">{product.name}</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto flex max-w-[1120px] gap-8 px-4 pt-8">
        {/* Left Side - Images (Sticky) */}
        <div className="w-[500px] lg:sticky lg:top-20 lg:self-start">
          {/* Main Image */}
          <div className="relative mb-3 overflow-hidden rounded-xl bg-white shadow-md">
            <div className="aspect-square">
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Navigation Arrows */}
            <button
              className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border-[5px] border-brand-red bg-white/90 shadow-md transition-all hover:scale-110 hover:shadow-lg active:scale-95"
              onClick={() =>
                setSelectedImage((prev) =>
                  prev > 0 ? prev - 1 : product.images.length - 1
                )
              }
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8f220d" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border-[5px] border-brand-red bg-white/90 shadow-md transition-all hover:scale-110 hover:shadow-lg active:scale-95"
              onClick={() =>
                setSelectedImage((prev) =>
                  prev < product.images.length - 1 ? prev + 1 : 0
                )
              }
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8f220d" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>

          {/* Thumbnail Images */}
          <div className="flex justify-center gap-[5px]">
            {product.images.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative h-[100px] w-[100px] overflow-hidden rounded-md ${
                  selectedImage === index
                    ? "ring-2 ring-brand-red"
                    : "bg-white/50"
                }`}
              >
                <Image
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right Side - Details */}
        <div className="flex flex-1 flex-col gap-5">
          {/* Product Name */}
          <h1 className="text-2xl font-extrabold text-black">
            {product.name}
          </h1>

          {/* Price */}
          <div className="flex items-center gap-3">
            <span className="text-xl font-extrabold text-brand-red line-through">
              {formatPrice(product.originalPrice)}
            </span>
            <span className="text-xl font-extrabold text-orange-800">
              {formatPrice(product.price)}
            </span>
            <span className="rounded-full bg-orange-800 px-3 py-1 text-xs font-bold text-white">
              {product.discount}% OFF
            </span>
          </div>

          {/* Variant */}
          <div>
            <h3 className="mb-2 text-base font-bold text-black">Variant:</h3>
            <div className="flex flex-col gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`rounded-md border border-black/40 bg-gray-200 px-4 py-2 text-sm font-bold transition-all ${
                    selectedSize === size
                      ? "ring-2 ring-brand-red"
                      : "hover:bg-gray-300"
                  }`}
                >
                  {product.name} - {size}
                </button>
              ))}
            </div>
          </div>

          {/* Favorite Button */}
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className="flex items-center gap-2"
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 35 35"
              fill={isFavorite ? "#AB3227" : "none"}
              stroke="#AB3227"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-colors"
            >
              <path d="M17.5 11.6667C17.5 11.6667 17.5 11.6667 16.3917 10.2084C15.1083 8.51675 13.2125 7.29175 10.9375 7.29175C7.30625 7.29175 4.375 10.223 4.375 13.8542C4.375 15.2105 4.78333 16.4647 5.48333 17.5001C6.66458 19.2647 17.5 30.6251 17.5 30.6251M17.5 11.6667C17.5 11.6667 17.5 11.6667 18.6083 10.2084C19.8917 8.51675 21.7875 7.29175 24.0625 7.29175C27.6938 7.29175 30.625 10.223 30.625 13.8542C30.625 15.2105 30.2167 16.4647 29.5167 17.5001C28.3354 19.2647 17.5 30.6251 17.5 30.6251" />
            </svg>
            <span className="text-base font-bold text-orange-800">
              Tambahkan Favorit
            </span>
          </button>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Link
              href="/customer/cart"
              className="flex h-14 flex-1 items-center justify-center rounded-[20px] border-4 border-brand-red bg-white"
            >
              <span className="text-lg font-extrabold text-brand-red">
                Keranjang+
              </span>
            </Link>
            <Link
              href="/customer/payment/payment-detail"
              className="flex h-14 flex-1 items-center justify-center rounded-[20px] bg-brand-red"
            >
              <span className="text-lg font-extrabold text-white">
                Pesan Sekarang
              </span>
            </Link>
          </div>

          {/* Line Divider */}
          <div className="h-px w-full bg-brand-red" />

          {/* Detail Produk */}
          <div>
            <h2 className="mb-3 text-xl font-bold text-brand-red">Detail Produk</h2>

            {/* Description */}
            <p className="mb-4 text-base leading-relaxed text-black">
              {product.description}
            </p>

            {/* Includes */}
            <div className="mb-4">
              <h3 className="mb-2 text-base font-semibold text-black">Include:</h3>
              <ul className="flex list-disc flex-col gap-1 pl-5 text-sm text-black">
                {product.includes.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            {/* Detail Image & Back to Top */}
            {product.detailImage && (
              <div className="flex flex-col gap-4">
                <div className="overflow-hidden rounded-lg bg-white shadow-md">
                  <Image
                    src={product.detailImage}
                    alt="Detail Produk"
                    width={548}
                    height={403}
                    className="w-full object-cover"
                  />
                </div>
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="h-12 w-full rounded-[20px] bg-brand-red text-base font-bold text-white"
                >
                  Kembali Ke Atas
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}