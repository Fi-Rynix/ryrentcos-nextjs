"use client";

import Image from "next/image";
import Link from "next/link";
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
  {
    id: "1",
    name: "Kurosawa Yuki",
    email: "kurosawa.yuki@email.com",
    phone: "081234567890",
    status: "active",
    joinDate: "2024-01-15",
    avatar: "/icons/profile.png",
  },
  {
    id: "2",
    name: "Tanaka Sakura",
    email: "tanaka.sakura@email.com",
    phone: "081234567891",
    status: "active",
    joinDate: "2024-02-20",
    avatar: "/icons/profile.png",
  },
  {
    id: "3",
    name: "Suzuki Hiro",
    email: "suzuki.hiro@email.com",
    phone: "081234567892",
    status: "active",
    joinDate: "2024-03-10",
    avatar: "/icons/profile.png",
  },
  {
    id: "4",
    name: "Watanabe Mei",
    email: "watanabe.mei@email.com",
    phone: "081234567893",
    status: "inactive",
    joinDate: "2024-04-05",
    avatar: "/icons/profile.png",
  },
  {
    id: "5",
    name: "Ito Ren",
    email: "ito.ren@email.com",
    phone: "081234567894",
    status: "active",
    joinDate: "2024-05-12",
    avatar: "/icons/profile.png",
  },
  {
    id: "6",
    name: "Nakamura Aoi",
    email: "nakamura.aoi@email.com",
    phone: "081234567895",
    status: "active",
    joinDate: "2024-06-18",
    avatar: "/icons/profile.png",
  },
  {
    id: "7",
    name: "Kobayashi Ken",
    email: "kobayashi.ken@email.com",
    phone: "081234567896",
    status: "active",
    joinDate: "2024-07-22",
    avatar: "/icons/profile.png",
  },
  {
    id: "8",
    name: "Yamamoto Hikari",
    email: "yamamoto.hikari@email.com",
    phone: "081234567897",
    status: "inactive",
    joinDate: "2024-08-30",
    avatar: "/icons/profile.png",
  },
  {
    id: "9",
    name: "Saito Kazuya",
    email: "saito.kazuya@email.com",
    phone: "081234567898",
    status: "active",
    joinDate: "2024-09-15",
    avatar: "/icons/profile.png",
  },
  {
    id: "10",
    name: "Yoshida Nana",
    email: "yoshida.nana@email.com",
    phone: "081234567899",
    status: "active",
    joinDate: "2024-10-20",
    avatar: "/icons/profile.png",
  },
];

/* ============================================================
   CONSTANTS
   ============================================================ */
const STATUSES = [
  { value: "all", label: "Semua Status" },
  { value: "active", label: "Aktif" },
  { value: "inactive", label: "Tidak Aktif" },
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
   PAGE COMPONENT
   ============================================================ */
export default function ManageUserPage() {
  // State
  const [users] = useState<User[]>(MOCK_USERS);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
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
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Reset page when filters change
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handleStatusChange = (value: string) => {
    setStatusFilter(value);
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
    <div className="min-h-screen bg-zinc-50">
      {/* Content */}
      <div className="mx-auto max-w-[1120px] px-4 py-8">
        {/* Search & Filter Bar */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          {/* Search */}
          <div className="relative flex-1 min-w-[280px] max-w-md">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Cari nama, email, atau telepon..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="h-12 w-full rounded-xl border-2 border-zinc-200 bg-white pl-12 pr-4 text-sm text-zinc-800 placeholder:text-zinc-400 focus:border-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/20"
            />
          </div>

          {/* Filter */}
          <div className="flex items-center gap-3">
            {/* Status Filter */}
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => handleStatusChange(e.target.value)}
                className="h-12 appearance-none rounded-xl border-2 border-zinc-200 bg-white px-4 pr-10 text-sm font-medium text-zinc-700 focus:border-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/20"
              >
                {STATUSES.map((status) => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
              <svg
                className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </div>

            {/* Add Button */}
            <button
              type="button"
              onClick={() => setShowCreateModal(true)}
              className="flex h-12 items-center gap-2 rounded-xl bg-brand-red px-5 text-sm font-bold text-white shadow-[3px_3px_0_0_rgba(0,0,0,0.15)] transition hover:bg-brand-red-soft active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
              Tambah Customer
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-100 bg-zinc-50">
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-zinc-500">
                    Customer
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-zinc-500">
                    Kontak
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-zinc-500">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-zinc-500">
                    Bergabung
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-zinc-500">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {paginatedUsers.map((user) => (
                  <tr key={user.id} className="transition-colors hover:bg-zinc-50">
                    {/* User Info */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-brand-red">
                          <Image
                            src={user.avatar || "/icons/profile.png"}
                            alt={user.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-bold text-neutral-950">{user.name}</p>
                          <p className="truncate text-xs text-zinc-500">@{user.id}</p>
                        </div>
                      </div>
                    </td>

                    {/* Contact */}
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-0.5">
                        <p className="text-sm text-zinc-700">{user.email}</p>
                        <p className="text-xs text-zinc-500">{user.phone}</p>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${
                          user.status === "active"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-zinc-100 text-zinc-500"
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            user.status === "active" ? "bg-emerald-500" : "bg-zinc-400"
                          }`}
                        />
                        {user.status === "active" ? "Aktif" : "Tidak Aktif"}
                      </span>
                    </td>

                    {/* Join Date */}
                    <td className="px-6 py-4">
                      <p className="text-sm text-zinc-600">{formatDate(user.joinDate)}</p>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => handleEdit(user)}
                          className="flex h-8 items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3 text-xs font-semibold text-zinc-600 transition hover:border-brand-red hover:text-brand-red"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                            <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                          </svg>
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(user)}
                          className="flex h-8 items-center gap-1.5 rounded-lg border border-red-200 bg-white px-3 text-xs font-semibold text-red-600 transition hover:bg-red-50"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M6.66211 7.32812V11.3253M9.32715 7.32812V11.3253M12.6578 3.99707V13.3238C12.6578 13.6772 12.5174 14.0161 12.2675 14.2659C12.0177 14.5158 11.6788 14.6562 11.3254 14.6562H4.66344C4.31007 14.6562 3.97117 14.5158 3.7213 14.2659C3.47143 14.0161 3.33105 13.6772 3.33105 13.3238V3.99707M1.99902 3.99707H13.9905M5.3291 3.9973V2.66491C5.3291 2.31154 5.46948 1.97264 5.71935 1.72277C5.96922 1.4729 6.30812 1.33252 6.66149 1.33252H9.32627C9.67964 1.33252 10.0185 1.4729 10.2684 1.72277C10.5183 1.97264 10.6587 2.31154 10.6587 2.66491V3.9973" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {paginatedUsers.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16">
              <svg
                className="text-zinc-300"
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 00-3-3.87" />
                <path d="M16 3.13a4 4 0 010 7.75" />
              </svg>
              <p className="mt-4 text-sm font-medium text-zinc-500">Tidak ada customer ditemukan</p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between border-t border-zinc-100 px-6 py-4">
              <p className="text-sm text-zinc-500">
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
        </div>
      </div>

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
