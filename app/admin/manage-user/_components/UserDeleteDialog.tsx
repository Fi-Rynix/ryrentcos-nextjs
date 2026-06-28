"use client";

import Image from "next/image";
import { useState } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: "active" | "inactive";
  joinDate: string;
  avatar?: string;
}

interface UserDeleteDialogProps {
  user: User;
  onClose: () => void;
}

export default function UserDeleteDialog({ user, onClose }: UserDeleteDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [confirmName, setConfirmName] = useState("");

  const handleDelete = async () => {
    if (confirmName !== user.name) return;

    setIsDeleting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Delete user:", user.id);
    setIsDeleting(false);
    onClose();
  };

  const isConfirmValid = confirmName === user.name;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />

      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        {/* Warning Icon */}
        <div className="mb-4 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <svg
              className="text-red-600"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* Content */}
        <div className="mb-6 text-center">
          <h2 className="text-xl font-bold text-zinc-800">Hapus Customer?</h2>
          <p className="mt-2 text-sm text-zinc-500">
            Apakah kamu yakin ingin menghapus customer{" "}
            <span className="font-bold text-zinc-700">{user.name}</span>?
            Tindakan ini tidak dapat dibatalkan.
          </p>
        </div>

        {/* User Preview */}
        <div className="mb-6 flex items-center gap-3 rounded-xl bg-zinc-50 p-4">
          <div className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-brand-red">
            <Image
              src={user.avatar || "/icons/profile.png"}
              alt={user.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-bold text-zinc-800">{user.name}</p>
            <p className="truncate text-xs text-zinc-500">{user.email}</p>
          </div>
        </div>

        {/* Confirmation Input */}
        <div className="mb-6 flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-zinc-700">
            Ketik <span className="text-red-600">{user.name}</span> untuk konfirmasi
          </label>
          <input
            type="text"
            value={confirmName}
            onChange={(e) => setConfirmName(e.target.value)}
            placeholder={user.name}
            className="h-12 rounded-xl border-2 border-zinc-200 bg-zinc-50 px-4 text-sm text-zinc-800 placeholder:text-zinc-400 focus:border-red-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-100"
          />
        </div>

        {/* Actions */}
        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-end sm:gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="h-11 rounded-xl border-2 border-zinc-200 px-6 text-sm font-semibold text-zinc-600 transition hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-50 sm:h-12"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={!isConfirmValid || isDeleting}
            className="flex h-11 items-center justify-center gap-2 rounded-xl bg-red-600 px-6 text-sm font-bold text-white shadow-[3px_3px_0_0_rgba(0,0,0,0.15)] transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none sm:h-12"
          >
            {isDeleting ? (
              <>
                <svg className="animate-spin" width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Menghapus...
              </>
            ) : (
              <>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M6.66211 7.32812V11.3253M9.32715 7.32812V11.3253M12.6578 3.99707V13.3238C12.6578 13.6772 12.5174 14.0161 12.2675 14.2659C12.0177 14.5158 11.6788 14.6562 11.3254 14.6562H4.66344C4.31007 14.6562 3.97117 14.5158 3.7213 14.2659C3.47143 14.0161 3.33105 13.6772 3.33105 13.3238V3.99707M1.99902 3.99707H13.9905M5.3291 3.9973V2.66491C5.3291 2.31154 5.46948 1.97264 5.71935 1.72277C5.96922 1.4729 6.30812 1.33252 6.66149 1.33252H9.32627C9.67964 1.33252 10.0185 1.4729 10.2684 1.72277C10.5183 1.97264 10.6587 2.31154 10.6587 2.66491V3.9973"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Hapus Customer
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
