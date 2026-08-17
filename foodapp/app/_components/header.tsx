"use client";
import Image from "next/image";
import { ShoppingCart, MapPin, ChevronRight, User } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full bg-[#171717] border-b border-gray-800">
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
          <button className="flex h-10 items-center gap-2 rounded-full bg-white px-4">
            <MapPin size={16} className="text-red-500" />

            <span className="text-sm">
              <span className="font-medium text-red-500">
                Delivery address:
              </span>{" "}
              <span className="text-gray-500">Add Location</span>
            </span>

            <ChevronRight size={16} className="text-gray-400" />
          </button>

          {/* Cart */}
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white hover:bg-gray-100">
            <ShoppingCart size={18} />
          </button>

          {/* User */}
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600">
            <User size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}
