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

export default function SignupPage({ email, setEmail, onNext }: EmailProps) {
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
    <div className="flex min-h-screen items-center justify-center bg-white p-4 sm:p-6">
      <div className="flex w-full max-w-[1440px] overflow-hidden rounded-2xl bg-white">
        <div className="flex w-full flex-1 items-center justify-center px-4 py-10 sm:px-10 lg:px-16 lg:py-16">
          <div className="w-full max-w-[416px]">
            <div className="flex flex-col gap-6">
              <Link
                href="/"
                className="flex h-9 w-9 items-center justify-center rounded-md border border-[#E4E4E7]"
              >
                <ChevronLeft className="h-4 w-4 text-[#18181B]" />
              </Link>

              <div className="flex flex-col gap-2">
                <h1 className="text-[28px] font-semibold text-[#18181B] sm:text-[36px]">
                  Create your account
                </h1>

                <p className="text-sm text-[#71717A] sm:text-base">
                  Sign up to explore your favorite dishes.
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className={`h-11 rounded-md border px-3 text-black outline-none ${
                    emailError ? "border-red-500" : "border-gray-300"
                  }`}
                />

                {emailError && (
                  <p className="text-xs text-red-500">{emailError}</p>
                )}
              </div>

              <button
                onClick={handleNext}
                disabled={!isFormValid}
                className={`h-9 rounded-md text-sm font-medium transition-colors ${
                  isFormValid
                    ? "bg-[#18181B] text-white"
                    : "bg-[#E4E4E7] text-[#A1A1AA]"
                }`}
              >
                Let&apos;s Go
              </button>

              <div className="text-center text-sm">
                <span className="text-[#71717A]">
                  Already have an account?{" "}
                </span>

                <Link href="/user/login" className="font-medium text-[#2563EB]">
                  Log in
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-2 hidden shrink-0 p-5 lg:block">
          <Image
            src="/login.png"
            alt="Signup"
            width={856}
            height={904}
            className="h-auto max-h-[904px] w-[min(42vw,856px)] rounded-2xl object-cover"
          />
        </div>
      </div>
    </div>
  );
}
