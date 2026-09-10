"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { useState } from "react";

type PasswordProps = {
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  confirmPassword: string;
  setConfirmPassword: React.Dispatch<React.SetStateAction<string>>;
  onBack: () => void;
  onSubmit: () => Promise<boolean>;
  signupError?: string;
};

export default function PasswordPage({
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  onBack,
  onSubmit,
  signupError,
}: PasswordProps) {
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    let valid = true;

    setPasswordError("");
    setConfirmPasswordError("");

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (!passwordRegex.test(password)) {
      setPasswordError(
        "Нууц үг нь үсэг, тоо, тусгай тэмдэгт агуулсан, хамгийн багадаа 8 тэмдэгттэй байна.",
      );
      valid = false;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("Нууц үгүүд таарахгүй байна.");
      valid = false;
    }

    if (!valid) return;

    setLoading(true);
    try {
      await onSubmit();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white p-4 sm:p-6">
      <div className="flex w-full max-w-[1440px] overflow-hidden rounded-2xl bg-white">
        <div className="flex w-full flex-1 items-center justify-center px-4 py-10 sm:px-10 lg:px-16 lg:py-16">
          <div className="w-full max-w-[416px]">
            <div className="flex flex-col gap-6">
              <button
                onClick={onBack}
                className="flex h-9 w-9 items-center justify-center rounded-md border border-[#E4E4E7]"
              >
                <ChevronLeft className="h-4 w-4 text-[#18181B]" />
              </button>

              <div className="flex flex-col gap-2">
                <h1 className="text-[28px] font-semibold text-[#18181B] sm:text-[36px]">
                  Create a strong password
                </h1>

                <p className="text-sm text-[#71717A] sm:text-base">
                  Create a strong password with letters, numbers.
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className={`h-11 rounded-md border px-3 text-black outline-none ${
                    passwordError ? "border-red-500" : "border-gray-300"
                  }`}
                />

                {passwordError && (
                  <p className="text-xs text-red-500">{passwordError}</p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <input
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
                  className={`h-11 rounded-md border px-3 text-black outline-none ${
                    confirmPasswordError ? "border-red-500" : "border-gray-300"
                  }`}
                />

                {confirmPasswordError && (
                  <p className="text-xs text-red-500">{confirmPasswordError}</p>
                )}
              </div>

              <label className="flex items-center gap-2 text-sm text-[#71717A]">
                <input
                  type="checkbox"
                  checked={showPassword}
                  onChange={() => setShowPassword((prev) => !prev)}
                />
                Show password
              </label>

              <button
                onClick={handleSubmit}
                disabled={!password || !confirmPassword || loading}
                className={`h-9 rounded-md text-sm font-medium transition-colors ${
                  password && confirmPassword && !loading
                    ? "bg-[#18181B] text-white"
                    : "bg-[#E4E4E7] text-[#A1A1AA]"
                }`}
              >
                {loading ? "Creating..." : "Let's Go"}
              </button>

              {signupError && (
                <p className="text-center text-xs text-red-500">{signupError}</p>
              )}

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
