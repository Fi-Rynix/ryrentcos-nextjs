"use client";

import Image from "next/image";
import Link from "next/link";

/* ============================================================
   TYPES
   ============================================================ */
type UserProfile = {
  name: string;
  email: string;
  phone: string;
  birthDate: string;
  address: string;
  profileImage: string;
  totalOrders: number;
  totalFavorites: number;
  memberSince: string;
  memberLevel: string;
  points: number;
  bio: string;
};

/* ============================================================
   MOCK DATA
   ============================================================ */
const USER_PROFILE: UserProfile = {
  name: "Vikibara Capybara",
  email: "vikibara@email.com",
  phone: "0895342342315",
  birthDate: "05 Januari 2006",
  address: "Jl. Jojoran Asri No 14, Mojo, Surabaya, Jawa Timur, 65262",
  profileImage: "/images/profile.png",
  totalOrders: 12,
  totalFavorites: 8,
  memberSince: "15 Januari 2025",
  memberLevel: "Gold Member",
  points: 1250,
  bio: "Saya suka femboy dan cosplay menjadi karakter imut. Follow Instagram saya @_vikiii.c",
};

/* ============================================================
   ICONS
   ============================================================ */
function IconUser() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15.8261 17.4917V15.8259C15.8261 14.9422 15.4751 14.0948 14.8503 13.47C14.2255 12.8452 13.378 12.4941 12.4944 12.4941H7.49678C6.61315 12.4941 5.7657 12.8452 5.14088 13.47C4.51606 14.0948 4.16504 14.9422 4.16504 15.8259V17.4917" />
      <path d="M9.99482 9.16226C11.8349 9.16226 13.3266 7.67059 13.3266 5.83052C13.3266 3.99045 11.8349 2.49878 9.99482 2.49878C8.15476 2.49878 6.66309 3.99045 6.66309 5.83052C6.66309 7.67059 8.15476 9.16226 9.99482 9.16226Z" />
    </svg>
  );
}

function IconMail() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18.3247 5.83057L10.8358 10.6008C10.5817 10.7484 10.293 10.8261 9.99911 10.8261C9.70522 10.8261 9.41656 10.7484 9.16243 10.6008L1.66602 5.83057" />
      <path d="M16.6588 3.33179H3.33188C2.41185 3.33179 1.66602 4.07762 1.66602 4.99766V14.9929C1.66602 15.9129 2.41185 16.6587 3.33188 16.6587H16.6588C17.5789 16.6587 18.3247 15.9129 18.3247 14.9929V4.99766C18.3247 4.07762 17.5789 3.33179 16.6588 3.33179Z" />
    </svg>
  );
}

function IconPhone() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11.5213 13.8C11.6933 13.879 11.8871 13.897 12.0708 13.8511C12.2544 13.8053 12.417 13.6982 12.5316 13.5476L12.8273 13.1603C12.9825 12.9534 13.1837 12.7855 13.415 12.6698C13.6464 12.5541 13.9014 12.4939 14.16 12.4939H16.6588C17.1007 12.4939 17.5244 12.6694 17.8368 12.9818C18.1492 13.2943 18.3247 13.718 18.3247 14.1598V16.6586C18.3247 17.1004 18.1492 17.5241 17.8368 17.8365C17.5244 18.149 17.1007 18.3245 16.6588 18.3245C12.6825 18.3245 8.86901 16.7449 6.05731 13.9332C3.24561 11.1215 1.66602 7.30798 1.66602 3.33164C1.66602 2.88982 1.84153 2.4661 2.15394 2.15369C2.46635 1.84128 2.89007 1.66577 3.33188 1.66577H5.83069C6.27251 1.66577 6.69623 1.84128 7.00864 2.15369C7.32105 2.4661 7.49656 2.88982 7.49656 3.33164V5.83044C7.49656 6.08906 7.43635 6.34413 7.32069 6.57544C7.20503 6.80676 7.0371 7.00797 6.83021 7.16314L6.4404 7.4555C6.28748 7.57226 6.17971 7.73835 6.13537 7.92557C6.09103 8.11278 6.11287 8.30957 6.19718 8.48251C7.33554 10.7946 9.20776 12.6645 11.5213 13.8Z" />
    </svg>
  );
}

