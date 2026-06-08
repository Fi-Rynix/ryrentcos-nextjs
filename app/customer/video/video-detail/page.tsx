"use client";

import Image from "next/image";
import Link from "next/link";

/* ============================================================
   TYPES
   ============================================================ */
type VideoData = {
  id: string;
  title: string;
  thumbnail: string;
  date: string;
  duration: string;
  views: number;
  category: string;
  description: string;
  fullDescription: string;
  chapters: { time: string; title: string }[];
};

type RelatedVideo = {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  level: string;
  imagePosition?: string;
};

type TrendingItem = {
  id: string;
  title: string;
};

/* ============================================================
   MOCK DATA
   ============================================================ */
const VIDEO_DATA: VideoData = {
  id: "v1",
  title:
    "Cosplay Columbina Hyposelena (Genshin Impact) Costume, Accessories & Makeup Tutorial",
  thumbnail: "/images/cosplay-guide/columbina.png",
  date: "9 Desember 2025, 09.00 WIB",
  duration: "7 min 12 sec",
  views: 0,
  category: "Tutorial",
  description:
    "Selamat datang di halaman Video Tutorial Cosplay Columbina dari RyRentCos! Di sini kamu bisa menemukan panduan lengkap step-by-step untuk menghidupkan karakter Fatui Harbinger ke-3, Damselette Columbina, yang misterius dan elegan dengan vibe angelic seraphim. Tutorial ini cocok banget buat pemula maupun cosplayer berpengalaman yang ingin tampil sempurna, mulai dari memakai costume sewaan kami hingga detail makeup yang autentik.",
  fullDescription:
    "Tonton video-video kami untuk tips pro, seperti cara styling wig hitam panjang dengan highlight pink (wig tidak termasuk dalam sewa, tapi kami bisa rekomendasikan!), serta trik agar costume tetap rapi seharian di con atau photoshoot. Kalau kamu sewa fullset Columbina dari kami, tutorial ini akan bikin proses dressing up jauh lebih mudah dan hasilnya maksimal! Yuk, jadi Columbina paling cantik di event berikutnya 🕊️✨",
  chapters: [
    { time: "00:00", title: "Intro & Pengenalan Karakter" },
    { time: "01:30", title: "Tutorial Memakai Costume" },
    { time: "03:45", title: "Tutorial Aksesoris" },
    { time: "05:20", title: "Tutorial Makeup Columbina" },
    { time: "06:30", title: "Tips Pose & Penutup" },
  ],
};

const RELATED_VIDEOS: RelatedVideo[] = [
  {
    id: "r1",
    title:
      "Cosplay Durin (Genshin Impact) Costume, Accessories & Makeup Tutorial",
    thumbnail: "/images/cosplay-guide/durin.png",
    duration: "6 min 22 sec",
    level: "For Expert",
  },
  {
    id: "r2",
    title:
      "Cosplay Kirigaya Kazuto / Kirito (Sword Art Online) Costume, Accessories & Makeup Tutorial",
    thumbnail: "/images/cosplay-guide/kirito.png",
    duration: "5 min 12 sec",
    level: "For Beginner",
    imagePosition: "center top",
  },
  {
    id: "r3",
    title:
      "Cosplay Arthuria Pendragon - Saber (Fate Grand Order) Costume, Accessories & Makeup Tutorial",
    thumbnail: "/images/cosplay-guide/arthuria.png",
    duration: "11 min 12 sec",
    level: "For Expert",
  },
];

const TRENDING_ITEMS: TrendingItem[] = [
  { id: "t1", title: "Tutorial Cosplay Columbina Lengkap dari Wig sampai Makeup" },
  { id: "t2", title: "Review Jujur Kostum Phainon Setelah 3x Event - Worth It!" },
  { id: "t3", title: "BTS Photoshoot RyRentCos - Genshin Impact Edition" },
  { id: "t4", title: "Cara Pakai Wig Cosplay untuk Pemula (Step-by-Step)" },
  { id: "t5", title: "Review Wig Manmei vs Wig Murah - Mana yang Lebih Bagus?" },
  { id: "t6", title: "BTS Event Comic Frontier 2025 - Booth RyRentCos" },
];

