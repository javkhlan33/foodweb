"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, MapPin, ChevronRight, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import DeliveryAddressDialog from "./delivery-address-dialog";
import { clearAuth, getAuth } from "@/lib/auth";

type HeaderProps = {
  cartCount: number;
  onCartClick: () => void;
  onOrdersClick: () => void;
};

export default function Header({
  cartCount,
  onCartClick,
  onOrdersClick,
}: HeaderProps) {
  const [addressOpen, setAddressOpen] = useState(false);
  const [address, setAddress] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const auth = getAuth();
    setIsLoggedIn(auth.isLoggedIn);
    setEmail(auth.email);
    setRole(auth.role);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    clearAuth();
    setIsLoggedIn(false);
    setEmail("");
    setRole("");
    setMenuOpen(false);
    window.location.href = "/";
  };

  return (
    <>
      <header className="w-full border-b border-gray-800 bg-[#171717]">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-2 px-4 sm:h-16 sm:gap-4 sm:px-6">
          {/* Left */}
          <div className="flex min-w-0 items-center gap-2">
            <Image
              src="/logo.png"
              alt="NomNom Logo"
              width={40}
              height={40}
              className="h-8 w-8 shrink-0 sm:h-10 sm:w-10"
            />

            <div className="leading-none">
              <h1 className="text-lg font-bold text-red-500 sm:text-xl">
                NomNom
              </h1>
              <p className="hidden text-xs text-gray-300 sm:block">
                Swift delivery
              </p>
            </div>
          </div>

          {/* Right */}
          <div className="flex shrink-0 items-center gap-2 sm:gap-4">
            {/* Address */}
            <button
              onClick={() => setAddressOpen(true)}
              className="flex h-9 max-w-[140px] items-center gap-1.5 rounded-full bg-white px-3 sm:h-10 sm:max-w-none sm:gap-2 sm:px-4"
            >
              <MapPin size={16} className="shrink-0 text-red-500" />

              <span className="truncate text-xs sm:text-sm">
                <span className="hidden font-medium text-red-500 md:inline">
                  Delivery address:{" "}
                </span>
                <span className="text-gray-500">
                  {address || "Location"}
                </span>
              </span>

              <ChevronRight
                size={16}
                className="hidden shrink-0 text-gray-400 sm:block"
              />
            </button>

            {/* Cart */}
            <button
              onClick={onCartClick}
              className="relative flex h-9 w-9 items-center justify-center rounded-full bg-white hover:bg-gray-100 sm:h-10 sm:w-10"
            >
              <ShoppingCart size={18} />

              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#FD543F] px-1 text-[11px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </button>

            {/* User */}
            <div className="relative" ref={menuRef}>
              <button
                type="button"
                onClick={() => setMenuOpen((open) => !open)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600 sm:h-10 sm:w-10"
              >
                {isLoggedIn && email ? (
                  <span className="text-sm font-semibold uppercase">
                    {email.charAt(0)}
                  </span>
                ) : (
                  <User size={18} />
                )}
              </button>

              {menuOpen && (
                <div className="absolute right-0 top-12 z-50 w-[180px] rounded-xl border border-[#E4E4E7] bg-white p-2 shadow-lg">
                  {isLoggedIn ? (
                    <>
                      <p className="truncate px-3 py-2 text-xs text-[#71717A]">
                        {email}
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setMenuOpen(false);
                          onOrdersClick();
                        }}
                        className="h-9 w-full rounded-md text-sm font-medium text-[#18181B] hover:bg-[#F4F4F5]"
                      >
                        My orders
                      </button>
                      {role === "ADMIN" && (
                        <Link
                          href="/admin/orders"
                          className="flex h-9 w-full items-center justify-center rounded-md text-sm font-medium text-[#18181B] hover:bg-[#F4F4F5]"
                          onClick={() => setMenuOpen(false)}
                        >
                          Admin
                        </Link>
                      )}
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="h-9 w-full rounded-md text-sm font-medium text-[#F04444] hover:bg-[#FEF2F2]"
                      >
                        Log out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/user/login"
                        className="flex h-9 w-full items-center justify-center rounded-md bg-[#18181B] text-sm font-medium text-white"
                        onClick={() => setMenuOpen(false)}
                      >
                        Log in
                      </Link>
                      <Link
                        href="/sign-up"
                        className="mt-2 flex h-9 w-full items-center justify-center rounded-md border border-[#E4E4E7] text-sm font-medium text-[#18181B]"
                        onClick={() => setMenuOpen(false)}
                      >
                        Sign up
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <DeliveryAddressDialog
        open={addressOpen}
        onOpenChange={setAddressOpen}
        onAddressChange={setAddress}
      />
    </>
  );
}
