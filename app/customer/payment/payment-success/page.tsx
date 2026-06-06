"use client";

import Image from "next/image";
import Link from "next/link";

/* ============================================================
   TYPES
   ============================================================ */
type OrderData = {
  orderNumber: string;
  customerName: string;
};

/* ============================================================
   MOCK DATA
   ============================================================ */
const ORDER_DATA: OrderData = {
  orderNumber: "#PF003474",
  customerName: "Rafi Ihya Azzaky",
};

/* ============================================================
   PAGE
   ============================================================ */
export default function SuccessPaymentPage() {
  return (
    <div className="min-h-screen w-full bg-red-50 overflow-hidden relative">
      {/* Background maple leaves */}
      <div className="absolute left-6 top-16 z-10">
        <Image
          src="/icons/custom/leaf-left.png"
          alt=""
          width={128}
          height={120}
          className="object-contain"
        />
      </div>
      <div className="absolute left-20 top-72 z-10">
        <Image
          src="/icons/custom/maple-left.png"
          alt=""
          width={140}
          height={130}
          className="object-contain"
        />
      </div>
      <div className="absolute right-16 bottom-32 z-10">
        <Image
          src="/icons/custom/leaf-right.png"
          alt=""
          width={120}
          height={110}
          className="object-contain"
        />
      </div>
      <div className="absolute right-24 top-20 z-10">
        <Image
          src="/icons/custom/maple-right.png"
          alt=""
          width={135}
          height={124}
          className="object-contain"
        />
      </div>

      {/* Main Content */}
      <div className="mx-auto w-full max-w-[1120px] px-4 pt-10">
        {/* Header */}
        <div className="mb-10 flex flex-col items-center">
          <h1 className="font-display text-5xl text-brand-red">
            Checkout Payment
          </h1>
          <div className="mt-7 h-px w-[548px] bg-brand-red" />
        </div>

        {/* Success Card */}
        <div className="mx-auto w-full max-w-[669px] rounded-[10px] bg-white p-5 shadow-[2px_2px_8px_0px_rgba(0,0,0,0.25)]">
          <h2 className="text-center text-xl font-bold text-brand-red">Selamat!</h2>
          <div className="mt-3 h-px w-full bg-brand-red" />

          <div className="mt-4 text-center">
            <p className="text-base font-bold text-black">
              Pembayaran telah berhasil!
            </p>
            <p className="mt-2 text-base text-black">
              Nomor Pesanan kamu adalah{" "}
              <span className="font-bold">{ORDER_DATA.orderNumber}</span>
            </p>
            <p className="mt-2 text-base text-black">
              Barang kamu akan segera dikirim, kamu bisa cek rincian pengiriman di
              halaman "Pesanan Saya" atau klik tombol di bawah
            </p>
            <p className="mt-4 text-base font-bold text-black">
              Terimakasih telah order kebutuhan Cosplay di RyRentCos!
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="mx-auto mt-8 flex max-w-[669px] flex-col items-center gap-3">
          <Link
            href="/customer/transaction/transaction-history"
            className="flex h-11 w-52 items-center justify-center rounded-[20px] bg-brand-red text-base font-bold text-white transition-colors hover:bg-brand-red-soft"
          >
            Lihat Pesanan
          </Link>
          <Link
            href="/customer/product/product-catalog"
            className="flex h-11 w-52 items-center justify-center rounded-[20px] border border-brand-red text-base font-bold text-brand-red transition-colors hover:bg-brand-red hover:text-white"
          >
            Jelajahi Katalog
          </Link>
        </div>
      </div>
    </div>
  );
}