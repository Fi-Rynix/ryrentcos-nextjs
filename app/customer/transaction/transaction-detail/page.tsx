"use client";

import type { ReactElement } from "react";
import Image from "next/image";
import Link from "next/link";

/* ============================================================
   TYPES
   ============================================================ */
type OrderStatus = "pending" | "dikonfirmasi" | "dikirim" | "diterima" | "selesai";

type OrderItem = {
  id: string;
  name: string;
  image: string;
  originalPrice: number;
  price: number;
  size: string;
  quantity: number;
  status: OrderStatus;
};

type OrderData = {
  orderId: string;
  orderDate: string;
  trackingNumber: string;
  rentDate: string;
  returnDate: string;
  recipientName: string;
  recipientPhone: string;
  recipientAddress: string;
  items: OrderItem[];
  paymentMethod: "bank" | "virtual" | "qris" | "paypal";
  orderFee: number;
  discount: number;
  shippingCost: number;
  serviceFee: number;
  total: number;
  status: OrderStatus;
};

/* ============================================================
   MOCK DATA
   ============================================================ */
const ORDER_DATA: OrderData = {
  orderId: "#PF003474",
  orderDate: "01 Juni 2025, 14:30 WIB",
  trackingNumber: "72847329249820",
  rentDate: "22 Desember 2025",
  returnDate: "25 Desember 2025",
  recipientName: "Rafi Ihya Azzaky",
  recipientPhone: "089696578125",
  recipientAddress:
    "Kost Akbp, jalan Jojoran I Asri No. 14 A, RT.8/RW.8, Mojo, Gubeng (KOST NYPD / IBU ROHA), KOTA SURABAYA, GUBENG, JAWA TIMUR, ID, 60285",
  items: [
    {
      id: "i1",
      name: "(Fullset) Cosplay Columbina - Genshin Impact",
      image: "/images/product-detail/columbina1.png",
      originalPrice: 150000,
      price: 105000,
      size: "M",
      quantity: 1,
      status: "dikirim",
    },
  ],
  paymentMethod: "bank",
  orderFee: 105000,
  discount: 0,
  shippingCost: 20000,
  serviceFee: 2000,
  total: 127000,
  status: "dikirim",
};

/* ============================================================
   HELPER
   ============================================================ */
function formatPrice(price: number): string {
  return `IDR ${price.toLocaleString("id-ID")}`;
}

function getStatusLabel(status: OrderStatus): string {
  const labels: Record<OrderStatus, string> = {
    pending: "Menunggu Pembayaran",
    dikonfirmasi: "Dikonfirmasi",
    dikirim: "Sedang Dikirim",
    diterima: "Diterima",
    selesai: "Selesai",
  };
  return labels[status];
}

/* ============================================================
   ICONS
   ============================================================ */
function IconKonfirmasi() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 11l3 3L22 4" />
      <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
    </svg>
  );
}

function IconKirim() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 17H4a2 2 0 01-2-2V5a2 2 0 012-2h16a2 2 0 012 2v10a2 2 0 01-2 2h-1" />
      <path d="M22 12l-4-4v3H10v2l4 4" />
    </svg>
  );
}

function IconTerima() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 0011.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
      <path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" />
    </svg>
  );
}

function IconSelesai() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
      <path d="M22 4L12 14.01l-3-3" />
    </svg>
  );
}

function IconBank() {
  return (
    <svg width="24" height="24" viewBox="0 0 30 30" fill="none">
      <path
        d="M14.375 1.25L2.5 7.5V10H26.25V7.5M20 12.5V21.25H23.75V12.5M2.5 27.5H26.25V23.75H2.5M12.5 12.5V21.25H16.25V12.5M5 12.5V21.25H8.75V12.5H5Z"
        fill="currentColor"
      />
    </svg>
  );
}

