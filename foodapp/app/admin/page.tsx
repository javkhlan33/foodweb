"use client";

import Sidebar from "./_components/sidebar";
import { useEffect, useState } from "react";
import CategoryTabs from "./_components/category-tabs";
import FoodSection from "./_components/food-section";
import AddFoodModal from "./_components/add-food-modal";
import AddCategoryModal from "./_components/add-category-modal";
import EditFoodModal from "./_components/edit-food-modal";
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

  category?:
    | string
    | {
        _id?: string;
        id?: string;
        categoryId?: string;
        categoryName?: string;
      };

  categoryId?: string;
  categoryName?: string;
};

export default function AdminPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [foods, setFoods] = useState<Food[]>([]);

  const [selectedCategory, setSelectedCategory] = useState("all");

  const [loading, setLoading] = useState(true);

  const [showFoodModal, setShowFoodModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [editFood, setEditFood] = useState<Food | null>(null);

  const handleDeleteFood = async (id: string) => {
    const confirmDelete = confirm("Энэ food-ийг устгах уу?");

    if (!confirmDelete) return;

    try {
      const response = await fetch("http://localhost:8000/food", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
        }),
      });

      if (!response.ok) {
        throw new Error("Delete failed");
      }

      await getData();
    } catch (error) {
      console.error(error);
      alert("Food устгахад алдаа гарлаа.");
    }
  };

  // =========================
  // GET DATA
  // =========================

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

      const categoryData = await categoryResponse.json();
      const foodData = await foodResponse.json();

      const categoryList = Array.isArray(categoryData)
        ? categoryData
        : (categoryData.categories ?? categoryData.results ?? []);

      const foodList = Array.isArray(foodData)
        ? foodData
        : (foodData.results ?? []);

      console.log("CATEGORIES:", categoryList);
      console.log("FOODS:", foodList);

      setCategories(categoryList);
      setFoods(foodList);
    } catch (error) {
      console.error("Data авах үед алдаа:", error);

      setCategories([]);
      setFoods([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // =========================
  // GET FOOD CATEGORY ID
  // =========================

  const getFoodCategoryId = (food: Food) => {
    // categoryId шууд string байвал
    if (typeof food.categoryId === "string") {
      return food.categoryId;
    }

    // category string байвал
    if (typeof food.category === "string") {
      return food.category;
    }

    // category object байвал
    if (food.category && typeof food.category === "object") {
      return (
        food.category._id || food.category.id || food.category.categoryId || ""
      );
    }

    return "";
  };

  // =========================
  // GET CATEGORY FOOD COUNT
  // =========================

  const getCategoryFoodCount = (categoryId: string) => {
    return foods.filter((food) => {
      const foodCategoryId = getFoodCategoryId(food);

      return foodCategoryId === categoryId;
    }).length;
  };

  // =========================
  // GET FOODS BY CATEGORY
  // =========================

  const getFoodsByCategory = (category: Category) => {
    return foods.filter((food) => {
      const foodCategoryId = getFoodCategoryId(food);

      // ID-аар шалгана
      if (foodCategoryId === category._id) {
        return true;
      }

      // categoryName-аар давхар шалгана
      if (food.categoryName === category.categoryName) {
        return true;
      }

      if (
        food.category &&
        typeof food.category === "object" &&
        food.category.categoryName === category.categoryName
      ) {
        return true;
      }

      return false;
    });
  };

  // =========================
  // SELECTED CATEGORY
  // =========================

  const selectedCategoryData =
    selectedCategory === "all"
      ? null
      : categories.find((category) => category._id === selectedCategory);

  // =========================
  // RENDER
  // =========================

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN */}
      <main className="ml-[245px] px-6 py-8">
        {/* =========================
            CATEGORY TABS
        ========================== */}

        <CategoryTabs
          categories={categories}
          foods={foods}
          selectedCategory={selectedCategory}
          onSelect={setSelectedCategory}
          onAddCategory={() => setShowCategoryModal(true)}
          getCategoryFoodCount={getCategoryFoodCount}
        />

        {/* =========================
            FOOD SECTIONS
        ========================== */}

        <div className="mt-5 space-y-5">
          {/* ALL DISHES */}

          {selectedCategory === "all" &&
            categories.map((category) => {
              const categoryFoods = getFoodsByCategory(category);

              return (
                <FoodSection
                  key={category._id}
                  title={category.categoryName}
                  foods={categoryFoods}
                  loading={loading}
                  onAddFood={() => setShowFoodModal(true)}
                  onEditFood={(food) => setEditFood(food)}
                  onDeleteFood={handleDeleteFood}
                />
              );
            })}

          {selectedCategory !== "all" && selectedCategoryData && (
            <FoodSection
              title={selectedCategoryData.categoryName}
              foods={getFoodsByCategory(selectedCategoryData)}
              loading={loading}
              onAddFood={() => setShowFoodModal(true)}
              onEditFood={(food) => setEditFood(food)}
              onDeleteFood={handleDeleteFood}
            />
          )}
        </div>
      </main>

      {/* =========================
          ADD FOOD MODAL
      ========================== */}

      {/* ADD FOOD MODAL */}
      <AddFoodModal
        open={showFoodModal}
        categories={categories}
        onClose={() => setShowFoodModal(false)}
        onSuccess={getData}
      />

      {/* EDIT FOOD MODAL */}
      <EditFoodModal
        open={!!editFood}
        food={editFood}
        categories={categories}
        onClose={() => setEditFood(null)}
        onSuccess={getData}
      />

      {/* ADD CATEGORY MODAL */}
      <AddCategoryModal
        open={showCategoryModal}
        onClose={() => setShowCategoryModal(false)}
        onSuccess={getData}
      />
    </div>
  );
}
