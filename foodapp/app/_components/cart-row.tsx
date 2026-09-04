"use client";

import Image from "next/image";
import { X, Plus, Minus } from "lucide-react";
import type { CartItem } from "../page";

type Props = {
  item: CartItem;
  updateQuantity: (id: string, quantity: number) => void;
};

export default function CartRow({ item, updateQuantity }: Props) {
  return (
    <div className="flex gap-3 border-b border-[#E4E4E7] py-3 last:border-b-0">
      <Image
        src={item.image}
        alt={item.foodName}
        width={72}
        height={72}
        className="h-[72px] w-[72px] shrink-0 rounded-[8px] object-cover"
      />

      <div className="min-w-0 flex-1">
        {/* NAME + DELETE */}
        <div className="flex justify-between gap-2">
          <h3 className="text-[13px] font-semibold text-[#F04444]">
            {item.foodName}
          </h3>

          <button
            type="button"
            onClick={() => updateQuantity(item._id, 0)}
            className="shrink-0 text-[#F04444]"
          >
            <X size={16} />
          </button>
        </div>

        {/* INGREDIENTS */}
        <p className="mt-1 line-clamp-2 text-[10px] text-[#71717A]">
          {item.ingredients}
        </p>

        {/* QUANTITY + PRICE */}
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => updateQuantity(item._id, item.quantity - 1)}
              className="flex h-5 w-5 items-center justify-center"
            >
              <Minus size={14} />
            </button>

            <span className="min-w-[12px] text-center text-xs">
              {item.quantity}
            </span>

            <button
              type="button"
              onClick={() => updateQuantity(item._id, item.quantity + 1)}
              className="flex h-5 w-5 items-center justify-center"
            >
              <Plus size={14} />
            </button>
          </div>

          <span className="text-xs font-semibold">
            ${(item.price * item.quantity).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}
