"use client";

import Image from "next/image";
import Link from "next/link";

const texts = Array.from({ length: 20 }, () => "Fresh fast delivered");

export default function Footer() {
  return (
    <footer className="w-full overflow-hidden">
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
      <div className="bg-[#171717]">
        <div className="mx-auto flex max-w-[1260px] flex-col gap-10 px-4 py-10 sm:px-8 sm:py-14 lg:flex-row lg:justify-between lg:gap-16 lg:px-16 lg:py-16">
          {/* Logo */}
          <div className="flex w-[88px] flex-col gap-4">
            <div className="flex w-full justify-center">
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

          <div className="flex w-full flex-col gap-10 sm:flex-row sm:justify-between sm:gap-8">
            {/* Company */}
            <div>
              <h3 className="mb-4 text-xl font-semibold text-gray-500">
                NomNom
              </h3>
              <div className="flex flex-col gap-4">
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
            <div>
              <h3 className="mb-4 text-xl font-semibold text-gray-500">Menu</h3>
              <div className="flex gap-10 sm:gap-14">
                <div className="flex flex-col gap-4 text-sm text-white">
                  <Link href="/">Appetizers</Link>
                  <Link href="/">Salads</Link>
                  <Link href="/">Pizzas</Link>
                  <Link href="/">Main dishes</Link>
                  <Link href="/">Desserts</Link>
                </div>
                <div className="flex flex-col gap-4 text-sm text-white">
                  <Link href="/">Side dish</Link>
                  <Link href="/">Brunch</Link>
                  <Link href="/">Desserts</Link>
                  <Link href="/">Beverages</Link>
                  <Link href="/">Fish & Sea foods</Link>
                </div>
              </div>
            </div>

            {/* Social */}
            <div>
              <h3 className="mb-4 text-xl font-semibold text-gray-500">
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
        <div className="mx-auto flex max-w-[1260px] flex-col gap-3 border-t border-[#2D2D2D] px-4 py-6 text-[13px] text-gray-500 sm:flex-row sm:flex-wrap sm:items-center sm:gap-8 sm:px-8 sm:text-[14px] lg:px-16">
          <p>Copyright ©2024 NomNom LLC</p>
          <Link href="/">Privacy policy</Link>
          <Link href="/">Terms and condition</Link>
          <Link href="/">Cookie policy</Link>
        </div>
      </div>
    </footer>
  );
}
