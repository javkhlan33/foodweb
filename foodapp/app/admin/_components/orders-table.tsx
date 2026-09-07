"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { getAuth, API_URL } from "@/lib/auth";

type FoodOrderItem = {
  foodId?: {
    _id?: string;
    foodName?: string;
    price?: number;
    image?: string;
  } | null;
  quantity: number;
};

type Order = {
  _id: string;

  user?: {
    _id?: string;
    email?: string;
    name?: string;
    username?: string;
  } | null;

  totalprice: number;

  foodOrderItems: FoodOrderItem[];

  status: "PENDING" | "DELIVERED" | "CANCELLED";

  createdAt: string;
  updatedAt?: string;

  address?: string;
};

type Status = "PENDING" | "DELIVERED" | "CANCELLED";

const statusText: Record<Status, string> = {
  PENDING: "Pending",
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled",
};

const PAGE_SIZE = 10;

export default function OrdersTable() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<Status>("PENDING");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [openFoodOrderId, setOpenFoodOrderId] = useState<string | null>(null);
  const [foodPopupPos, setFoodPopupPos] = useState<{
    top: number;
    left: number;
  } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [emailLetter, setEmailLetter] = useState("N");
  const foodPopupRef = useRef<HTMLDivElement>(null);

  const getOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_URL}/order`);

      if (!response.ok) {
        throw new Error("Orders авахад алдаа гарлаа");
      }

      const data = await response.json();
      setOrders(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Get orders error:", err);
      setError("Orders авахад алдаа гарлаа");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrders();
    const auth = getAuth();
    if (auth.email) {
      setEmailLetter(auth.email.charAt(0).toUpperCase());
    }
  }, []);

  useEffect(() => {
    if (!openFoodOrderId) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        foodPopupRef.current &&
        !foodPopupRef.current.contains(event.target as Node)
      ) {
        setOpenFoodOrderId(null);
        setFoodPopupPos(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openFoodOrderId]);

  const toggleOrder = (id: string) => {
    setSelectedOrders((current) =>
      current.includes(id)
        ? current.filter((orderId) => orderId !== id)
        : [...current, id],
    );
  };

  const allSelected =
    orders.length > 0 && selectedOrders.length === orders.length;

  const toggleAll = () => {
    if (allSelected) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(orders.map((order) => order._id));
    }
  };

  const openStatusModal = () => {
    if (selectedOrders.length === 0) return;

    const firstOrder = orders.find((order) => order._id === selectedOrders[0]);
    if (firstOrder) setSelectedStatus(firstOrder.status);
    setShowStatusModal(true);
  };

  const openSingleStatusModal = (order: Order) => {
    setSelectedOrders([order._id]);
    setSelectedStatus(order.status);
    setShowStatusModal(true);
  };

  const updateOrderStatus = async () => {
    if (selectedOrders.length === 0) return;

    try {
      setSaving(true);

      await Promise.all(
        selectedOrders.map(async (orderId) => {
          const response = await fetch(`${API_URL}/order`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: orderId, status: selectedStatus }),
          });

          if (!response.ok) {
            throw new Error(`Order update failed: ${orderId}`);
          }

          return response.json();
        }),
      );

      await getOrders();
      setSelectedOrders([]);
      setShowStatusModal(false);
    } catch (err) {
      console.error("Update order status error:", err);
      alert("Order status update хийхэд алдаа гарлаа");
    } finally {
      setSaving(false);
    }
  };

  const getCustomerName = (order: Order) =>
    order.user?.name || order.user?.username || order.user?.email || "Unknown";

  const formatDate = (date: string) => {
    if (!date) return "-";
    const parsedDate = new Date(date);
    if (Number.isNaN(parsedDate.getTime())) return date;
    return parsedDate.toLocaleDateString("en-CA");
  };

  const getStatusClass = (status: Status) => {
    if (status === "PENDING") return "border-[#EF4444] text-[#EF4444]";
    if (status === "DELIVERED") return "border-[#18BA51] text-[#18BA51]";
    return "border-[#D4D4D8] text-[#71717A]";
  };

  const totalPages = Math.max(1, Math.ceil(orders.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const pageStart = (safePage - 1) * PAGE_SIZE;
  const pageOrders = orders.slice(pageStart, pageStart + PAGE_SIZE);

  const selectedFoodOrder = orders.find((o) => o._id === openFoodOrderId);

  const getPageNumbers = (): (number | "ellipsis")[] => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (safePage <= 4) {
      return [1, 2, 3, 4, 5, "ellipsis", totalPages];
    }
    if (safePage >= totalPages - 3) {
      return [
        1,
        "ellipsis",
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }
    return [
      1,
      "ellipsis",
      safePage - 1,
      safePage,
      safePage + 1,
      "ellipsis",
      totalPages,
    ];
  };

  return (
    <>
      {/* Top-right avatar like Figma */}
      <div className="pointer-events-none absolute right-8 top-6 z-30">
        <div className="pointer-events-auto flex h-9 w-9 items-center justify-center rounded-full bg-[#EF4444] text-sm font-semibold text-white">
          {emailLetter}
        </div>
      </div>

      <section className="flex min-h-[calc(100vh-48px)] flex-col rounded-2xl bg-white p-6">
        <div className="mb-6 flex shrink-0 items-center justify-between">
          <div>
            <h1 className="text-[24px] font-semibold leading-none text-[#171717]">
              Orders
            </h1>
            <p className="mt-2 text-xs text-[#71717A]">{orders.length} items</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="flex h-9 items-center gap-2 rounded-full border border-[#E4E4E7] px-4 text-xs text-[#52525B]"
            >
              <span>▣</span>
              <span>13 June 2023 - 14 July 2023</span>
            </button>

            <button
              type="button"
              onClick={openStatusModal}
              disabled={selectedOrders.length === 0}
              className={`flex h-9 items-center gap-2 rounded-full px-4 text-xs font-medium transition ${
                selectedOrders.length > 0
                  ? "bg-[#171717] text-white hover:bg-black"
                  : "bg-[#E4E4E7] text-[#A1A1AA]"
              }`}
            >
              <span>Change delivery state</span>
              {selectedOrders.length > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1 text-[10px] text-[#171717]">
                  {selectedOrders.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-4 shrink-0 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-500">
            {error}
          </div>
        )}

        <div className="flex min-h-0 flex-1 flex-col rounded-xl border border-[#E4E4E7]">
          {/* Table rows stay at top — no row expansion */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-[#E4E4E7] bg-[#FAFAFA]">
                  <th className="w-[44px] px-4 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={allSelected}
                      onChange={toggleAll}
                      className="h-4 w-4 cursor-pointer accent-[#171717]"
                    />
                  </th>
                  <th className="w-[60px] px-3 py-3 text-left text-xs font-medium text-[#71717A]">
                    №
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-[#71717A]">
                    Customer
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-[#71717A]">
                    Food
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-[#71717A]">
                    Date
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-[#71717A]">
                    Total
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-[#71717A]">
                    Delivery Address
                  </th>
                  <th className="w-[150px] px-3 py-3 text-left text-xs font-medium text-[#71717A]">
                    Delivery state
                  </th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  Array.from({ length: 5 }).map((_, index) => (
                    <tr key={index} className="border-b border-[#E4E4E7]">
                      <td colSpan={8} className="px-4 py-4">
                        <div className="h-4 w-full animate-pulse rounded bg-[#F4F4F5]" />
                      </td>
                    </tr>
                  ))
                ) : orders.length === 0 ? (
                  <tr>
                    <td
                      colSpan={8}
                      className="px-4 py-16 text-center text-sm text-[#71717A]"
                    >
                      No orders found
                    </td>
                  </tr>
                ) : (
                  pageOrders.map((order, index) => {
                    const isSelected = selectedOrders.includes(order._id);

                    return (
                      <tr
                        key={order._id}
                        className={`border-b border-[#E4E4E7] transition ${
                          isSelected ? "bg-[#FAFAFA]" : "hover:bg-[#FAFAFA]"
                        }`}
                      >
                        <td className="px-4 py-3">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleOrder(order._id)}
                            className="h-4 w-4 cursor-pointer accent-[#171717]"
                          />
                        </td>

                        <td className="px-3 py-3 text-xs text-[#52525B]">
                          {pageStart + index + 1}
                        </td>

                        <td className="px-3 py-3 text-xs text-[#52525B]">
                          {getCustomerName(order)}
                        </td>

                        <td className="px-3 py-3 text-xs text-[#52525B]">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (openFoodOrderId === order._id) {
                                setOpenFoodOrderId(null);
                                setFoodPopupPos(null);
                                return;
                              }
                              const rect =
                                e.currentTarget.getBoundingClientRect();
                              setFoodPopupPos({
                                top: rect.bottom + 6,
                                left: rect.left,
                              });
                              setOpenFoodOrderId(order._id);
                            }}
                            className="flex items-center gap-2 hover:text-[#171717]"
                          >
                            <span>
                              {order.foodOrderItems?.length || 0} foods
                            </span>
                            <span className="text-[10px] text-[#71717A]">
                              ⌄
                            </span>
                          </button>
                        </td>

                        <td className="px-3 py-3 text-xs text-[#52525B]">
                          {formatDate(order.createdAt)}
                        </td>

                        <td className="px-3 py-3 text-xs text-[#52525B]">
                          ${Number(order.totalprice || 0).toFixed(2)}
                        </td>

                        <td className="max-w-[220px] px-3 py-3 text-[11px] leading-4 text-[#71717A]">
                          {order.address || "Delivery address"}
                        </td>

                        <td className="px-3 py-3">
                          <button
                            type="button"
                            onClick={() => openSingleStatusModal(order)}
                            className={`inline-flex items-center gap-1 rounded-full border bg-white px-3 py-1 text-[11px] font-medium transition hover:bg-[#FAFAFA] ${getStatusClass(
                              order.status,
                            )}`}
                          >
                            {statusText[order.status]}
                            <span className="text-[10px]">⌄</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Empty space keeps pagination at bottom like Figma */}
          <div className="min-h-[120px] flex-1" />

          <div className="flex shrink-0 items-center justify-end gap-2 border-t border-[#E4E4E7] px-5 py-4">
            <button
              type="button"
              disabled={safePage <= 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="flex h-7 w-7 items-center justify-center rounded-full text-xs text-[#52525B] disabled:text-[#A1A1AA]"
            >
              ‹
            </button>

            {getPageNumbers().map((page, i) =>
              page === "ellipsis" ? (
                <span key={`e-${i}`} className="px-1 text-xs text-[#A1A1AA]">
                  ...
                </span>
              ) : (
                <button
                  key={page}
                  type="button"
                  onClick={() => setCurrentPage(page)}
                  className={`flex h-7 w-7 items-center justify-center rounded-full text-xs ${
                    page === safePage
                      ? "bg-[#171717] text-white"
                      : "text-[#52525B] hover:bg-[#F4F4F5]"
                  }`}
                >
                  {page}
                </button>
              ),
            )}

            <button
              type="button"
              disabled={safePage >= totalPages}
              onClick={() =>
                setCurrentPage((p) => Math.min(totalPages, p + 1))
              }
              className="flex h-7 w-7 items-center justify-center rounded-full text-xs text-[#52525B] disabled:text-[#A1A1AA]"
            >
              ›
            </button>
          </div>
        </div>
      </section>

      {/* Floating food detail — Figma hover card */}
      {selectedFoodOrder && foodPopupPos && (
        <div
          ref={foodPopupRef}
          className="fixed z-[80] w-[263px] rounded-[6px] border border-[#E4E4E7] bg-white p-3 shadow-[0_4px_16px_rgba(0,0,0,0.08)]"
          style={{ top: foodPopupPos.top, left: foodPopupPos.left }}
        >
          {(selectedFoodOrder.foodOrderItems || []).length === 0 ? (
            <p className="text-xs text-[#71717A]">No foods</p>
          ) : (
            <div className="flex flex-col gap-3">
              {selectedFoodOrder.foodOrderItems.map((item, i) => (
                <div
                  key={`${selectedFoodOrder._id}-${item.foodId?._id || i}`}
                  className="flex items-center gap-3"
                >
                  {item.foodId?.image ? (
                    <Image
                      src={item.foodId.image}
                      alt={item.foodId.foodName || "Food"}
                      width={32}
                      height={32}
                      className="h-8 w-8 shrink-0 rounded object-cover"
                    />
                  ) : (
                    <div className="h-8 w-8 shrink-0 rounded bg-[#F4F4F5]" />
                  )}
                  <span className="min-w-0 flex-1 truncate text-xs text-[#18181B]">
                    {item.foodId?.foodName || "Food"}
                  </span>
                  <span className="shrink-0 text-xs text-[#71717A]">
                    x {item.quantity}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {showStatusModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30">
          <div className="w-[364px] rounded-xl bg-white p-6 shadow-xl">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-sm font-medium text-[#171717]">
                Change delivery state
              </h2>
              <button
                type="button"
                onClick={() => setShowStatusModal(false)}
                disabled={saving}
                className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F4F4F5] text-xs text-[#71717A]"
              >
                ×
              </button>
            </div>

            <div className="mb-6 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => setSelectedStatus("DELIVERED")}
                className={`rounded-full border px-4 py-2 text-[11px] font-medium transition ${
                  selectedStatus === "DELIVERED"
                    ? "border-[#EF4444] text-[#EF4444]"
                    : "border-[#E4E4E7] text-[#52525B]"
                }`}
              >
                Delivered
              </button>
              <button
                type="button"
                onClick={() => setSelectedStatus("PENDING")}
                className={`rounded-full border px-4 py-2 text-[11px] font-medium transition ${
                  selectedStatus === "PENDING"
                    ? "border-[#EF4444] text-[#EF4444]"
                    : "border-[#E4E4E7] text-[#52525B]"
                }`}
              >
                Pending
              </button>
              <button
                type="button"
                onClick={() => setSelectedStatus("CANCELLED")}
                className={`rounded-full border px-4 py-2 text-[11px] font-medium transition ${
                  selectedStatus === "CANCELLED"
                    ? "border-[#EF4444] text-[#EF4444]"
                    : "border-[#E4E4E7] text-[#52525B]"
                }`}
              >
                Cancelled
              </button>
            </div>

            <button
              type="button"
              onClick={updateOrderStatus}
              disabled={saving}
              className="h-10 w-full rounded-full bg-[#171717] text-xs font-medium text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
