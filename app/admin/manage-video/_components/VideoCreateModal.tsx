"use client";

import { useState, useRef } from "react";

interface VideoCreateModalProps {
  onClose: () => void;
}

export default function VideoCreateModal({ onClose }: VideoCreateModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    thumbnail: "",
    sourceVideo: "",
  });
  const editorRef = useRef<HTMLDivElement>(null);

  const execCommand = (command: string, value: string | undefined = undefined) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Create video:", {
      ...formData,
      description: editorRef.current?.innerHTML || "",
    });
    setIsSubmitting(false);
    onClose();
  };

  const ToolbarButton = ({
    icon,
    command,
    title,
    active = false,
  }: {
    icon: React.ReactNode;
    command: string;
    title: string;
    active?: boolean;
  }) => (
    <button
      type="button"
      onClick={() => execCommand(command)}
      title={title}
      className={`flex h-8 w-8 items-center justify-center rounded transition-colors ${
        active
          ? "bg-brand-red text-white"
          : "text-zinc-600 hover:bg-zinc-100"
      }`}
    >
      {icon}
    </button>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />

      <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-xl scrollbar-hide">
        <style jsx>{`
          .scrollbar-hide::-webkit-scrollbar {
            width: 6px;
          }
          .scrollbar-hide::-webkit-scrollbar-track {
            background: transparent;
          }
          .scrollbar-hide::-webkit-scrollbar-thumb {
            background: transparent;
          }
          .scrollbar-hide:hover::-webkit-scrollbar-thumb {
            background: rgba(0, 0, 0, 0.1);
          }
          .editor-content {
            min-height: 150px;
            outline: none;
          }
          .editor-content:focus {
            outline: none;
          }
          .editor-content ul {
            list-style-type: disc;
            padding-left: 1.5rem;
          }
          .editor-content ol {
            list-style-type: decimal;
            padding-left: 1.5rem;
          }
        `}</style>

        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-brand-red">Tambah Video Baru</h2>
            <p className="mt-1 text-sm text-zinc-500">
              Isi form di bawah untuk menambahkan video tutorial
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-600"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Title */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-zinc-700">
              Judul Video <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Cosplay Columbina Hyposelena (Genshin Impact) Tutorial"
              className="h-12 rounded-xl border-2 border-zinc-200 bg-zinc-50 px-4 text-sm text-zinc-800 placeholder:text-zinc-400 focus:border-brand-red focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-red/20"
            />
          </div>

          {/* Thumbnail URL */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-zinc-700">URL Thumbnail</label>
            <input
              type="url"
              value={formData.thumbnail}
              onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
              placeholder="https://.../columbina.png"
              className="h-12 rounded-xl border-2 border-zinc-200 bg-zinc-50 px-4 text-sm text-zinc-800 placeholder:text-zinc-400 focus:border-brand-red focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-red/20"
            />
          </div>

          {/* Source Video URL */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-zinc-700">URL Source Video</label>
            <input
              type="url"
              value={formData.sourceVideo}
              onChange={(e) => setFormData({ ...formData, sourceVideo: e.target.value })}
              placeholder="https://youtube.com/watch?v=..."
              className="h-12 rounded-xl border-2 border-zinc-200 bg-zinc-50 px-4 text-sm text-zinc-800 placeholder:text-zinc-400 focus:border-brand-red focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-red/20"
            />
          </div>

          {/* Description with Rich Text Editor */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-zinc-700">Deskripsi</label>
            <div className="flex flex-col rounded-xl border-2 border-zinc-200 overflow-hidden focus-within:border-brand-red focus-within:ring-2 focus-within:ring-brand-red/20">
              {/* Toolbar */}
              <div className="flex items-center gap-1 border-b border-zinc-200 bg-zinc-50 px-2 py-1">
                <ToolbarButton
                  command="bold"
                  title="Bold (Ctrl+B)"
                  icon={
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M6 4h8a4 4 0 014 4 4 4 0 01-4 4H6z" />
                      <path d="M6 12h9a4 4 0 014 4 4 4 0 01-4 4H6z" />
                    </svg>
                  }
                />
                <ToolbarButton
                  command="italic"
                  title="Italic (Ctrl+I)"
                  icon={
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="19" y1="4" x2="10" y2="4" />
                      <line x1="14" y1="20" x2="5" y2="20" />
                      <line x1="15" y1="4" x2="9" y2="20" />
                    </svg>
                  }
                />
                <ToolbarButton
                  command="underline"
                  title="Underline (Ctrl+U)"
                  icon={
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M6 3v7a6 6 0 006 6 6 6 0 006-6V3" />
                      <line x1="4" y1="21" x2="20" y2="21" />
                    </svg>
                  }
                />
                <div className="mx-1 h-5 w-px bg-zinc-300" />
                <ToolbarButton
                  command="insertUnorderedList"
                  title="Bullet List"
                  icon={
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="9" y1="6" x2="20" y2="6" />
                      <line x1="9" y1="12" x2="20" y2="12" />
                      <line x1="9" y1="18" x2="20" y2="18" />
                      <circle cx="4" cy="6" r="1.5" fill="currentColor" stroke="none" />
                      <circle cx="4" cy="12" r="1.5" fill="currentColor" stroke="none" />
                      <circle cx="4" cy="18" r="1.5" fill="currentColor" stroke="none" />
                    </svg>
                  }
                />
                <ToolbarButton
                  command="insertOrderedList"
                  title="Numbered List"
                  icon={
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="10" y1="6" x2="21" y2="6" />
                      <line x1="10" y1="12" x2="21" y2="12" />
                      <line x1="10" y1="18" x2="21" y2="18" />
                      <path d="M4 6h1v4" />
                      <path d="M4 10H6" />
                      <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />
                    </svg>
                  }
                />
                <div className="mx-1 h-5 w-px bg-zinc-300" />
                <button
                  type="button"
                  onClick={() => {
                    const url = prompt("Enter image URL:");
                    if (url) execCommand("insertImage", url);
                  }}
                  title="Insert Image"
                  className="flex h-8 w-8 items-center justify-center rounded text-zinc-600 transition-colors hover:bg-zinc-100"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <path d="M21 15l-5-5L5 21" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const url = prompt("Enter link URL:");
                    if (url) execCommand("createLink", url);
                  }}
                  title="Insert Link"
                  className="flex h-8 w-8 items-center justify-center rounded text-zinc-600 transition-colors hover:bg-zinc-100"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
                    <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
                  </svg>
                </button>
              </div>
              {/* Editor */}
              <div
                ref={editorRef}
                contentEditable
                className="editor-content w-full resize-none bg-white p-4 text-sm text-zinc-800 placeholder:text-zinc-400"
                style={{ minHeight: "150px" }}
                data-placeholder="Tuliskan deskripsi video di sini..."
              />
            </div>
          </div>

          {/* Actions */}
          <div className="mt-2 flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-end sm:gap-3">
            <button
              type="button"
              onClick={onClose}
              className="h-11 rounded-xl border-2 border-zinc-200 px-6 text-sm font-semibold text-zinc-600 transition hover:bg-zinc-50 sm:h-12"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex h-11 items-center justify-center gap-2 rounded-xl bg-brand-red px-6 text-sm font-bold text-white shadow-[3px_3px_0_0_rgba(0,0,0,0.15)] transition hover:bg-brand-red-soft disabled:cursor-not-allowed disabled:opacity-70 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none sm:h-12"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin" width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Menyimpan...
                </>
              ) : (
                <>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                  Simpan Video
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
