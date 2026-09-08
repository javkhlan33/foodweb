"use client";

import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type DeliveryAddressDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddressChange: (address: string) => void;
};

export default function DeliveryAddressDialog({
  open,
  onOpenChange,
  onAddressChange,
}: DeliveryAddressDialogProps) {
  const [address, setAddress] = useState("");

  const handleSubmit = () => {
    if (!address.trim()) return;

    onAddressChange(address);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[calc(100%-2rem)] max-w-[502px] rounded-[8px] p-6">
        <DialogHeader>
          <DialogTitle className="text-[18px] font-bold text-[#171717]">
            Please write your delivery address!
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <p className="text-[12px] text-[#999999]">
              Please share your complete address
            </p>

            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your address..."
              className="
                min-h-[80px]
                w-full
                resize-none
                rounded-md
                border
                border-[#E5E5E5]
                px-3
                py-2
                text-[14px]
                outline-none
                focus:border-[#FD543F]
                focus:ring-1
                focus:ring-[#FD543F]
              "
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="
                rounded-md
                px-4
                py-2
                text-[13px]
                text-[#171717]
                hover:bg-[#F5F5F5]
              "
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSubmit}
              className="
                rounded-md
                bg-[#171717]
                px-4
                py-2
                text-[13px]
                font-medium
                text-white
                hover:opacity-90
              "
            >
              Deliver Here
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
