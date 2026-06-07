"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";


/* ============================================================
   TYPES
   ============================================================ */
type OrderStatus = "dikirim" | "diterima" | "selesai";

type OrderItem = {
  id: string;
  orderId: string;
  rentDate: string;
  productName: string;
  productImage: string;
  price: number;
  size: string;
  quantity: number;
  status: OrderStatus;
};

type GroupedOrder = {
  orderId: string;
  rentDate: string;
  items: OrderItem[];
  status: OrderStatus;
};

/* ============================================================
   MOCK DATA
   ============================================================ */
const ORDERS: GroupedOrder[] = [
  {
    orderId: "ORD-20250601-001",
    rentDate: "22/12/2025 - 25/12/2025",
    status: "dikirim",
    items: [
      {
        id: "i1",
        orderId: "ORD-20250601-001",
        rentDate: "22/12/2025 - 25/12/2025",
        productName: "(Fullset) Cosplay Columbina - Genshin Impact",
        productImage: "/images/product-detail/columbina1.png",
        price: 105000,
        size: "M",
        quantity: 1,
        status: "dikirim",
      },
    ],
  },
  {
    orderId: "ORD-20250601-002",
    rentDate: "28/12/2025 - 31/12/2025",
    status: "diterima",
    items: [
      {
        id: "i2",
        orderId: "ORD-20250601-002",
        rentDate: "28/12/2025 - 31/12/2025",
        productName: "(Fullset) Cosplay Durin - Genshin Impact",
        productImage: "/images/fullset/durin.png",
        price: 105000,
        size: "L",
        quantity: 1,
        status: "diterima",
      },
      {
        id: "i3",
        orderId: "ORD-20250601-002",
        rentDate: "28/12/2025 - 31/12/2025",
        productName: "(Wig) Cosplay Venti - Genshin Impact",
        productImage: "/images/wig/venti.png",
        price: 60000,
        size: "One Size",
        quantity: 1,
        status: "diterima",
      },
    ],
  },
  {
    orderId: "ORD-20250515-003",
    rentDate: "10/05/2025 - 13/05/2025",
    status: "selesai",
    items: [
      {
        id: "i4",
        orderId: "ORD-20250515-003",
        rentDate: "10/05/2025 - 13/05/2025",
        productName: "(Fullset) Cosplay Firefly My Istri - Honkai: Star Rail",
        productImage: "/images/fullset/firefly.png",
        price: 150000,
        size: "XL",
        quantity: 1,
        status: "selesai",
      },
    ],
  },
  {
    orderId: "ORD-20250501-004",
    rentDate: "01/05/2025 - 04/05/2025",
    status: "selesai",
    items: [
      {
        id: "i5",
        orderId: "ORD-20250501-004",
        rentDate: "01/05/2025 - 04/05/2025",
        productName: "(Props) Phainon Sword - Honkai: Star Rail",
        productImage: "/images/prop/phainon.png",
        price: 50000,
        size: "One Size",
        quantity: 2,
        status: "selesai",
      },
    ],
  },
];

/* ============================================================
   HELPER
   ============================================================ */
function formatPrice(price: number): string {
  return `IDR ${price.toLocaleString("id-ID")}`;
}

/* ============================================================
   TAB COMPONENT
   ============================================================ */
type Tab = {
  key: OrderStatus;
  label: string;
};

const TABS: Tab[] = [
  { key: "dikirim", label: "Dikirim" },
  { key: "diterima", label: "Diterima" },
  { key: "selesai", label: "Selesai" },
];

