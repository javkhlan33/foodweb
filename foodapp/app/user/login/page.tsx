"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { useState } from "react";
import { API_URL, saveAuth } from "@/lib/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const isFormValid = emailRegex.test(email) && password.length >= 8;

  const handleLogin = async () => {
    setEmailError("");
    setPasswordError("");

    try {
      const response = await fetch(`${API_URL}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setPasswordError(data.message || "Invalid email or password");
        return;
      }

      if (!data.token) {
        setPasswordError("Token ирсэнгүй. Дахин оролдоно уу.");
        return;
      }

      saveAuth(data.token, data.user || {}, email);
      window.location.href = "/";
    } catch (error) {
      console.error(error);
      setPasswordError("Login failed. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white p-4 sm:p-6">
      <div className="flex w-full max-w-[1440px] overflow-hidden rounded-2xl border border-[#E4E4E7] bg-white">
        {/* Left */}
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
                  Log in
                </h1>

                <p className="text-sm text-[#71717A] sm:text-base">
                  Log in to enjoy your favorite dishes.
                </p>
              </div>

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
                  href="/forgetpassword"
                  className="text-sm text-[#18181B] hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              <button
                onClick={handleLogin}
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
                <span className="text-[#71717A]">Don&apos;t have an account? </span>
                <Link href="/sign-up" className="font-medium text-[#2563EB]">
                  Sign up
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Right image - desktop only */}
        <div className="hidden shrink-0 p-5 lg:block">
          <Image
            src="/login.png"
            alt="Login"
            width={856}
            height={864}
            className="h-auto max-h-[904px] w-[min(42vw,856px)] rounded-2xl object-cover"
          />
        </div>
      </div>
    </div>
  );
}
