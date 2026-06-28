"use client";

import Image from "next/image";
import Link from "next/link";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

/* ============================================================
   TYPES
   ============================================================ */
type StatCard = {
  label: string;
  value: string;
  icon: string;
};

type RecentOrder = {
  id: string;
  customerName: string;
  productName: string;
  productType: string;
  time: string;
  amount: string;
  status: "Menunggu" | "Dikonfirmasi" | "Dikirim" | "Selesai";
};

type ReportData = {
  period: string;
  totalTransactions: string;
  totalRevenue: string;
};

/* ============================================================
   MOCK DATA
   ============================================================ */
const STAT_CARDS: StatCard[] = [
  { label: "Pendapatan Bulan Ini", value: "Rp 35.000.000", icon: "trending" },
  { label: "Total Transaksi", value: "234", icon: "transaction" },
  { label: "Produk Tersewa", value: "156", icon: "product" },
  { label: "Total Pengguna", value: "121", icon: "user" },
];

const RECENT_ORDERS: RecentOrder[] = [
  {
    id: "#PF003437",
    customerName: "Linda",
    productName: "(Fullset) Cosplay Columbina - Genshin Impact",
    productType: "Fullset",
    time: "5 menit yang lalu",
    amount: "Rp 127.000",
    status: "Menunggu",
  },
  {
    id: "#PW003232",
    customerName: "Maik Wazoski",
    productName: "(Wig) Cosplay Venti - Genshin Impact",
    productType: "Wig",
    time: "32 menit yang lalu",
    amount: "Rp 60.000",
    status: "Menunggu",
  },
];

const REPORT_DATA: ReportData = {
  period: "Juni 2026",
  totalTransactions: "234 Pesanan",
  totalRevenue: "Rp 35.000.000",
};

/* ============================================================
   ICONS
   ============================================================ */
function IconTrending() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M15.9951 6.99756H21.9932V12.9956"
        stroke="#8F220D"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21.9925 6.99756L13.4953 15.4948L8.49691 10.4964L1.99902 16.9943"
        stroke="#8F220D"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconTransaction() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M7.99805 21.9937C8.55033 21.9937 8.99805 21.5459 8.99805 20.9937C8.99805 20.4414 8.55033 19.9937 7.99805 19.9937C7.44576 19.9937 6.99805 20.4414 6.99805 20.9937C6.99805 21.5459 7.44576 21.9937 7.99805 21.9937Z"
        stroke="#8F220D"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.9941 21.9937C19.5464 21.9937 19.9941 21.5459 19.9941 20.9937C19.9941 20.4414 19.5464 19.9937 18.9941 19.9937C18.4419 19.9937 17.9941 20.4414 17.9941 20.9937C17.9941 21.5459 18.4419 21.9937 18.9941 21.9937Z"
        stroke="#8F220D"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.0498 2.04932H4.04916L6.70829 14.4653C6.80584 14.92 7.05885 15.3265 7.42377 15.6148C7.78869 15.9031 8.2427 16.0551 8.70764 16.0448H18.4845C18.9395 16.044 19.3807 15.8881 19.7351 15.6027C20.0895 15.3174 20.336 14.9197 20.4338 14.4753L22.0833 7.04769H5.11881"
        stroke="#8F220D"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconProduct() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M10.9964 21.723C11.3004 21.8985 11.6451 21.9909 11.9961 21.9909C12.3471 21.9909 12.6918 21.8985 12.9958 21.723L19.9935 17.7243C20.2971 17.549 20.5493 17.2969 20.7248 16.9934C20.9003 16.6898 20.9928 16.3455 20.9932 15.9949V7.99747C20.9928 7.64685 20.9003 7.3025 20.7248 6.99895C20.5493 6.6954 20.2971 6.44333 19.9935 6.26803L12.9958 2.26933C12.6918 2.09385 12.3471 2.00146 11.9961 2.00146C11.6451 2.00146 11.3004 2.09385 10.9964 2.26933L3.9987 6.26803C3.69506 6.44333 3.44286 6.6954 3.2674 6.99895C3.09194 7.3025 2.99938 7.64685 2.99902 7.99747V15.9949C2.99938 16.3455 3.09194 16.6898 3.2674 16.9934C3.44286 17.2969 3.69506 17.549 3.9987 17.7243L10.9964 21.723Z"
        stroke="#8F220D"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.9961 21.9928V11.9961"
        stroke="#8F220D"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.28906 6.99756L11.9962 11.9959L20.7034 6.99756"
        stroke="#8F220D"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.49805 4.26855L16.4951 9.41688"
        stroke="#8F220D"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconUser() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M15.9945 20.9932V18.9938C15.9945 17.9333 15.5732 16.9162 14.8233 16.1663C14.0734 15.4164 13.0563 14.9951 11.9958 14.9951H5.99772C4.9372 14.9951 3.92012 15.4164 3.17022 16.1663C2.42031 16.9162 1.99902 17.9333 1.99902 18.9938V20.9932"
        stroke="#8F220D"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.9951 3.12695C16.8526 3.34925 17.612 3.84998 18.1541 4.55055C18.6962 5.25112 18.9903 6.11187 18.9903 6.9977C18.9903 7.88352 18.6962 8.74427 18.1541 9.44484C17.612 10.1454 16.8526 10.6461 15.9951 10.8684"
        stroke="#8F220D"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.99675 10.9964C11.2052 10.9964 12.9954 9.20615 12.9954 6.99772C12.9954 4.7893 11.2052 2.99902 8.99675 2.99902C6.78833 2.99902 4.99805 4.7893 4.99805 6.99772C4.99805 9.20615 6.78833 10.9964 8.99675 10.9964Z"
        stroke="#8F220D"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconDownload() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M7.99414 9.99286V1.99854"
        stroke="white"
        strokeWidth="1.33"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.66309 6.66211L7.99406 9.99308L11.325 6.66211"
        stroke="white"
        strokeWidth="1.33"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.9905 9.99268V12.6575C13.9905 13.0108 13.8501 13.3497 13.6003 13.5996C13.3504 13.8495 13.0115 13.9898 12.6581 13.9898H3.33141C2.97804 13.9898 2.63914 13.8495 2.38927 13.5996C2.1394 13.3497 1.99902 13.0108 1.99902 12.6575V9.99268"
        stroke="white"
        strokeWidth="1.33"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconArrowRight() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d="M4.16675 10H15.8334M15.8334 10L10.8334 5M15.8334 10L10.8334 15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const ICONS: Record<string, () => JSX.Element> = {
  trending: IconTrending,
  transaction: IconTransaction,
  product: IconProduct,
  user: IconUser,
};

