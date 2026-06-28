"use client";

import { useState } from "react";
import TransactionDetailModal from "./_components/TransactionDetailModal";

/* ============================================================
   TYPES
   ============================================================ */
type OrderStatus = "order_masuk" | "dikirim" | "kembali" | "selesai";

type Transaction = {
  id: string;
  orderId: string;
  customerName: string;
  customerEmail: string;
  items: {
    id: string;
    name: string;
    image: string;
    price: number;
    size: string;
    quantity: number;
  }[];
  rentDate: string;
  returnDate: string;
  total: number;
  status: OrderStatus;
  orderDate: string;
};

/* ============================================================
   MOCK DATA
   ============================================================ */
const MOCK_TRANSACTIONS: Transaction[] = [
  { id: "1", orderId: "ORD-20250601-001", customerName: "Kurosawa Yuki", customerEmail: "kurosawa.yuki@email.com", items: [{ id: "i1", name: "(Fullset) Cosplay Columbina - Genshin Impact", image: "/images/fullset/columbina.png", price: 105000, size: "M", quantity: 1 }], rentDate: "22 Des 2025", returnDate: "25 Des 2025", total: 127000, status: "order_masuk", orderDate: "01 Jun 2025" },
  { id: "2", orderId: "ORD-20250601-002", customerName: "Tanaka Sakura", customerEmail: "tanaka.sakura@email.com", items: [{ id: "i2", name: "(Fullset) Cosplay Durin - Genshin Impact", image: "/images/fullset/durin.png", price: 105000, size: "L", quantity: 1 }, { id: "i3", name: "(Wig) Cosplay Venti - Genshin Impact", image: "/images/wig/venti.png", price: 60000, size: "One Size", quantity: 1 }], rentDate: "28 Des 2025", returnDate: "31 Des 2025", total: 189000, status: "dikirim", orderDate: "01 Jun 2025" },
  { id: "3", orderId: "ORD-20250515-003", customerName: "Suzuki Hiro", customerEmail: "suzuki.hiro@email.com", items: [{ id: "i4", name: "(Fullset) Cosplay Firefly My Istri - Honkai: Star Rail", image: "/images/fullset/firefly.png", price: 150000, size: "XL", quantity: 1 }], rentDate: "10 Mei 2025", returnDate: "13 Mei 2025", total: 172000, status: "kembali", orderDate: "15 Mei 2025" },
  { id: "4", orderId: "ORD-20250501-004", customerName: "Watanabe Mei", customerEmail: "watanabe.mei@email.com", items: [{ id: "i5", name: "(Fullset) Cosplay Hosou Marine - Hololive", image: "/images/fullset/marine.png", price: 150000, size: "L", quantity: 1 }], rentDate: "15 Mei 2025", returnDate: "18 Mei 2025", total: 172000, status: "selesai", orderDate: "01 Mei 2025" },
  { id: "5", orderId: "ORD-20250420-005", customerName: "Ito Ren", customerEmail: "ito.ren@email.com", items: [{ id: "i6", name: "(Props) Arlecchino - Genshin Impact", image: "/images/prop/arlecchino.png", price: 50000, size: "One Size", quantity: 1 }], rentDate: "25 Apr 2025", returnDate: "28 Apr 2025", total: 69000, status: "order_masuk", orderDate: "20 Apr 2025" },
  { id: "6", orderId: "ORD-20250415-006", customerName: "Nakamura Aoi", customerEmail: "nakamura.aoi@email.com", items: [{ id: "i7", name: "(Fullset) Cosplay Columbina - Genshin Impact", image: "/images/fullset/columbina.png", price: 105000, size: "S", quantity: 1 }], rentDate: "20 Apr 2025", returnDate: "23 Apr 2025", total: 127000, status: "dikirim", orderDate: "15 Apr 2025" },
  { id: "7", orderId: "ORD-20250410-007", customerName: "Kobayashi Ken", customerEmail: "kobayashi.ken@email.com", items: [{ id: "i8", name: "(Wig) Cosplay Venti - Genshin Impact", image: "/images/wig/venti.png", price: 60000, size: "One Size", quantity: 1 }], rentDate: "15 Apr 2025", returnDate: "18 Apr 2025", total: 72000, status: "kembali", orderDate: "10 Apr 2025" },
  { id: "8", orderId: "ORD-20250405-008", customerName: "Yamamoto Hikari", customerEmail: "yamamoto.hikari@email.com", items: [{ id: "i9", name: "(Fullset) Cosplay Durin - Genshin Impact", image: "/images/fullset/durin.png", price: 105000, size: "M", quantity: 1 }], rentDate: "10 Apr 2025", returnDate: "13 Apr 2025", total: 127000, status: "selesai", orderDate: "05 Apr 2025" },
];

