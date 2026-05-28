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
    <div className="mx-auto w-full max-w-[1120px] px-4 lg:px-0">{children}</div>
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
    <span
      className={`inline-flex h-5 items-center justify-center rounded-sm px-2 text-xs font-bold leading-3 ${styles}`}
    >
      {children}
    </span>
  );
}

function ProductCard({
  title,
  price,
  discountPrice,
  duration,
  image,
  className = "",
  children,
}: {
  title: string;
  price: number;
  discountPrice?: number;
  duration: string;
  image?: string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <article className={`flex w-full max-w-52 shrink-0 flex-col gap-3 rounded-[10px] bg-white p-[15px] lg:h-80 ${className}`}>
      <div className="relative aspect-square w-full overflow-hidden rounded-[5px] bg-zinc-200">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            sizes="(min-width: 1024px) 178px, (min-width: 640px) 25vw, 50vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-zinc-400">
            Gambar Produk
          </div>
        )}
      </div>

      <div className="flex flex-col gap-[5px]">
        {children && (
          <div className="flex flex-wrap items-center gap-[5px]">{children}</div>
        )}

        <h3 className="line-clamp-2 h-9 text-sm font-bold leading-[18px] text-black">
          {title}
        </h3>

        <div className="flex flex-col gap-[5px]">
          <div className="flex items-center gap-[5px]">
            {discountPrice ? (
              <>
                <span className="text-sm font-bold leading-4 text-brand-red-soft line-through">
                  {formatIDR(price)}
                </span>
                <span className="text-xs font-bold leading-4 text-brand-red">
                  {formatIDR(discountPrice)}
                </span>
              </>
            ) : (
              <span className="text-sm font-bold leading-4 text-brand-red-soft">
                {formatIDR(price)}
              </span>
            )}
          </div>
          <span className="text-xs leading-3 text-neutral-600">
            {duration}
          </span>
        </div>
      </div>
    </article>
  );
}

function NewsCard({
  title,
  image,
  accentColor,
}: {
  title: string;
  image: string;
  accentColor: "mint" | "accent";
}) {
  const accent =
    accentColor === "mint" ? "bg-brand-mint" : "bg-brand-accent";

  return (
    <article className="relative h-48 overflow-hidden rounded-2xl bg-zinc-300 shadow-md">
      <Image
        src={image}
        alt={title}
        fill
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        className="object-cover"
      />
      <div className="absolute inset-x-0 bottom-0 flex h-16 items-center bg-black/40 px-4">
        <span className={`absolute left-0 top-0 h-full w-2 ${accent}`} />
        <h3 className="line-clamp-2 text-base font-bold text-white">{title}</h3>
      </div>
    </article>
  );
}

