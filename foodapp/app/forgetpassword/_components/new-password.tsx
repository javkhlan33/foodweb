"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { useState } from "react";

type NewPasswordProps = {
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  confirmPassword: string;
  setConfirmPassword: React.Dispatch<React.SetStateAction<string>>;
  onBack: () => void;
  onSubmit: () => void;
};

export default function NewPassword({
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  onBack,
  onSubmit,
}: NewPasswordProps) {
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = () => {
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

    if (valid) {
      onSubmit();
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="flex w-[1440px] rounded-2xl bg-white">
        {/* Left */}
        <div className="relative flex-1">
          <div className="absolute left-[100px] top-[246px] w-[416px]">
            <div className="flex flex-col gap-6">
              {/* Back */}
              <button
                onClick={onBack}
                className="flex h-9 w-9 items-center justify-center rounded-md border border-[#E4E4E7]"
              >
                <ChevronLeft className="h-4 w-4 text-[#18181B]" />
              </button>

              {/* Header */}
              <div className="flex flex-col gap-2">
                <h1 className="text-[36px] font-semibold text-[#18181B]">
                  Create new password
                </h1>

                <p className="text-base text-[#71717A]">
                  Set a new password with a combination of letters and numbers.
                </p>
              </div>

              {/* Password */}
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

              {/* Confirm Password */}
              <div className="flex flex-col gap-2">
                <input
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm password"
                  className={`h-11 rounded-md border px-3 text-black outline-none ${
                    confirmPasswordError ? "border-red-500" : "border-gray-300"
                  }`}
                />

                {confirmPasswordError && (
                  <p className="text-xs text-red-500">{confirmPasswordError}</p>
                )}
              </div>

              {/* Show Password */}
              <label className="flex items-center gap-2 text-sm text-[#71717A]">
                <input
                  type="checkbox"
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                />
                Show password
              </label>

              {/* Button */}
              <button
                onClick={handleSubmit}
                disabled={!password || !confirmPassword}
                className={`h-9 rounded-md text-sm font-medium transition-colors ${
                  password && confirmPassword
                    ? "bg-[#18181B] text-white"
                    : "bg-[#E4E4E7] text-[#A1A1AA]"
                }`}
              >
                Create password
              </button>

              {/* Footer */}
              <div className="text-center text-sm">
                <span className="text-[#71717A]">
                  Already have an account?{" "}
                </span>

                <Link href="/login" className="font-medium text-[#2563EB]">
                  Log in
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
            alt="New Password"
            width={856}
            height={904}
            className="rounded-2xl object-cover"
          />
        </div>
      </div>
    </div>
  );
}