function IconVirtual() {
  return (
    <svg width="24" height="24" viewBox="0 0 30 30" fill="none">
      <rect x="2" y="6" width="26" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M2 11H28M7 15H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function IconQris() {
  return (
    <svg width="24" height="24" viewBox="0 0 30 30" fill="none">
      <rect x="4" y="4" width="9" height="9" fill="currentColor" />
      <rect x="17" y="4" width="9" height="9" fill="currentColor" />
      <rect x="4" y="17" width="9" height="9" fill="currentColor" />
      <rect x="17" y="17" width="5" height="5" fill="currentColor" />
    </svg>
  );
}

function IconPaypal() {
  return (
    <svg width="24" height="24" viewBox="0 0 30 30" fill="none">
      <path
        d="M12.4125 16.2375C12.5375 16.2375 15.4375 16.3625 17.1625 15.9375H17.175C19.1625 15.45 21.925 14.05 22.6375 9.475C22.6375 9.475 24.225 3.75 16.35 3.75H9.58745C8.97495 3.75 8.44995 4.2 8.34995 4.8L5.47495 23C5.41245 23.375 5.71245 23.725 6.08745 23.725H10.375L11.425 17.075C11.5 16.6 11.9125 16.2375 12.4125 16.2375Z"
        fill="currentColor"
      />
      <path
        d="M23.7374 10.3625C22.7249 15.025 19.5374 17.4875 14.4624 17.4875H12.6249L11.3374 25.6375C11.2874 25.9625 11.5374 26.25 11.8624 26.25H14.2374C14.6624 26.25 15.0374 25.9375 15.0999 25.5125C15.1999 25.0125 15.7499 21.3625 15.8624 20.7375C15.9249 20.3125 16.2999 20 16.7249 20H17.2749C20.7999 20 23.5624 18.5625 24.3749 14.425C24.6999 12.75 24.5249 11.375 23.7374 10.3625Z"
        fill="currentColor"
      />
    </svg>
  );
}

/* ============================================================
   COMPONENTS
   ============================================================ */

/**
 * Order progress step indicator with icons - Roadmap style.
 */
function OrderProgressStep({ status }: { status: OrderStatus }) {
  const steps: { key: OrderStatus; label: string; icon: () => ReactElement }[] = [
    { key: "dikonfirmasi", label: "Dikonfirmasi", icon: IconKonfirmasi },
    { key: "dikirim", label: "Dikirim", icon: IconKirim },
    { key: "diterima", label: "Diterima", icon: IconTerima },
    { key: "selesai", label: "Selesai", icon: IconSelesai },
  ];

  const currentIndex = steps.findIndex((s) => s.key === status);
  const nodeCenterPercent = 12.5;
  const spanPercent = 100 - nodeCenterPercent * 2; // 75% (from node 1 to node 4)
  const segmentPercent = spanPercent / (steps.length - 1); // 25% per segment

  return (
    <div className="relative flex w-full items-center">
      {/* Roadmap lines wrapper - agar fill dan kosong sejajar */}
<div className="absolute left-0 right-0 top-1/2 h-12 -translate-y-1/2 flex items-center">
        {/* Background line (kosong) */}
        <div
          className="h-1 w-full rounded-full border-2 border-brand-red/30"
          style={{
            marginLeft: `${nodeCenterPercent}%`,
            marginRight: `${nodeCenterPercent}%`,
          }}
        />

        {/* Active progress line (fill) */}
        {currentIndex > 0 && (
          <div
            className="absolute h-1 rounded-full bg-brand-red transition-all"
            style={{
              left: `${nodeCenterPercent}%`,
              width: `calc(${currentIndex * segmentPercent}%)`,
            }}
          />
        )}
      </div>

      {steps.map((step, index) => {
        const isActive = currentIndex >= index;
        const isCompleted = currentIndex > index;
        const Icon = step.icon;

        return (
          <div
            key={step.key}
            className="relative z-10 flex flex-1 flex-col items-center gap-2"
          >
            {/* Node */}
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all ${
                isActive
                  ? "border-brand-red bg-brand-red text-white"
                  : "border-brand-red/30 bg-white text-brand-red/30"
              }`}
            >
              {isCompleted ? (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12L10 17L20 7" />
                </svg>
              ) : (
                <Icon />
              )}
            </div>

            {/* Label */}
            <span
              className={`text-center text-xs font-bold leading-3 ${
                isActive ? "text-brand-red" : "text-brand-red/40"
              }`}
            >
              {step.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

/**
 * Order item card (tanpa tanggal sewa).
 */
function OrderItemCard({ item }: { item: OrderItem }) {
  return (
    <div className="flex items-start gap-4 rounded-[10px] bg-stone-100 p-4">
      {/* Product Image */}
      <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-[5px] bg-white">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover object-left-top"
        />
      </div>

      {/* Product Details */}
      <div className="flex flex-1 flex-col gap-2">
        <h4 className="text-sm font-bold text-black line-clamp-2">{item.name}</h4>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-black/60">Size:</span>
            <span className="text-xs font-bold text-brand-red">{item.size}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-black/60">Jumlah:</span>
            <span className="text-xs font-bold text-brand-red">{item.quantity}</span>
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between">
          <span className="text-xs text-black/60">Harga:</span>
          <div className="flex items-center gap-2">
            {item.originalPrice > item.price && (
              <span className="text-xs font-bold text-brand-red line-through">
                {formatPrice(item.originalPrice)}
              </span>
            )}
            <span className="text-sm font-bold text-brand-red">
              {formatPrice(item.price)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Payment method icon component.
 */
function PaymentMethodIcon({ method }: { method: OrderData["paymentMethod"] }) {
  const icons: Record<OrderData["paymentMethod"], () => ReactElement> = {
    bank: IconBank,
    virtual: IconVirtual,
    qris: IconQris,
    paypal: IconPaypal,
  };
  const labels: Record<OrderData["paymentMethod"], string> = {
    bank: "Transfer Bank",
    virtual: "Virtual Payment",
    qris: "QRIS",
    paypal: "PayPal",
  };
  const Icon = icons[method];
  return (
    <div className="flex items-center gap-2 text-brand-red">
      <Icon />
      <span className="text-sm font-bold">{labels[method]}</span>
    </div>
  );
}

/* ============================================================
   PAGE
   ============================================================ */
export default function TransactionDetailPage() {
  return (
    <div className="min-h-screen w-full bg-red-50 pb-20">
      <div className="mx-auto w-full max-w-[1120px] px-4 pt-10">
        {/* Header */}
        <div className="mb-8 flex flex-col items-center">
          <h1 className="font-display text-5xl font-normal leading-[58px] text-brand-red">
            Order Detail
          </h1>
          <div className="mt-7 h-px w-[548px] bg-brand-red" />
        </div>

        {/* Back Button */}
        <div className="mb-6">
          <Link
            href="/customer/transaction/transaction-history"
            className="flex items-center gap-2 text-sm font-bold text-brand-red transition-colors hover:text-brand-red-soft"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Kembali ke Riwayat Pesanan
          </Link>
        </div>

        {/* Main Content - 4 Sections */}
        <div className="flex flex-col gap-6">
          {/* ================================================
              SECTION 1: Progres Pesanan
              ================================================ */}
          <div className="rounded-[10px] bg-white p-4 shadow-[2px_2px_8px_0px_rgba(0,0,0,0.25)]">
            {/* Header - Red Background */}
            <div className="-m-4 mb-4 flex items-center justify-between bg-brand-red p-4">
              <h2 className="text-xl font-bold text-white">Progres Pesanan</h2>
              <span className="rounded-full bg-brand-accent px-3 py-1 text-xs font-bold text-black">
                {getStatusLabel(ORDER_DATA.status)}
              </span>
            </div>

            {/* Order Progress Step */}
            <div className="mt-6">
              <OrderProgressStep status={ORDER_DATA.status} />
            </div>

            {/* Metadata */}
            <div className="mt-8 grid grid-cols-2 gap-4 text-center sm:grid-cols-4">
              <div className="flex flex-col items-center gap-1">
                <span className="text-xs text-black/60">ID Pesanan</span>
                <span className="text-sm font-bold text-black">{ORDER_DATA.orderId}</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="text-xs text-black/60">No. Resi</span>
                <span className="text-sm font-bold text-black">{ORDER_DATA.trackingNumber}</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="text-xs text-black/60">Tanggal Rental</span>
                <span className="text-sm font-bold text-black">{ORDER_DATA.rentDate}</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="text-xs text-black/60">Tanggal Kembali</span>
                <span className="text-sm font-bold text-black">{ORDER_DATA.returnDate}</span>
              </div>
            </div>

          </div>

          {/* ================================================
              SECTION 2: Informasi Penerima
              ================================================ */}
          <div className="rounded-[10px] bg-white p-4 shadow-[2px_2px_8px_0px_rgba(0,0,0,0.25)]">
            <h2 className="text-xl font-bold text-brand-red">Informasi Penerima</h2>
            <div className="mt-3 h-px w-full bg-brand-red" />

            <div className="mt-4 flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-bold text-black">Nama:</span>
                <span className="text-sm text-black">{ORDER_DATA.recipientName}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm font-bold text-black">Nomor WhatsApp:</span>
                <span className="text-sm text-black">{ORDER_DATA.recipientPhone}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm font-bold text-black">Alamat:</span>
                <span className="text-sm text-black">{ORDER_DATA.recipientAddress}</span>
              </div>
            </div>
          </div>

          {/* ================================================
              SECTION 3: Rincian Pesanan
              ================================================ */}
          <div className="rounded-[10px] bg-white p-4 shadow-[2px_2px_8px_0px_rgba(0,0,0,0.25)]">
            <h2 className="text-xl font-bold text-brand-red">Rincian Pesanan</h2>
            <div className="mt-3 h-px w-full bg-brand-red" />

            <div className="mt-4 flex flex-col gap-4">
              {ORDER_DATA.items.map((item) => (
                <OrderItemCard key={item.id} item={item} />
              ))}
            </div>
          </div>

          {/* ================================================
              SECTION 4: Rincian Pembayaran
              ================================================ */}
          <div className="rounded-[10px] bg-white p-4 shadow-[2px_2px_8px_0px_rgba(0,0,0,0.25)]">
            <h2 className="text-xl font-bold text-brand-red">Rincian Pembayaran</h2>
            <div className="mt-3 h-px w-full bg-brand-red" />

            {/* Metode Pembayaran */}
            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm text-black">Metode Pembayaran</span>
              <PaymentMethodIcon method={ORDER_DATA.paymentMethod} />
            </div>

            {/* Divider */}
            <div className="mt-4 h-px w-full bg-brand-red" />

            {/* Biaya-biaya */}
            <div className="mt-4 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-black">Biaya Pesanan</span>
                <span className="text-sm font-bold text-brand-red">
                  {formatPrice(ORDER_DATA.orderFee)}
                </span>
              </div>

              {ORDER_DATA.discount > 0 && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-black">Diskon</span>
                  <span className="text-sm font-bold text-green-600">
                    - {formatPrice(ORDER_DATA.discount)}
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between">
                <span className="text-sm text-black">Biaya Ongkir</span>
                <span className="text-sm font-bold text-brand-red">
                  {formatPrice(ORDER_DATA.shippingCost)}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-black">Biaya Layanan</span>
                <span className="text-sm font-bold text-brand-red">
                  {formatPrice(ORDER_DATA.serviceFee)}
                </span>
              </div>
            </div>

            {/* Divider */}
            <div className="mt-4 h-px w-full bg-brand-red" />

            {/* Total */}
            <div className="mt-4 flex items-center justify-between">
              <span className="text-base font-bold text-black">Total</span>
              <span className="text-base font-bold text-brand-red">
                {formatPrice(ORDER_DATA.total)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
