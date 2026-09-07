"use client";

import { MapPin } from "lucide-react";
import type { CartItem } from "../page";
import CartRow from "./cart-row";

type Props = {
  cartItems: CartItem[];
  updateQuantity: (title: string, quantity: number) => void;
  address: string;
  setAddress: (value: string) => void;
  itemsTotal: number;
  shipping: number;
  total: number;
  onCheckout: () => void;
  checkoutError?: string;
};

export default function CartContent({
  cartItems,
  updateQuantity,
  address,
  setAddress,
  itemsTotal,
  shipping,
  total,
  onCheckout,
  checkoutError,
}: Props) {
  return (
    <div className="flex min-h-0 flex-1 flex-col gap-4">
      {/* ========================= */}
      {/* CART */}
      {/* ========================= */}

      <section className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-[16px] bg-white p-5">
        <h2 className="mb-4 shrink-0 text-[18px] font-semibold text-[#18181B]">
          My cart
        </h2>

        {/* ONLY FOOD LIST SCROLLS */}
        <div className="min-h-0 flex-1 overflow-y-auto pr-1">
          {cartItems.length === 0 ? (
            <div className="flex min-h-[220px] flex-col items-center justify-center rounded-[12px] bg-[#F4F4F5]">
              <div className="text-4xl">🍽️</div>

              <p className="mt-3 text-sm font-semibold text-[#18181B]">
                Your cart is empty
              </p>

              <p className="mt-1 max-w-[240px] text-center text-xs text-[#71717A]">
                Add some delicious dishes to your cart and satisfy your craving.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <CartRow
                  key={item._id}
                  item={item}
                  updateQuantity={updateQuantity}
                />
              ))}
            </div>
          )}
        </div>

        {/* ========================= */}
        {/* DELIVERY */}
        {/* ========================= */}

        <div className="mt-5 shrink-0 border-t border-[#E4E4E7] pt-5">
          <div className="mb-3 flex items-center gap-2">
            <MapPin size={20} strokeWidth={2} className="text-[#F04444]" />

            <h2 className="text-[18px] font-semibold text-[#18181B]">
              Delivery location
            </h2>
          </div>

          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Please share your complete address"
            className="
              h-[60px]
              w-full
              resize-none
              rounded-[12px]
              border
              border-[#D4D4D8]
              px-4
              py-3
              text-[14px]
              text-[#18181B]
              outline-none
              placeholder:text-[#A1A1AA]
              focus:border-[#F04444]
            "
          />
        </div>
      </section>

      {/* ========================= */}
      {/* PAYMENT */}
      {/* ========================= */}

      <section className="shrink-0 rounded-[16px] bg-white p-5">
        <h2 className="mb-4 text-[18px] font-semibold text-[#18181B]">
          Payment info
        </h2>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-[#71717A]">Items</span>

            <span className="font-medium text-[#18181B]">
              ${itemsTotal.toFixed(2)}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-[#71717A]">Shipping</span>

            <span className="font-medium text-[#18181B]">
              ${shipping.toFixed(2)}
            </span>
          </div>

          <div className="border-t border-dashed border-[#D4D4D8] pt-3">
            <div className="flex justify-between">
              <span className="font-semibold text-[#18181B]">Total</span>

              <span className="font-semibold text-[#18181B]">
                ${total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {checkoutError && (
          <p className="mt-2 text-center text-xs text-[#F04444]">
            {checkoutError}
          </p>
        )}

        <button
          type="button"
          onClick={onCheckout}
          disabled={cartItems.length === 0}
          className="
            mt-4
            h-[44px]
            w-full
            rounded-full
            bg-[#F04444]
            text-[14px]
            font-medium
            text-white
            transition
            hover:bg-[#E53939]
            disabled:cursor-not-allowed
            disabled:bg-[#FBCACA]
          "
        >
          Checkout
        </button>
      </section>
    </div>
  );
}
