"use client";

import { useState } from "react";
import FoodCard from "@/app/_components/foodcard";

type Food = {
  image: string;
  title: string;
  description: string;
  price: number;
};

type Props = {
  title: string;
  foods: Food[];
};

export default function FoodSection({ title, foods }: Props) {
  const [showNotification, setShowNotification] = useState(false);

  const handleAddToCart = () => {
    setShowNotification(true);

    setTimeout(() => {
      setShowNotification(false);
    }, 2500);
  };

  return (
    <section className="relative">
      {/* Notification */}
      {showNotification && (
        <div
          className="
            fixed
            left-1/2
            top-6
            z-50
            flex
            h-12
            w-[357px]
            -translate-x-1/2
            items-center
            gap-3
            rounded-lg
            bg-[#171717]
            px-4
            text-white
            shadow-xl
          "
        >
          <span className="text-lg">✓</span>

          <span className="text-[14px]">Food is being added to the cart!</span>
        </div>
      )}

      {/* Section title */}
      <h2 className="mb-6 text-[24px] font-medium text-white">{title}</h2>

      {/* Food cards */}
      <div className="grid grid-cols-3 gap-6">
        {foods.map((food, index) => (
          <FoodCard key={index} {...food} onAddToCart={handleAddToCart} />
        ))}
      </div>
    </section>
  );
}
