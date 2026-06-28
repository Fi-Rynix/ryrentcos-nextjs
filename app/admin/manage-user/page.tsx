"use client";

import Image from "next/image";
import { useState } from "react";
import UserCreateModal from "./_components/UserCreateModal";
import UserEditModal from "./_components/UserEditModal";
import UserDeleteDialog from "./_components/UserDeleteDialog";

/* ============================================================
   TYPES
   ============================================================ */
interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: "active" | "inactive";
  joinDate: string;
  avatar?: string;
}

/* ============================================================
   MOCK DATA
   ============================================================ */
const MOCK_USERS: User[] = [
  { id: "1", name: "Kurosawa Yuki", email: "kurosawa.yuki@email.com", phone: "081234567890", status: "active", joinDate: "2024-01-15", avatar: "/icons/profile.png" },
  { id: "2", name: "Tanaka Sakura", email: "tanaka.sakura@email.com", phone: "081234567891", status: "active", joinDate: "2024-02-20", avatar: "/icons/profile.png" },
  { id: "3", name: "Suzuki Hiro", email: "suzuki.hiro@email.com", phone: "081234567892", status: "active", joinDate: "2024-03-10", avatar: "/icons/profile.png" },
  { id: "4", name: "Watanabe Mei", email: "watanabe.mei@email.com", phone: "081234567893", status: "inactive", joinDate: "2024-04-05", avatar: "/icons/profile.png" },
  { id: "5", name: "Ito Ren", email: "ito.ren@email.com", phone: "081234567894", status: "active", joinDate: "2024-05-12", avatar: "/icons/profile.png" },
  { id: "6", name: "Nakamura Aoi", email: "nakamura.aoi@email.com", phone: "081234567895", status: "active", joinDate: "2024-06-18", avatar: "/icons/profile.png" },
  { id: "7", name: "Kobayashi Ken", email: "kobayashi.ken@email.com", phone: "081234567896", status: "active", joinDate: "2024-07-22", avatar: "/icons/profile.png" },
  { id: "8", name: "Yamamoto Hikari", email: "yamamoto.hikari@email.com", phone: "081234567897", status: "inactive", joinDate: "2024-08-30", avatar: "/icons/profile.png" },
  { id: "9", name: "Saito Kazuya", email: "saito.kazuya@email.com", phone: "081234567898", status: "active", joinDate: "2024-09-15", avatar: "/icons/profile.png" },
  { id: "10", name: "Yoshida Nana", email: "yoshida.nana@email.com", phone: "081234567899", status: "active", joinDate: "2024-10-20", avatar: "/icons/profile.png" },
];

/* ============================================================
   CONSTANTS
   ============================================================ */
const STATUS_TABS = [
  { key: "all", label: "Semua", count: MOCK_USERS.length },
  { key: "active", label: "Aktif", count: MOCK_USERS.filter((u) => u.status === "active").length },
  { key: "inactive", label: "Tidak Aktif", count: MOCK_USERS.filter((u) => u.status === "inactive").length },
];

const ITEMS_PER_PAGE = 5;

/* ============================================================
   HELPERS
   ============================================================ */
function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

/* ============================================================
   USER CARD
   ============================================================ */
function UserCard({
  user,
  onEdit,
  onDelete,
}: {
  user: User;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="flex w-full flex-col gap-3 overflow-hidden rounded-[10px] bg-white p-3 shadow-md sm:flex-row sm:items-center sm:gap-5 sm:p-5">
      {/* Avatar + Name */}
      <div className="flex items-center gap-3 sm:w-64 sm:shrink-0">
        <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-brand-red sm:h-12 sm:w-12">
          <Image
            src={user.avatar || "/icons/profile.png"}
            alt={user.name}
            fill
            sizes="48px"
            className="object-cover"
          />
        </div>
        <div className="min-w-0 flex-1 sm:flex-none">
          <p className="truncate text-sm font-bold text-neutral-950 sm:text-base">{user.name}</p>
          <p className="text-xs text-zinc-500 sm:text-sm">@{user.id}</p>
        </div>
      </div>

      {/* Contact info */}
      <div className="flex flex-1 flex-col gap-0.5 sm:gap-1">
        <p className="truncate text-xs text-zinc-700 sm:text-sm">{user.email}</p>
        <p className="text-xs text-zinc-500 sm:text-sm">{user.phone}</p>
      </div>

      {/* Status + Date (mobile: 2 col di bawah) */}
      <div className="flex flex-wrap items-center justify-between gap-2 sm:flex-1">
        <span
          className={`inline-flex items-center rounded-sm px-2 py-0.5 text-xs font-bold sm:px-2.5 sm:text-xs ${
            user.status === "active"
              ? "bg-orange-300 text-red-800"
              : "bg-neutral-200 text-neutral-600"
          }`}
        >
          {user.status === "active" ? "Aktif" : "Tidak Aktif"}
        </span>
        <span className="text-xs text-zinc-500 sm:text-sm">{formatDate(user.joinDate)}</span>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 sm:gap-2">
        <button
          type="button"
          onClick={onEdit}
          className="flex h-8 flex-1 items-center justify-center gap-1.5 rounded-lg border border-black/10 bg-white text-xs font-bold text-neutral-950 transition hover:bg-zinc-50 sm:flex-none sm:px-4 md:gap-2 md:text-sm"
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
          className="flex h-8 flex-1 items-center justify-center gap-1.5 rounded-lg border border-red-200 bg-white text-xs font-bold text-red-600 transition hover:bg-red-50 sm:flex-none sm:px-4 md:gap-2 md:text-sm"
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
  );
}

