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
    <section className="relative mb-16">
      <h2 className="mb-6 text-[24px] font-medium text-white">{title}</h2>

      <div className="grid grid-cols-3 gap-6">
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
