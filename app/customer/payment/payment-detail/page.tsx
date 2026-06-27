"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

/* ============================================================
   TYPES
   ============================================================ */
type PaymentMethod = "bank" | "virtual" | "qris" | "paypal";

type OrderItem = {
  id: string;
  name: string;
  image: string;
  originalPrice: number;
  price: number;
  size: string;
  rentDate: string;
};

/* ============================================================
   MOCK DATA
   ============================================================ */
const RECIPIENT_INFO = {
  name: "Rafi Ihya Azzaky",
  whatsapp: "089696578125",
  address:
    "Kost Akbp, jalan Jojoran I Asri No. 14 A, RT.8/RW.8, Mojo, Gubeng (KOST NYPD / IBU ROHA), KOTA SURABAYA, GUBENG, JAWA TIMUR, ID, 60285",
};

const ORDER_ITEMS: OrderItem[] = [
  {
    id: "c1",
    name: "(Fullset) Cosplay Columbina - Genshin Impact",
    image: "/images/product-detail/columbina1.png",
    originalPrice: 150000,
    price: 105000,
    size: "M",
    rentDate: "22/12/2025 - 25/12/2025",
  },
];

const PAYMENT_DETAILS = {
  orderFee: 150000,
  discount: 45000,
  shipping: 20000,
  service: 2000,
  total: 127000,
};

/* ============================================================
   HELPER
   ============================================================ */
function formatPrice(price: number): string {
  return `IDR ${price.toLocaleString("id-ID")}`;
}

/* ============================================================
   CUSTOM RADIO BUTTON
   ============================================================ */
function PaymentRadio({
  selected,
  onClick,
}: {
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="group relative flex h-6 w-6 shrink-0 cursor-pointer items-center justify-center"
    >
      {/* Outer ring */}
      <div
        className={`h-6 w-6 rounded-full border-2 transition-all ${
          selected
            ? "border-brand-red bg-brand-red"
            : "border-brand-red bg-white group-hover:border-brand-red-soft"
        }`}
      />
      {/* Inner dot */}
      <div
        className={`absolute h-2.5 w-2.5 rounded-full bg-white transition-all ${
          selected ? "scale-100 opacity-100" : "scale-0 opacity-0"
        }`}
      />
    </div>
  );
}

/* ============================================================
   PAGE
   ============================================================ */
