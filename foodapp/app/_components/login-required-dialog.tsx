"use client";

import { X } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function LoginRequiredDialog({ open, onClose }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30">
      <div className="relative w-[429px] rounded-[12px] bg-white p-6 shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 text-[#A1A1AA]"
        >
          <X size={16} />
        </button>

        <h2 className="text-center text-[16px] font-semibold text-[#18181B]">
          You need to log in first
        </h2>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => {
              window.location.href = "/user/login";
            }}
            className="h-10 rounded-md bg-[#18181B] text-sm font-medium text-white"
          >
            Log in
          </button>

          <button
            type="button"
            onClick={() => {
              window.location.href = "/sign-up";
            }}
            className="h-10 rounded-md border border-[#E4E4E7] bg-white text-sm font-medium"
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
}
