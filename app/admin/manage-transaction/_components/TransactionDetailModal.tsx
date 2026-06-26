"use client";

import Image from "next/image";
import { useState } from "react";

type OrderStatus = "order_masuk" | "dikirim" | "kembali" | "selesai";

type OrderItem = {
  id: string;
  name: string;
  image: string;
  price: number;
  size: string;
  quantity: number;
};

type Transaction = {
  id: string;
  orderId: string;
  customerName: string;
  customerEmail: string;
  items: OrderItem[];
  rentDate: string;
  returnDate: string;
  total: number;
  status: OrderStatus;
  orderDate: string;
};

interface TransactionDetailModalProps {
  transaction: Transaction;
  onClose: () => void;
}

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
    dikirim: "Sedang Dikirim",
    kembali: "Sudah Kembali",
    selesai: "Selesai",
  };
  return labels[status];
}

function getStatusColor(status: OrderStatus): { bg: string; text: string } {
  const colors: Record<OrderStatus, { bg: string; text: string }> = {
    order_masuk: { bg: "bg-amber-100", text: "text-amber-700" },
    dikirim: { bg: "bg-blue-100", text: "text-blue-700" },
    kembali: { bg: "bg-purple-100", text: "text-purple-700" },
    selesai: { bg: "bg-emerald-100", text: "text-emerald-700" },
  };
  return colors[status];
}

export default function TransactionDetailModal({ transaction, onClose }: TransactionDetailModalProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus>(transaction.status);

  const handleStatusUpdate = async (newStatus: OrderStatus) => {
    setIsUpdating(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Update status:", transaction.id, newStatus);
    setSelectedStatus(newStatus);
    setIsUpdating(false);
  };

  const statusColors = getStatusColor(selectedStatus);

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
        `}</style>

        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-brand-red">Detail Transaksi</h2>
            <p className="mt-1 text-sm text-zinc-500">{transaction.orderId}</p>
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

        {/* Order Info Card */}
        <div className="mb-6 grid grid-cols-3 gap-4 rounded-xl bg-zinc-50 p-4">
          <div>
            <p className="text-xs text-zinc-500">Tanggal Order</p>
            <p className="text-sm font-medium text-neutral-950">{transaction.orderDate}</p>
          </div>
          <div>
            <p className="text-xs text-zinc-500">Tanggal Sewa</p>
            <p className="text-sm font-medium text-neutral-950">{transaction.rentDate}</p>
          </div>
          <div>
            <p className="text-xs text-zinc-500">Tanggal Kembali</p>
            <p className="text-sm font-medium text-neutral-950">{transaction.returnDate}</p>
          </div>
        </div>

        {/* Customer Info */}
        <div className="mb-6">
          <h3 className="mb-3 text-sm font-bold text-zinc-700">Informasi Customer</h3>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-brand-red">
              <span className="text-lg font-bold text-white">
                {transaction.customerName.charAt(0)}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-neutral-950">{transaction.customerName}</p>
              <p className="text-xs text-zinc-500">{transaction.customerEmail}</p>
            </div>
          </div>
        </div>

        {/* Items */}
        <div className="mb-6">
          <h3 className="mb-3 text-sm font-bold text-zinc-700">Item Pesanan ({transaction.items.length})</h3>
          <div className="flex flex-col gap-3">
            {transaction.items.map((item) => (
              <div key={item.id} className="flex items-center gap-4 rounded-xl border border-zinc-200 p-4">
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-zinc-100">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-neutral-950">{item.name}</p>
                  <p className="text-xs text-zinc-500">Ukuran: {item.size}</p>
                  <p className="text-xs text-zinc-500">Qty: {item.quantity}x</p>
                </div>
                <p className="text-sm font-bold text-orange-800">{formatPrice(item.price)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Total */}
        <div className="mb-6 flex items-center justify-between rounded-xl bg-brand-red/5 p-4">
          <span className="text-sm font-semibold text-zinc-700">Total Pembayaran</span>
          <span className="text-lg font-bold text-orange-800">{formatPrice(transaction.total)}</span>
        </div>

        {/* Status Update */}
        <div className="mb-6">
          <h3 className="mb-3 text-sm font-bold text-zinc-700">Update Status</h3>
          <div className="grid grid-cols-4 gap-2">
            {(["order_masuk", "dikirim", "kembali", "selesai"] as OrderStatus[]).map((status) => {
              const color = getStatusColor(status);
              const isActive = selectedStatus === status;
              return (
                <button
                  key={status}
                  type="button"
                  onClick={() => handleStatusUpdate(status)}
                  disabled={isUpdating || isActive}
                  className={`flex items-center justify-center gap-1 rounded-lg border-2 px-3 py-2.5 text-xs font-semibold transition-all ${
                    isActive
                      ? "border-brand-red bg-brand-red/5 text-brand-red"
                      : `${color.bg} ${color.text} border-transparent hover:border-brand-red`
                  } disabled:cursor-not-allowed disabled:opacity-60`}
                >
                  {getStatusLabel(status)}
                  {isActive && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="h-12 rounded-xl border-2 border-zinc-200 px-6 text-sm font-semibold text-zinc-600 transition hover:bg-zinc-50"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