function BenefitItem({
  kanji,
  title,
  text,
  variant,
  index,
}: {
  kanji: string;
  title: string;
  text: string;
  variant: "red" | "accent" | "mint";
  index: string;
}) {
  const kanjiBg = {
    red: "bg-brand-red-soft text-brand-accent",
    accent: "bg-brand-accent text-brand-red",
    mint: "bg-brand-mint text-brand-red",
  }[variant];

  return (
    <article className="flex gap-4 border-b-2 border-dashed border-brand-red/20 pb-5 last:border-b-0 last:pb-0 sm:gap-6">
      <div
        className={`flex h-20 w-20 shrink-0 items-center justify-center rounded-[10px] border-[3px] border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] sm:h-24 sm:w-24 ${kanjiBg}`}
      >
        <span className="font-display text-5xl font-normal leading-none sm:text-6xl">
          {kanji}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-1">
        <span className="font-baloo text-xs font-bold tracking-widest text-brand-red-soft">
          {index}
        </span>
        <h3 className="font-baloo text-xl font-extrabold leading-tight text-brand-red sm:text-2xl">
          {title}
        </h3>
        <p className="text-sm leading-snug text-zinc-700 sm:text-base">
          {text}
        </p>
      </div>
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

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    setContainerW(el.offsetWidth);
    const ro = new ResizeObserver(() => setContainerW(el.offsetWidth));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Responsive sizing — desktop fix 535×305, mobile/tablet scale dari containerW
  const itemW =
    containerW >= 1024
      ? 535
      : containerW >= 640
        ? Math.round(containerW * 0.7)
        : Math.round(containerW * 0.85);
  const itemH = Math.round(itemW / 1.7541);
  const gap = containerW >= 640 ? 12 : 8;
  const stepPx = itemW + gap;
  const centerIndex = step + 1;
  const offsetPx = containerW / 2 - itemW / 2 - centerIndex * stepPx;

  const prev = () => setStep((s) => (s - 1 + validSteps) % validSteps);
  const next = () => setStep((s) => (s + 1) % validSteps);

  return (
    <section className="relative w-full overflow-hidden bg-brand-red-soft py-6 md:py-8">
      <div
        ref={containerRef}
        className="relative"
        style={{ height: itemH ? `${itemH}px` : undefined }}
      >
        <div
          className="absolute left-0 flex h-full transition-transform duration-500 ease-out"
          style={{ transform: `translateX(${offsetPx}px)`, gap: `${gap}px` }}
        >
          {Array.from({ length: total }, (_, i) => (
            <div
              key={i}
              className="relative shrink-0 overflow-hidden rounded-xl"
              style={{
                width: `${itemW}px`,
                height: itemH ? `${itemH}px` : undefined,
              }}
            >
              <Image
                src={`/images/carousel/carousel${i + 1}.png`}
                alt={`Slide ${i + 1}`}
                fill
                sizes={`${itemW}px`}
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
          className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full border-[3px] border-brand-red-soft bg-white p-1.5 text-brand-red shadow-lg transition hover:scale-105 md:left-4 md:border-4 md:p-2"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-4 w-4 md:h-5 md:w-5"
            aria-hidden="true"
          >
            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <button
          type="button"
          onClick={next}
          aria-label="Next slide"
          className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full border-[3px] border-brand-red-soft bg-white p-1.5 text-brand-red shadow-lg transition hover:scale-105 md:right-4 md:border-4 md:p-2"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-4 w-4 md:h-5 md:w-5"
            aria-hidden="true"
          >
            <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <div className="mt-3 flex justify-center gap-1.5 md:mt-4 md:gap-2">
        {Array.from({ length: validSteps }, (_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setStep(i)}
            aria-label={`Go to slide ${i + 2}`}
            className={`h-2 rounded-full transition-all ${
              step === i ? "w-6 bg-white md:w-8" : "w-2 bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

function WelcomeSection() {
  return (
    <section className="w-full py-10 md:py-16">
      <Container>
        <div className="relative">
          <Image
            src="/icons/custom/maple-left.png"
            alt=""
            width={132}
            height={121}
            className="absolute left-0 top-[180px] hidden h-20 w-20 md:block md:top-[273px] md:h-32 md:w-32"
            aria-hidden="true"
          />
          <Image
            src="/icons/custom/maple-right.png"
            alt=""
            width={135}
            height={124}
            className="absolute -right-6 top-[40px] hidden h-20 w-20 md:block md:-right-12 md:top-[60px] md:h-32 md:w-32"
            aria-hidden="true"
          />

          <div className="flex flex-col items-center">
            <div className="flex h-14 w-full max-w-[771px] items-center justify-center rounded-[43px] bg-brand-red-soft px-6 sm:h-16 md:h-20">
              <h1 className="font-display text-3xl font-normal leading-tight text-brand-accent sm:text-4xl md:text-6xl md:leading-[68px]">
                Welcome Cosplayer !
              </h1>
            </div>

            <p className="font-baloo mt-6 w-full max-w-[930px] text-center text-base font-bold leading-snug text-brand-red-soft sm:text-lg sm:leading-7 md:mt-12 md:text-3xl md:leading-9">
              Ini adalah tempat yang cocok buat kamu yang mau nyewa kostum
              cosplay keren, aman, bersih, termurah dan terlengkap. Kami
              hadir supaya pengalaman cosplay-mu jadi lebih mudah, cepat,
              dan menyenangkan. Kepoin halaman web kita buat info menarik
              lainnya terkait dunia wibu dan animanga!
            </p>

            <a
              href="#popular"
              aria-label="Scroll to popular section"
              className="mt-6 inline-block transition hover:translate-y-1 md:mt-12"
            >
              <Image
                src="/icons/custom/scroll-down.png"
                alt=""
                width={250}
                height={57}
                className="h-10 w-44 sm:h-12 sm:w-52 md:h-[57px] md:w-[250px]"
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
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold leading-8">Popular Now</h2>
          <a
            href="#"
            className="text-base font-bold leading-5 text-brand-red-soft hover:underline"
          >
            See All &gt;&gt;&gt;
          </a>
        </div>

        <div className="relative overflow-hidden rounded-[20px] bg-white p-3 shadow-[0px_0px_16px_2px_rgba(0,0,0,0.12)] lg:h-[367px] lg:p-0">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:absolute lg:left-[15px] lg:top-[16px] lg:flex lg:items-center lg:gap-2.5">
            <ProductCard
              title="(Fullset) Cosplay Columbina - Genshin Impact"
              price={150000}
              discountPrice={105000}
              duration="For 3 Days"
              image="/images/fullset/columbina.png"
            >
              <Badge variant="trending">Trending</Badge>
              <Badge variant="brandNew">Brand New</Badge>
            </ProductCard>

            <ProductCard
              title="(Fullset) Cosplay Durin - Genshin Impact"
              price={150000}
              discountPrice={105000}
              duration="For 3 Days"
              image="/images/fullset/durin.png"
            >
              <Badge variant="trending">Trending</Badge>
              <Badge variant="brandNew">Brand New</Badge>
            </ProductCard>

            <ProductCard
              title="(Fullset) Cosplay Firefly My Istri - Honkai: Star Rail"
              price={150000}
              duration="For 3 Days"
              image="/images/fullset/firefly.png"
            >
              <Badge variant="trending">Trending</Badge>
            </ProductCard>

            <ProductCard
              title="(Fullset) Cosplay Archetype: Earth - Fate Grand Order"
              price={150000}
              duration="For 3 Days"
              image="/images/fullset/archetype.png"
            >
              <Badge variant="trending">Trending</Badge>
            </ProductCard>

            <ProductCard
              title="(Fullset) Cosplay Phainon - Honkai: Star Rail"
              price={150000}
              duration="For 3 Days"
              image="/images/fullset/phainon.png"
              className="hidden sm:flex"
            >
              <Badge variant="trending">Trending</Badge>
            </ProductCard>
          </div>
        </div>
      </div>
    </Section>
  );
}

function MostRentSection() {
  return (
    <Section size="small">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold leading-8">Most Rent All of Time</h2>
          <a
            href="#"
            className="text-base font-bold leading-5 text-brand-red-soft hover:underline"
          >
            See All &gt;&gt;&gt;
          </a>
        </div>

        <div className="relative overflow-hidden rounded-[20px] bg-white p-3 shadow-[0px_0px_16px_2px_rgba(0,0,0,0.12)] lg:h-[367px] lg:p-0">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:absolute lg:left-[15px] lg:top-[16px] lg:flex lg:items-center lg:gap-2.5">
            <ProductCard
              title="(Fullset) Cosplay Hu Tao - Genshin Impact"
              price={150000}
              duration="For 3 Days"
              image="/images/fullset/waguri.png"
            >
              <Badge variant="topSelling">Top Selling</Badge>
            </ProductCard>

            <ProductCard
              title="(Fullset) Cosplay Raiden Shogun - Genshin Impact"
              price={150000}
              duration="For 3 Days"
              image="/images/fullset/marine.png"
            >
              <Badge variant="topSelling">Top Selling</Badge>
            </ProductCard>

            <ProductCard
              title="(Wig) Cosplay Kafka - Honkai: Star Rail"
              price={75000}
              duration="For 3 Days"
              image="/images/wig/kazuha.png"
            >
              <Badge variant="topSelling">Top Selling</Badge>
            </ProductCard>

            <ProductCard
              title="(Aksesoris) Cosplay Acheron - Honkai: Star Rail"
              price={60000}
              duration="For 3 Days"
              image="/images/prop/arlecchino.png"
            >
              <Badge variant="topSelling">Top Selling</Badge>
            </ProductCard>

            <ProductCard
              title="(Aksesoris) Cosplay Sparkle - Honkai: Star Rail"
              price={60000}
              duration="For 3 Days"
              image="/images/prop/phainon.png"
              className="hidden sm:flex"
            >
              <Badge variant="topSelling">Top Selling</Badge>
            </ProductCard>
          </div>
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

      <article className="relative mb-8 h-48 overflow-hidden rounded-2xl bg-zinc-300 shadow-md md:h-[465px]">
        <Image
          src="/images/article/makeine.png"
          alt="Anime Makeine: Too Many Losing Heroines!"
          fill
          sizes="(min-width: 768px) 1120px, 100vw"
          priority
          className="scale-110 object-cover"
        />
        <div className="absolute inset-x-0 bottom-0 flex h-16 items-center bg-black/40 px-4 md:h-40 md:px-6">
          <span className="absolute left-0 top-0 h-full w-2 bg-brand-accent md:w-4" />
          <h3 className="line-clamp-2 pl-2 text-base font-bold leading-tight text-white md:text-3xl md:leading-tight">
            Anime Makeine: Too Many Losing Heroines! Umumkan Musim Kedua, Ini Detail Lengkapnya
          </h3>
        </div>
      </article>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <NewsCard
          title="Demon Slayer: Infinity Castle Sukses Besar, Film Terlaris ke-3 Dalam Penayangan Pertamanya"
          image="/images/article/kimetsu.png"
          accentColor="mint"
        />
        <NewsCard
          title="Presiden Prabowo Larang Rakyat Spam Spiki Cuayo Di Sosmed, Mengganggu Kedaulatan"
          image="/images/article/prabowo-spiki.png"
          accentColor="mint"
        />
        <NewsCard
          title="Bukankah Ini MY? Inilah Sosok Hiura Mihate Waifu Admin RyRentCos Yang Imup Kyut"
          image="/images/article/hiura.png"
          accentColor="mint"
        />
      </div>
    </Section>
  );
}

function AboutUs() {
  return (
    <section className="relative w-full overflow-hidden py-16 md:py-24">
      <Image
        src="/icons/custom/maple-left.png"
        alt=""
        width={120}
        height={110}
        className="absolute -left-6 top-12 hidden h-24 w-24 -rotate-12 opacity-60 md:block"
        aria-hidden="true"
      />
      <Image
        src="/icons/custom/maple-right.png"
        alt=""
        width={120}
        height={110}
        className="absolute -right-6 bottom-12 h-24 w-24 rotate-12 opacity-60"
        aria-hidden="true"
      />

      <Container>
        <div className="grid gap-12 md:grid-cols-[1fr_1.2fr] md:items-center">
          <div className="relative">
            <div className="absolute -left-3 -top-3 h-full w-full rounded-[24px] bg-brand-accent" />
            <div className="relative aspect-square overflow-hidden rounded-[24px] bg-brand-red">
              <Image
                src="/images/about-us.png"
                alt="RentCos cosplayer"
                fill
                sizes="(min-width: 768px) 480px, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-red/40 to-transparent" />
              <span className="absolute bottom-4 left-4 rounded-full bg-brand-accent px-4 py-1 text-sm font-bold text-brand-red">
                #StayCosplay
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <span className="h-1 w-12 rounded-full bg-brand-accent" />
              <span className="text-sm font-bold uppercase tracking-widest text-brand-red-soft">
                Tentang Kami
              </span>
            </div>
            <h2 className="font-display text-5xl font-normal leading-[1.1] text-brand-red md:text-6xl">
              Sewa kostum, <br />
              <span className="text-brand-red-soft">jadi karakter favoritmu</span>
            </h2>
            <p className="text-base leading-relaxed text-zinc-700 md:text-lg">
              <span className="font-bold text-brand-red">RentCos</span>{" "}
              adalah platform penyewaan kostum cosplay yang mudah, cepat,
              dan ramah untuk semua cosplayer—pemula sampai veteran. Kami
              percaya tampil sebagai karakter favorit gak harus mahal atau
              ribet. Koleksi terjaga, akses simpel, harga jujur.
            </p>

            <div className="mt-2 grid grid-cols-3 gap-4 border-t-2 border-dashed border-brand-red/30 pt-6">
              <div>
                <div className="font-baloo text-3xl font-extrabold text-brand-red md:text-4xl">
                  500+
                </div>
                <div className="text-xs font-bold text-zinc-600">
                  Koleksi Kostum
                </div>
              </div>
              <div>
                <div className="font-baloo text-3xl font-extrabold text-brand-red md:text-4xl">
                  10K+
                </div>
                <div className="text-xs font-bold text-zinc-600">
                  Cosplayer Senang
                </div>
              </div>
              <div>
                <div className="font-baloo text-3xl font-extrabold text-brand-red md:text-4xl">
                  4.9★
                </div>
                <div className="text-xs font-bold text-zinc-600">
                  Rating Pelanggan
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function BenefitsSection() {
  return (
    <Section>
      <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
        <div className="flex flex-col gap-4 lg:sticky lg:top-28 lg:self-start">
          <div className="flex items-center gap-3">
            <span className="h-1 w-12 rounded-full bg-brand-accent" />
            <span className="text-sm font-bold uppercase tracking-widest text-brand-red-soft">
              Why RentCos
            </span>
          </div>
          <h2 className="font-display text-4xl font-normal leading-[1.1] text-brand-red sm:text-5xl md:text-6xl">
            Kenapa <br />
            <span className="text-brand-red-soft">RyRentCos?</span>
          </h2>
          <p className="max-w-md text-sm text-zinc-600 sm:text-base">
            Semua yang bikin pengalaman cosplay-mu jadi lebih ringan, aman,
            dan menyenangkan. Dari pengiriman sampai pembayaran, semua udah
            kami pikirin.
          </p>
          <a
            href="#"
            className="mt-2 inline-flex w-fit items-center gap-2 rounded-full border-2 border-brand-red px-5 py-2 text-sm font-bold text-brand-red transition hover:bg-brand-red hover:text-white"
          >
            Pelajari Lebih Lanjut
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
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

        <div className="flex flex-col gap-5">
          <BenefitItem
            index="01"
            kanji="速"
            title="Tepat Waktu"
            text="Sampai ke tanganmu sebelum event mulai. Dijamin gak telat, biar kamu tenang dandan."
            variant="red"
          />
          <BenefitItem
            index="02"
            kanji="全"
            title="Katalog Terlengkap"
            text="Ratusan kostum se-Indonesia, dari Genshin sampai Honkai. Fullset, wig, sampai aksesoris."
            variant="accent"
          />
          <BenefitItem
            index="03"
            kanji="安"
            title="Aman & Terpercaya"
            text="Transaksi terlindungi, harga paling oke. Gak perlu was-was dari awal sampai pengembalian."
            variant="mint"
          />
          <BenefitItem
            index="04"
            kanji="楽"
            title="Instan Pakai"
            text="Terima, pakai, have fun. Gak ribet, gak lama, langsung siap tampil di event."
            variant="accent"
          />
          <BenefitItem
            index="05"
            kanji="教"
            title="Ada Tutorial"
            text="Tiap kostum punya panduan pemakaian via video. Newbie-friendly, gak perlu nebak-nebak."
            variant="mint"
          />
          <BenefitItem
            index="06"
            kanji="払"
            title="Bayar Bebas"
            text="QRIS, transfer bank, sampai PayPal worldwide. Pilih yang paling enak buat kamu."
            variant="red"
          />
        </div>
      </div>
    </Section>
  );
}

function CtaSection() {
  return (
    <section className="relative w-full overflow-hidden py-16 md:py-24">
      <Container>
        <div className="relative overflow-hidden rounded-[32px] bg-brand-red px-8 py-16 text-center shadow-[8px_8px_0_0_rgba(251,203,135,0.5)] md:px-16 md:py-20">
          <Image
            src="/icons/custom/maple-left.png"
            alt=""
            width={150}
            height={138}
            className="absolute -left-8 -top-4 h-32 w-32 rotate-12 opacity-30"
            aria-hidden="true"
          />
          <Image
            src="/icons/custom/maple-right.png"
            alt=""
            width={150}
            height={138}
            className="absolute -bottom-4 -right-8 h-32 w-32 -rotate-12 opacity-30"
            aria-hidden="true"
          />

          <div className="relative">
            <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full bg-brand-accent/20 px-4 py-1.5 backdrop-blur">
              <span className="text-base">⭐</span>
              <span className="text-sm font-bold text-brand-accent">
                Limited offer — first rent disc 30%
              </span>
            </div>

            <h2 className="mx-auto max-w-2xl font-display text-4xl font-normal leading-tight text-brand-accent md:text-6xl">
              Saatnya jadi karakter favoritmu!
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-base text-white/80 md:text-lg">
              Pilih kostum, klik sewa, kostum sampai. Mulai perjalanan
              cosplay-mu sekarang.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="#"
                className="inline-flex items-center gap-3 rounded-full bg-brand-accent px-8 py-4 text-lg font-bold text-brand-red shadow-[4px_4px_0_0_rgba(0,0,0,0.2)] transition hover:scale-105 md:text-xl"
              >
                Explore Collection
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 12h14M13 5l7 7-7 7"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 px-8 py-4 text-lg font-bold text-white transition hover:bg-white/10"
              >
                Lihat Tutorial
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
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
