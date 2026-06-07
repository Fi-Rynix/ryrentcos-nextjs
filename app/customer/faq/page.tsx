"use client";

import { useState } from "react";
import Link from "next/link";

/* ============================================================
   TYPES
   ============================================================ */
type FaqCategory = {
  id: string;
  name: string;
  icon: React.ReactNode;
};

type FaqItem = {
  id: string;
  question: string;
  answer: string;
  categoryId: string;
};

/* ============================================================
   MOCK DATA
   ============================================================ */
const CATEGORIES: FaqCategory[] = [
  {
    id: "general",
    name: "Umum",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3M12 17h.01" />
      </svg>
    ),
  },
  {
    id: "rental",
    name: "Penyewaan",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0" />
      </svg>
    ),
  },
  {
    id: "payment",
    name: "Pembayaran",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
        <line x1="1" y1="10" x2="23" y2="10" />
      </svg>
    ),
  },
  {
    id: "shipping",
    name: "Pengiriman",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13" />
        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
  },
  {
    id: "return",
    name: "Pengembalian",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="1 4 1 10 7 10" />
        <path d="M3.51 15a9 9 0 102.13-9.36L1 10" />
      </svg>
    ),
  },
];

const FAQ_ITEMS: FaqItem[] = [
  // General
  {
    id: "g1",
    question: "Apa itu RyRentCos?",
    answer: "RyRentCos adalah platform penyewaan kostum cosplay yang hadir untuk memenuhi kebutuhan cosplayer di Indonesia. Kami menyediakan berbagai kostum cosplay berkualitas mulai dari fullset, wig, hingga aksesoris dengan harga terjangkau dan proses yang mudah.",
    categoryId: "general",
  },
  {
    id: "g2",
    question: "Bagaimana cara bergabung dengan RyRentCos?",
    answer: "Kamu bisa langsung mendaftar melalui halaman registrasi. Setelah mendaftar, kamu bisa langsung menjelajahi katalog kostum dan melakukan penyewaan. Proses registrasi gratis dan mudah!",
    categoryId: "general",
  },
  {
    id: "g3",
    question: "Apakah RyRentCos hanya untuk cosplayer profesional?",
    answer: "Tidak! RyRentCos terbuka untuk semua kalangan, mulai dari pemula hingga cosplayer berpengalaman. Kami juga menyediakan tutorial pemakaian untuk setiap kostum agar pemula bisa dengan mudah menggunakan kostum cosplay.",
    categoryId: "general",
  },
  // Rental
  {
    id: "r1",
    question: "Bagaimana cara menyewa kostum di RyRentCos?",
    answer: "Cukup pilih kostum yang kamu inginkan, pilih ukuran dan tanggal sewa, lalu proceed ke pembayaran. Setelah pembayaran berhasil, kostum akan kami siapkan dan dikirimkan sesuai jadwal yang kamu pilih.",
    categoryId: "rental",
  },
  {
    id: "r2",
    question: "Berapa lama durasi penyewaan kostum?",
    answer: "Durasi standar penyewaan adalah 3 hari 2 malam (dari tanggal pengambilan/pengiriman hingga tanggal pengembalian). Namun kamu bisa memperpanjang durasi sewa dengan biaya tambahan. Hubungi kami untuk perpanjangan.",
    categoryId: "rental",
  },
  {
    id: "r3",
    question: "Apakah bisa memilih ukuran kostum?",
    answer: "Ya, setiap kostum memiliki beberapa pilihan ukuran (M, L, XL, dll). Pastikan untuk memilih ukuran yang sesuai dengan tubuhmu. Jika ragu, kamu bisa menghubungi kami untuk konsultasi ukuran.",
    categoryId: "rental",
  },
  {
    id: "r4",
    question: "Apa saja yang termasuk dalam penyewaan fullset?",
    answer: "Setiap fullset bervariasi tergantung kostumnya, tapi umumnya mencakup: dress utama, wig, aksesoris (bros, ikat pinggang, dll), dan ornamen tambahan. Detail lengkap bisa dilihat di halaman produk masing-masing.",
    categoryId: "rental",
  },
  // Payment
  {
    id: "p1",
    question: "Metode pembayaran apa saja yang tersedia?",
    answer: "Kami menerima berbagai metode pembayaran: Transfer Bank (BCA, Mandiri, BRI, BNI), Virtual Account (VA), QRIS, dan PayPal untuk pembayaran internasional. Semua metode pembayaran aman dan terpercaya.",
    categoryId: "payment",
  },
  {
    id: "p2",
    question: "Kapan saya harus melakukan pembayaran?",
    answer: "Pembayaran harus dilakukan dalam waktu 24 jam setelah checkout. Jika dalam waktu tersebut belum ada konfirmasi pembayaran, pesanan akan otomatis dibatalkan.",
    categoryId: "payment",
  },
  {
    id: "p3",
    question: "Apakah ada biaya tambahan selain harga sewa?",
    answer: "Ya, ada biaya pengiriman yang bervariasi tergantung lokasi. Untuk biaya layanan kami berikan diskon khusus untuk pelanggan setia. Detail biaya bisa dilihat saat checkout.",
    categoryId: "payment",
  },
  {
    id: "p4",
    question: "Bagaimana jika saya membatalkan pesanan?",
    answer: "Pembatalan bisa dilakukan sebelum kostum dikirim. Jika sudah dibayar, refund akan diproses sesuai metode pembayaran dalam 1-3 hari kerja. Namun jika kostum sudah dikirim, pembatalan tidak dapat dilakukan.",
    categoryId: "payment",
  },
  // Shipping
  {
    id: "s1",
    question: "Berapa lama pengiriman kostum?",
    answer: "Pengiriman memakan waktu 1-3 hari kerja tergantung lokasi. Kami selalu memastikan kostum sampai sebelum tanggal event kamu. Untuk itu, pastikan untuk memesan minimal 3 hari sebelum event.",
    categoryId: "shipping",
  },
  {
    id: "s2",
    question: "Apakah bisa mengambil kostum langsung di lokasi?",
    answer: "Ya, kamu bisa mengambil kostum langsung di tempat kami di Surabaya. Hubungi kami terlebih dahulu untuk mengatur pengambilan. Opsi ini berguna untuk kamu yang tidak ingin dikenakan biaya pengiriman.",
    categoryId: "shipping",
  },
  {
    id: "s3",
    question: "Bagaimana jika kostum tidak sampai tepat waktu?",
    answer: "Kami berkomitmen mengirim kostum tepat waktu. Jika ada kendala pengiriman dari pihak ekspedisi, segera hubungi kami dan kami akan bantu melacak pengiriman serta memberikan solusi terbaik.",
    categoryId: "shipping",
  },
  // Return
  {
    id: "e1",
    question: "Bagaimana cara mengembalikan kostum?",
    answer: "Kostum bisa dikembalikan melalui ekspedisi yang sama dengan pengiriman. Pastikan kostum dalam kondisi bersih dan lengkap sesuai saat diterima. Jangan lupa untuk mengecek kembali semua aksesoris sebelum mengembalikan.",
    categoryId: "return",
  },
  {
    id: "e2",
    question: "Apa yang terjadi jika kostum rusak saat dikembalikan?",
    answer: "Jika ada kerusakan yang bukan dari penggunaan normal, kamu akan dikenakan biaya perbaikan atau penggantian. Namun kerusakan kecil akibat penggunaan normal tidak akan dikenakan biaya. Kami sarankan untuk selalu merawat kostum dengan baik.",
    categoryId: "return",
  },
  {
    id: "e3",
    question: "Apakah bisa memperpanjang masa sewa?",
    answer: "Ya, perpanjangan bisa dilakukan dengan menghubungi kami sebelum masa sewa berakhir. Biaya perpanjangan dihitung per hari dengan tarif yang sama. Perpanjangan hanya bisa dilakukan jika kostum tidak booked oleh pelanggan lain.",
    categoryId: "return",
  },
  {
    id: "e4",
    question: "Kapan terakhir saya harus mengembalikan kostum?",
    answer: "Kostum harus dikembalikan paling lambat pada tanggal yang tertera di invoice/order kamu. Pengembalian setelah tanggal tersebut akan dikenakan biaya keterlambatan per hari.",
    categoryId: "return",
  },
];

