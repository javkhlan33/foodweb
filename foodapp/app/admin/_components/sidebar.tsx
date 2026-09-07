"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const isFoodMenu = pathname === "/admin";
  const isOrders = pathname.startsWith("/admin/orders");

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-[245px] bg-white px-6 py-8">
      <div className="mb-10 px-2">
        <div className="flex items-center gap-2">
          <div className="relative flex h-7 w-7 items-center justify-center">
            <div className="h-5 w-7 rounded-full bg-[#F65343]" />
            <div className="absolute bottom-[1px] left-0 h-[2px] w-7 bg-[#F65343]" />
          </div>

          <div>
            <h1 className="text-[15px] font-bold leading-none text-black">
              NomNom
            </h1>
            <p className="mt-1 text-[9px] text-gray-400">Swift delivery</p>
          </div>
        </div>
      </div>

      <nav className="space-y-3">
        <Link
          href="/admin"
          className={`flex h-[42px] items-center gap-3 rounded-full px-4 text-sm transition ${
            isFoodMenu ? "bg-black text-white" : "text-black hover:bg-gray-100"
          }`}
        >
          <span className="text-[16px]">▦</span>
          <span>Food menu</span>
        </Link>

        <Link
          href="/admin/orders"
          className={`flex h-[42px] items-center gap-3 rounded-full px-4 text-sm transition ${
            isOrders ? "bg-black text-white" : "text-black hover:bg-gray-100"
          }`}
        >
          <span className="text-[16px]">▱</span>
          <span>Orders</span>
        </Link>
      </nav>
    </aside>
  );
}
