"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function SplashPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/login");
    }, 2500);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-brand-red">
      <div className="flex flex-col items-center justify-center">
        <div className="relative h-[192px] w-[192px]">
          <Image
            src="/logo/ryrentcos.png"
            alt="RyRentCos"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
    </main>
  );
}
