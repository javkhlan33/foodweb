"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Category = {
  _id: string;
  categoryName: string;
};

type Food = {
  _id: string;
  foodName: string;
  price: number;
  ingredients: string;
  image: string;

  category?:
    | string
    | {
        _id?: string;
        id?: string;
        categoryId?: string;
        categoryName?: string;
      };

  categoryId?: string;
};

type Props = {
  open: boolean;
  food: Food | null;
  categories: Category[];
  onClose: () => void;
  onSuccess: () => void;
};

const CLOUD_NAME = "u73wwxfp";
const UPLOAD_PRESET = "foodweb";

export default function EditFoodModal({
  open,
  food,
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

  // =========================
  // FOOD DATA LOAD
  // =========================

  useEffect(() => {
    if (!food) return;

    setFoodName(food.foodName || "");
    setPrice(String(food.price ?? ""));
    setIngredients(food.ingredients || "");
    setImage(food.image || "");

    let categoryId = "";

    // categoryId шууд байвал
    if (food.categoryId) {
      categoryId = food.categoryId;
    }

    // category string байвал
    else if (typeof food.category === "string") {
      categoryId = food.category;
    }

    // category object байвал
    else if (food.category && typeof food.category === "object") {
      const categoryObj = food.category;

      categoryId =
        categoryObj._id || categoryObj.id || categoryObj.categoryId || "";

      // ID байхгүй бол categoryName-аар хайна
      if (!categoryId && categoryObj.categoryName) {
        const foundCategory = categories.find(
          (item) => item.categoryName === categoryObj.categoryName,
        );

        categoryId = foundCategory?._id || "";
      }
    }

    setCategory(categoryId);
  }, [food, categories]);

  // =========================
  // IMAGE UPLOAD
  // =========================

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
      console.error(error);
      alert("Зураг upload хийхэд алдаа гарлаа.");
    } finally {
      setUploading(false);
    }
  };

  // =========================
  // UPDATE FOOD
  // =========================

  const handleUpdateFood = async () => {
    if (!food) return;

    if (
      !foodName.trim() ||
      !price ||
      !ingredients.trim() ||
      !image ||
      !category
    ) {
      alert("Бүх талбарыг бөглөнө үү.");
      return;
    }

    try {
      setSaving(true);

      const response = await fetch("http://localhost:8000/food", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: food._id,
          foodName: foodName.trim(),
          price: Number(price),
          ingredients: ingredients.trim(),
          image,
          category,
        }),
      });

      if (!response.ok) {
        throw new Error("Food update failed");
      }

      onClose();
      onSuccess();
    } catch (error) {
      console.error("Update error:", error);
      alert("Food update хийхэд алдаа гарлаа.");
    } finally {
      setSaving(false);
    }
  };

  // =========================
  // MODAL CLOSE
  // =========================

  const handleClose = () => {
    if (saving || uploading) return;

    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="w-[480px] max-w-[calc(100%-32px)] rounded-2xl p-6">
        {/* HEADER */}
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-[#171717]">
            Edit food
          </DialogTitle>
        </DialogHeader>

        {/* FOOD NAME */}
        <input
          type="text"
          placeholder="Food name"
          value={foodName}
          onChange={(e) => setFoodName(e.target.value)}
          className="h-12 w-full rounded-xl border border-gray-200 px-4 outline-none focus:border-[#FD543F]"
        />

        {/* PRICE */}
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="h-12 w-full rounded-xl border border-gray-200 px-4 outline-none focus:border-[#FD543F]"
        />

        {/* IMAGE */}
        <label className="block cursor-pointer">
          <div className="flex min-h-[130px] flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 bg-gray-50">
            {uploading ? (
              <p className="text-sm text-gray-500">Uploading...</p>
            ) : image ? (
              <div className="text-center">
                <img
                  src={image}
                  alt="Food preview"
                  className="mx-auto h-20 w-28 rounded-lg object-cover"
                />

                <p className="mt-2 text-xs text-green-600">Image uploaded ✓</p>

                <p className="mt-1 text-xs text-gray-400">Click to change</p>
              </div>
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
          className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#FD543F]"
        />

        {/* CATEGORY */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="h-12 w-full rounded-xl border border-gray-200 bg-white px-4 outline-none focus:border-[#FD543F]"
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
            type="button"
            onClick={handleClose}
            disabled={saving || uploading}
            className="rounded-xl border border-gray-200 px-5 py-3 text-sm"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleUpdateFood}
            disabled={
              !foodName.trim() ||
              !price ||
              !ingredients.trim() ||
              !image ||
              !category ||
              saving ||
              uploading
            }
            className="rounded-xl bg-[#FD543F] px-5 py-3 text-sm text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            {saving ? "Saving..." : "Save changes"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
