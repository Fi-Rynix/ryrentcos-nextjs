"use client";

import Image from "next/image";
import { useState } from "react";
import VideoCreateModal from "./_components/VideoCreateModal";
import VideoEditModal from "./_components/VideoEditModal";
import VideoDeleteDialog from "./_components/VideoDeleteDialog";

/* ============================================================
   TYPES
   ============================================================ */
interface Video {
  id: string;
  title: string;
  thumbnail: string;
  date: string;
  duration: string;
  views: number;
  sourceVideo: string;
  description: string;
}

/* ============================================================
   MOCK DATA
   ============================================================ */
const MOCK_VIDEOS: Video[] = [
  {
    id: "1",
    title: "Cosplay Columbina Hyposelena (Genshin Impact) Costume, Accessories & Makeup Tutorial",
    thumbnail: "/images/cosplay-guide/columbina.png",
    date: "9 Desember 2025, 09.00 WIB",
    duration: "7 min 12 sec",
    views: 5420,
    sourceVideo: "https://youtube.com/watch?v=example1",
    description:
      "Selamat datang di halaman Video Tutorial Cosplay Columbina dari RyRentCos! Di sini kamu bisa menemukan panduan lengkap step-by-step untuk menghidupkan karakter Fatui Harbinger ke-3, Damselette Columbina.",
  },
  {
    id: "2",
    title: "Cosplay Durin (Genshin Impact) Costume, Accessories & Makeup Tutorial",
    thumbnail: "/images/cosplay-guide/durin.png",
    date: "8 Desember 2025, 10.00 WIB",
    duration: "6 min 22 sec",
    views: 3890,
    sourceVideo: "https://youtube.com/watch?v=example2",
    description:
      "Tutorial lengkap cosplay Durin dari Genshin Impact dengan detail costume dan makeup.",
  },
  {
    id: "3",
    title: "Cosplay Kirigaya Kazuto / Kirito (Sword Art Online) Tutorial",
    thumbnail: "/images/cosplay-guide/kirito.png",
    date: "5 Desember 2025, 14.00 WIB",
    duration: "5 min 12 sec",
    views: 4567,
    sourceVideo: "https://youtube.com/watch?v=example3",
    description:
      "Belajar cara cosplay Kirito dengan berbagai teknik profesional.",
  },
  {
    id: "4",
    title: "Cosplay Waguri Kaoruko - The Fragrant Flower Blooms with Dignity",
    thumbnail: "/images/cosplay-guide/waguri.png",
    date: "3 Desember 2025, 16.00 WIB",
    duration: "8 min 30 sec",
    views: 2134,
    sourceVideo: "https://youtube.com/watch?v=example4",
    description:
      "Panduan lengkap makeup untuk karakter anime dengan teknik dasar hingga advanced.",
  },
];

/* ============================================================
   HELPERS
   ============================================================ */
function formatViews(views: number): string {
  if (views >= 1000) {
    return `${(views / 1000).toFixed(1).replace(".", ",")}`.replace(",0", "") + "K";
  }
  return views.toLocaleString("id-ID");
}

/* ============================================================
   STAT CARD
   ============================================================ */
function StatCard({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="flex h-24 flex-1 flex-col justify-center gap-1 rounded-[10px] bg-white px-4 py-4 shadow-md sm:px-6 sm:pt-6">
      <span className="text-xs font-bold text-black sm:text-sm">{label}</span>
      <span className="text-sm text-gray-900 sm:text-base">{value}</span>
    </div>
  );
}

/* ============================================================
   VIDEO CARD
   ============================================================ */