/* ============================================================
   ICONS
   ============================================================ */
function IconWhatsapp() {
  return (
    <svg width="45" height="45" viewBox="0 0 45 45" fill="none">
      <path
        d="M35.7188 9.20635C33.9995 7.4703 31.9519 6.09379 29.6953 5.15703C27.4387 4.22027 25.0183 3.74201 22.575 3.7501C12.3375 3.7501 3.99375 12.0939 3.99375 22.3314C3.99375 25.6126 4.85625 28.8001 6.46875 31.6126L3.84375 41.2501L13.6875 38.6626C16.4062 40.1439 19.4625 40.9314 22.575 40.9314C32.8125 40.9314 41.1563 32.5876 41.1563 22.3501C41.1563 17.3814 39.225 12.7126 35.7188 9.20635ZM22.575 37.7813C19.8 37.7813 17.0813 37.0313 14.7 35.6251L14.1375 35.2876L8.2875 36.8251L9.84375 31.1251L9.46875 30.5439C7.92665 28.0821 7.10798 25.2362 7.10625 22.3314C7.10625 13.8189 14.0437 6.88135 22.5562 6.88135C26.6812 6.88135 30.5625 8.49385 33.4688 11.4189C34.908 12.8511 36.0486 14.5549 36.8243 16.4313C37.6 18.3078 37.9954 20.3196 37.9875 22.3501C38.025 30.8626 31.0875 37.7813 22.575 37.7813ZM31.05 26.2314C30.5812 26.0064 28.2937 24.8814 27.8812 24.7126C27.45 24.5626 27.15 24.4876 26.8313 24.9376C26.5125 25.4064 25.6312 26.4564 25.3687 26.7564C25.1062 27.0751 24.825 27.1126 24.3562 26.8689C23.8875 26.6439 22.3875 26.1376 20.625 24.5626C19.2375 23.3251 18.3187 21.8064 18.0375 21.3376C17.775 20.8689 18 20.6251 18.2437 20.3814C18.45 20.1751 18.7125 19.8376 18.9375 19.5751C19.1625 19.3126 19.2563 19.1064 19.4062 18.8064C19.5563 18.4876 19.4812 18.2251 19.3687 18.0001C19.2562 17.7751 18.3187 15.4876 17.9437 14.5501C17.5687 13.6501 17.175 13.7626 16.8938 13.7439H15.9937C15.675 13.7439 15.1875 13.8564 14.7562 14.3251C14.3437 14.7939 13.1438 15.9189 13.1438 18.2064C13.1438 20.4939 14.8125 22.7064 15.0375 23.0064C15.2625 23.3251 18.3187 28.0126 22.9688 30.0189C24.075 30.5064 24.9375 30.7876 25.6125 30.9939C26.7188 31.3501 27.7313 31.2938 28.5375 31.1814C29.4375 31.0501 31.2937 30.0564 31.6687 28.9689C32.0625 27.8814 32.0625 26.9626 31.9313 26.7564C31.8 26.5501 31.5187 26.4564 31.05 26.2314Z"
        fill="#8F220D"
      />
    </svg>
  );
}