/* ============================================================
   PAGE COMPONENT
   ============================================================ */
export default function ManageUserPage() {
  // State
  const [users] = useState<User[]>(MOCK_USERS);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  // Modal state
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Filter logic
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.phone.includes(searchQuery);
    const matchesStatus = activeTab === "all" || user.status === activeTab;
    return matchesSearch && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handleTabChange = (key: string) => {
    setActiveTab(key);
    setCurrentPage(1);
  };

  // Modal handlers
  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  const handleDelete = (user: User) => {
    setSelectedUser(user);
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
            placeholder="Cari nama, email, atau telepon..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
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
          Tambah Customer
        </button>
      </div>

      {/* Status Tabs */}
      <div className="grid grid-cols-3 gap-2 rounded-2xl bg-red-50 p-2 sm:flex sm:justify-center sm:gap-1 sm:p-1">
        {STATUS_TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => handleTabChange(tab.key)}
            className={`relative flex h-9 shrink-0 items-center justify-center gap-2 rounded-xl px-3 text-xs font-bold transition-all duration-200 sm:h-7 sm:text-sm sm:px-4 ${
              activeTab === tab.key
                ? "bg-white text-orange-800 shadow-sm"
                : "text-neutral-500 hover:text-neutral-800"
            }`}
          >
            <span>{tab.label}</span>
            <span
              className={`flex h-5 min-w-[20px] items-center justify-center rounded-full px-1.5 text-xs transition-colors ${
                activeTab === tab.key
                  ? "bg-orange-800 text-white"
                  : "bg-neutral-200 text-neutral-600"
              }`}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* User Card List */}
      <div className="flex flex-col gap-3 sm:gap-4">
        {paginatedUsers.length === 0 ? (
          <div className="flex w-full flex-col items-center justify-center gap-3 py-12">
            <svg className="text-zinc-300" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
            </svg>
            <p className="text-sm text-zinc-500">Tidak ada customer ditemukan</p>
          </div>
        ) : (
          paginatedUsers.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              onEdit={() => handleEdit(user)}
              onDelete={() => handleDelete(user)}
            />
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col items-center gap-3 border-t border-zinc-100 pt-4 sm:flex-row sm:justify-between">
          <p className="text-xs text-zinc-500 sm:text-sm">
            Menampilkan {(currentPage - 1) * ITEMS_PER_PAGE + 1}-
            {Math.min(currentPage * ITEMS_PER_PAGE, filteredUsers.length)} dari{" "}
            {filteredUsers.length} customer
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-600 transition hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => setCurrentPage(page)}
                className={`flex h-9 min-w-[36px] items-center justify-center rounded-lg px-3 text-sm font-medium transition ${
                  currentPage === page
                    ? "bg-brand-red text-white"
                    : "border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-600 transition hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Modals */}
      {showCreateModal && <UserCreateModal onClose={() => setShowCreateModal(false)} />}

      {showEditModal && selectedUser && (
        <UserEditModal
          user={selectedUser}
          onClose={() => {
            setShowEditModal(false);
            setSelectedUser(null);
          }}
        />
      )}

      {showDeleteDialog && selectedUser && (
        <UserDeleteDialog
          user={selectedUser}
          onClose={() => {
            setShowDeleteDialog(false);
            setSelectedUser(null);
          }}
        />
      )}
    </div>
  );
}