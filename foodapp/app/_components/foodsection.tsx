"use client";

import FoodCard from "@/app/_components/foodcard";
import { Food } from "../page";

type Props = {
  title: string;
  foods: Food[];
  onAddToCart: (food: Food, quantity: number) => void;
  isAdded: (food: Food) => boolean;
  onFoodClick: (food: Food) => void;
};

export default function FoodSection({
  title,
  foods,
  onAddToCart,
  isAdded,
  onFoodClick,
}: Props) {
  return (
    <section className="relative mb-10 sm:mb-14 lg:mb-16">
      <h2 className="mb-4 text-[20px] font-medium text-white sm:mb-6 sm:text-[24px]">
        {title}
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
        {foods.map((food) => (
          <FoodCard
            key={food._id}
            food={food}
            onAddToCart={onAddToCart}
            isAdded={isAdded(food)}
            onFoodClick={onFoodClick}
          />
        ))}
      </div>
    </section>
  );
}