function IconTwitter() {
  return (
    <svg width="45" height="45" viewBox="0 0 45 45" fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M28.1663 6.26812C29.1188 6.105 30.1857 6.05062 31.1907 6.22125C32.9809 6.52363 34.6395 7.35493 35.9532 8.60812C36.8082 8.62687 37.6501 8.45812 38.3944 8.21812C39.1136 7.98291 39.8042 7.66782 40.4532 7.27875L40.4701 7.2675C40.7401 7.0876 41.064 7.0066 41.3869 7.03823C41.7098 7.06985 42.0118 7.21216 42.2418 7.44102C42.4717 7.66989 42.6155 7.97123 42.6487 8.29398C42.6819 8.61672 42.6024 8.94101 42.4238 9.21187C42.0357 9.8025 41.4938 10.8562 40.8882 12.0375L40.5976 12.6019C40.2507 13.2769 39.8944 13.9594 39.5626 14.5444C39.3544 14.9119 39.1313 15.285 38.9063 15.6075V16.1212C38.9294 19.1937 38.3403 22.24 37.1733 25.0823C36.0064 27.9246 34.2851 30.506 32.1098 32.6759C29.9345 34.8459 27.3487 36.5608 24.5035 37.7206C21.6583 38.8804 18.6106 39.46215.5382 39.4313C11.0856 39.4374 6.7264 38.1545 2.98694 35.7375C2.71849 35.565 2.51668 35.3064 2.41465 35.0041C2.31262 34.7017 2.31644 34.3737 2.42549 34.0738C2.53453 33.7739 2.74231 33.5201 3.0147 33.3539C3.2871 33.1877 3.60791 33.1191 3.92444 33.1594C4.48694 33.2281 5.05256 33.2625 5.62131 33.2625C7.6475 33.2551 9.64816 32.8099 11.4863 31.9575C10.3349 31.4337 9.30511 30.6759 8.46257 29.7323C7.62004 28.7887 6.98319 27.68 6.59256 26.4769C6.51813 26.2466 6.50439 26.001 6.55267 25.7638C6.60096 25.5267 6.70964 25.306 6.86819 25.1231L6.88694 25.1044C5.93558 24.2565 5.17305 23.2181 4.6488 22.0565C4.12456 20.895 3.8503 19.6362 3.84381 18.3619V18.2625C3.84368 17.9538 3.94513 17.6536 4.13252 17.4083C4.3199 17.1629 4.58282 16.9861 4.88069 16.905C4.24605 15.6387 3.91664 14.2414 3.91881 12.825C3.91775 11.2184 4.33797 9.63969 5.13756 8.24625C5.25116 8.04844 5.41118 7.88124 5.60381 7.75906C5.79643 7.63688 6.01589 7.5634 6.24325 7.54494C6.47061 7.52649 6.69904 7.56362 6.90885 7.65313C7.11866 7.74264 7.30355 7.88185 7.44756 8.05875C10.7285 12.0978 15.4266 14.7332 20.5838 15.4275C20.539 13.7403 20.9646 12.074 21.813 10.615C22.6614 9.15599 23.8991 7.96185 25.3876 7.16625C26.1413 6.765 27.1388 6.44437 28.1663 6.26812ZM7.01631 20.4206C7.38041 21.4453 8.00432 22.358 8.82698 23.0692C9.64963 23.7805 10.6429 24.2659 11.7094 24.4781C12.0167 24.5393 12.2948 24.7014 12.4994 24.9387C12.7041 25.1759 12.8237 25.4747 12.8392 25.7877C12.8547 26.1006 12.7653 26.4098 12.585 26.6661C12.4048 26.9224 12.1442 27.1112 11.8444 27.2025C11.3332 27.3575 10.8119 27.4656 10.2807 27.5269C10.857 28.2698 11.5922 28.8743 12.4325 29.2961C13.2728 29.7179 14.1969 29.9462 15.1369 29.9644C15.4269 29.9698 15.7081 30.0648 15.942 30.2363C16.1759 30.4078 16.351 30.6475 16.4434 30.9224C16.5358 31.1973 16.5409 31.4941 16.4581 31.772C16.3753 32.05 16.2085 32.2955 15.9807 32.475C14.0245 34.0118 11.7528 35.097 9.32819 35.6531C11.3359 36.2964 13.4318 36.6222 15.5401 36.6188H15.5569C18.257 36.647 20.9356 36.1369 23.4363 35.1184C25.937 34.0998 28.2097 32.5932 30.1216 30.6865C32.0336 28.7798 33.5464 26.5112 34.5718 24.0133C35.5972 21.5154 36.1146 18.8382 36.0938 16.1381V15.135C36.0935 14.7935 36.2175 14.4636 36.4426 14.2069C36.5738 14.0587 36.7988 13.7175 37.1176 13.1569C37.4176 12.6281 37.7513 11.9906 38.0982 11.3175L38.1601 11.1937C37.1806 11.4139 36.1721 11.4753 35.1732 11.3756C34.8354 11.3388 34.5224 11.181 34.2919 10.9312C33.349 9.90878 32.0934 9.2282 30.7219 8.99625C30.0303 8.89773 29.3272 8.91357 28.6407 9.04312C27.9714 9.14715 27.3217 9.35132 26.7132 9.64875C25.4863 10.3043 24.5117 11.3485 23.9423 12.6176C23.3729 13.8867 23.2409 15.309 23.5669 16.6612C23.6183 16.8739 23.6193 17.0956 23.5699 17.3087C23.5205 17.5218 23.4221 17.7204 23.2825 17.8888C23.1428 18.0572 22.9658 18.1907 22.7656 18.2786C22.5653 18.3666 22.3473 18.4067 22.1288 18.3956C16.3685 18.1025 10.9227 15.6786 6.84944 11.595C6.77021 12.0008 6.73065 12.4134 6.73131 12.8269V12.8306C6.72921 13.8633 6.98249 14.8804 7.46861 15.7915C7.95474 16.7026 8.65861 17.4793 9.51756 18.0525C9.7698 18.2223 9.96022 18.4692 10.0603 18.7563C10.1603 19.0434 10.1647 19.3552 10.0726 19.645C9.98049 19.9348 9.79697 20.1869 9.54952 20.3636C9.30208 20.5403 9.00403 20.632 8.70006 20.625C8.13436 20.6072 7.57144 20.5381 7.01819 20.4187"
        fill="#8F220D"
      />
    </svg>
  );
}