/* ============================================================
   CONSTANTS
   ============================================================ */
const TABS = [
  { key: "all", label: "Semua", count: MOCK_TRANSACTIONS.length },
  { key: "order_masuk", label: "Order Masuk", count: MOCK_TRANSACTIONS.filter((t) => t.status === "order_masuk").length },
  { key: "dikirim", label: "Dikirim", count: MOCK_TRANSACTIONS.filter((t) => t.status === "dikirim").length },
  { key: "kembali", label: "Kembali", count: MOCK_TRANSACTIONS.filter((t) => t.status === "kembali").length },
  { key: "selesai", label: "Selesai", count: MOCK_TRANSACTIONS.filter((t) => t.status === "selesai").length },
];

const ITEMS_PER_PAGE = 5;

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

function getStatusLabel(status: OrderStatus): string {
  const labels: Record<OrderStatus, string> = {
    order_masuk: "Order Masuk",
    dikirim: "Dikirim",
    kembali: "Kembali",
    selesai: "Selesai",
  };
  return labels[status];
}

function getStatusBadge(status: OrderStatus): string {
  const styles: Record<OrderStatus, string> = {
    order_masuk: "bg-orange-300 text-red-800",
    dikirim: "bg-blue-100 text-blue-700",
    kembali: "bg-purple-100 text-purple-700",
    selesai: "bg-emerald-100 text-emerald-700",
  };
  return styles[status];
}

/* ============================================================
   TRANSACTION CARD
   ============================================================ */
