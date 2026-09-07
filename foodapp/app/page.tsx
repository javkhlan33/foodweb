"use client";

import { useEffect, useState } from "react";

import Footer from "./_components/footer";
import Header from "./_components/header";
import Hero from "./_components/hero";
import CartSheet from "./_components/cart-sheet";
import CartAlert from "./_components/cart-alert";
import FoodSection from "./_components/foodsection";
import FoodDetailDialog from "./_components/food-detail-dialog";

export type Food = {
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

export type CartItem = Food & {
  quantity: number;
};

type Category = {
  _id: string;
  categoryName: string;
};

export default function Home() {
  const [foods, setFoods] = useState<Food[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [sheetTab, setSheetTab] = useState<"cart" | "order">("cart");
  const [loading, setLoading] = useState(true);
  const [showCartAlert, setShowCartAlert] = useState(false);
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const [foodDialogOpen, setFoodDialogOpen] = useState(false);

  // =========================
  // GET DATA
  // =========================

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);

        const [foodResponse, categoryResponse] = await Promise.all([
          fetch("http://localhost:8000/food"),
          fetch("http://localhost:8000/category"),
        ]);

        if (!foodResponse.ok || !categoryResponse.ok) {
          throw new Error("Data авахад алдаа гарлаа");
        }

        const foodData = await foodResponse.json();
        const categoryData = await categoryResponse.json();

        const foodList = Array.isArray(foodData)
          ? foodData
          : (foodData.results ?? []);

        const categoryList = Array.isArray(categoryData)
          ? categoryData
          : (categoryData.categories ?? categoryData.results ?? []);

        setFoods(foodList);
        setCategories(categoryList);
      } catch (error) {
        console.error("Data авах алдаа:", error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  // =========================
  // GET FOOD CATEGORY NAME
  // =========================

  const getFoodCategoryName = (food: Food) => {
    // categoryName шууд байвал
    if (food.categoryName) {
      return food.categoryName;
    }

    // category string байвал
    if (typeof food.category === "string") {
      const category = categories.find((item) => item._id === food.category);

      return category?.categoryName || food.category;
    }

    // category object байвал
    if (food.category && typeof food.category === "object") {
      return food.category.categoryName || "";
    }

    return "";
  };
  const openFoodDetail = (food: Food) => {
    setSelectedFood(food);
    setFoodDialogOpen(true);
  };

  // =========================
  // CART
  // =========================

  const addToCart = (food: Food, quantity: number) => {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find((item) => item._id === food._id);

      if (existingItem) {
        return currentItems.map((item) =>
          item._id === food._id
            ? {
                ...item,
                quantity: item.quantity + quantity,
              }
            : item,
        );
      }

      return [
        ...currentItems,
        {
          ...food,
          quantity,
        },
      ];
    });

    // Alert харуулах
    setShowCartAlert(true);

    // 1.5 секундийн дараа алга болгох
    setTimeout(() => {
      setShowCartAlert(false);
    }, 1500);
  };

  const updateQuantity = (id: string, quantity: number) => {
    setCartItems((currentItems) => {
      if (quantity <= 0) {
        return currentItems.filter((item) => item._id !== id);
      }

      return currentItems.map((item) =>
        item._id === id
          ? {
              ...item,
              quantity,
            }
          : item,
      );
    });
  };

  return (
    <>
      <CartAlert open={showCartAlert} />

      <Header
        cartCount={cartItems.reduce((total, item) => total + item.quantity, 0)}
        onCartClick={() => {
          setSheetTab("cart");
          setCartOpen(true);
        }}
        onOrdersClick={() => {
          setSheetTab("order");
          setCartOpen(true);
        }}
      />

      <main className="mx-auto w-full max-w-[1440px]">
        <Hero />

        <section className="w-full bg-[#404040] px-20 py-16">
          {loading ? (
            <div className="py-20 text-center text-white">Loading...</div>
          ) : (
            categories.map((category) => {
              const categoryFoods = foods.filter((food) => {
                const categoryName = getFoodCategoryName(food);

                return categoryName === category.categoryName;
              });

              if (categoryFoods.length === 0) {
                return null;
              }

              return (
                <FoodSection
                  key={category._id}
                  title={category.categoryName}
                  foods={categoryFoods}
                  onAddToCart={addToCart}
                  isAdded={(food) =>
                    cartItems.some((item) => item._id === food._id)
                  }
                  onFoodClick={openFoodDetail}
                />
              );
            })
          )}
        </section>
      </main>

      <Footer />

      <CartSheet
        open={cartOpen}
        onOpenChange={setCartOpen}
        cartItems={cartItems}
        updateQuantity={updateQuantity}
        initialTab={sheetTab}
        onCheckoutComplete={() => setCartItems([])}
      />
      <FoodDetailDialog
        food={selectedFood}
        open={foodDialogOpen}
        onOpenChange={setFoodDialogOpen}
        onAddToCart={addToCart}
      />
    </>
  );
}
