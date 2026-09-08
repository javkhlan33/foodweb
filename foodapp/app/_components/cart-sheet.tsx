"use client";

import { useEffect, useState } from "react";
import { X, ShoppingCart } from "lucide-react";

import type { CartItem } from "../page";
import CartContent from "./cart-content";
import OrderContent from "./order-content";
import LoginRequiredDialog from "./login-required-dialog";
import OrderSuccessDialog from "./order-success-dialog";
import DeliveryAddressDialog from "./delivery-address-dialog";
import { API_URL, getAuth } from "@/lib/auth";

export type Order = {
  id: string;
  date: string;
  total: number;
  status: "PENDING" | "DELIVERED" | "CANCELLED";
  items: CartItem[];
  address: string;
};

type Tab = "cart" | "order";

type CartSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cartItems: CartItem[];
  updateQuantity: (id: string, quantity: number) => void;
  initialTab?: Tab;
  onCheckoutComplete?: () => void;
};

type ApiOrder = {
  _id: string;
  totalprice: number;
  status: "PENDING" | "DELIVERED" | "CANCELLED";
  createdAt: string;
  address?: string;
  user?: { _id?: string };
  foodOrderItems?: {
    quantity: number;
    foodId?: {
      _id?: string;
      foodName?: string;
      price?: number;
      image?: string;
      ingredients?: string;
    } | null;
  }[];
};

export default function CartSheet({
  open,
  onOpenChange,
  cartItems,
  updateQuantity,
  initialTab = "cart",
  onCheckoutComplete,
}: CartSheetProps) {
  const [tab, setTab] = useState<Tab>(initialTab);
  const [address, setAddress] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState("");

  const [showLoginAlert, setShowLoginAlert] = useState(false);
  const [showAddressAlert, setShowAddressAlert] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");

  const mapOrders = (data: ApiOrder[]): Order[] =>
    data.map((order) => ({
      id: order._id,
      date: new Date(order.createdAt).toLocaleDateString(),
      total: order.totalprice,
      status: order.status,
      address: order.address || "",
      items: (order.foodOrderItems || []).map((item) => ({
        _id: item.foodId?._id || "",
        foodName: item.foodId?.foodName || "Food",
        price: item.foodId?.price || 0,
        image: item.foodId?.image || "",
        ingredients: item.foodId?.ingredients || "",
        quantity: item.quantity,
      })),
    }));

  const loadOrders = async (id: string) => {
    if (!id) return;

    try {
      const response = await fetch(`${API_URL}/order?userId=${id}`);
      if (!response.ok) return;

      const data = await response.json();
      const list: ApiOrder[] = Array.isArray(data) ? data : [];
      setOrders(mapOrders(list));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!open) return;

    const auth = getAuth();
    setIsLoggedIn(auth.isLoggedIn);
    setUserId(auth.userId);
    setTab(initialTab);
    setCheckoutError("");

    if (auth.isLoggedIn && auth.userId) {
      loadOrders(auth.userId);
    }
  }, [open, initialTab]);

  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  const itemsTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const shipping = cartItems.length > 0 ? 0.99 : 0;
  const total = itemsTotal + shipping;

  const handleCheckout = async () => {
    if (!isLoggedIn || !userId) {
      setShowLoginAlert(true);
      return;
    }

    if (!address.trim()) {
      setShowAddressAlert(true);
      return;
    }

    if (cartItems.length === 0) return;

    setCheckoutError("");

    try {
      const response = await fetch(`${API_URL}/order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: userId,
          totalprice: total,
          address: address.trim(),
          status: "PENDING",
          foodOrderItems: cartItems.map((item) => ({
            foodId: item._id,
            quantity: item.quantity,
          })),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setCheckoutError(data.message || "Order үүсгэхэд алдаа гарлаа");
        return;
      }

      await loadOrders(userId);
      onCheckoutComplete?.();
      setShowSuccess(true);
    } catch (error) {
      console.error(error);
      setCheckoutError("Order үүсгэхэд алдаа гарлаа");
    }
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    setAddress("");
    setTab("order");
    onOpenChange(false);
  };

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/20"
        onClick={() => onOpenChange(false)}
      />

      <aside
        className="
    fixed
    right-0
    top-0
    z-50
    flex
    h-screen
    w-full
    max-w-[100vw]
    flex-col
    bg-[#404040]
    shadow-2xl
    sm:w-[535px]
  "
      >
        <div className="flex h-[72px] shrink-0 items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3 text-white">
            <ShoppingCart size={21} />
            <span className="text-[16px] font-medium">Order detail</span>
          </div>

          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/70 text-white hover:bg-white/10"
          >
            <X size={17} />
          </button>
        </div>

        <div className="flex min-h-0 flex-1 flex-col px-4 pb-6 sm:px-6">
          <div className="mb-4 flex h-10 shrink-0 rounded-full bg-white p-1">
            <button
              type="button"
              onClick={() => setTab("cart")}
              className={`flex-1 rounded-full text-sm font-medium ${
                tab === "cart" ? "bg-[#F04444] text-white" : "text-[#18181B]"
              }`}
            >
              Cart
            </button>

            <button
              type="button"
              onClick={() => setTab("order")}
              className={`flex-1 rounded-full text-sm font-medium ${
                tab === "order" ? "bg-[#F04444] text-white" : "text-[#18181B]"
              }`}
            >
              Order
            </button>
          </div>

          {tab === "cart" && (
            <CartContent
              cartItems={cartItems}
              updateQuantity={updateQuantity}
              address={address}
              setAddress={setAddress}
              itemsTotal={itemsTotal}
              shipping={shipping}
              total={total}
              onCheckout={handleCheckout}
              checkoutError={checkoutError}
            />
          )}

          {tab === "order" && <OrderContent orders={orders} />}
        </div>
      </aside>

      <LoginRequiredDialog
        open={showLoginAlert}
        onClose={() => setShowLoginAlert(false)}
      />

      <DeliveryAddressDialog
        open={showAddressAlert}
        onOpenChange={setShowAddressAlert}
        onAddressChange={setAddress}
      />

      <OrderSuccessDialog open={showSuccess} onClose={handleSuccessClose} />
    </>
  );
}
