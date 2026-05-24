"use client";

import Image from "next/image";
import { useState } from "react";

function formatIDR(value: number) {
  // format manual biar konsisten di server & client (hindari hydration mismatch)
  return `IDR ${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
}



// component
function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 md:px-6">{children}</div>
  );
}

function Divider() {
  return (
    <div className="w-full">
      <Container>
        <div className="h-px bg-brand-red/30" />
      </Container>
    </div>
  );
}

function Section({
  children,
  size = "default",
}: {
  children: React.ReactNode;
  size?: "small" | "default";
}) {
  const padding = size === "small" ? "py-8" : "py-12 md:py-16";

  return (
    <section className={`w-full ${padding}`}>
      <Container>{children}</Container>
    </section>
  );
}

function Badge({
  variant,
  children,
}: {
  variant: "trending" | "brandNew" | "topSelling";
  children: React.ReactNode;
}) {
  const styles = {
    trending: "bg-brand-red-soft text-white",
    brandNew: "bg-brand-accent text-brand-red",
    topSelling: "bg-brand-accent text-brand-red",
  }[variant];

  return (
    <span className={`rounded-sm px-2 py-0.5 text-xs font-bold ${styles}`}>
      {children}
    </span>
  );
}

function ProductCard({
  title,
  price,
  discountPrice,
  duration,
  children,
}: {
  title: string;
  price: number;
  discountPrice?: number;
  duration: string;
  children?: React.ReactNode;
}) {
  return (
    <article className="flex w-52 shrink-0 flex-col gap-3 rounded-xl bg-white p-3">
      <div className="aspect-square overflow-hidden rounded-md bg-zinc-200">
        <div className="flex h-full items-center justify-center text-xs text-zinc-400">
          Gambar Produk
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        {children && <div className="flex flex-wrap gap-1">{children}</div>}

        <h3 className="line-clamp-2 text-sm font-bold leading-snug">{title}</h3>

        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-2">
            {discountPrice ? (
              <>
                <span className="text-sm font-bold text-zinc-400 line-through">
                  {formatIDR(price)}
                </span>
                <span className="text-sm font-bold text-brand-red">
                  {formatIDR(discountPrice)}
                </span>
              </>
            ) : (
              <span className="text-sm font-bold text-brand-red-soft">
                {formatIDR(price)}
              </span>
            )}
          </div>
          <span className="text-xs text-zinc-500">{duration}</span>
        </div>
      </div>
    </article>
  );
}

function NewsCard({
  title,
  accentColor,
}: {
  title: string;
  accentColor: "mint" | "accent";
}) {
  const accent =
    accentColor === "mint" ? "bg-brand-mint" : "bg-brand-accent";

  return (
    <article className="relative h-48 overflow-hidden rounded-2xl bg-zinc-300 shadow-md">
      <div className="flex h-full items-center justify-center text-zinc-500">
        News Image
      </div>
      <div className="absolute inset-x-0 bottom-0 flex h-16 items-center bg-black/40 px-4">
        <span className={`absolute left-0 top-0 h-full w-2 ${accent}`} />
        <h3 className="line-clamp-2 text-base font-bold text-white">{title}</h3>
      </div>
    </article>
  );
}

function BenefitCard({
  icon,
  text,
}: {
  icon: string;
  text: string;
}) {
  return (
    <article className="flex h-40 flex-col items-center justify-center gap-2 rounded-2xl bg-white p-6 text-center shadow-md outline outline-[3px] -outline-offset-[3px] outline-brand-red-soft">
      <span className="text-4xl">{icon}</span>
      <p className="text-base font-black leading-tight">{text}</p>
    </article>
  );
}



// section
function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const total = 5;

  const prev = () => setCurrent((c) => (c - 1 + total) % total);
  const next = () => setCurrent((c) => (c + 1) % total);

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-r from-red-950 to-brand-red-soft">
      <div className="relative h-64 md:h-80">
        <div
          className="flex h-full transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          <div className="relative flex h-full w-full shrink-0 items-center justify-center px-8">
            <div className="flex max-w-3xl flex-col items-center gap-4 text-center text-white">
              <h2 className="font-baloo whitespace-pre-line text-3xl font-extrabold leading-tight md:text-5xl">
                BRAND NEW PRODUCT{"\n"}RENT DISC 30%
              </h2>
            </div>
          </div>

          <div className="relative flex h-full w-full shrink-0 items-center justify-center px-8">
            <div className="flex max-w-3xl flex-col items-center gap-4 text-center text-white">
              <h2 className="font-baloo whitespace-pre-line text-3xl font-extrabold leading-tight md:text-5xl">
                BUKANKAH INI MY?
              </h2>
            </div>
          </div>

          <div className="relative flex h-full w-full shrink-0 items-center justify-center px-8">
            <div className="flex max-w-3xl flex-col items-center gap-4 text-center text-white">
              <h2 className="font-baloo whitespace-pre-line text-3xl font-extrabold leading-tight md:text-5xl">
                MIKU EXPO 2025 ASIA
              </h2>
            </div>
          </div>

          <div className="relative flex h-full w-full shrink-0 items-center justify-center px-8">
            <div className="flex max-w-3xl flex-col items-center gap-4 text-center text-white">
              <h2 className="font-baloo whitespace-pre-line text-3xl font-extrabold leading-tight md:text-5xl">
                NEW ARRIVALS
              </h2>
            </div>
          </div>

          <div className="relative flex h-full w-full shrink-0 items-center justify-center px-8">
            <div className="flex max-w-3xl flex-col items-center gap-4 text-center text-white">
              <h2 className="font-baloo whitespace-pre-line text-3xl font-extrabold leading-tight md:text-5xl">
                LIMITED EDITION
              </h2>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={prev}
          aria-label="Previous slide"
          className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full border-4 border-brand-red-soft bg-white p-2 text-brand-red shadow-lg hover:scale-105 md:left-4"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M15 18l-6-6 6-6"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <button
          type="button"
          onClick={next}
          aria-label="Next slide"
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full border-4 border-brand-red-soft bg-white p-2 text-brand-red shadow-lg hover:scale-105 md:right-4"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M9 18l6-6-6-6"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
          <button
            type="button"
            onClick={() => setCurrent(0)}
            aria-label="Go to slide 1"
            className={`h-2 rounded-full transition-all ${
              current === 0 ? "w-8 bg-white" : "w-2 bg-white/50"
            }`}
          />
          <button
            type="button"
            onClick={() => setCurrent(1)}
            aria-label="Go to slide 2"
            className={`h-2 rounded-full transition-all ${
              current === 1 ? "w-8 bg-white" : "w-2 bg-white/50"
            }`}
          />
          <button
            type="button"
            onClick={() => setCurrent(2)}
            aria-label="Go to slide 3"
            className={`h-2 rounded-full transition-all ${
              current === 2 ? "w-8 bg-white" : "w-2 bg-white/50"
            }`}
          />
          <button
            type="button"
            onClick={() => setCurrent(3)}
            aria-label="Go to slide 4"
            className={`h-2 rounded-full transition-all ${
              current === 3 ? "w-8 bg-white" : "w-2 bg-white/50"
            }`}
          />
          <button
            type="button"
            onClick={() => setCurrent(4)}
            aria-label="Go to slide 5"
            className={`h-2 rounded-full transition-all ${
              current === 4 ? "w-8 bg-white" : "w-2 bg-white/50"
            }`}
          />
        </div>
      </div>
    </section>
  );
}

function WelcomeSection() {
  return (
    <Section>
      <div className="text-center">
          <div className="inline-block rounded-full bg-brand-red-soft px-12 py-4 md:px-20">
            <h1 className="font-display text-4xl font-normal text-brand-accent md:text-6xl">
              Welcome Cosplayer !
            </h1>
          </div>
          <p className="mx-auto mt-8 max-w-3xl text-base font-bold leading-relaxed md:text-xl">
            Ini adalah tempat yang cocok buat kamu yang mau nyewa kostum
            cosplay keren, aman, bersih, termurah dan terlengkap. Kami hadir
            supaya pengalaman cosplay-mu jadi lebih mudah, cepat, dan
            menyenangkan. Kepoin halaman web kita buat info menarik lainnya
            terkait dunia wibu dan animanga!
          </p>
      </div>
    </Section>
  );
}

function PopularSection() {
  return (
    <Section size="small">
      <div className="mb-4 flex flex-col gap-1">
          <h2 className="text-2xl font-bold">Popular Now</h2>
          <a
            href="#"
            className="text-sm font-bold text-brand-red-soft hover:underline"
          >
            See All &gt;&gt;&gt;
          </a>
        </div>

        <div className="rounded-2xl bg-white p-4 shadow-md">
          <div className="flex gap-3 overflow-x-auto pb-2">
            <ProductCard
              title="(Fullset) Cosplay Columbina - Genshin Impact"
              price={150000}
              discountPrice={105000}
              duration="For 3 Days"
            >
              <Badge variant="trending">Trending</Badge>
              <Badge variant="brandNew">Brand New</Badge>
            </ProductCard>

            <ProductCard
              title="(Fullset) Cosplay Durin - Genshin Impact"
              price={150000}
              discountPrice={105000}
              duration="For 3 Days"
            >
              <Badge variant="trending">Trending</Badge>
              <Badge variant="brandNew">Brand New</Badge>
            </ProductCard>

            <ProductCard
              title="(Fullset) Cosplay Firefly My Istri - Honkai: Star Rail"
              price={150000}
              duration="For 3 Days"
            >
              <Badge variant="trending">Trending</Badge>
            </ProductCard>

            <ProductCard
              title="(Fullset) Cosplay Archetype: Earth - Fate Grand Order"
              price={150000}
              duration="For 3 Days"
            >
              <Badge variant="trending">Trending</Badge>
            </ProductCard>

            <ProductCard
              title="(Fullset) Cosplay Phainon - Honkai: Star Rail"
              price={150000}
              duration="For 3 Days"
            >
              <Badge variant="trending">Trending</Badge>
            </ProductCard>
        </div>
      </div>
    </Section>
  );
}

function MostRentSection() {
  return (
    <Section size="small">
      <div className="mb-4 flex flex-col gap-1">
          <h2 className="text-2xl font-bold">Most Rent All of Time</h2>
          <a
            href="#"
            className="text-sm font-bold text-brand-red-soft hover:underline"
          >
            See All &gt;&gt;&gt;
          </a>
        </div>

        <div className="rounded-2xl bg-white p-4 shadow-md">
          <div className="flex gap-3 overflow-x-auto pb-2">
            <ProductCard
              title="(Fullset) Cosplay Hu Tao - Genshin Impact"
              price={150000}
              duration="For 3 Days"
            >
              <Badge variant="topSelling">Top Selling</Badge>
            </ProductCard>

            <ProductCard
              title="(Fullset) Cosplay Raiden Shogun - Genshin Impact"
              price={150000}
              duration="For 3 Days"
            >
              <Badge variant="topSelling">Top Selling</Badge>
            </ProductCard>

            <ProductCard
              title="(Wig) Cosplay Kafka - Honkai: Star Rail"
              price={75000}
              duration="For 3 Days"
            >
              <Badge variant="topSelling">Top Selling</Badge>
            </ProductCard>

            <ProductCard
              title="(Aksesoris) Cosplay Acheron - Honkai: Star Rail"
              price={60000}
              duration="For 3 Days"
            >
              <Badge variant="topSelling">Top Selling</Badge>
            </ProductCard>

            <ProductCard
              title="(Aksesoris) Cosplay Sparkle - Honkai: Star Rail"
              price={60000}
              duration="For 3 Days"
            >
              <Badge variant="topSelling">Top Selling</Badge>
            </ProductCard>
        </div>
      </div>
    </Section>
  );
}

function NewsSection() {
  return (
    <Section size="small">
      <div className="mb-4 flex flex-col gap-1">
          <h2 className="text-2xl font-bold">Trending News</h2>
          <a
            href="#"
            className="text-sm font-bold text-brand-red-soft hover:underline"
          >
            See All &gt;&gt;&gt;
          </a>
        </div>

        <article className="relative mb-8 h-72 overflow-hidden rounded-2xl bg-zinc-300 shadow-md md:h-[465px]">
          <div className="flex h-full items-center justify-center text-zinc-500">
            Featured News Image
          </div>
          <div className="absolute inset-x-0 bottom-0 flex h-32 items-center bg-black/40 px-6 md:h-40">
            <span className="absolute left-0 top-0 h-full w-2 bg-brand-accent md:w-4" />
            <h3 className="text-lg font-bold text-white md:text-2xl">
              Featured Headline News Goes Here
            </h3>
          </div>
        </article>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <NewsCard
            title="Demon Slayer: Infinity Castle Sukses Besar, Film Terlaris ke-3..."
            accentColor="mint"
          />
          <NewsCard
            title="Presiden Prabowo Larang Rakyat Spam Spiki Cuayo Di Sosmed..."
            accentColor="mint"
          />
          <NewsCard
            title="5 Tips Menjadi Femboy Supaya Enak Dipandang Tidak Membua..."
            accentColor="mint"
          />
      </div>
    </Section>
  );
}

function AboutUs() {
  return (
    <Section>
      <div className="grid gap-8 md:grid-cols-2 md:gap-12">
          <div className="flex aspect-square items-center justify-center rounded-lg bg-brand-red text-white">
            <span className="text-5xl font-bold tracking-wider">RENTCOS</span>
          </div>

          <div className="flex flex-col justify-center gap-4">
            <h2 className="font-display text-4xl font-normal text-brand-red">
              About Us
            </h2>
            <div className="space-y-4 text-base font-bold leading-relaxed md:text-xl">
              <p>
                RentCos hadir sebagai platform penyewaan kostum cosplay yang
                mudah, cepat, dan ramah untuk semua cosplayer—baik pemula,
                hobi, maupun yang sudah sering tampil di panggung event.
              </p>
              <p>
                Kami percaya bahwa cosplay adalah bentuk ekspresi diri yang
                menyenangkan, dan setiap orang berhak tampil sebagai karakter
                favoritnya tanpa harus membeli kostum yang mahal atau repot
                mencarinya. Karena itu, RentCos menyediakan koleksi kostum
                berkualitas, lengkap dengan aksesoris pendukung, yang selalu
                dirawat dan dibersihkan secara profesional setelah setiap
                penggunaan.
              </p>
              <p>
                Dengan layanan yang sederhana, transparan, dan terjangkau,
                kami berkomitmen menjadi tempat terbaik untuk memenuhi
                kebutuhan cosplay-mu.
              </p>
            </div>
          </div>
      </div>
    </Section>
  );
}

function BenefitsSection() {
  return (
    <Section>
      <h2 className="mb-12 text-center font-display text-5xl font-normal text-brand-red md:text-6xl">
          Our Benefits
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <BenefitCard
            icon="🚚"
            text="Pengiriman dijamin tepat waktu sampai ke tangan pelangan"
          />
          <BenefitCard
            icon="📚"
            text="Pilihan katalog kostum terlengkap se-Indonesia"
          />
          <BenefitCard
            icon="🔒"
            text="Transaksi dijamin aman dan jaminan harga termurah"
          />
          <BenefitCard
            icon="✨"
            text="Instan tinggal terima, pakai and have fun with your event"
          />
          <BenefitCard
            icon="🎬"
            text="Tersedia berbagai video tutorial pemakaian kostum dan aksesoris"
          />
          <BenefitCard
            icon="💳"
            text="Tersedia berbagai jenis pembayaran termasuk QRIS dan PayPal worldwide"
          />
      </div>
    </Section>
  );
}

function CtaSection() {
  return (
    <Section>
      <div className="text-center">
          <h2 className="mx-auto max-w-3xl text-2xl font-bold leading-snug text-brand-red md:text-4xl">
            Mulai perjalanan cosplay-mu sekarang dengan koleksi kostum pilihan
            kami!
          </h2>
          <a
            href="#"
            className="mt-8 inline-flex items-center gap-4 rounded-full bg-brand-red px-10 py-4 text-2xl font-bold text-white transition hover:scale-105 md:text-4xl"
          >
            Explore Collection
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 12h14M13 5l7 7-7 7"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
      </div>
    </Section>
  );
}

/* ============================================================
   PAGE
   ============================================================ */

export default function LandingPage() {
  return (
    <>
      <HeroCarousel />
      <WelcomeSection />
      <PopularSection />
      <MostRentSection />
      <NewsSection />
      <Divider />
      <AboutUs />
      <Divider />
      <BenefitsSection />
      <Divider />
      <CtaSection />
    </>
  );
}