function IconFacebook() {
  return (
    <svg width="45" height="45" viewBox="0 0 45 45" fill="none">
      <path
        d="M35.6626 9.32806C33.0582 6.7248 29.7403 4.95229 26.1285 4.23467C22.5167 3.51705 18.7733 3.88654 15.3715 5.29643C11.9697 6.70631 9.06236 9.09327 7.01714 12.1555C4.97192 15.2177 3.88066 18.8175 3.88135 22.4999C3.88135 27.4388 5.84266 32.1755 9.33408 35.6687C12.8255 39.1619 17.5612 41.1256 22.5001 41.1281C24.944 41.1281 27.3644 40.6504 29.6251 39.7218C31.878 38.7703 33.9276 37.3954 35.6626 35.6718C37.3925 33.9422 38.7648 31.8887 39.7011 29.6286C40.6373 27.3686 41.1192 24.9462 41.1192 22.4999C41.1192 20.0536 40.6373 17.6313 39.7011 15.3712C38.7648 13.1112 37.3925 11.0577 35.6626 9.32806ZM34.3501 34.3406C31.669 37.0333 28.151 38.7328 24.3751 39.1593V26.8593H27.9001C28.3974 26.8593 28.8743 26.6618 29.2259 26.3101C29.5776 25.9585 29.7751 25.4816 29.7751 24.9843C29.7751 24.48729.5776 24.0101 29.2259 23.6585C28.8743 23.3069 28.3974 23.1093 27.9001 23.1093H24.3751V17.9718C24.3751 17.4745 24.5726 16.9976 24.9243 16.646C25.2759 16.2944 25.7528 16.0968 26.2501 16.0968H28.5001C28.9974 16.0968 29.4743 15.8993 29.8259 15.5476C30.1776 15.196 30.3751 14.7191 30.3751 14.2218C30.3751 13.7245 30.1776 13.2476 29.8259 12.896C29.4743 12.5444 28.9974 12.3468 28.5001 12.3468H25.3126C24.0694 12.3468 22.8771 12.8407 21.998 13.7197C21.119 14.5988 20.6251 15.7911 20.6251 17.0343V23.1093H17.1188C16.6216 23.1093 16.1447 23.3069 15.793 23.6585C15.4414 24.0101 15.2438 24.487 15.2438 24.9843C15.2438 25.4816 15.4414 25.9585 15.793 26.3101C16.1447 26.6618 16.6216 26.8593 17.1188 26.8593H20.6251V39.1593C17.143 38.762 13.8737 37.2808 11.2791 34.9249C8.68438 32.569 6.89544 29.4575 6.16491 26.0298C5.43439 22.6021 5.79921 19.0315 7.20784 15.8224C8.61648 12.6133 10.9977 9.92783 14.0153 8.14534C17.0328 6.36286 20.534 5.57344 24.0245 5.88859C27.515 6.20375 30.8182 7.60754 33.4677 9.9017C36.1171 12.1959 37.9788 15.2644 38.7899 18.674C39.6009 22.0835 39.3203 25.6617 37.9876 28.9031C37.1372 30.9332 35.902 32.7796 34.3501 34.3406Z"
        fill="#8F220D"
      />
    </svg>
  );
}

