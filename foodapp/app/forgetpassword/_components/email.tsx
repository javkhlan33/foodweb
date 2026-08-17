"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { useState } from "react";

type EmailProps = {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  onNext: () => void;
};

export default function Email({ email, setEmail, onNext }: EmailProps) {
  const [emailError, setEmailError] = useState("");

  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  const isFormValid = emailRegex.test(email);

  const handleNext = () => {
    setEmailError("");

    if (!emailRegex.test(email)) {
      setEmailError("Имэйл хаяг буруу байна. Жишээ: example@email.com");
      return;
    }

    onNext();
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="flex w-[1440px] rounded-2xl bg-white">
        {/* Left */}
        <div className="relative flex-1">
          <div className="absolute left-[100px] top-[246px] w-[416px]">
            <div className="flex flex-col gap-6">
              {/* Back */}
              <button className="flex h-9 w-9 items-center justify-center rounded-md border border-[#E4E4E7]">
                <ChevronLeft className="h-4 w-4 text-[#18181B]" />
              </button>

              {/* Header */}
              <div className="flex flex-col gap-2">
                <h1 className="text-[36px] font-semibold text-[#18181B]">
                  Reset your password
                </h1>

                <p className="text-base text-[#71717A]">
                  Enter your email to receive a password reset link.
                </p>
              </div>

              {/* Email */}
              <div className="flex flex-col gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@gmail.com"
                  className={`h-11 rounded-md border px-3 text-black outline-none ${
                    emailError ? "border-red-500" : "border-gray-300"
                  }`}
                />

                {emailError && (
                  <p className="text-xs text-red-500">{emailError}</p>
                )}
              </div>

              {/* Button */}
              <button
                onClick={handleNext}
                disabled={!isFormValid}
                className={`h-9 rounded-md text-sm font-medium transition-colors ${
                  isFormValid
                    ? "bg-[#18181B] text-white"
                    : "bg-[#E4E4E7] text-[#A1A1AA]"
                }`}
              >
                Send link
              </button>

              {/* Footer */}
              <div className="text-center text-sm">
                <span className="text-[#71717A]">Don't have an account? </span>

                <Link href="/sign-up" className="font-medium text-[#2563EB]">
                  Sign up
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Gap */}
        <div className="w-[48px]" />

        {/* Right Image */}
        <div className="p-5 mt-2">
          <Image
            src="/login.png"
            alt="Forgot Password"
            width={856}
            height={904}
            className="rounded-2xl object-cover"
          />
        </div>
      </div>
    </div>
  );
}
