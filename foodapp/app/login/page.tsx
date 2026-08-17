"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const isFormValid = emailRegex.test(email) && password.length >= 8;

  const handleLogin = () => {
    let valid = true;

    setEmailError("");
    setPasswordError("");

    if (!emailRegex.test(email)) {
      setEmailError("Invalid email. Use a format like example@email.com.");
      valid = false;
    }

    if (password !== "Example1234") {
      setPasswordError("Incorrect password. Please try again.");
      valid = false;
    }

    if (valid) {
      alert("Login successful!");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="flex w-[1440px] rounded-2xl border border-[#E4E4E7] bg-white">
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
                  Log in
                </h1>

                <p className="text-base text-[#71717A]">
                  Log in to enjoy your favorite dishes.
                </p>
              </div>

              {/* Inputs */}
              <div className="flex flex-col gap-4">
                <div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className={`h-11 w-full rounded-md border px-3 text-black outline-none ${
                      emailError ? "border-red-500" : "border-gray-300"
                    }`}
                  />

                  {emailError && (
                    <p className="mt-1 text-xs text-red-500">{emailError}</p>
                  )}
                </div>

                <div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className={`h-11 w-full rounded-md border px-3 text-black outline-none ${
                      passwordError ? "border-red-500" : "border-gray-300"
                    }`}
                  />

                  {passwordError && (
                    <p className="mt-1 text-xs text-red-500">{passwordError}</p>
                  )}
                </div>

                <Link
                  href="/forgotpassword"
                  className="text-sm text-[#18181B] hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Button */}
              <button
                onClick={handleLogin}
                disabled={!isFormValid}
                className={`h-9 rounded-md text-sm font-medium transition-colors ${
                  isFormValid
                    ? "bg-[#18181B] text-white"
                    : "bg-[#E4E4E7] text-[#A1A1AA]"
                }`}
              >
                Let's Go
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

        {/* Right */}
        <div className="p-5 mt-2">
          <Image
            src="/login.png"
            alt="Login"
            width={856}
            height={864}
            className="h-[904px] w-[856px] rounded-2xl object-cover"
          />
        </div>
      </div>
    </div>
  );
}