function IconShare() {
  return (
    <svg width="45" height="45" viewBox="0 0 45 45" fill="none">
      <path
        d="M40.7006 21.1745L25.7006 6.17446C25.4384 5.91232 25.1043 5.73381 24.7407 5.66149C24.377 5.58918 24.0001 5.62631 23.6575 5.76819C23.315 5.91007 23.0222 6.15034 22.8161 6.4586C22.6101 6.76687 22.5001 7.12931 22.5 7.50009V14.147C17.378 14.6209 12.6173 16.9892 9.14942 20.7883C5.68154 24.5873 3.75613 29.5438 3.75 34.6876V37.5001C3.7503 37.8893 3.87171 38.2688 4.09739 38.5859C4.32307 38.903 4.64184 39.142 5.00949 39.2698C5.37713 39.3975 5.77542 39.4077 6.14912 39.2989C6.52281 39.1901 6.85339 38.9677 7.095 38.6626C8.93221 36.4784 11.1861 34.6822 13.7252 33.3787C16.2642 32.0752 19.0375 31.2906 21.8831 31.0707C21.9769 31.0595 22.2113 31.0407 22.5 31.022V37.5001C22.5001 37.8709 22.6101 38.2333 22.8161 38.5416C23.0222 38.8498 23.315 39.0901 23.6575 39.232C24.0001 39.3739 24.377 39.411 24.7407 39.3387C25.1043 39.2664 25.4384 39.0879 25.7006 38.8257L40.7006 23.8257C41.0521 23.4741 41.2496 22.9973 41.2496 22.5001C41.2496 22.0029 41.0521 21.5261 40.7006 21.1745ZM26.25 32.9738V29.0626C26.25 28.5653 26.0525 28.0884 25.7008 27.7368C25.3492 27.3851 24.8723 27.1876 24.375 27.1876C23.8969 27.1876 21.945 27.2813 21.4462 27.347C16.3927 27.8121 11.5824 29.732 7.5975 32.8745C8.04983 28.739 10.0116 24.9157 13.1073 22.1366C16.2029 19.3575 20.2149 17.8179 24.375 17.8126C24.8723 17.8126 25.3492 17.615 25.7008 17.2634C26.0525 16.9118 26.25 16.4349 26.25 15.9376V12.0263L36.7238 22.5001L26.25 32.9738Z"
        fill="#8F220D"
      />
    </svg>
  );
}

/* ============================================================
   COMPONENTS
   ============================================================ */

/**
 * Breadcrumb — Cosplay Tutorial / Video Title.
 */
function Breadcrumb() {
  return (
    <div className="flex w-full items-center gap-2 text-base font-bold leading-5">
      <Link
        href="/customer/video/video-archive"
        className="text-brand-red underline transition-colors hover:text-brand-red-soft"
      >
        Cosplay Tutorial
      </Link>
      <span className="text-black">/</span>
      <span className="line-clamp-1 text-black">{VIDEO_DATA.title}</span>
    </div>
  );
}

