"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

/* ============================================================
   TYPES
   ============================================================ */
type CartItem = {
  id: string;
  name: string;
  image: string;
  originalPrice: number;
  price: number;
  size: string;
  rentDate: string;
  selected: boolean;
};

/* ============================================================
   MOCK DATA
   ============================================================ */
const INITIAL_CART_ITEMS: CartItem[] = [
  {
    id: "c1",
    name: "(Fullset) Cosplay Columbina - Genshin Impact",
    image: "/images/product-detail/columbina1.png",
    originalPrice: 150000,
    price: 105000,
    size: "M",
    rentDate: "22/12/2025 - 25/12/2025",
    selected: true,
  },
  {
    id: "c2",
    name: "(Fullset) Cosplay Durin - Genshin Impact",
    image: "/images/fullset/durin.png",
    originalPrice: 150000,
    price: 105000,
    size: "L",
    rentDate: "22/12/2025 - 25/12/2025",
    selected: true,
  },
];

/* ============================================================
   HELPER
   ============================================================ */
function formatPrice(price: number): string {
  return `IDR ${price.toLocaleString("id-ID")}`;
}

/* ============================================================
   CHECKBOX COMPONENT
   ============================================================ */
function Checkbox({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <div
      onClick={onChange}
      className={`flex h-5 w-5 shrink-0 cursor-pointer items-center justify-center rounded border border-black/40 ${
        checked ? "bg-brand-red" : "bg-white"
      }`}
    >
      {checked && (
        <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
          <path
            d="M1 6L4.5 9.5L11 2"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </div>
  );
}

/* ============================================================
   PAGE
   ============================================================ */
export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>(INITIAL_CART_ITEMS);

  const toggleItem = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const selectedItems = items.filter((item) => item.selected);
  const total = selectedItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="min-h-screen w-full bg-red-50 pb-20">
      <div className="mx-auto w-full max-w-[1120px] px-4 pt-10">
        {/* Header */}
        <div className="mb-10 flex flex-col items-center text-center">
          <h1 className="font-display text-4xl text-brand-red sm:text-5xl">Shopping Cart</h1>
          <div className="mt-7 h-px w-full max-w-[548px] bg-brand-red" />
        </div>

        {/* Main Content */}
        <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
          {/* Left - Cart Items */}
          <div className="flex flex-1 flex-col gap-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-xl bg-white py-16 shadow-md">
                <p className="text-base font-bold text-black">Keranjang kosong</p>
                <Link
                  href="/customer/product/product-catalog"
                  className="mt-3 text-sm text-brand-red underline"
                >
                  Jelajahi Katalog
                </Link>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-center gap-3 rounded-[10px] bg-white p-3 shadow-[2px_2px_8px_0px_rgba(0,0,0,0.25)] sm:gap-4 sm:p-4"
                >
                  {/* Checkbox */}
                  <Checkbox
                    checked={item.selected}
                    onChange={() => toggleItem(item.id)}
                  />

                  {/* Image */}
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-[5px] sm:h-32 sm:w-32">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="(max-width: 640px) 80px, 128px"
                      className="object-cover object-left-top"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex min-w-0 flex-1 flex-col gap-1.5 sm:gap-2">
                    {/* Name + Actions */}
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="line-clamp-2 text-sm font-bold leading-5 text-black sm:text-base">
                        {item.name}
                      </h3>
                      <div className="flex shrink-0 gap-1.5 sm:gap-2">
                        <button className="flex h-6 w-14 items-center justify-center rounded-sm border border-brand-red bg-white sm:w-16">
                          <span className="text-[11px] font-bold text-brand-red sm:text-xs">
                            Edit
                          </span>
                        </button>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="flex h-6 w-14 items-center justify-center rounded-sm bg-brand-red sm:w-16"
                        >
                          <span className="text-[11px] font-bold text-white sm:text-xs">
                            Hapus
                          </span>
                        </button>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-black sm:text-sm">Price:</span>
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <span className="text-xs font-bold text-brand-red line-through sm:text-sm">
                          {formatPrice(item.originalPrice)}
                        </span>
                        <span className="text-xs font-bold text-orange-800 sm:text-sm">
                          {formatPrice(item.price)}
                        </span>
                      </div>
                    </div>

                    {/* Size */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-black sm:text-sm">Size Variant:</span>
                      <span className="text-xs font-bold text-orange-800 sm:text-sm">{item.size}</span>
                    </div>

                    {/* Rent Date */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-black sm:text-sm">Rent Date:</span>
                      <span className="text-xs font-bold text-orange-800 sm:text-sm">{item.rentDate}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Right - Order Summary */}
          <div className="w-full lg:w-80 lg:shrink-0">
            <div className="rounded-[10px] bg-white p-4 shadow-[2px_2px_8px_0px_rgba(0,0,0,0.25)] sm:p-6 lg:sticky lg:top-6">
              <h2 className="mb-4 text-center text-lg font-extrabold text-black sm:text-xl">
                Ringkasan Pesanan
              </h2>

              {/* Divider */}
              <div className="mb-4 h-px w-full bg-brand-red opacity-60" />

              {/* Items List */}
              <div className="mb-4 flex flex-col gap-1">
                {selectedItems.length === 0 ? (
                  <p className="text-center text-sm text-black/60">
                    Tidak ada item dipilih
                  </p>
                ) : (
                  selectedItems.map((item) => (
                    <div key={item.id} className="flex justify-between gap-2">
                      <span className="flex-1 text-sm font-bold text-black">
                        {item.name}
                      </span>
                      <span className="text-sm font-bold text-orange-800">
                        {formatPrice(item.price)}
                      </span>
                    </div>
                  ))
                )}
              </div>

              {/* Divider */}
              <div className="mb-4 h-px w-full bg-brand-red opacity-60" />

              {/* Total */}
              <div className="mb-6 flex items-center justify-between">
                <span className="text-base font-extrabold text-black">Total:</span>
                <span className="text-base font-extrabold text-brand-red">
                  {formatPrice(total)}
                </span>
              </div>

              {/* Buttons */}
              <div className="flex flex-col items-center gap-3">
                <Link
                  href="/customer/payment/payment-detail"
                  className="flex h-10 w-44 items-center justify-center rounded-[20px] bg-brand-red text-sm font-extrabold text-white transition-colors hover:bg-brand-red-soft"
                >
                  Checkout
                </Link>
                <Link
                  href="/customer/product/product-catalog"
                  className="flex h-10 w-44 items-center justify-center rounded-[20px] border border-brand-red text-sm font-extrabold text-brand-red transition-colors hover:bg-brand-red hover:text-white"
                >
                  Jelajahi Katalog
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}