function IconCalendar() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6.66309 1.66589V4.99763" />
      <path d="M13.3271 1.66589V4.99763" />
      <path d="M15.826 3.33179H4.16489C3.24486 3.33179 2.49902 4.07762 2.49902 4.99766V16.6587C2.49902 17.5788 3.24486 18.3246 4.16489 18.3246H15.826C16.746 18.3246 17.4918 17.5788 17.4918 16.6587V4.99766C17.4918 4.07762 16.746 3.33179 15.826 3.33179Z" />
      <path d="M2.49902 8.32935H17.4918" />
    </svg>
  );
}

function IconLocation() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16.659 8.32937C16.659 12.4882 12.0454 16.8195 10.4961 18.1572C10.3518 18.2657 10.1761 18.3244 9.99551 18.3244C9.81493 18.3244 9.63924 18.2657 9.49492 18.1572C7.94566 16.8195 3.33203 12.4882 3.33203 8.32937C3.33203 6.56211 4.03407 4.86723 5.28372 3.61758C6.53336 2.36794 8.22824 1.66589 9.99551 1.66589C11.7628 1.66589 13.4577 2.36794 14.7073 3.61758C15.9569 4.86723 16.659 6.56211 16.659 8.32937Z" />
      <path d="M9.9949 10.8282C11.3749 10.8282 12.4937 9.70942 12.4937 8.32937C12.4937 6.94932 11.3749 5.83057 9.9949 5.83057C8.61485 5.83057 7.49609 6.94932 7.49609 8.32937C7.49609 9.70942 8.61485 10.8282 9.9949 10.8282Z" />
    </svg>
  );
}

function IconStar() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.1625 18.0996C9.41574 18.2458 9.70301 18.3228 9.99544 18.3228C10.2879 18.3228 10.5751 18.2458 10.8284 18.0996L16.6589 14.7678C16.9119 14.6218 17.122 14.4117 17.2682 14.1588C17.4144 13.9059 17.4915 13.619 17.4918 13.3269V6.66338C17.4915 6.37125 17.4144 6.08433 17.2682 5.83141C17.122 5.5785 16.9119 5.36847 16.6589 5.2224L10.8284 1.89066C10.5751 1.74445 10.2879 1.66748 9.99544 1.66748C9.70301 1.66748 9.41574 1.74445 9.1625 1.89066L3.33196 5.2224C3.07896 5.36847 2.86883 5.5785 2.72263 5.83141C2.57644 6.08433 2.49932 6.37125 2.49902 6.66338V13.3269C2.49932 13.619 2.57644 13.9059 2.72263 14.1588C2.86883 14.4117 3.07896 14.6218 3.33196 14.7678L9.1625 18.0996Z" />
      <path d="M9.99512 18.3245V9.99512" />
      <path d="M2.74023 5.83057L9.9951 9.99524L17.25 5.83057" />
      <path d="M6.24707 3.55664L13.7435 7.84625" />
    </svg>
  );
}

function IconHeart() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1.66602 7.91296C1.66603 6.98607 1.94721 6.08098 2.47241 5.31725C2.99761 4.55352 3.74212 3.96706 4.60762 3.63533C5.47311 3.30361 6.41887 3.24223 7.31999 3.45929C8.2211 3.67635 9.03518 4.16165 9.65469 4.85109C9.69833 4.89774 9.75108 4.93494 9.80968 4.96037C9.86828 4.9858 9.93148 4.99892 9.99536 4.99892C10.0592 4.99892 10.1224 4.9858 10.181 4.96037C10.2396 4.93494 10.2924 4.89774 10.336 4.85109C10.9536 4.15717 11.7679 3.66779 12.6704 3.44809C13.573 3.22839 14.5211 3.28879 15.3885 3.62125C16.2559 3.9537 17.0015 4.54245 17.526 5.30912C18.0505 6.07579 18.3291 6.98403 18.3247 7.91296C18.3247 9.82038 17.0753 11.2447 15.8259 12.4941L11.2514 16.9195C11.0962 17.0977 10.9049 17.2409 10.6901 17.3395C10.4753 17.4381 10.2419 17.4899 10.0056 17.4914C9.76925 17.4929 9.53529 17.4441 9.31926 17.3482C9.10323 17.2523 8.91007 17.1116 8.75262 16.9353L4.16482 12.4941C2.91542 11.2447 1.66602 9.8287 1.66602 7.91296Z" />
    </svg>
  );
}