/**
 * Separator line — horizontal line dengan opacity 30%.
 */
function SeparatorLine({ opacity = 30 }: { opacity?: number }) {
  return (
    <div
      className="h-0 w-full outline outline-1 outline-brand-red"
      style={{ opacity: opacity / 100 }}
    />
  );
}

/**
 * Social share buttons row.
 */
function ShareButtons() {
  return (
    <div className="flex items-center gap-5">
      <button
        type="button"
        aria-label="Share on WhatsApp"
        className="flex size-11 items-center justify-center transition-transform hover:scale-110"
      >
        <IconWhatsapp />
      </button>
      <button
        type="button"
        aria-label="Share on Twitter"
        className="flex size-11 items-center justify-center transition-transform hover:scale-110"
      >
        <IconTwitter />
      </button>
      <button
        type="button"
        aria-label="Share on Facebook"
        className="flex size-11 items-center justify-center transition-transform hover:scale-110"
      >
        <IconFacebook />
      </button>
      <button
        type="button"
        aria-label="Share"
        className="flex size-11 items-center justify-center transition-transform hover:scale-110"
      >
        <IconShare />
      </button>
    </div>
  );
}

/**
 * Main video player — 1120x630 dengan play button.
 */
function VideoPlayer() {
  return (
    <div className="relative h-[630px] w-full overflow-hidden rounded-[5px]">
      <Image
        src={VIDEO_DATA.thumbnail}
        alt={VIDEO_DATA.title}
        fill
        sizes="1120px"
        className="object-cover"
      />

      {/* Center play button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white/40 shadow-lg transition-transform hover:scale-110">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="white">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
    </div>
  );
}

/**
 * Content section dengan subheading.
 */
function ContentSection({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  return (
    <div className="flex w-full flex-col gap-2.5">
      <h2 className="text-xl font-extrabold leading-6 text-black">{title}</h2>
      <div className="whitespace-pre-line text-base leading-6 text-black">
        {content}
      </div>
    </div>
  );
}

/**
 * Related video card.
 */
function RelatedCard({ item }: { item: RelatedVideo }) {
  return (
    <div className="flex h-56 w-full items-center gap-10 overflow-hidden rounded-[10px] bg-white p-1 shadow-[2px_2px_8px_0px_rgba(0,0,0,0.25)]">
      {/* Thumbnail */}
      <div className="relative h-52 w-96 shrink-0 overflow-hidden rounded-[5px]">
        <Image
          src={item.thumbnail}
          alt={item.title}
          fill
          sizes="384px"
          className="object-cover"
          style={{
            objectPosition: item.imagePosition || "center",
          }}
        />
      </div>

      {/* Content */}
      <div className="flex w-[705px] flex-col items-start gap-3">
        <h3 className="line-clamp-2 w-full text-2xl font-bold leading-9 text-black">
          {item.title}
        </h3>
        <div className="flex w-full items-center justify-between">
          <span className="text-xl font-bold leading-6 text-brand-red">
            {item.duration}
          </span>
        </div>
        <div className="flex w-full items-center justify-between">
          <span className="text-xl font-bold leading-6 text-brand-red">
            {item.level}
          </span>
        </div>
      </div>
    </div>
  );
}

/**
 * Trending video item dengan numbered circle.
 */
function TrendingItem({ item, number }: { item: TrendingItem; number: number }) {
  return (
    <>
      <div className="flex w-full items-center gap-3">
        <div className="relative flex size-12 shrink-0 items-center justify-center">
          <svg
            width="50"
            height="50"
            viewBox="0 0 50 50"
            fill="none"
            className="absolute inset-0"
          >
            <circle
              cx="25"
              cy="25"
              r="23.5"
              stroke="#AB3227"
              strokeWidth="3"
            />
          </svg>
          <span className="relative text-2xl font-bold leading-8 text-brand-red">
            {number}
          </span>
        </div>
        <p className="w-64 text-sm font-bold leading-5 text-black line-clamp-2">
          {item.title}
        </p>
      </div>
      <div className="h-0 w-full border-t-2 border-brand-red" />
    </>
  );
}

/**
 * Side info — trending videos.
 */
function SideInfo() {
  return (
    <div className="flex w-80 shrink-0 flex-col gap-6">
      <div className="flex w-full flex-col gap-3.5">
        <h3 className="text-center text-2xl font-extrabold leading-8 text-brand-red">
          Trending Videos
        </h3>

        <div className="flex w-full flex-col gap-3.5">
          {TRENDING_ITEMS.map((item, index) => (
            <TrendingItem key={item.id} item={item} number={index + 1} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   PAGE
   ============================================================ */
export default function VideoDetailPage() {
  return (
    <div className="min-h-screen w-full bg-brand-base-soft">
      <div className="mx-auto w-full max-w-[1129px] px-4 pb-16 pt-10 md:px-6 lg:px-0">
        <div className="flex flex-col items-center gap-16">
          {/* Breadcrumb + Separator */}
          <div className="flex w-full flex-col gap-7">
            <Breadcrumb />
            <SeparatorLine opacity={30} />
          </div>

          {/* Main content area */}
          <div className="flex w-full flex-col">
            {/* Left content */}
            <article className="flex w-full flex-col gap-7">
              {/* Title */}
              <h1 className="text-6xl font-bold leading-[68px] text-black">
                {VIDEO_DATA.title}
              </h1>

              {/* Author + Date */}
              <p className="text-xl font-bold leading-6 text-brand-red">
                RyRentCos - {VIDEO_DATA.date}
              </p>

              {/* Separator */}
              <div className="h-0 w-full border-t border-black" />

              {/* Share buttons */}
<ShareButtons />

              {/* Video Player */}
              <VideoPlayer />

              {/* Description */}
<div className="flex w-full flex-col gap-6">
                <ContentSection
                  title="Tutorial Cosplay Columbina - Genshin Impact"
                  content={VIDEO_DATA.description}
                />
                <ContentSection
                  title="Video-video di bawah ini akan membahas secara detail:"
                  content={`Tutorial Memakai Costume
Cara memasang dress utama dengan flowing cape yang indah.
Tips melipat dan menata cloak putih dengan detail kristal agar terlihat megah.
Memasang sayap malaikat (wings) yang detachable supaya nyaman bergerak di event.

Tutorial Aksesoris
Pemasangan headpiece, bows, dan ornamen rambut.
Cara attach masker mata (eye mask) yang ikonik dengan veil.
Memakai kalung, gelang, cincin, arm bands, dan aksesoris kecil lainnya agar proporsional.
Tips stocking dan legwear untuk look yang flawless.

Tutorial Makeup Columbina
Base makeup pale dengan contour lembut untuk vibe ethereal dan angelic.
Eye makeup misterius: shadow biru-putih, eyeliner tajam, dan highlight di sekitar mata (karena ada mask).
Bibir soft pink/nude dengan gloss untuk kesan innocent yet dangerous.
Tambahan blush ringan dan highlight glowing untuk efek "seraphim" yang bersinar.`}
                />
                <ContentSection
                  title=""
                  content={VIDEO_DATA.fullDescription}
                />
              </div>

              {/* Separator */}
              <div className="h-0 w-full border-t border-black" />

              {/* Other Cosplay Tutorial */}
              <div className="flex w-full flex-col gap-8">
                <h2 className="text-center text-4xl font-bold leading-[48px] text-black">
                  Other Cosplay Tutorial
                </h2>

                <div className="flex w-full flex-col gap-7">
                  {RELATED_VIDEOS.map((item) => (
                    <RelatedCard key={item.id} item={item} />
                  ))}
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
}
