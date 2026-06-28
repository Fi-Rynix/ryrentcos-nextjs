"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/* ============================================================
   NAV ITEMS
   ============================================================ */
const NAV_ITEMS = [
  { href: "/admin/dashboard", label: "Dashboard", icon: "/icons/dashboard.png" },
  { href: "/admin/manage-article", label: "Articles", icon: "/icons/article.png" },
  { href: "/admin/manage-video", label: "Guide Video", icon: "/icons/video.png" },
  { href: "/admin/manage-product", label: "Products", icon: "/icons/product.png" },
  { href: "/admin/manage-transaction", label: "Transaction", icon: "/icons/transaction.png" },
  { href: "/admin/manage-user", label: "User Management", icon: "/icons/user.png" },
];

/* ============================================================
   PAGE TITLES
   ============================================================ */
const PAGE_TITLES: Record<string, string> = {
  "/admin/dashboard": "Dashboard",
  "/admin/manage-article": "Articles",
  "/admin/manage-video": "Guide Video",
  "/admin/manage-product": "Products",
  "/admin/manage-transaction": "Transaction",
  "/admin/manage-user": "User Management",
};

/* ============================================================
   LAYOUT
   ============================================================ */
function SidebarContent({
  pathname,
  onNavigate,
}: {
  pathname: string;
  onNavigate?: () => void;
}) {
  return (
    <>
      {/* Logo */}
      <div className="h-20 flex items-center justify-center border-b border-orange-300">
        <div className="relative w-40 h-12">
          <Image
            src="/logo/ryrentcos.png"
            alt="RyRentCos Logo"
            fill
            className="object-contain"
          />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-2 p-4 flex-1">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={`flex items-center gap-3 h-12 pl-4 rounded-[10px] transition-colors ${
                isActive
                  ? "bg-orange-800"
                  : "hover:bg-orange-800/50"
              }`}
            >
              <div className="relative w-5 h-5">
                <Image
                  src={item.icon}
                  alt={item.label}
                  fill
                  className="object-contain brightness-0 invert"
                />
              </div>
              <span className="text-white text-base font-bold">
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const pageTitle = PAGE_TITLES[pathname] || "Admin";
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Tutup sidebar saat route berubah (UX mobile)
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar - Desktop (lg+): fixed always open */}
      <aside className="hidden lg:flex w-72 shrink-0 bg-[#8F220D] flex-col">
        <SidebarContent pathname={pathname} />
      </aside>

      {/* Sidebar - Mobile: slide-in drawer */}
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 lg:hidden ${
          isSidebarOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setIsSidebarOpen(false)}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        className={`fixed left-0 top-0 z-50 h-screen w-72 transform bg-[#8F220D] flex flex-col transition-transform duration-300 ease-out lg:hidden ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-hidden={!isSidebarOpen}
      >
        <SidebarContent
          pathname={pathname}
          onNavigate={() => setIsSidebarOpen(false)}
        />
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-16 px-4 sm:px-6 bg-white shadow-[0px_1px_2px_-1px_rgba(0,0,0,0.10)] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.10)] flex items-center justify-between gap-2 lg:h-20">
          {/* Left: Hamburger (mobile) + Page Title */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              aria-label="Toggle sidebar"
              onClick={() => setIsSidebarOpen(true)}
              className="rounded p-2 hover:bg-zinc-100 lg:hidden"
            >
              <Image
                src="/icons/hamburger.png"
                alt=""
                width={28}
                height={28}
                className="h-7 w-7"
                style={{ filter: "brightness(0) saturate(100%) invert(16%) sepia(89%) saturate(2476%) hue-rotate(356deg) brightness(95%) contrast(95%)" }}
              />
            </button>

            <h1 className="text-lg font-bold text-[#8F220D] sm:text-xl lg:text-2xl">
              {pageTitle}
            </h1>
          </div>

          {/* Logout Button */}
          <button
            type="button"
            className="w-10 h-10 bg-orange-300 rounded-2xl shadow-[2px_2px_4px_0px_rgba(0,0,0,0.12)] flex items-center justify-center hover:opacity-80 transition-opacity sm:w-12 sm:h-12"
            aria-label="Logout"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="sm:h-6 sm:w-6">
              <path
                d="M12 0H0V24H12L9 21H3V3H9M9 9H15V3L24 12L15 21V15H9"
                fill="#8F220D"
              />
            </svg>
          </button>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
