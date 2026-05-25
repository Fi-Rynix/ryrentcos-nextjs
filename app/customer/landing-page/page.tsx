"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";

function formatIDR(value: number) {
  // format manual biar konsisten di server & client (hindari hydration mismatch)
  return `IDR ${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
}



// component
function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-[1120px] px-4 md:px-6">{children}</div>
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
  id,
}: {
  children: React.ReactNode;
  size?: "small" | "default";
  id?: string;
}) {
  const padding = size === "small" ? "py-8" : "py-12 md:py-16";

  return (
    <section id={id} className={`w-full scroll-mt-[88px] ${padding}`}>
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
  const total = 7;
  const validSteps = 5;
  const [step, setStep] = useState(2);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerW, setContainerW] = useState(0);

  const itemW = 535;
  const gap = 12;
  const stepPx = itemW + gap;
  const centerIndex = step + 1;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    setContainerW(el.offsetWidth);
    const ro = new ResizeObserver(() => setContainerW(el.offsetWidth));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const offsetPx = containerW / 2 - itemW / 2 - centerIndex * stepPx;

  const prev = () => setStep((s) => (s - 1 + validSteps) % validSteps);
  const next = () => setStep((s) => (s + 1) % validSteps);

  return (
    <section className="relative w-full overflow-hidden bg-brand-red-soft py-8">
      <div ref={containerRef} className="relative h-[305px]">
        <div
          className="absolute left-0 flex h-full transition-transform duration-500 ease-out"
          style={{ transform: `translateX(${offsetPx}px)`, gap: `${gap}px` }}
        >
          {Array.from({ length: total }, (_, i) => (
            <div
              key={i}
              className="relative shrink-0 overflow-hidden rounded-xl"
              style={{ width: `${itemW}px`, height: "305px" }}
            >
              <Image
                src={`/images/carousel/carousel${i + 1}.png`}
                alt={`Slide ${i + 1}`}
                fill
                className="object-cover"
                priority={i === 1}
              />
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={prev}
          aria-label="Previous slide"
          disabled={false}
          className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full border-4 border-brand-red-soft bg-white p-2 text-brand-red shadow-lg transition hover:scale-105"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <button
          type="button"
          onClick={next}
          aria-label="Next slide"
          disabled={false}
          className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full border-4 border-brand-red-soft bg-white p-2 text-brand-red shadow-lg transition hover:scale-105"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <div className="mt-4 flex justify-center gap-2">
        {Array.from({ length: validSteps }, (_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setStep(i)}
            aria-label={`Go to slide ${i + 2}`}
            className={`h-2 rounded-full transition-all ${
              step === i ? "w-8 bg-white" : "w-2 bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

function WelcomeSection() {
  return (
    <section className="w-full py-12 md:py-16">
      <Container>
        <div className="relative">
          <Image
            src="/icons/custom/maple-left.png"
            alt=""
            width={132}
            height={121}
            className="absolute left-0 top-[273px] h-32 w-32"
            aria-hidden="true"
          />
          <Image
            src="/icons/custom/maple-right.png"
            alt=""
            width={135}
            height={124}
            className="absolute -right-12 top-[60px] h-32 w-32"
            aria-hidden="true"
          />

          <div className="flex flex-col items-center">
            <div className="flex h-20 w-[771px] items-center justify-center rounded-[43px] bg-brand-red-soft">
              <h1 className="font-display text-6xl font-normal leading-[68px] text-brand-accent">
                Welcome Cosplayer !
              </h1>
            </div>

            <p className="font-baloo mt-12 w-[930px] text-center text-3xl font-bold leading-9 text-brand-red-soft">
              Ini adalah tempat yang cocok buat kamu yang mau nyewa kostum
              cosplay keren, aman, bersih, termurah dan terlengkap. Kami
              hadir supaya pengalaman cosplay-mu jadi lebih mudah, cepat,
              dan menyenangkan. Kepoin halaman web kita buat info menarik
              lainnya terkait dunia wibu dan animanga!
            </p>

            <a
              href="#popular"
              aria-label="Scroll to popular section"
              className="mt-12 inline-block transition hover:translate-y-1"
            >
              <Image
                src="/icons/custom/scroll-down.png"
                alt=""
                width={250}
                height={57}
                className="h-[57px] w-[250px]"
              />
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}

function PopularSection() {
  return (
    <Section size="small" id="popular">
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
