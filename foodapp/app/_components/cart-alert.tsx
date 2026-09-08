"use client";

import { Check } from "lucide-react";

type Props = {
  open: boolean;
};

export default function CartAlert({ open }: Props) {
  if (!open) return null;

  return (
    <div className="fixed left-1/2 top-4 z-[100] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 sm:top-6 sm:w-auto">
      <div className="flex h-12 items-center justify-center gap-2 rounded-[8px] bg-[#18181B] px-4 text-white shadow-lg">
        <Check size={16} strokeWidth={3} className="shrink-0" />

        <span className="text-[12px] font-medium sm:text-[13px]">
          Food is being added to the cart!
        </span>
      </div>
    </div>
  );
}