/* ============================================================
   COMPONENTS
   ============================================================ */

/**
 * FAQ Accordion Item
 */
function FaqAccordionItem({
  item,
  isOpen,
  onToggle,
}: {
  item: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="overflow-hidden rounded-[10px] bg-white shadow-[2px_2px_8px_0px_rgba(0,0,0,0.15)]">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-stone-50"
      >
        <span className="flex-1 pr-4 text-sm font-bold text-black">{item.question}</span>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {isOpen && (
        <div className="border-t border-brand-red/20 px-4 pb-4 pt-3">
          <p className="text-sm leading-relaxed text-black/70">{item.answer}</p>
        </div>
      )}
    </div>
  );
}

/**
 * Category Filter Button
 */
function CategoryButton({
  category,
  isActive,
  onClick,
}: {
  category: FaqCategory;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold transition-all ${
        isActive
          ? "bg-brand-red text-white"
          : "border-2 border-brand-red text-brand-red hover:bg-brand-red hover:text-white"
      }`}
    >
      <span className="shrink-0">{category.icon}</span>
      <span>{category.name}</span>
    </button>
  );
}

/* ============================================================
   PAGE
   ============================================================ */
export default function FaqPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [openFaqId, setOpenFaqId] = useState<string | null>(null);

  const filteredFaqs = activeCategory
    ? FAQ_ITEMS.filter((item) => item.categoryId === activeCategory)
    : FAQ_ITEMS;

  const handleFaqToggle = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <div className="min-h-screen w-full bg-red-50 pb-20">
      <div className="mx-auto w-full max-w-[1120px] px-4 pt-10">
        {/* Header */}
        <div className="mb-8 flex flex-col items-center">
          <h1 className="font-display text-5xl font-normal leading-[58px] text-brand-red">
            FAQ
          </h1>
          <div className="mt-7 h-px w-[548px] bg-brand-red" />
        </div>

        {/* Subtitle */}
        <div className="mb-8 text-center">
          <p className="text-base text-black/70">
            Temukan jawaban untuk pertanyaan yang sering diajukan tentang layanan RyRentCos
          </p>
        </div>

        {/* Main Content */}
        <div className="flex flex-col gap-8">
          {/* Category Filter */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => setActiveCategory(null)}
              className={`rounded-full px-4 py-2 text-sm font-bold transition-all ${
                activeCategory === null
                  ? "bg-brand-red text-white"
                  : "border-2 border-brand-red text-brand-red hover:bg-brand-red hover:text-white"
              }`}
            >
              Semua
            </button>
            {CATEGORIES.map((category) => (
              <CategoryButton
                key={category.id}
                category={category}
                isActive={activeCategory === category.id}
                onClick={() => setActiveCategory(category.id)}
              />
            ))}
          </div>

          {/* FAQ List */}
          <div className="flex flex-col gap-3">
            {filteredFaqs.map((item) => (
              <FaqAccordionItem
                key={item.id}
                item={item}
                isOpen={openFaqId === item.id}
                onToggle={() => handleFaqToggle(item.id)}
              />
            ))}
          </div>

          {/* Empty State */}
          {filteredFaqs.length === 0 && (
            <div className="flex flex-col items-center justify-center rounded-xl bg-white py-16 shadow-md">
              <p className="text-base font-bold text-black">
                Tidak ada pertanyaan dalam kategori ini
              </p>
            </div>
          )}

          {/* Contact Section */}
          <div className="mt-4 rounded-[10px] bg-white p-6 shadow-[2px_2px_8px_0px_rgba(0,0,0,0.25)]">
            <div className="flex flex-col items-center gap-4 text-center">
              <h3 className="text-xl font-bold text-brand-red">Tidak menemukan jawaban?</h3>
              <p className="max-w-md text-sm text-black/70">
                Jika kamu masih memiliki pertanyaan yang belum terjawab, jangan ragu untuk menghubungi kami melalui WhatsApp atau email.
              </p>
              <div className="mt-2 flex flex-wrap justify-center gap-4">
                <a
                  href="https://wa.me/6289696578125"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-12 items-center gap-2 rounded-[20px] bg-brand-red px-6 text-sm font-bold text-white transition-colors hover:bg-brand-red-soft"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  <span>Hubungi WhatsApp</span>
                </a>
                <a
                  href="mailto:contact@ryrentcos.com"
                  className="flex h-12 items-center gap-2 rounded-[20px] border-2 border-brand-red px-6 text-sm font-bold text-brand-red transition-colors hover:bg-brand-red hover:text-white"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  Kirim Email
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Home */}
        <div className="mt-8 flex justify-center">
          <Link
            href="/customer/landing-page"
            className="flex items-center gap-2 text-sm font-bold text-brand-red transition-colors hover:text-brand-red-soft"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
}
