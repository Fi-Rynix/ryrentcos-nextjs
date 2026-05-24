"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SplashPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/customer/landing-page");
    }, 2500);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-brand-base-soft">
      <div className="text-center">
        <h1 className="font-display text-5xl font-normal text-brand-red md:text-7xl">
          RentCos
        </h1>
        <p className="mt-4 text-zinc-500">Memuat...</p>
      </div>
    </main>
  );
}
