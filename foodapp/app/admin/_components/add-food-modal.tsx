"use client";

import { useState } from "react";
import { API_URL } from "@/lib/auth";

type Category = {
  _id: string;
  categoryName: string;
};

type Props = {
  open: boolean;
  categories: Category[];
  onClose: () => void;
  onSuccess: () => void;
};

const CLOUD_NAME = "u73wwxfp";
const UPLOAD_PRESET = "foodweb";

export default function AddFoodModal({
  open,
  categories,
  onClose,
  onSuccess,
}: Props) {
  const [foodName, setFoodName] = useState("");
  const [price, setPrice] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");

  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  if (!open) return null;

  // -------------------------
  // IMAGE UPLOAD
  // -------------------------

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    try {
      setUploading(true);

      const formData = new FormData();

      formData.append("file", file);
      formData.append("upload_preset", UPLOAD_PRESET);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        },
      );

      if (!response.ok) {
        throw new Error("Image upload failed");
      }

      const data = await response.json();

      setImage(data.secure_url);
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      alert("Зураг upload хийхэд алдаа гарлаа.");
    } finally {
      setUploading(false);
    }
  };

  // -------------------------
  // CREATE FOOD
  // -------------------------

  const handleAddFood = async () => {
    if (
      !foodName.trim() ||
      !price ||
      !image ||
      !ingredients.trim() ||
      !category
    ) {
      return;
    }

    try {
      setSaving(true);

      const response = await fetch(`${API_URL}/food`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          foodName: foodName.trim(),
          price: Number(price),
          image,
          ingredients: ingredients.trim(),
          category,
        }),
      });

      if (!response.ok) {
        throw new Error("Food create failed");
      }

      // RESET
      setFoodName("");
      setPrice("");
      setIngredients("");
      setCategory("");
      setImage("");

      onClose();
      onSuccess();
    } catch (error) {
      console.error("Food create error:", error);
      alert("Food нэмэхэд алдаа гарлаа.");
    } finally {
      setSaving(false);
    }
  };

  const closeModal = () => {
    if (saving || uploading) return;

    setFoodName("");
    setPrice("");
    setIngredients("");
    setCategory("");
    setImage("");

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-[480px] rounded-2xl bg-white p-6 shadow-xl">
        {/* HEADER */}
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-[#171717]">Add new food</h2>

          <button
            onClick={closeModal}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500"
          >
            ×
          </button>
        </div>

        {/* FOOD NAME */}
        <input
          type="text"
          placeholder="Food name"
          value={foodName}
          onChange={(e) => setFoodName(e.target.value)}
          className="mb-3 h-12 w-full rounded-xl border border-gray-200 px-4 outline-none focus:border-[#FD543F]"
        />

        {/* PRICE */}
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="mb-3 h-12 w-full rounded-xl border border-gray-200 px-4 outline-none focus:border-[#FD543F]"
        />

        {/* IMAGE */}
        <label className="mb-3 block">
          <div className="flex min-h-[130px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 bg-gray-50">
            {image ? (
              <div className="text-center">
                <img
                  src={image}
                  alt="Food preview"
                  className="mx-auto h-20 w-28 rounded-lg object-cover"
                />

                <p className="mt-2 text-xs text-green-600">Image uploaded ✓</p>
              </div>
            ) : uploading ? (
              <p className="text-sm text-gray-500">Uploading...</p>
            ) : (
              <>
                <div className="mb-2 text-2xl text-gray-400">↑</div>

                <p className="text-sm text-gray-500">
                  Choose a file or drag & drop it here
                </p>
              </>
            )}
          </div>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </label>

        {/* INGREDIENTS */}
        <textarea
          placeholder="Ingredients"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          rows={4}
          className="mb-3 w-full resize-none rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#FD543F]"
        />

        {/* CATEGORY */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="mb-5 h-12 w-full rounded-xl border border-gray-200 bg-white px-4 outline-none focus:border-[#FD543F]"
        >
          <option value="">Select category</option>

          {categories.map((item) => (
            <option key={item._id} value={item._id}>
              {item.categoryName}
            </option>
          ))}
        </select>

        {/* BUTTONS */}
        <div className="flex justify-end gap-3">
          <button
            onClick={closeModal}
            disabled={saving || uploading}
            className="rounded-xl border border-gray-200 px-5 py-3 text-sm"
          >
            Cancel
          </button>

          <button
            onClick={handleAddFood}
            disabled={
              !foodName.trim() ||
              !price ||
              !image ||
              !ingredients.trim() ||
              !category ||
              uploading ||
              saving
            }
            className="rounded-xl bg-[#FD543F] px-5 py-3 text-sm text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            {saving ? "Adding..." : "Add food"}
          </button>
        </div>
      </div>
    </div>
  );
}
