"use client";

import Image from "next/image";
import { Minus, Plus, X } from "lucide-react";
import { useEffect, useState } from "react";
import type { Food } from "../page";

type Props = {
  food: Food | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddToCart: (food: Food, quantity: number) => void;
};

export default function FoodDetailDialog({
  food,
  open,
  onOpenChange,
  onAddToCart,
}: Props) {
  const [quantity, setQuantity] = useState(1);

  // Dialog шинээр нээгдэх болгонд quantity 1 болгоно
  useEffect(() => {
    if (open) {
      setQuantity(1);
    }
  }, [open]);

  if (!food) return null;

  const total = Number(food.price) * quantity;

  const handleAdd = () => {
    onAddToCart(food, quantity);
    setQuantity(1);
    onOpenChange(false);
  };

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4 ${
        open ? "flex" : "hidden"
      }`}
      onClick={() => onOpenChange(false)}
    >
      <div
        className="relative w-full max-w-[826px] overflow-hidden rounded-[20px] bg-white p-4 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* CLOSE */}
        <button
          type="button"
          onClick={() => onOpenChange(false)}
          className="absolute right-5 top-5 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#71717A] shadow-sm hover:bg-[#F4F4F5]"
        >
          <X size={16} />
        </button>

        {/* CONTENT */}
        <div className="grid grid-cols-[1fr_1fr] gap-5">
          {/* IMAGE */}
          <div className="relative h-[380px] overflow-hidden rounded-[14px]">
            <Image
              src={food.image}
              alt={food.foodName}
              fill
              className="object-cover"
            />
          </div>

          {/* INFO */}
          <div className="flex flex-col justify-between py-4">
            <div>
              {/* TITLE */}
              <h2 className="text-[24px] font-medium text-[#FD543F]">
                {food.foodName}
              </h2>

              {/* INGREDIENTS */}
              <p className="mt-3 text-[14px] leading-5 text-[#171717]">
                {food.ingredients}
              </p>
            </div>

            <div>
              {/* LINE */}
              <div className="my-6 border-t border-[#E4E4E7]" />

              {/* PRICE + QUANTITY */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[12px] text-[#71717A]">Total price</p>

                  <p className="mt-1 text-[18px] font-semibold text-[#171717]">
                    ${total.toFixed(2)}
                  </p>
                </div>

                {/* QUANTITY */}
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E4E4E7] hover:bg-[#F4F4F5]"
                  >
                    <Minus size={16} />
                  </button>

                  <span className="w-6 text-center text-[16px] font-medium">
                    {quantity}
                  </span>

                  <button
                    type="button"
                    onClick={() => setQuantity((prev) => prev + 1)}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E4E4E7] hover:bg-[#F4F4F5]"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              {/* ADD TO CART */}
              <button
                type="button"
                onClick={handleAdd}
                className="mt-5 h-11 w-full rounded-[8px] bg-[#171717] text-[14px] font-medium text-white transition hover:bg-black"
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
