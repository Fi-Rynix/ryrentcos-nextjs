"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const pageTitle = PAGE_TITLES[pathname] || "Admin";

  return (
    <div className="flex min-h-screen">
      {/* Sidebar - Fixed, always open */}
      <aside className="w-72 shrink-0 bg-[#8F220D] flex flex-col">
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
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-20 px-6 bg-white shadow-[0px_1px_2px_-1px_rgba(0,0,0,0.10)] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.10)] flex items-center justify-between">
          {/* Page Title */}
          <h1 className="text-2xl font-bold text-[#8F220D]">
            {pageTitle}
          </h1>

          {/* Logout Button */}
          <button
            type="button"
            className="w-12 h-12 bg-orange-300 rounded-2xl shadow-[2px_2px_4px_0px_rgba(0,0,0,0.12)] flex items-center justify-center hover:opacity-80 transition-opacity"
            aria-label="Logout"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 0H0V24H12L9 21H3V3H9M9 9H15V3L24 12L15 21V15H9"
                fill="#8F220D"
              />
            </svg>
          </button>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
