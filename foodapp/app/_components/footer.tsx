"use client";

import Image from "next/image";
import Link from "next/link";
const texts = Array.from({ length: 20 }, () => "Fresh fast delivered");
export default function Footer() {
  return (
    <footer className="w-full ">
      {/* Top Strip */}
      <div className="h-[52px] overflow-hidden bg-[#FD543F]">
        <div className="marquee h-full items-center">
          {texts.map((text, i) => (
            <span
              key={i}
              className="mx-8 whitespace-nowrap text-xl font-semibold text-white"
            >
              {text}
            </span>
          ))}
        </div>
      </div>

      {/* Main Footer */}
      <div className="bg-[#171717] ">
        <div className="mx-auto flex justify-between max-w-[1260px] gap-55 px-16 py-16">
          {/* Logo */}
          <div className="top-0 right-0 w-[88px] flex flex-col gap-4">
            <div className="w-full flex justify-center ">
              <Image src="/logo.png" alt="logo" width={38} height={45} />
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-[24px] font-bold leading-none">
                <span className="text-white">Nom</span>
                <span className="text-[#FD543F]">Nom</span>
              </h3>

              <p className="mt-1 text-[12px] leading-none text-white">
                Swift delivery
              </p>
            </div>
          </div>
          <div className="flex w-full justify-between">
            {/* Company */}
            <div className="left-0  ">
              <h3 className="mb-4 text-xl  font-semibold gap-4 text-gray-500">
                NomNom
              </h3>
              <div className="flex flex-col gap-4 ">
                <Link href="/" className="block text-sm text-white">
                  Home
                </Link>

                <Link href="/" className="block text-sm text-white">
                  Contact us
                </Link>

                <Link href="/" className="block text-sm text-white">
                  Delivery zone
                </Link>
              </div>
            </div>

            {/* Menu */}
            <div className=" right-[234px]">
              <h3 className="mb-4 text-xl font-semibold text-gray-500">Menu</h3>
              <div className="w-full flex gap-14 ">
                <div className="flex flex-col gap-4 ">
                  <Link href="/">Appetizers</Link>
                  <Link href="/">Salads</Link>
                  <Link href="/">Pizzas</Link>
                  <Link href="/">Main dishes</Link>
                  <Link href="/">Desserts</Link>
                </div>
                <div className="flex flex-col gap-4 ">
                  <Link href="/">Side dish</Link>
                  <Link href="/">Brunch</Link>
                  <Link href="/">Desserts</Link>
                  <Link href="/">Beverages</Link>
                  <Link href="/">Fish & Sea foods</Link>
                </div>
              </div>
            </div>

            {/* Social */}
            <div className="right-0  ">
              <h3 className="mb-4 w-[122px] text-xl font-semibold text-gray-500">
                Follow us
              </h3>

              <div className="flex gap-3">
                <button className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-700">
                  <Image
                    src="/facebookicon.png"
                    alt="Facebook"
                    width={28}
                    height={28}
                  />
                </button>

                <button className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-700">
                  <Image
                    src="/instagramicon.png"
                    alt="Instagram"
                    width={28}
                    height={28}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mx-auto flex max-w-[1260px] items-center gap-12 border-t border-[#2D2D2D] px-16 py-6">
          <div className="flex gap-8 text-[14px] text-gray-500">
            <p>Copyright ©2024 NomNom LLC</p>
            <Link href="/">Privacy policy</Link>
            <Link href="/">Terms and condition</Link>
            <Link href="/">Cookie policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