/* ============================================================
   COMPONENTS
   ============================================================ */

/**
 * Stat Card - displays a metric with icon.
 */
function StatCard({ label, value, icon }: StatCard) {
  const Icon = ICONS[icon] || IconTrending;

  return (
    <div className="h-24 bg-white rounded-2xl shadow-[0px_2px_4px_-2px_rgba(0,0,0,0.10)] p-4 sm:p-6 flex justify-between items-center gap-3">
      <div className="flex flex-col gap-1 min-w-0">
        <span className="text-xs font-bold text-gray-900 leading-5 sm:text-sm">{label}</span>
        <span className="text-base font-semibold text-gray-900 leading-6 sm:text-lg">{value}</span>
      </div>
      <div className="w-10 h-10 bg-stone-100 rounded-[10px] flex items-center justify-center shrink-0 sm:w-12 sm:h-12">
        <Icon />
      </div>
    </div>
  );
}

const CHART_DATA = [
  { month: "Jan", revenue: 20000000 },
  { month: "Feb", revenue: 25000000 },
  { month: "Mar", revenue: 18000000 },
  { month: "Apr", revenue: 32000000 },
  { month: "May", revenue: 28000000 },
  { month: "Jun", revenue: 35000000 },
];

function CustomTooltip({ active, payload }: { active?: boolean; payload?: Array<{ value: number }> }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white px-3 py-2 rounded-lg shadow-md">
        <p className="text-sm font-bold text-gray-900">
          Rp {payload[0].value.toLocaleString("id-ID")}
        </p>
      </div>
    );
  }
  return null;
}

