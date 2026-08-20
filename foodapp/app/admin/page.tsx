"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import AdminFoodCard from "./adminfoodcard";

type Category = {
  _id: string;
  categoryName: string;
  foodCount?: number;
};

type Food = {
  _id: string;
  foodName: string;
  price: number;
  ingredients: string;
  image: string;
  category?: string;
  categoryId?: string;
  categoryName?: string;
};

type CategoryResponse = {
  categories?: Category[];
  results?: Category[];
};

type FoodResponse = {
  results?: Food[];
};

const CLOUD_NAME = "u73wwxfp";
const UPLOAD_PRESET = "foodweb";

export default function AdminPage() {
  const [imgUrl, setImgUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [activeButton, setActiveButton] = useState("food");

  const [categories, setCategories] = useState<Category[]>([]);
  const [foods, setFoods] = useState<Food[]>([]);

  const [selectedCategory, setSelectedCategory] = useState("all");

  const [loading, setLoading] = useState(true);

  // CATEGORY MODAL
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  // FOOD MODAL
  const [showFoodModal, setShowFoodModal] = useState(false);

  // CATEGORY FORM
  const [categoryName, setCategoryName] = useState("");

  // FOOD FORM
  const [foodForm, setFoodForm] = useState({
    foodName: "",
    price: "",
    image: "",
    ingredients: "",
    category: "",
  });

  useEffect(() => {
    getData();
  }, []);
  const createCategory = async () => {
    if (!categoryName.trim()) return;

    try {
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
        throw new Error("Category үүсгэхэд алдаа гарлаа");
      }

      setCategoryName("");
      setShowCategoryModal(false);

      await getData();
    } catch (error) {
      console.error("Category үүсгэх үед алдаа:", error);
    }
  };
  const createFood = async () => {
    if (!foodForm.foodName.trim()) return;

    try {
      const response = await fetch("http://localhost:8000/food", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          foodName: foodForm.foodName.trim(),
          price: Number(foodForm.price),
          image: foodForm.image,
          ingredients: foodForm.ingredients,
          category: foodForm.category,
        }),
      });

      if (!response.ok) {
        throw new Error("Food үүсгэхэд алдаа гарлаа");
      }

      setFoodForm({
        foodName: "",
        price: "",
        image: "",
        ingredients: "",
        category: "",
      });

      setShowFoodModal(false);

      await getData();
    } catch (error) {
      console.error("Food үүсгэх үед алдаа:", error);
    }
  };
  const uploadToCloudinary = async (file: File) => {
    const formData = new FormData();

    formData.append("file", file);

    formData.append("upload_preset", UPLOAD_PRESET);
    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,

        {
          method: "POST",

          body: formData,
        },
      );
      const data = await response.json();
      console.log(data);
      return data.secure_url;
    } catch (error) {
      console.error("Cloudinary upload failed:", error);
    }
  };

  const handleImgUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadToCloudinary(file);
      setImgUrl(url);
    } catch (err) {
      console.log("Failed to upload logo: " + err);
    } finally {
      setUploading(false);
    }
  };

  const getData = async () => {
    try {
      setLoading(true);

      const [categoryResponse, foodResponse] = await Promise.all([
        fetch("http://localhost:8000/category"),
        fetch("http://localhost:8000/food"),
      ]);

      if (!categoryResponse.ok || !foodResponse.ok) {
        throw new Error("Data авахад алдаа гарлаа");
      }

      const categoryData: CategoryResponse = await categoryResponse.json();

      const foodData: FoodResponse | Food[] = await foodResponse.json();

      console.log("CATEGORY DATA:", categoryData);
      console.log("FOOD DATA:", foodData);

      // CATEGORY
      const categoryList = Array.isArray(categoryData)
        ? categoryData
        : (categoryData.categories ?? categoryData.results ?? []);

      setCategories(categoryList);

      // FOOD
      const foodList = Array.isArray(foodData)
        ? foodData
        : (foodData.results ?? []);

      setFoods(foodList);
    } catch (error) {
      console.error("Data авах үед алдаа гарлаа:", error);

      setCategories([]);
      setFoods([]);
    } finally {
      setLoading(false);
    }
  };

  // CATEGORY-оор FOOD шүүх
  const filteredFoods =
    selectedCategory === "all"
      ? foods
      : foods.filter((food) => {
          return (
            food.category === selectedCategory ||
            food.categoryId === selectedCategory ||
            food.categoryName ===
              categories.find((category) => category._id === selectedCategory)
                ?.categoryName
          );
        });

  // Сонгогдсон category-ийн нэр
  const selectedCategoryName =
    selectedCategory === "all"
      ? "All Dishes"
      : (categories.find((category) => category._id === selectedCategory)
          ?.categoryName ?? "All Dishes");

  // Category бүрийн food count
  const getCategoryFoodCount = (categoryId: string) => {
    return foods.filter((food) => {
      return food.category === categoryId || food.categoryId === categoryId;
    }).length;
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] p-6">
      <div className="mx-auto flex max-w-[1440px] gap-6">
        {/* SIDEBAR */}
        <aside className="flex min-h-[calc(100vh-48px)] w-[205px] shrink-0 flex-col rounded-[20px] bg-white p-5">
          {/* LOGO */}
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="NomNom" width={32} height={32} />

            <div>
              <p className="text-[16px] font-bold leading-4">NomNom</p>

              <p className="text-[10px] text-gray-400">Swift delivery</p>
            </div>
          </div>

          {/* MENU */}
          <div className="mt-8 flex flex-col gap-2">
            <button
              onClick={() => setActiveButton("food")}
              className={`flex h-10 items-center gap-3 rounded-full px-4 text-sm ${
                activeButton === "food"
                  ? "bg-[#171717] text-white"
                  : "text-[#111827]"
              }`}
            >
              <Image src="/4-4.png" alt="" width={18} height={18} />
              Food menu
            </button>

            <button
              onClick={() => setActiveButton("orders")}
              className={`flex h-10 items-center gap-3 rounded-full px-4 text-sm ${
                activeButton === "orders"
                  ? "bg-[#171717] text-white"
                  : "text-[#111827]"
              }`}
            >
              <Image src="/Truck.png" alt="" width={18} height={18} />
              Orders
            </button>
          </div>
        </aside>

        {/* MAIN */}
        <main className="min-w-0 flex-1">
          {/* PROFILE */}
          <div className="mb-5 flex justify-end">
            <Image src="/Avatar.png" alt="profile" width={38} height={38} />
          </div>

          {/* FOOD MENU */}
          {activeButton === "food" && (
            <section>
              {/* CATEGORY */}
              <div className="rounded-[18px] bg-white p-5">
                <div className="mb-4 flex items-center justify-between">
                  <h1 className="text-lg font-bold">Dishes category</h1>

                  {/* ADD CATEGORY */}
                  <button
                    type="button"
                    onClick={() => setShowCategoryModal(true)}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FD543F] text-white"
                  >
                    +
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {/* ALL */}
                  <button
                    onClick={() => setSelectedCategory("all")}
                    className={`rounded-full border px-3 py-1.5 text-xs ${
                      selectedCategory === "all"
                        ? "border-[#FD543F] text-[#FD543F]"
                        : "border-gray-200 text-[#171717]"
                    }`}
                  >
                    All Dishes
                    <span className="ml-2 rounded-full bg-black px-1.5 text-[10px] text-white">
                      {foods.length}
                    </span>
                  </button>

                  {/* CATEGORIES */}
                  {categories.map((category) => {
                    const count = getCategoryFoodCount(category._id);

                    return (
                      <button
                        key={category._id}
                        onClick={() => setSelectedCategory(category._id)}
                        className={`rounded-full border px-3 py-1.5 text-xs ${
                          selectedCategory === category._id
                            ? "border-[#FD543F] text-[#FD543F]"
                            : "border-gray-200 text-[#171717]"
                        }`}
                      >
                        {category.categoryName}

                        <span className="ml-2 rounded-full bg-black px-1.5 text-[10px] text-white">
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* FOOD */}
              <div className="mt-5 rounded-[18px] bg-white p-5">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-base font-bold">
                    {selectedCategoryName} ({filteredFoods.length})
                  </h2>

                  {/* ADD FOOD */}
                  <button
                    onClick={() => {
                      setFoodForm({
                        ...foodForm,
                        category:
                          selectedCategory === "all" ? "" : selectedCategory,
                      });
                      setShowFoodModal(true);
                    }}
                    className="rounded-full bg-[#FD543F] px-4 py-2 text-sm font-medium text-white"
                  >
                    + Add food
                  </button>
                </div>

                {loading ? (
                  <div className="py-20 text-center text-gray-400">
                    Loading foods...
                  </div>
                ) : filteredFoods.length === 0 ? (
                  <div className="py-20 text-center text-gray-400">
                    No foods found
                  </div>
                ) : (
                  <div className="grid grid-cols-4 gap-4">
                    {filteredFoods.map((food) => (
                      <AdminFoodCard key={food._id} food={food} />
                    ))}
                  </div>
                )}
              </div>
            </section>
          )}

          {/* ORDERS */}
          {activeButton === "orders" && (
            <section className="rounded-[18px] bg-white p-10">
              <h1 className="text-lg font-bold">Orders</h1>

              <p className="mt-2 text-sm text-gray-400">Orders page</p>
            </section>
          )}
        </main>
      </div>

      {/* CATEGORY MODAL */}
      {showCategoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-[400px] rounded-2xl bg-white p-6">
            <h2 className="text-lg font-bold">Add new category</h2>

            <input
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Category name"
              className="mt-4 w-full rounded-lg border px-4 py-3 outline-none"
            />

            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={() => {
                  setShowCategoryModal(false);
                  setCategoryName("");
                }}
                className="rounded-lg border px-4 py-2"
              >
                Cancel
              </button>

              <button
                onClick={createCategory}
                disabled={!categoryName.trim()}
                className="rounded-lg bg-[#FD543F] px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FOOD MODAL */}
      {showFoodModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-[450px] rounded-2xl bg-white p-6">
            <h2 className="text-lg font-bold">Add new food</h2>

            <div className="mt-4 space-y-3">
              <input
                value={foodForm.foodName}
                onChange={(e) =>
                  setFoodForm({
                    ...foodForm,
                    foodName: e.target.value,
                  })
                }
                placeholder="Food name"
                className="w-full rounded-lg border px-4 py-3"
              />

              <input
                type="number"
                value={foodForm.price}
                onChange={(e) =>
                  setFoodForm({
                    ...foodForm,
                    price: e.target.value,
                  })
                }
                placeholder="Price"
                className="w-full rounded-lg border px-4 py-3"
              />

              <input
                value={foodForm.image}
                onChange={(e) =>
                  setFoodForm({
                    ...foodForm,
                    image: e.target.value,
                  })
                }
                placeholder="Image URL"
                className="w-full rounded-lg border px-4 py-3"
              />

              <textarea
                value={foodForm.ingredients}
                onChange={(e) =>
                  setFoodForm({
                    ...foodForm,
                    ingredients: e.target.value,
                  })
                }
                placeholder="Ingredients"
                className="w-full rounded-lg border px-4 py-3"
              />

              <select
                value={foodForm.category}
                onChange={(e) =>
                  setFoodForm({
                    ...foodForm,
                    category: e.target.value,
                  })
                }
                className="w-full rounded-lg border px-4 py-3"
              >
                <option value="">Select category</option>

                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.categoryName}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={() => setShowFoodModal(false)}
                className="rounded-lg border px-4 py-2"
              >
                Cancel
              </button>

              <button
                onClick={createFood}
                disabled={
                  !foodForm.foodName.trim() ||
                  !foodForm.price ||
                  !foodForm.category
                }
                className="rounded-lg bg-[#FD543F] px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                Add food
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
