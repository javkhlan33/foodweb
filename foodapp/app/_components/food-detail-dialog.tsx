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
      className={`fixed inset-0 z-[100] items-center justify-center bg-black/40 px-3 sm:px-4 ${
        open ? "flex" : "hidden"
      }`}
      onClick={() => onOpenChange(false)}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-[826px] overflow-y-auto rounded-[20px] bg-white p-3 shadow-2xl sm:p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => onOpenChange(false)}
          className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#71717A] shadow-sm hover:bg-[#F4F4F5] sm:right-5 sm:top-5"
        >
          <X size={16} />
        </button>

        <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2">
          <div className="relative h-[220px] overflow-hidden rounded-[14px] sm:h-[280px] md:h-[380px]">
            <Image
              src={food.image}
              alt={food.foodName}
              fill
              className="object-cover"
            />
          </div>

          <div className="flex flex-col justify-between py-2 sm:py-4">
            <div>
              <h2 className="pr-8 text-[20px] font-medium text-[#FD543F] sm:text-[24px]">
                {food.foodName}
              </h2>

              <p className="mt-3 text-[13px] leading-5 text-[#171717] sm:text-[14px]">
                {food.ingredients}
              </p>
            </div>

            <div>
              <div className="my-4 border-t border-[#E4E4E7] sm:my-6" />

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[12px] text-[#71717A]">Total price</p>
                  <p className="mt-1 text-[18px] font-semibold text-[#171717]">
                    ${total.toFixed(2)}
                  </p>
                </div>

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