export default function CheckoutPage() {
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod | null>(
    null
  );

  return (
    <div className="min-h-screen w-full bg-red-50 pb-20">
      <div className="mx-auto w-full max-w-[1120px] px-4 pt-10">
        {/* Header */}
        <div className="mb-10 flex flex-col items-center text-center">
          <h1 className="font-display text-4xl text-brand-red sm:text-5xl">
            Checkout Payment
          </h1>
          <div className="mt-7 h-px w-full max-w-[548px] bg-brand-red" />
        </div>

        {/* Main Content */}
        <div className="flex flex-col gap-6">
          {/* Card 1: Informasi Penerima */}
          <div className="rounded-[10px] bg-white p-4 shadow-[2px_2px_8px_0px_rgba(0,0,0,0.25)]">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-xl font-bold text-brand-red">
                Informasi Penerima
              </h2>
              <button className="flex h-7 w-32 items-center justify-center rounded-[20px] border border-brand-red text-xs font-bold text-brand-red transition-colors hover:bg-brand-red hover:text-white">
                Edit Informasi
              </button>
            </div>

            <div className="h-px w-full bg-brand-red" />

            <div className="mt-4 flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-bold text-black">Nama Penyewa:</span>
                <span className="text-sm text-black">{RECIPIENT_INFO.name}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm font-bold text-black">Nomor WhatsApp:</span>
                <span className="text-sm text-black">{RECIPIENT_INFO.whatsapp}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm font-bold text-black">Alamat Lengkap:</span>
                <span className="text-sm text-black">{RECIPIENT_INFO.address}</span>
              </div>
            </div>
          </div>

          {/* Card 2: Rincian Pesanan */}
          <div className="rounded-[10px] bg-white p-4 shadow-[2px_2px_8px_0px_rgba(0,0,0,0.25)]">
            <h2 className="text-xl font-bold text-brand-red">Rincian Pesanan</h2>
            <div className="mt-3 h-px w-full bg-brand-red" />

            {ORDER_ITEMS.map((item) => (
              <div key={item.id} className="mt-4 flex items-start gap-4">
                {/* Image */}
                <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-[5px]">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover object-left-top"
                  />
                </div>

                {/* Details */}
                <div className="flex flex-1 flex-col gap-2">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-sm font-bold text-black">{item.name}</h3>
                    <button className="flex h-6 w-16 shrink-0 items-center justify-center rounded-sm border border-brand-red bg-white">
                      <span className="text-xs font-bold text-brand-red">Edit</span>
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-black">Price:</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-brand-red line-through">
                        {formatPrice(item.originalPrice)}
                      </span>
                      <span className="text-sm font-bold text-orange-800">
                        {formatPrice(item.price)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-black">Size Variant:</span>
                    <span className="text-sm font-bold text-orange-800">{item.size}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-black">Rent Date:</span>
                    <span className="text-right text-sm font-bold text-orange-800">
                      {item.rentDate}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Card 3: Pilih Metode Bayar & Rincian Pembayaran */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 lg:flex-row">
              {/* Left: Pilih Metode Bayar */}
              <div className="w-full rounded-[10px] bg-white p-4 shadow-[2px_2px_8px_0px_rgba(0,0,0,0.25)] lg:w-80 lg:shrink-0">
                <h2 className="text-xl font-bold text-brand-red">Pilih Metode Bayar</h2>
                <div className="mt-3 h-px w-full bg-brand-red" />

                <div className="mt-4 flex flex-col gap-3">
                  {/* Transfer Bank */}
                  <div
                    onClick={() => setSelectedPayment("bank")}
                    className="flex cursor-pointer items-center gap-3 rounded-lg p-2 transition-colors hover:bg-gray-50"
                  >
                    <PaymentRadio
                      selected={selectedPayment === "bank"}
                      onClick={() => setSelectedPayment("bank")}
                    />
                    <div className="flex items-center gap-2">
                      <svg width="24" height="24" viewBox="0 0 30 30" fill="none">
                        <path
                          d="M14.375 1.25L2.5 7.5V10H26.25V7.5M20 12.5V21.25H23.75V12.5M2.5 27.5H26.25V23.75H2.5M12.5 12.5V21.25H16.25V12.5M5 12.5V21.25H8.75V12.5H5Z"
                          fill="black"
                        />
                      </svg>
                      <span className="text-sm font-bold text-black">Transfer Bank</span>
                    </div>
                  </div>

                  {/* Virtual Payment */}
                  <div
                    onClick={() => setSelectedPayment("virtual")}
                    className="flex cursor-pointer items-center gap-3 rounded-lg p-2 transition-colors hover:bg-gray-50"
                  >
                    <PaymentRadio
                      selected={selectedPayment === "virtual"}
                      onClick={() => setSelectedPayment("virtual")}
                    />
                    <div className="flex items-center gap-2">
                      <svg width="24" height="24" viewBox="0 0 30 30" fill="none">
                        <rect
                          x="2"
                          y="6"
                          width="26"
                          height="18"
                          rx="2"
                          stroke="black"
                          strokeWidth="2"
                        />
                        <path d="M2 11H28M7 15H12" stroke="black" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                      <span className="text-sm font-bold text-black">Virtual Payment</span>
                    </div>
                  </div>

                  {/* QRIS */}
                  <div
                    onClick={() => setSelectedPayment("qris")}
                    className="flex cursor-pointer items-center gap-3 rounded-lg p-2 transition-colors hover:bg-gray-50"
                  >
                    <PaymentRadio
                      selected={selectedPayment === "qris"}
                      onClick={() => setSelectedPayment("qris")}
                    />
                    <div className="flex items-center gap-2">
                      <svg width="24" height="24" viewBox="0 0 30 30" fill="none">
                        <rect x="4" y="4" width="9" height="9" fill="black" />
                        <rect x="17" y="4" width="9" height="9" fill="black" />
                        <rect x="4" y="17" width="9" height="9" fill="black" />
                        <rect x="17" y="17" width="5" height="5" fill="black" />
                      </svg>
                      <span className="text-sm font-bold text-black">QRIS</span>
                    </div>
                  </div>

                  {/* PayPal */}
                  <div
                    onClick={() => setSelectedPayment("paypal")}
                    className="flex cursor-pointer items-center gap-3 rounded-lg p-2 transition-colors hover:bg-gray-50"
                  >
                    <PaymentRadio
                      selected={selectedPayment === "paypal"}
                      onClick={() => setSelectedPayment("paypal")}
                    />
                    <div className="flex items-center gap-2">
                      <svg width="24" height="24" viewBox="0 0 30 30" fill="none">
                        <path
                          d="M12.4125 16.2375C12.5375 16.2375 15.4375 16.3625 17.1625 15.9375H17.175C19.1625 15.45 21.925 14.05 22.6375 9.475C22.6375 9.475 24.225 3.75 16.35 3.75H9.58745C8.97495 3.75 8.44995 4.2 8.34995 4.8L5.47495 23C5.41245 23.375 5.71245 23.725 6.08745 23.725H10.375L11.425 17.075C11.5 16.6 11.9125 16.2375 12.4125 16.2375Z"
                          fill="black"
                        />
                        <path
                          d="M23.7374 10.3625C22.7249 15.025 19.5374 17.4875 14.4624 17.4875H12.6249L11.3374 25.6375C11.2874 25.9625 11.5374 26.25 11.8624 26.25H14.2374C14.6624 26.25 15.0374 25.9375 15.0999 25.5125C15.1999 25.0125 15.7499 21.3625 15.8624 20.7375C15.9249 20.3125 16.2999 20 16.7249 20H17.2749C20.7999 20 23.5624 18.5625 24.3749 14.425C24.6999 12.75 24.5249 11.375 23.7374 10.3625Z"
                          fill="black"
                        />
                      </svg>
                      <span className="text-sm font-bold text-black">PayPal</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Rincian Pembayaran */}
              <div className="flex-1 rounded-[10px] bg-white p-4 shadow-[2px_2px_8px_0px_rgba(0,0,0,0.25)]">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-brand-red">Rincian Pembayaran</h2>
                  <button className="flex h-7 w-32 items-center justify-center rounded-[20px] border border-brand-red text-xs font-bold text-brand-red transition-colors hover:bg-brand-red hover:text-white">
                    Edit Informasi
                  </button>
                </div>

                <div className="mt-3 h-px w-full bg-brand-red" />

                <div className="mt-4 flex flex-col gap-3">
                  {/* Biaya Pesanan */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-black">Biaya Pesanan</span>
                    <span className="text-sm font-bold text-orange-800">
                      {formatPrice(PAYMENT_DETAILS.orderFee)}
                    </span>
                  </div>

                  {/* Diskon */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-black">Diskon</span>
                    <span className="text-sm font-bold text-orange-800">
                      - {formatPrice(PAYMENT_DETAILS.discount)}
                    </span>
                  </div>

                  {/* Biaya Ongkir */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-black">Biaya Ongkir</span>
                    <span className="text-sm font-bold text-orange-800">
                      {formatPrice(PAYMENT_DETAILS.shipping)}
                    </span>
                  </div>

                  {/* Biaya Layanan */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-black">Biaya Layanan</span>
                    <span className="text-sm font-bold text-orange-800">
                      {formatPrice(PAYMENT_DETAILS.service)}
                    </span>
                  </div>
                </div>

                <div className="mt-4 h-px w-full bg-brand-red" />

                {/* Total */}
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-base font-bold text-black">Total</span>
                  <span className="text-base font-bold text-brand-red">
                    {formatPrice(PAYMENT_DETAILS.total)}
                  </span>
                </div>
              </div>
            </div>

            {/* Tombol Bayar */}
            <div className="flex justify-center pt-4">
              <Link
                href="/customer/payment/payment-success"
                className={`flex h-12 w-56 items-center justify-center rounded-[20px] bg-brand-red text-base font-bold text-white transition-colors hover:bg-brand-red-soft ${
                  !selectedPayment ? "pointer-events-none opacity-50" : ""
                }`}
              >
                Bayar
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}