function TabSwitcher({
  activeTab,
  onTabChange,
}: {
  activeTab: OrderStatus;
  onTabChange: (tab: OrderStatus) => void;
}) {
  return (
    <div className="flex w-[700px] items-center justify-center gap-3 rounded-full bg-white p-3 shadow-[2px_2px_8px_0px_rgba(0,0,0,0.15)]">
      {TABS.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onTabChange(tab.key)}
          className={`flex flex-1 items-center justify-center rounded-full px-6 py-3 text-base font-bold leading-5 transition-all ${
            activeTab === tab.key
              ? "bg-brand-red text-white"
              : "border-2 border-brand-red text-brand-red hover:bg-brand-red/10"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

/* ============================================================
   ORDER CARD COMPONENT
   ============================================================ */
function OrderCard({ order }: { order: GroupedOrder }) {
  const totalItems = order.items.reduce((sum, item) => sum + item.quantity, 0);
  const SHIPPING_COST = 22000;
  const subtotal = order.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const totalPrice = subtotal + SHIPPING_COST;

  return (
    <div className="flex w-full flex-col gap-4 rounded-[10px] bg-white p-6 shadow-[2px_2px_8px_0px_rgba(0,0,0,0.25)]">
      {/* Row 1: Order ID + Rent Date */}
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-extrabold text-brand-red">Order #PF003474</h4>
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-black">Rent date:</span>
          <span className="text-sm font-bold text-orange-800">{order.rentDate}</span>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px w-full bg-brand-red" />

      {/* Row 2: Product Items */}
      <div className="flex flex-col gap-4">
        {order.items.map((item) => (
          <div key={item.id} className="flex items-center gap-4">
            {/* Product Image */}
            <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-[5px] bg-zinc-100">
              <Image
                src={item.productImage}
                alt={item.productName}
                fill
                sizes="96px"
                className="object-cover object-left-top"
              />
            </div>

            {/* Product Details */}
            <div className="flex flex-1 flex-col gap-1">
              <h3 className="line-clamp-2 text-sm font-bold leading-5 text-black">
                {item.productName}
              </h3>
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-black">Price:</span>
                <span className="text-sm font-bold text-orange-800">
                  {formatPrice(item.price)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-black">Size Variant:</span>
                <span className="text-sm font-bold text-orange-800">{item.size}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="h-px w-full bg-brand-red" />

      {/* Row 3: Total Items + Total Price + Detail Button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-base font-bold text-black">
            Total {totalItems} produk:
          </span>
          <span className="text-base font-bold text-brand-red">
            {formatPrice(totalPrice)}
          </span>
        </div>
        <Link
          href="/customer/transaction/transaction-detail"
          className="flex h-12 w-44 items-center justify-center rounded-[20px] bg-brand-red text-base font-extrabold text-white transition-colors hover:bg-brand-red-soft"
        >
          Lihat Detail
        </Link>
      </div>
    </div>
  );
}

/* ============================================================
   PAGE
   ============================================================ */
export default function TransactionHistoryPage() {
  const [activeTab, setActiveTab] = useState<OrderStatus>("dikirim");

  const filteredOrders = ORDERS.filter((order) => order.status === activeTab);

  return (
    <div className="min-h-screen w-full bg-brand-base-soft pb-20">
      <div className="mx-auto w-full max-w-[1120px] px-4 pt-10">
        {/* Header */}
        <div className="mx-auto mb-8 flex w-full max-w-[700px] flex-col items-center text-center">
          <h1 className="font-display text-5xl font-normal leading-[58px] text-brand-red">
            My Order
          </h1>
          <div className="mt-7 h-px w-[548px] bg-brand-red" />
        </div>

        {/* Tab Switcher */}
        <div className="mb-8 flex w-full justify-center">
          <TabSwitcher activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

        {/* Orders List */}
        <div className="flex flex-col gap-4">
          {filteredOrders.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-xl bg-white py-16 shadow-md">
              <p className="text-base font-bold text-black">
                Tidak ada pesanan dengan status ini
              </p>
              <Link
                href="/customer/product/product-catalog"
                className="mt-3 text-sm text-brand-red underline"
              >
                Jelajahi Katalog
              </Link>
            </div>
          ) : (
            filteredOrders.map((order) => (
              <OrderCard key={order.orderId} order={order} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
