"use client";

import { Check } from "lucide-react";

type Props = {
  open: boolean;
};

export default function CartAlert({ open }: Props) {
  if (!open) return null;

  return (
    <div className="fixed left-1/2 top-6 z-[100] -translate-x-1/2">
      <div className="flex h-12 items-center gap-2 rounded-[8px] bg-[#18181B] px-4 text-white shadow-lg">
        <Check size={16} strokeWidth={3} />

        <span className="text-[13px] font-medium">
          Food is being added to the cart!
        </span>
      </div>
    </div>
  );
}