function TransactionCard({
  transaction,
  onViewDetail,
}: {
  transaction: Transaction;
  onViewDetail: () => void;
}) {
  const firstItem = transaction.items[0];
  const moreItems = transaction.items.length - 1;

  return (
    <div className="flex w-full flex-col gap-3 overflow-hidden rounded-[10px] bg-white p-3 shadow-md sm:gap-4 sm:p-5">
      {/* Top row: Order ID + Status + Date */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-sm font-bold text-brand-red sm:text-base">{transaction.orderId}</p>
          <span
            className={`inline-flex items-center rounded-sm px-2 py-0.5 text-xs font-bold ${getStatusBadge(transaction.status)}`}
          >
            {getStatusLabel(transaction.status)}
          </span>
        </div>
        <p className="text-xs text-zinc-500 sm:text-sm">{transaction.orderDate}</p>
      </div>

      {/* Middle: Customer + Items */}
      <div className="flex flex-col gap-2 border-t border-zinc-100 pt-3">
        <div className="flex flex-col gap-0.5">
          <p className="text-sm font-medium text-neutral-950 sm:text-base">{transaction.customerName}</p>
          <p className="truncate text-xs text-zinc-500 sm:text-sm">{transaction.customerEmail}</p>
        </div>
        <div className="flex flex-col gap-0.5">
          <p className="line-clamp-2 text-xs text-neutral-950 sm:text-sm">{firstItem?.name}</p>
          <p className="text-xs text-zinc-500 sm:text-sm">
            {moreItems > 0 ? `+${moreItems} item lagi` : `Size: ${firstItem?.size}`}
          </p>
        </div>
      </div>

      {/* Bottom row: Rent dates + Total + Detail */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-zinc-100 pt-3">
        <div className="flex flex-col gap-0.5 text-xs text-zinc-600 sm:text-sm">
          <span>
            <span className="font-bold">Sewa:</span> {transaction.rentDate}
          </span>
          <span>
            <span className="font-bold">Kembali:</span> {transaction.returnDate}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <p className="text-sm font-bold text-orange-800 sm:text-base">{formatPrice(transaction.total)}</p>
          <button
            type="button"
            onClick={onViewDetail}
            className="flex h-8 items-center justify-center rounded-lg bg-orange-800 px-3 text-xs font-bold text-white transition hover:bg-orange-700 sm:px-4 sm:text-sm"
          >
            Detail
          </button>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   PAGE COMPONENT
   ============================================================ */
export default function ManageTransactionPage() {
  const [transactions] = useState<Transaction[]>(MOCK_TRANSACTIONS);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.customerName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = activeTab === "all" || transaction.status === activeTab;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredTransactions.length / ITEMS_PER_PAGE);
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handleTabChange = (key: string) => {
    setActiveTab(key);
    setCurrentPage(1);
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
            placeholder="Cari order ID atau customer..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="h-9 w-full rounded-lg border border-zinc-100 bg-zinc-100 pl-10 pr-3 text-sm text-zinc-800 placeholder:text-zinc-400 focus:border-brand-red focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-red/20"
          />
        </div>

        {/* Refresh Button */}
        <button
          type="button"
          className="flex h-9 w-full shrink-0 items-center justify-center gap-2 rounded-lg border border-zinc-200 bg-white px-4 text-sm font-semibold text-zinc-600 transition hover:bg-zinc-50 sm:w-auto"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M1 4v6h6M23 20v-6h-6" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M20.49 9A9 9 0 005.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 013.51 15" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Refresh
        </button>
      </div>

      {/* Status Tabs — 5 items, horizontal scroll on mobile */}
      <div className="grid grid-cols-3 gap-2 rounded-2xl bg-red-50 p-2 sm:flex sm:justify-center sm:gap-1 sm:p-1">
        {TABS.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => handleTabChange(tab.key)}
              className={`relative flex h-9 shrink-0 items-center justify-center gap-1.5 truncate rounded-xl px-2 text-xs font-bold transition-all duration-200 sm:h-7 sm:min-w-[120px] sm:gap-2 sm:text-sm sm:px-4 ${
                activeTab === tab.key
                  ? "bg-white text-orange-800 shadow-sm"
                  : "text-neutral-500 hover:text-neutral-800"
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`flex h-5 min-w-[20px] items-center justify-center rounded-full px-1.5 text-xs transition-colors ${
                  activeTab === tab.key
                    ? "bg-orange-800 text-white"
                    : "bg-neutral-200 text-neutral-600"
                }`}
              >
                {tab.count}
              </span>
            </button>
        ))}
      </div>

      {/* Transaction Card List */}
      <div className="flex flex-col gap-3 sm:gap-4">
        {paginatedTransactions.length === 0 ? (
          <div className="flex w-full flex-col items-center justify-center gap-3 py-12">
            <svg className="text-zinc-300" width="48" height="48" viewBox="0 0 24 24" fill="none">
              <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className="text-sm text-zinc-500">Tidak ada transaksi ditemukan</p>
          </div>
        ) : (
          paginatedTransactions.map((transaction) => (
            <TransactionCard
              key={transaction.id}
              transaction={transaction}
              onViewDetail={() => setSelectedTransaction(transaction)}
            />
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col items-center gap-3 border-t border-zinc-100 pt-4 sm:flex-row sm:justify-between">
          <p className="text-xs text-zinc-500 sm:text-sm">
            Menampilkan {(currentPage - 1) * ITEMS_PER_PAGE + 1}-
            {Math.min(currentPage * ITEMS_PER_PAGE, filteredTransactions.length)} dari{" "}
            {filteredTransactions.length} transaksi
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-600 transition hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => setCurrentPage(page)}
                className={`flex h-9 min-w-[36px] items-center justify-center rounded-lg px-3 text-sm font-medium transition ${
                  currentPage === page
                    ? "bg-brand-red text-white"
                    : "border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-600 transition hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {selectedTransaction && (
        <TransactionDetailModal
          transaction={selectedTransaction}
          onClose={() => setSelectedTransaction(null)}
        />
      )}
    </div>
  );
}