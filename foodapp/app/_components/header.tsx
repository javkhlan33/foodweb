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
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          {/* Left */}
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="NomNom Logo" width={40} height={40} />

            <div className="leading-none">
              <h1 className="text-xl font-bold text-red-500">NomNom</h1>

              <p className="text-xs text-gray-300">Swift delivery</p>
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center gap-4">
            {/* Address */}
            <button
              onClick={() => setAddressOpen(true)}
              className="
                flex
                h-10
                items-center
                gap-2
                rounded-full
                bg-white
                px-4
              "
            >
              <MapPin size={16} className="text-red-500" />

              <span className="text-sm">
                <span className="font-medium text-red-500">
                  Delivery address:
                </span>{" "}
                <span className="text-gray-500">
                  {address || "Add Location"}
                </span>
              </span>

              <ChevronRight size={16} className="text-gray-400" />
            </button>

            {/* Cart */}
            <button
              onClick={onCartClick}
              className="
                relative
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                bg-white
                hover:bg-gray-100
              "
            >
              <ShoppingCart size={18} />

              {cartCount > 0 && (
                <span
                  className="
                    absolute
                    -right-1
                    -top-1
                    flex
                    h-5
                    min-w-5
                    items-center
                    justify-center
                    rounded-full
                    bg-[#FD543F]
                    px-1
                    text-[11px]
                    font-bold
                    text-white
                  "
                >
                  {cartCount}
                </span>
              )}
            </button>

            {/* User */}
            <div className="relative" ref={menuRef}>
              <button
                type="button"
                onClick={() => setMenuOpen((open) => !open)}
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  bg-red-500
                  text-white
                  hover:bg-red-600
                "
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