function IconEdit() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7.99477 1.99854H3.33141C2.97804 1.99854 2.63914 2.13891 2.38927 2.38878C2.1394 2.63865 1.99902 2.97755 1.99902 3.33092V12.6576C1.99902 13.011 2.1394 13.3499 2.38927 13.5998C2.63914 13.8497 2.97804 13.99 3.33141 13.99H12.6581C13.0115 13.99 13.3504 13.8497 13.6003 13.5998C13.8501 13.3499 13.9905 13.011 13.9905 12.6576V7.99428" />
      <path d="M12.2416 1.74864C12.5066 1.48361 12.8661 1.33472 13.2409 1.33472C13.6157 1.33472 13.9751 1.48361 14.2402 1.74864C14.5052 2.01367 14.6541 2.37312 14.6541 2.74793C14.6541 3.12273 14.5052 3.48219 14.2402 3.74722L8.23575 9.75229C8.07756 9.91034 7.88214 10.026 7.66749 10.0887L5.75351 10.6483C5.69619 10.665 5.63542 10.666 5.57758 10.6512C5.51973 10.6364 5.46693 10.6063 5.42471 10.5641C5.38249 10.5219 5.35239 10.4691 5.33757 10.4112C5.32275 10.3534 5.32375 10.2926 5.34047 10.2353L5.90008 8.32131C5.96305 8.10683 6.07897 7.91164 6.23717 7.75371L12.2416 1.74864Z" />
    </svg>
  );
}

/* ============================================================
   COMPONENTS
   ============================================================ */

function ProfileInfoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="relative flex items-center gap-4 rounded-xl bg-stone-50 p-4">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center text-brand-red">
        {icon}
      </span>
      <div className="flex flex-col gap-1">
        <span className="text-xs font-normal text-gray-600 sm:text-sm">{label}</span>
        <span className="text-sm font-bold leading-snug text-brand-red sm:text-base">{value}</span>
      </div>
    </div>
  );
}

function QuickMenuButton({
  label,
}: {
  label: string;
}) {
  return (
    <div className="flex h-9 w-full items-center justify-center rounded-lg border border-orange-800/30 bg-white px-4">
      <span className="text-sm font-bold text-brand-red">{label}</span>
    </div>
  );
}

/* ============================================================
   PAGE
   ============================================================ */
