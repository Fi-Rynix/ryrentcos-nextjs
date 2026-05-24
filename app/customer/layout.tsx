"use client";

import Image from "next/image";
import { useState } from "react";

function SidebarLink({
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
      className="flex h-[50px] w-[200px] items-center justify-center rounded-[25px] text-xl font-bold text-white transition-colors hover:bg-brand-accent hover:text-brand-red"
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
            <SidebarLink onClick={onClose}>Home</SidebarLink>
            <div className="h-px w-full bg-white" />
            <SidebarLink onClick={onClose}>Cosplay Product</SidebarLink>
            <div className="h-px w-full bg-white" />
            <SidebarLink onClick={onClose}>Cosplay Guide</SidebarLink>
            <div className="h-px w-full bg-white" />
            <SidebarLink onClick={onClose}>News</SidebarLink>
            <div className="h-px w-full bg-white" />
          </div>
        </nav>
      </aside>
    </>
  );
}

function Header({ onToggleSidebar }: { onToggleSidebar: () => void }) {
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
            <button
              type="button"
              aria-label="Cart"
              className="rounded p-2 hover:bg-white/10"
            >
              <Image src="/icons/cart.png" alt="" width={28} height={28} />
            </button>
            <button
              type="button"
              aria-label="Profile"
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

  return (
    <div className="flex min-h-screen flex-col">
      <Header onToggleSidebar={() => setIsSidebarOpen(true)} />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <main className="flex-1">{children}</main>
    </div>
  );
}
