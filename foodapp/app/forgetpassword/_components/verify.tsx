"use client";

import { ChevronLeft } from "lucide-react";
import Image from "next/image";

type VerifyProps = {
  email: string;
  onNext: () => void;
  onBack: () => void;
};

export default function Verify({ email, onNext, onBack }: VerifyProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="flex w-[1440px] rounded-2xl bg-white">
        {/* Left */}
        <div className="relative flex-1">
          <div className="absolute left-[100px] top-[246px] w-[416px]">
            <div className="flex flex-col gap-6">
              <button
                onClick={onBack}
                className="flex h-9 w-9 items-center justify-center rounded-md border border-[#E4E4E7]"
              >
                <ChevronLeft className="h-4 w-4 text-[#18181B]" />
              </button>
              {/* Header */}
              <div className="flex flex-col gap-2">
                <h1 className="text-[36px] font-semibold text-[#18181B]">
                  Please verify your email
                </h1>

                <p className="text-base text-[#71717A]">
                  We just sent an email to{" "}
                  <span className="font-medium text-[#18181B]">{email}</span>.
                  Click the link in the email to verify your account.
                </p>
              </div>

              {/* Button */}
              <button
                onClick={onNext}
                className="h-9 rounded-md bg-[#18181B] text-sm font-medium text-white transition-colors hover:bg-[#27272A]"
              >
                Resend email
              </button>
            </div>
          </div>
        </div>

        {/* Gap */}
        <div className="w-[48px]" />

        {/* Right Image */}
        <div className="p-5 mt-2">
          <Image
            src="/login.png"
            alt="Verify Email"
            width={856}
            height={904}
            className="rounded-2xl object-cover"
          />
        </div>
      </div>
    </div>
  );
}