function VideoCard({
  video,
  onEdit,
  onDelete,
}: {
  video: Video;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="w-full max-w-sm overflow-hidden rounded-[10px] bg-white shadow-md md:w-80">
      {/* Thumbnail */}
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <Image
          src={video.thumbnail}
          alt={video.title}
          fill
          className="object-cover object-left-top"
        />
        {/* Duration Badge */}
        <div className="absolute bottom-2 right-2 flex h-7 items-center justify-center rounded-sm bg-black px-2">
          <span className="text-sm text-white">{video.duration}</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col">
        {/* Title */}
        <div className="px-4 pt-4">
          <h3 className="line-clamp-2 text-base leading-6 text-gray-900">
            {video.title}
          </h3>
        </div>

        {/* Description */}
        <div className="px-4 pt-2">
          <p className="line-clamp-2 text-sm leading-5 text-gray-600">
            {video.description}
          </p>
        </div>

        {/* Meta */}
        <div className="flex items-center justify-between px-4 pt-3">
          <div className="flex items-center gap-1">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="text-gray-500"
            >
              <path
                d="M1.37367 8.22633C1.31815 8.07676 1.31815 7.91223 1.37367 7.76266C1.91442 6.45149 2.83231 5.33041 4.01098 4.54154C5.18965 3.75267 6.57601 3.33154 7.99431 3.33154C9.41261 3.33154 10.799 3.75267 11.9776 4.54154C13.1563 5.33041 14.0742 6.45149 14.6149 7.76266C14.6705 7.91223 14.6705 8.07676 14.6149 8.22633C14.0742 9.53749 13.1563 10.6586 11.9776 11.4474C10.799 12.2363 9.41261 12.6574 7.99431 12.6574C6.57601 12.6574 5.18965 12.2363 4.01098 11.4474C2.83231 10.6586 1.91442 9.53749 1.37367 8.22633Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7.99468 9.99277C9.09846 9.99277 9.99326 9.09797 9.99326 7.99419C9.99326 6.8904 9.09846 5.99561 7.99468 5.99561C6.89089 5.99561 5.99609 6.8904 5.99609 7.99419C5.99609 9.09797 6.89089 9.99277 7.99468 9.99277Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-sm text-gray-600">{formatViews(video.views)}</span>
          </div>
          <span className="text-sm text-gray-600">{video.date}</span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 px-4 pb-4 pt-3">
          <button
            type="button"
            onClick={onEdit}
            className="flex h-8 flex-1 items-center justify-center gap-2 rounded-lg border border-black/10 bg-white text-sm font-bold text-neutral-950 transition hover:bg-zinc-50"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M7.99477 1.99854H3.33141C2.97804 1.99854 2.63914 2.13891 2.38927 2.38878C2.1394 2.63865 1.99902 2.97755 1.99902 3.33092V12.6576C1.99902 13.011 2.1394 13.3499 2.38927 13.5998C2.63914 13.8497 2.97804 13.99 3.33141 13.99H12.6581C13.0115 13.99 13.3504 13.8497 13.6003 13.5998C13.8501 13.3499 13.9905 13.011 13.9905 12.6576V7.99428M12.2416 1.74888C12.5066 1.48385 12.8661 1.33496 13.2409 1.33496C13.6157 1.33496 13.9751 1.48385 14.2402 1.74888C14.5052 2.01391 14.6541 2.37337 14.6541 2.74817C14.6541 3.12298 14.5052 3.48243 14.2402 3.74746L8.23575 9.75254C8.07756 9.91059 7.88214 10.0263 7.66749 10.089L5.75351 10.6486C5.69619 10.6653 5.63542 10.6663 5.57758 10.6515C5.51973 10.6366 5.46693 10.6066 5.42471 10.5643C5.38249 10.5221 5.35239 10.4693 5.33757 10.4115C5.32275 10.3536 5.32375 10.2929 5.34047 10.2355L5.90008 8.32155C5.96305 8.10707 6.07897 7.91188 6.23717 7.75395L12.2416 1.74888Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Edit
          </button>
          <button
            type="button"
            onClick={onDelete}
            className="flex h-8 flex-1 items-center justify-center gap-2 rounded-lg border border-red-200 bg-white text-sm font-bold text-red-600 transition hover:bg-red-50"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M6.66211 7.32812V11.3253M9.32715 7.32812V11.3253M12.6578 3.99707V13.3238C12.6578 13.6772 12.5174 14.0161 12.2675 14.2659C12.0177 14.5158 11.6788 14.6562 11.3254 14.6562H4.66344C4.31007 14.6562 3.97117 14.5158 3.7213 14.2659C3.47143 14.0161 3.33105 13.6772 3.33105 13.3238V3.99707M1.99902 3.99707H13.9905M5.3291 3.9973V2.66491C5.3291 2.31154 5.46948 1.97264 5.71935 1.72277C5.96922 1.4729 6.30812 1.33252 6.66149 1.33252H9.32627C9.67964 1.33252 10.0185 1.4729 10.2684 1.72277C10.5183 1.97264 10.6587 2.31154 10.6587 2.66491V3.9973"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   PAGE COMPONENT
   ============================================================ */
export default function ManageVideoPage() {
  // State
  const [videos] = useState<Video[]>(MOCK_VIDEOS);
  const [searchQuery, setSearchQuery] = useState("");

  // Modal state
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  // Stats
  const totalViews = videos.reduce((sum, v) => sum + v.views, 0);
  const avgViews = Math.round(totalViews / videos.length);

  // Filter logic
  const filteredVideos = videos.filter((video) =>
    video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    video.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Modal handlers
  const handleEdit = (video: Video) => {
    setSelectedVideo(video);
    setShowEditModal(true);
  };

  const handleDelete = (video: Video) => {
    setSelectedVideo(video);
    setShowDeleteDialog(true);
  };

  return (
    <div className="flex flex-col gap-4 sm:gap-6">
      {/* Header Actions */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Search */}
        <div className="relative w-full sm:flex-1 sm:max-w-md">
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M13.9899 13.9899L11.0986 11.0986M7.32858 12.6576C10.272 12.6576 12.6581 10.2715 12.6581 7.32809C12.6581 4.38466 10.272 1.99854 7.32858 1.99854C4.38515 1.99854 1.99902 4.38466 1.99902 7.32809C1.99902 10.2715 4.38515 12.6576 7.32858 12.6576Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <input
            type="text"
            placeholder="Cari video tutorial..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-9 w-full rounded-lg border border-zinc-100 bg-zinc-100 pl-10 pr-3 text-sm text-zinc-800 placeholder:text-zinc-400 focus:border-brand-red focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-red/20"
          />
        </div>

        {/* Add Button */}
        <button
          type="button"
          onClick={() => setShowCreateModal(true)}
          className="flex h-9 w-full shrink-0 items-center justify-center gap-2 rounded-lg bg-orange-800 px-4 text-sm font-bold text-white transition hover:bg-orange-700 sm:w-auto"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M3.33105 7.99414H12.6578M7.99414 3.33105V12.6578"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Tambah Video
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-2 sm:gap-5">
        <StatCard label="Total Video" value={videos.length} />
        <StatCard label="Total Views" value={formatViews(totalViews)} />
        <StatCard label="Rata-rata Views" value={formatViews(avgViews)} />
      </div>

      {/* Video Grid */}
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-5">
        {filteredVideos.length === 0 ? (
          <div className="flex w-full flex-col items-center justify-center gap-3 py-12">
            <svg
              className="text-zinc-300"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="text-sm text-zinc-500">
              Tidak ada video yang ditemukan
            </p>
          </div>
        ) : (
          filteredVideos.map((video) => (
            <VideoCard
              key={video.id}
              video={video}
              onEdit={() => handleEdit(video)}
              onDelete={() => handleDelete(video)}
            />
          ))
        )}
      </div>

      {/* Modals */}
      {showCreateModal && (
        <VideoCreateModal onClose={() => setShowCreateModal(false)} />
      )}

      {showEditModal && selectedVideo && (
        <VideoEditModal
          video={selectedVideo}
          onClose={() => {
            setShowEditModal(false);
            setSelectedVideo(null);
          }}
        />
      )}

      {showDeleteDialog && selectedVideo && (
        <VideoDeleteDialog
          video={selectedVideo}
          onClose={() => {
            setShowDeleteDialog(false);
            setSelectedVideo(null);
          }}
        />
      )}
    </div>
  );
}