function MonthlyRevenueChart() {
  return (
    <div className="flex-1 bg-white rounded-2xl shadow-[0px_2px_4px_-2px_rgba(0,0,0,0.10)] p-4 sm:p-6 min-w-0">
      <h3 className="text-base font-bold text-gray-900 leading-4 mb-6">Pendapatan Bulanan</h3>

      <ResponsiveContainer width="100%" height={240} minHeight={240}>
        <AreaChart
          data={CHART_DATA}
          margin={{ top: 10, right: 0, left: -10, bottom: 0 }}
        >
          <defs>
            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8F220D" stopOpacity={0.35} />
              <stop offset="95%" stopColor="#8F220D" stopOpacity={0} />
            </linearGradient>
          </defs>
          
          <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" vertical={false} />
          
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#9CA3AF", fontSize: 12 }}
            dy={10}
          />
          
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#9CA3AF", fontSize: 12 }}
            tickFormatter={(value) => `${value / 1000000} jt`}
            dx={-10}
          />
          
          <Tooltip content={<CustomTooltip />} />
          
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#8F220D"
            strokeWidth={2}
            fill="url(#revenueGradient)"
            dot={{ fill: "#8F220D", strokeWidth: 0, r: 4 }}
            activeDot={{ r: 6, fill: "#8F220D" }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

/**
 * Report Card - displays summary report.
 */
function ReportCard({ data }: { data: ReportData }) {
  return (
    <div className="w-full bg-white rounded-2xl shadow-[0px_2px_4px_-2px_rgba(0,0,0,0.10)] p-4 sm:p-6 lg:w-80">
      <h3 className="text-base font-bold text-gray-900 leading-4 mb-6">Laporan</h3>

      <div className="flex flex-col gap-4">
        {/* Period */}
        <div className="h-20 px-4 pt-4 bg-white rounded-[10px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.25)] flex flex-col gap-1">
          <span className="text-sm font-normal text-gray-600 leading-5">Periode</span>
          <span className="text-base font-normal text-gray-900 leading-6">{data.period}</span>
        </div>

        {/* Total Transactions */}
        <div className="h-20 px-4 pt-4 bg-white rounded-[10px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.25)] flex flex-col gap-1">
          <span className="text-sm font-normal text-gray-600 leading-5">Total Transaksi</span>
          <span className="text-base font-normal text-gray-900 leading-6">{data.totalTransactions}</span>
        </div>

        {/* Total Revenue */}
        <div className="h-20 px-4 pt-4 bg-white rounded-[10px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.25)] flex flex-col gap-1">
          <span className="text-sm font-normal text-gray-600 leading-5">Total Pendapatan</span>
          <span className="text-base font-normal text-orange-800 leading-6">{data.totalRevenue}</span>
        </div>

        {/* Download Button */}
        <button
          type="button"
          className="h-9 bg-orange-800 rounded-lg flex items-center justify-center gap-2 hover:bg-orange-700 transition-colors"
        >
          <IconDownload />
          <span className="text-sm font-bold text-white leading-5">Download Rekap Laporan</span>
        </button>
      </div>
    </div>
  );
}

/**
 * Recent Order Item.
 */
function OrderItem({ order }: { order: RecentOrder }) {
  return (
    <div className="self-stretch bg-white rounded-[10px] shadow-[0px_1px_8px_0px_rgba(0,0,0,0.25)] p-4 sm:h-24 sm:px-4 sm:flex sm:justify-between sm:items-center">
      <div className="flex flex-col gap-2 sm:flex-1">
        {/* Order ID + Status */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-bold text-gray-900 sm:text-base sm:font-normal">{order.id}</span>
          <span className="px-2.5 py-0.5 bg-orange-300 rounded-full text-xs font-normal text-red-800 sm:px-3 sm:py-1">
            {order.status}
          </span>
        </div>
        {/* Customer + Product */}
        <div className="flex flex-wrap gap-x-1">
          <span className="text-xs text-gray-600 sm:text-sm">{order.customerName} - </span>
          <span className="text-xs font-bold text-gray-600 sm:text-sm">{order.productType} {order.productName}</span>
        </div>
        {/* Time + Amount (mobile: amount below time) */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs text-gray-500">{order.time}</span>
          <span className="text-sm font-semibold text-orange-800 sm:hidden">{order.amount}</span>
        </div>
      </div>
      {/* Amount (desktop only) */}
      <span className="hidden text-base font-normal text-orange-800 sm:block">{order.amount}</span>
    </div>
  );
}

/* ============================================================
   PAGE
   ============================================================ */
export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-4 sm:gap-6">
      {/* Stats Cards Row */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {STAT_CARDS.map((card, index) => (
          <StatCard key={index} {...card} />
        ))}
      </div>

      {/* Chart + Report Row */}
      <div className="flex flex-col gap-4 lg:flex-row">
        <MonthlyRevenueChart />
        <ReportCard data={REPORT_DATA} />
      </div>

      {/* Recent Orders */}
      <div className="self-stretch bg-white rounded-2xl shadow-[0px_2px_4px_-2px_rgba(0,0,0,0.10)]">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 p-4 sm:h-14 sm:px-6">
          <h3 className="text-base font-normal text-gray-900 leading-4">Pesanan Terkini</h3>
          <Link
            href="/admin/manage-transaction"
            className="h-8 px-3 bg-white rounded-lg outline outline-1 outline-orange-800 flex items-center gap-1.5 hover:bg-orange-50 transition-colors"
          >
            <span className="text-sm font-bold text-orange-800 leading-5">Lihat Semua</span>
            <IconArrowRight />
          </Link>
        </div>

        {/* Orders List */}
        <div className="flex flex-col gap-3 p-4 sm:gap-4 sm:p-6">
          {RECENT_ORDERS.map((order) => (
            <OrderItem key={order.id} order={order} />
          ))}
        </div>
      </div>
    </div>
  );
}