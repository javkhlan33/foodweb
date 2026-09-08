"use client";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function OrderSuccessDialog({ open, onClose }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/30 px-4">
      <div className="flex min-h-[320px] w-full max-w-[664px] flex-col items-center justify-center rounded-[16px] bg-white px-4 py-10 shadow-2xl sm:min-h-[439px] sm:py-0">
        <h2 className="text-center text-[15px] font-semibold text-[#18181B] sm:text-[16px]">
          Your order has been successfully placed!
        </h2>

        <div className="mt-5 flex h-[64px] w-[64px] items-center justify-center rounded-full bg-[#F04444] text-3xl">
          🍽️
        </div>

        <div className="mt-5 text-[40px] sm:text-[55px]">🧑‍🍳</div>

        <button
          type="button"
          onClick={onClose}
          className="mt-5 rounded-full bg-[#F4F4F5] px-6 py-2 text-xs font-medium text-[#52525B] hover:bg-[#E4E4E7]"
        >
          Back to home
        </button>
      </div>
    </div>
  );
}
