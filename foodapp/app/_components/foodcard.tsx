"use client";

import Image from "next/image";
import { Check, Plus } from "lucide-react";
import type { Food } from "../page";

type Props = {
  food: Food;
  onAddToCart: (food: Food, quantity: number) => void;
  isAdded: boolean;
  onFoodClick: (food: Food) => void;
};

export default function FoodCard({
  food,
  onAddToCart,
  isAdded,
  onFoodClick,
}: Props) {
  const handleAdd = (e: React.MouseEvent) => {
    // Card-ийн click event рүү дамжуулахгүй
    e.stopPropagation();

    // + дарахад шууд cart-д нэмэхгүй
    // Эхлээд Food Detail Dialog нээнэ
    onFoodClick(food);
  };

  return (
    <div
      onClick={() => onFoodClick(food)}
      className="
        cursor-pointer
        overflow-hidden
        rounded-[16px]
        bg-white
        p-4
        transition
        hover:shadow-lg
      "
    >
      {/* IMAGE */}
      <div className="relative h-[220px] overflow-hidden rounded-[12px]">
        <Image
          src={food.image}
          alt={food.foodName}
          fill
          className="object-cover"
        />

        {/* PLUS / CHECK */}
        <button
          type="button"
          onClick={handleAdd}
          className="
            absolute
            bottom-3
            right-3
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            bg-white
            shadow-md
            transition
            hover:scale-105
          "
        >
          {isAdded ? (
            <Check size={20} strokeWidth={3} className="text-green-500" />
          ) : (
            <Plus size={21} className="text-[#FD543F]" />
          )}
        </button>
      </div>

      {/* INFO */}
      <div className="mt-3">
        <div className="flex items-center justify-between gap-3">
          <h3 className="truncate text-[18px] text-[#FD543F]">
            {food.foodName}
          </h3>

          <span className="shrink-0 text-[14px] font-semibold text-[#171717]">
            ${Number(food.price).toFixed(2)}
          </span>
        </div>

        <p className="mt-2 line-clamp-2 text-[12px] leading-5 text-[#52525B]">
          {food.ingredients}
        </p>
      </div>
    </div>
  );
}
