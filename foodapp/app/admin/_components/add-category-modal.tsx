"use client";

import { useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

export default function AddCategoryModal({ open, onClose, onSuccess }: Props) {
  const [categoryName, setCategoryName] = useState("");
  const [saving, setSaving] = useState(false);

  if (!open) return null;

  const handleAddCategory = async () => {
    if (!categoryName.trim()) return;

    try {
      setSaving(true);

      const response = await fetch("http://localhost:8000/category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          categoryName: categoryName.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error("Category create failed");
      }

      setCategoryName("");

      onClose();
      onSuccess();
    } catch (error) {
      console.error("Category create error:", error);
      alert("Category нэмэхэд алдаа гарлаа.");
    } finally {
      setSaving(false);
    }
  };

  const closeModal = () => {
    if (saving) return;

    setCategoryName("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-[420px] rounded-2xl bg-white p-6 shadow-xl">
        {/* HEADER */}
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-[#171717]">
            Add new category
          </h2>

          <button
            onClick={closeModal}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500"
          >
            ×
          </button>
        </div>

        {/* INPUT */}
        <input
          type="text"
          placeholder="Category name"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAddCategory();
            }
          }}
          className="h-12 w-full rounded-xl border border-gray-200 px-4 outline-none focus:border-[#FD543F]"
        />

        {/* BUTTONS */}
        <div className="mt-5 flex justify-end gap-3">
          <button
            onClick={closeModal}
            disabled={saving}
            className="rounded-xl border border-gray-200 px-5 py-3 text-sm"
          >
            Cancel
          </button>

          <button
            onClick={handleAddCategory}
            disabled={!categoryName.trim() || saving}
            className="rounded-xl bg-[#FD543F] px-5 py-3 text-sm text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            {saving ? "Adding..." : "Add category"}
          </button>
        </div>
      </div>
    </div>
  );
}
