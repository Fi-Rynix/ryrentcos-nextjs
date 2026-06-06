"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

function SidebarLink({
  children,
  href,
  onClose,
}: {
  children: React.ReactNode;
  href: string;
  onClose: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClose}
      className="flex h-[50px] w-[200px] items-center justify-center rounded-[25px] text-xl font-bold text-white transition-colors hover:bg-brand-accent hover:text-brand-red"
    >
      {children}
    </Link>
  );
}

function ProfileLink({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-[35px] w-[195px] items-center justify-center rounded-[25px] text-xl font-bold text-brand-red transition-colors hover:bg-brand-red hover:text-white"
    >
      {children}
    </button>
  );
}

function Sidebar({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        className={`fixed left-0 top-0 z-50 h-screen w-72 transform transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-hidden={!isOpen}
      >
        <div className="flex h-20 items-center justify-center bg-brand-red shadow-[0_8px_0_0_var(--color-brand-mint)]">
          <span className="font-display text-2xl font-normal text-white">
            MENU
          </span>
        </div>

        <nav className="flex h-[calc(100vh-80px)] flex-col items-center bg-brand-red-soft px-[19px] pt-[37px]">
          <div className="flex w-full flex-col items-center gap-5">
            <div className="h-px w-full bg-white" />
            <SidebarLink href="/customer/landing-page" onClose={onClose}>Home</SidebarLink>
            <div className="h-px w-full bg-white" />
            <SidebarLink href="/customer/product/product-catalog" onClose={onClose}>Cosplay Product</SidebarLink>
            <div className="h-px w-full bg-white" />
            <SidebarLink href="#" onClose={onClose}>Cosplay Guide</SidebarLink>
            <div className="h-px w-full bg-white" />
            <SidebarLink href="/customer/article/article-archive" onClose={onClose}>Artikel</SidebarLink>
            <div className="h-px w-full bg-white" />
          </div>
        </nav>
      </aside>
    </>
  );
}

function ProfileDropdown({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(event: MouseEvent) {
      const target = event.target as HTMLElement;
      if (target.closest("[data-profile-toggle]")) return;
      if (dropdownRef.current?.contains(target)) return;
      onClose();
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  return (
    <div
      ref={dropdownRef}
      className={`fixed right-0 top-[88px] z-40 size-64 bg-white shadow-[-8px_8px_8px_0_rgba(0,0,0,0.25)] transition-all duration-200 ${
        isOpen
          ? "translate-y-0 opacity-100"
          : "pointer-events-none -translate-y-2 opacity-0"
      }`}
      aria-hidden={!isOpen}
    >
      <nav className="flex h-full flex-col items-center justify-center gap-2.5 px-4">
        <div className="h-px w-full bg-brand-red" />
        <ProfileLink onClick={onClose}>My Profile</ProfileLink>
        <div className="h-px w-full bg-brand-red" />
        <ProfileLink onClick={onClose}>My Order</ProfileLink>
        <div className="h-px w-full bg-brand-red" />
        <ProfileLink onClick={onClose}>FAQ</ProfileLink>
        <div className="h-px w-full bg-brand-red" />
        <ProfileLink onClick={onClose}>Logout</ProfileLink>
        <div className="h-px w-full bg-brand-red" />
      </nav>
    </div>
  );
}

function Footer() {
  return (
    <footer className="w-full border-t-8 border-brand-red-soft bg-brand-base">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
        <div className="grid gap-10 py-12 lg:grid-cols-5">
          <div className="flex flex-col gap-3">
            <h3 className="text-xl font-bold text-brand-red-soft">Features</h3>
            <ul className="flex flex-col gap-2">
              <li><a href="#" className="hover:underline">Explore Catalog</a></li>
              <li><a href="#" className="hover:underline">Rental Costume</a></li>
              <li><a href="#" className="hover:underline">Rental Wig</a></li>
              <li><a href="#" className="hover:underline">Tutorial Cosplay</a></li>
              <li><a href="#" className="hover:underline">News &amp; Article</a></li>
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-xl font-bold text-brand-red-soft">Sound Your Idea</h3>
            <ul className="flex flex-col gap-2">
              <li><a href="#" className="hover:underline">Lapor Bug</a></li>
              <li><a href="#" className="hover:underline">Feedback</a></li>
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-xl font-bold text-brand-red-soft">Terms of Service</h3>
            <ul className="flex flex-col gap-2">
              <li><a href="#" className="hover:underline">Terms and Conditions</a></li>
              <li><a href="#" className="hover:underline">Privacy Policy</a></li>
              <li><a href="#" className="hover:underline">Return Policy</a></li>
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-xl font-bold text-brand-red-soft">Metode Pembayaran</h3>
            <div className="grid grid-cols-3 gap-2">
              {["BCA","QRIS","BRI","Mandiri","BNI","PayPal"].map((m) => (
                <div key={m} className="flex h-9 items-center justify-center rounded bg-white px-2 text-xs font-bold text-zinc-700 shadow-sm">{m}</div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-bold text-brand-red-soft">Contact RyRentCos</h3>
            <div className="flex gap-2">
              {[
                { label: "Facebook", d: "M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" },
                { label: "Instagram", d: "M12 2.16c3.2 0 3.58 0 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s0 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58 0-4.85-.07c-1.17-.05-1.8-.25-2.23-.41-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s0-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16M12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63a5.92 5.92 0 0 0-2.13 1.38A5.92 5.92 0 0 0 .63 4.14C.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.3.79.71 1.46 1.38 2.13.67.67 1.34 1.08 2.13 1.38.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56.79-.3 1.46-.71 2.13-1.38.67-.67 1.08-1.34 1.38-2.13.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91-.3-.79-.71-1.46-1.38-2.13A5.92 5.92 0 0 0 19.86.63C19.1.33 18.22.13 16.95.07 15.67.01 15.26 0 12 0zm0 5.84A6.16 6.16 0 0 0 5.84 12 6.16 6.16 0 0 0 12 18.16 6.16 6.16 0 0 0 18.16 12 6.16 6.16 0 0 0 12 5.84zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.41-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z" },
                { label: "Messenger", d: "M12 2C6.48 2 2 6.14 2 11.25c0 2.91 1.45 5.5 3.71 7.21V22l3.4-1.87c.91.25 1.87.39 2.89.39 5.52 0 10-4.14 10-9.27S17.52 2 12 2zm.99 12.49l-2.55-2.72-4.97 2.72L11.45 9l2.61 2.72L19.03 9l-6.04 5.49z" },
                { label: "WhatsApp", d: "M17.6 6.32A7.85 7.85 0 0 0 12 4c-4.36 0-7.91 3.55-7.91 7.91 0 1.39.36 2.74 1.05 3.94L4 20l4.27-1.12a7.94 7.94 0 0 0 3.78.96h.01c4.36 0 7.92-3.55 7.92-7.91a7.86 7.86 0 0 0-2.38-5.61zM12 18.5c-1.11 0-2.2-.3-3.15-.86l-.23-.13-2.34.61.62-2.28-.15-.23a6.59 6.59 0 0 1-1.01-3.5c0-3.62 2.95-6.57 6.58-6.57 1.76 0 3.41.69 4.65 1.93a6.53 6.53 0 0 1 1.93 4.65c-.01 3.63-2.96 6.58-6.59 6.58zm3.61-4.93c-.2-.1-1.17-.58-1.35-.64-.18-.07-.31-.1-.45.1-.13.2-.51.64-.62.77-.12.13-.23.15-.42.05a5.4 5.4 0 0 1-1.6-.99 5.95 5.95 0 0 1-1.1-1.38c-.12-.2-.01-.31.09-.41.09-.09.2-.23.3-.35.1-.12.13-.2.2-.33.07-.13.03-.25-.02-.35-.05-.1-.45-1.08-.62-1.48-.16-.39-.33-.34-.45-.35h-.39c-.13 0-.35.05-.53.25-.18.2-.7.68-.7 1.66 0 .98.71 1.92.81 2.06.1.13 1.4 2.13 3.39 2.99.47.21.84.33 1.13.42.48.15.91.13 1.25.08.38-.06 1.17-.48 1.34-.94.16-.46.16-.86.12-.94-.05-.08-.18-.13-.38-.23z" },
              ].map(({ label, d }) => (
                <a key={label} href="#" aria-label={label} className="flex h-12 w-12 items-center justify-center rounded bg-brand-red-soft text-white transition hover:scale-105">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d={d} /></svg>
                </a>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-brand-red-soft" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>0896 9657 8125</span>
            </div>
            <div className="flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-brand-red-soft" aria-hidden="true">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" strokeLinecap="round" strokeLinejoin="round" />
                <polyline points="22,6 12,13 2,6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>e-support@ryrentcos.id</span>
            </div>
          </div>
        </div>

        <div className="h-px bg-zinc-400/40" />

        <div className="flex flex-col gap-2 py-8">
          <h3 className="text-xl font-bold text-brand-red-soft">Explore RyRentCos&apos;s Physical Store on Surabaya!</h3>
          <h4 className="mt-2 text-lg font-bold">Main Store</h4>
          <address className="text-base not-italic leading-relaxed">
            Jl. Jojoran Asri I No.14-15, Mojo, Kec. Pinang,<br />
            Kota Surabaya, Jawa Timur 63136<br />
            Phone: (021) 30488716
          </address>
        </div>

        <div className="h-px bg-zinc-400/40" />

        <div className="flex flex-col items-start justify-between gap-4 py-6 sm:flex-row sm:items-center">
          <div className="flex h-9 items-center rounded bg-brand-red-soft px-4">
            <Image src="/logo/ryrentcos.png" alt="RentCos" width={120} height={32} className="h-7 w-auto" />
          </div>
          <p className="text-sm text-zinc-700">&copy; 2023-2025 RyRentCos</p>
        </div>
      </div>
    </footer>
  );
}

function Header({
  onToggleSidebar,
  onToggleProfile,
}: {
  onToggleSidebar: () => void;
  onToggleProfile: () => void;
}) {
  return (
    <header className="sticky top-0 z-30 w-full bg-brand-red shadow-[0_8px_0_0_var(--color-brand-accent)]">
      <div className="w-full px-[80px]">
        <div className="grid h-20 grid-cols-[1fr_auto_1fr] items-center gap-4">
          <div className="flex items-center justify-start">
            <button
              type="button"
              aria-label="Toggle sidebar"
              onClick={onToggleSidebar}
              className="rounded p-2 hover:bg-white/10"
            >
              <Image
                src="/icons/hamburger.png"
                alt=""
                width={32}
                height={32}
              />
            </button>
          </div>

          <div className="flex items-center justify-center">
            <Image
              src="/logo/ryrentcos.png"
              alt="RentCos"
              width={192}
              height={56}
              priority
              className="h-14 w-auto"
            />
          </div>

          <div className="flex items-center justify-end gap-[50px]">
            <Link
              href="/customer/cart"
              type="button"
              aria-label="Cart"
              className="rounded p-2 hover:bg-white/10"
            >
              <Image src="/icons/cart.png" alt="" width={28} height={28} />
            </Link>
            <button
              type="button"
              aria-label="Profile"
              data-profile-toggle
              onClick={onToggleProfile}
              className="overflow-hidden rounded-full border-2 border-white/40 hover:border-white"
            >
              <Image
                src="/icons/profile.png"
                alt=""
                width={32}
                height={32}
                className="h-8 w-8 object-cover"
              />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleToggleSidebar = () => {
    setIsProfileOpen(false);
    setIsSidebarOpen(true);
  };

  const handleToggleProfile = () => {
    setIsSidebarOpen(false);
    setIsProfileOpen((prev) => !prev);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header
        onToggleSidebar={handleToggleSidebar}
        onToggleProfile={handleToggleProfile}
      />
      <ProfileDropdown
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