export default function ProfilePage() {
  return (
    <div className="min-h-screen w-full bg-red-50 pb-20">
      <div className="mx-auto w-full max-w-[1120px] px-4 pt-10">
        <div className="mb-8 flex flex-col items-center text-center">
          <h1 className="font-display text-4xl font-normal leading-tight text-brand-red sm:text-5xl sm:leading-[58px]">
            My Profile
          </h1>
          <div className="mt-7 h-px w-full max-w-[548px] bg-brand-red" />
        </div>

        <div className="mb-8 w-full rounded-xl bg-brand-red p-4 sm:p-6">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:gap-6">
            <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-full bg-orange-800 shadow-md sm:h-32 sm:w-32">
              <Image
                src={USER_PROFILE.profileImage}
                alt={USER_PROFILE.name}
                width={128}
                height={128}
                className="size-full object-cover"
              />
            </div>

            <div className="flex flex-1 flex-col items-center gap-3 sm:items-start sm:gap-2">
              <div className="text-center sm:text-left">
                <h2 className="text-lg font-bold text-white sm:text-xl">{USER_PROFILE.name}</h2>
                <p className="text-sm font-normal text-orange-300 sm:text-base">{USER_PROFILE.email}</p>
              </div>

              <div className="flex w-full flex-wrap justify-center gap-3 sm:justify-start sm:gap-4">
                <div className="flex h-14 flex-1 items-center gap-2 rounded-[10px] bg-orange-800 px-3 sm:flex-none sm:px-4">
                  <span className="text-white"><IconStar /></span>
                  <div className="flex flex-col">
                    <span className="text-xs font-normal text-orange-300 sm:text-sm">Total Pesanan</span>
                    <span className="text-sm font-bold text-white sm:text-base">{USER_PROFILE.totalOrders}</span>
                  </div>
                </div>
                <div className="flex h-14 flex-1 items-center gap-2 rounded-[10px] bg-orange-800 px-3 sm:flex-none sm:px-4">
                  <span className="text-white"><IconHeart /></span>
                  <div className="flex flex-col">
                    <span className="text-xs font-normal text-orange-300 sm:text-sm">Kostum Favorit</span>
                    <span className="text-sm font-bold text-white sm:text-base">{USER_PROFILE.totalFavorites}</span>
                  </div>
                </div>
              </div>
            </div>

            <button className="flex h-9 w-full items-center justify-center gap-2 rounded-lg bg-white px-4 sm:w-auto">
              <span className="text-brand-red"><IconEdit /></span>
              <span className="text-sm font-bold text-brand-red">Edit Profil</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
          <div className="flex-1 overflow-hidden rounded-xl bg-white shadow-md">
            <div className="p-4 sm:p-6">
              <h3 className="mb-6 text-lg font-bold text-red-800 sm:text-xl">Informasi Pribadi</h3>

              <div className="flex flex-col gap-4">
                <ProfileInfoItem icon={<IconUser />} label="Nama Lengkap" value={USER_PROFILE.name} />
                <ProfileInfoItem icon={<IconMail />} label="Email" value={USER_PROFILE.email} />
                <ProfileInfoItem icon={<IconPhone />} label="Nomor Telepon" value={USER_PROFILE.phone} />
                <ProfileInfoItem icon={<IconCalendar />} label="Tanggal Lahir" value={USER_PROFILE.birthDate} />
                <ProfileInfoItem icon={<IconLocation />} label="Alamat" value={USER_PROFILE.address} />
              </div>
            </div>
          </div>

          <div className="flex w-full flex-col gap-6 lg:w-96 lg:shrink-0">
            <div className="overflow-hidden rounded-xl bg-white p-4 shadow-md sm:p-6">
              <h3 className="mb-4 text-lg font-bold text-red-800 sm:text-xl">Tentang Saya</h3>
              <p className="text-sm leading-relaxed text-gray-700 sm:text-base">{USER_PROFILE.bio}</p>
            </div>

            <div className="overflow-hidden rounded-xl bg-white p-4 shadow-md sm:p-6">
              <h3 className="mb-4 text-lg font-bold text-red-800 sm:text-xl">Menu Cepat</h3>
              <div className="flex flex-col gap-2">
                <Link href="/customer/transaction/transaction-history">
                  <QuickMenuButton label="Pesanan Saya" />
                </Link>
                <Link href="/customer/product/product-catalog">
                  <QuickMenuButton label="Katalog Produk" />
                </Link>
                <Link href="/customer/faq">
                  <QuickMenuButton label="FAQ" />
                </Link>
              </div>
            </div>

            <div className="overflow-hidden rounded-xl bg-brand-red p-4 shadow-lg sm:p-6">
              <h3 className="mb-4 text-lg font-bold text-white sm:text-xl">Status Member</h3>
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-normal text-orange-300 sm:text-base">Level</span>
                  <span className="text-sm font-bold text-white sm:text-base">{USER_PROFILE.memberLevel}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-normal text-orange-300 sm:text-base">Bergabung</span>
                  <span className="text-sm font-bold text-white sm:text-base">{USER_PROFILE.memberSince}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-normal text-orange-300 sm:text-base">Poin</span>
                  <span className="text-sm font-bold text-white sm:text-base">{USER_PROFILE.points.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}