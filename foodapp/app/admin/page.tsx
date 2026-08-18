"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import AdminFoodCard from "./adminfoodcard";

type Category = {
  _id: string;
  categoryName: string;
  foodCount: number;
};

type Food = {
  _id: string;
  foodName: string;
  foodPrice: number;
  ingredients: string;
  foodImage: string;
  category?: string;
  categoryId?: string;
  categoryName?: string;
};

type CategoryResponse = {
  categories: Category[];
  allFoodCount: number;
};

type FoodResponse = {
  results?: Food[];
};

export default function AdminPage() {
  const [activeButton, setActiveButton] = useState("food");

  const [categories, setCategories] = useState<Category[]>([]);
  const [foods, setFoods] = useState<Food[]>([]);

  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const [loading, setLoading] = useState(true);

  // CATEGORY MODAL
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  // FOOD MODAL
  const [showFoodModal, setShowFoodModal] = useState(false);

  // CATEGORY NAME
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

  // Category болон Food мэдээллийг backend-ээс авах
  const getData = async () => {
    try {
      setLoading(true);
      setError("");

      const [categoryResponse, foodResponse] = await Promise.all([
        fetch("http://localhost:8000/category"),
        fetch("http://localhost:8000/food"),
      ]);

      if (!categoryResponse.ok) {
        throw new Error("Category data авахад алдаа гарлаа");
      }

      if (!foodResponse.ok) {
        throw new Error("Food data авахад алдаа гарлаа");
      }

      const categoryData: CategoryResponse = await categoryResponse.json();

      const foodData: FoodResponse | Food[] = await foodResponse.json();

      console.log("CATEGORY DATA:", categoryData);
      console.log("FOOD DATA:", foodData);

      // Category мэдээллийг state-д хадгалах
      setCategories(
        Array.isArray(categoryData.categories) ? categoryData.categories : [],
      );

      // Food мэдээллийг state-д хадгалах
      const foodList = Array.isArray(foodData)
        ? foodData
        : (foodData.results ?? []);

      setFoods(foodList);
    } catch (error) {
      console.error("Data авах үед алдаа гарлаа:", error);

      setError(
        error instanceof Error ? error.message : "Data авах үед алдаа гарлаа",
      );

      setCategories([]);
      setFoods([]);
    } finally {
      setLoading(false);
    }
  };

  // Сонгосон category-аар food-уудыг шүүх
  const filteredFoods =
    selectedCategory === "all"
      ? foods
      : foods.filter((food) => {
          // Food-ийн category нь сонгосон category ID-тэй таарч байгаа эсэх
          if (food.category === selectedCategory) {
            return true;
          }

          // categoryId ашиглаж байгаа тохиолдол
          if (food.categoryId === selectedCategory) {
            return true;
          }

          // Backend categoryName буцааж байгаа тохиолдол
          const selectedCategoryData = categories.find(
            (category) => category._id === selectedCategory,
          );

          if (
            selectedCategoryData &&
            food.categoryName === selectedCategoryData.categoryName
          ) {
            return true;
          }

          return false;
        });

  // Одоогоор сонгогдсон category-ийн нэр
  const selectedCategoryName =
    selectedCategory === "all"
      ? "All Dishes"
      : (categories.find((category) => category._id === selectedCategory)
          ?.categoryName ?? "All Dishes");

  return (
    <div className="min-h-screen bg-[#f5f5f5] p-6">
      <div className="mx-auto flex max-w-[1440px] gap-6">
        {/* Зүүн талын цэс */}
        <aside className="flex min-h-[calc(100vh-48px)] w-[205px] shrink-0 flex-col rounded-[20px] bg-white p-5">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="NomNom" width={32} height={32} />

            <div>
              <p className="text-[16px] font-bold leading-4">NomNom</p>

              <p className="text-[10px] text-gray-400">Swift delivery</p>
            </div>
          </div>

          {/* Цэс */}
          <div className="mt-8 flex flex-col gap-2">
            {/* Food menu */}
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

            {/* Orders */}
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

        {/* Үндсэн хэсэг */}
        <main className="min-w-0 flex-1">
          {/* Profile зураг */}
          <div className="mb-5 flex justify-end">
            <Image src="/Avatar.png" alt="profile" width={38} height={38} />
          </div>

          {/* Food menu */}
          {activeButton === "food" && (
            <section>
              {/* Category хэсэг */}
              <div className="rounded-[18px] bg-white p-5">
                <h1 className="mb-4 text-lg font-bold">Dishes category</h1>

                <div className="flex flex-wrap gap-2">
                  {/* Бүх food */}
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

                  {/* MongoDB-ээс ирсэн category-ууд */}
                  {categories.map((category) => (
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
                        {category.foodCount}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Алдааны мэдээлэл */}
              {error && (
                <div className="mt-5 rounded-[18px] bg-red-50 p-5 text-center text-sm text-red-500">
                  {error}
                </div>
              )}

              {/* Food хэсэг */}
              <div className="mt-5 rounded-[18px] bg-white p-5">
                {/* Гарчиг */}
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-base font-bold">
                    {selectedCategoryName} ({filteredFoods.length})
                  </h2>
                </div>

                {/* Ачааллаж байгаа үед */}
                {loading ? (
                  <div className="py-20 text-center text-gray-400">
                    Loading foods...
                  </div>
                ) : filteredFoods.length === 0 ? (
                  /* Food байхгүй үед */
                  <div className="py-20 text-center text-gray-400">
                    No foods found
                  </div>
                ) : (
                  /* Food card-ууд */
                  <div className="grid grid-cols-4 gap-4">
                    {filteredFoods.map((food) => (
                      <AdminFoodCard key={food._id} food={food} />
                    ))}
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Orders */}
          {activeButton === "orders" && (
            <section className="rounded-[18px] bg-white p-10">
              <h1 className="text-lg font-bold">Orders</h1>

              <p className="mt-2 text-sm text-gray-400">Orders page</p>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}
