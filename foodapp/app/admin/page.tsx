"use client";

import { useState } from "react";
import Image from "next/image";

type Order = {
  id: number;
  customer: string;
  food: string;
  date: string;
  total: string;
  address: string;
  status: "Pending" | "Delivered" | "Cancelled";
};

const orders: Order[] = [
  {
    id: 1,
    customer: "Amgalan",
    food: "2 foods",
    date: "2024/12/20",
    total: "$26.97",
    address: "2024/12/СБД, 12-р хороолол, СБД нэгдсэн эмнэлэг",
    status: "Pending",
  },
  {
    id: 2,
    customer: "Test@gamil.com",
    food: "2 foods",
    date: "2024/12/20",
    total: "$26.97",
    address: "2024/12/СБД, 12-р хороолол, СБД нэгдсэн эмнэлэг",
    status: "Pending",
  },
  {
    id: 3,
    customer: "Test@gamil.com",
    food: "2 foods",
    date: "2024/12/20",
    total: "$26.97",
    address: "2024/12/СБД, 12-р хороолол, СБД нэгдсэн эмнэлэг",
    status: "Pending",
  },
  {
    id: 4,
    customer: "Test@gamil.com",
    food: "2 foods",
    date: "2024/12/20",
    total: "$26.97",
    address: "2024/12/СБД, 12-р хороолол, СБД нэгдсэн эмнэлэг",
    status: "Delivered",
  },
  {
    id: 5,
    customer: "Test@gamil.com",
    food: "2 foods",
    date: "2024/12/20",
    total: "$26.97",
    address: "2024/12/СБД, 12-р хороолол, СБД нэгдсэн эмнэлэг",
    status: "Delivered",
  },
  {
    id: 6,
    customer: "Test@gamil.com",
    food: "2 foods",
    date: "2024/12/20",
    total: "$26.97",
    address: "2024/12/СБД, 12-р хороолол, СБД нэгдсэн эмнэлэг",
    status: "Delivered",
  },
  {
    id: 7,
    customer: "Test@gamil.com",
    food: "2 foods",
    date: "2024/12/20",
    total: "$26.97",
    address: "2024/12/СБД, 12-р хороолол, СБД нэгдсэн эмнэлэг",
    status: "Delivered",
  },
  {
    id: 8,
    customer: "Test@gamil.com",
    food: "2 foods",
    date: "2024/12/20",
    total: "$26.97",
    address: "2024/12/СБД, 12-р хороолол, СБД нэгдсэн эмнэлэг",
    status: "Cancelled",
  },
  {
    id: 9,
    customer: "Test@gamil.com",
    food: "2 foods",
    date: "2024/12/20",
    total: "$26.97",
    address: "2024/12/СБД, 12-р хороолол, СБД нэгдсэн эмнэлэг",
    status: "Cancelled",
  },
  {
    id: 10,
    customer: "Test@gamil.com",
    food: "2 foods",
    date: "2024/12/20",
    total: "$26.97",
    address: "2024/12/СБД, 12-р хороолол, СБД нэгдсэн эмнэлэг",
    status: "Cancelled",
  },
  {
    id: 11,
    customer: "Test@gamil.com",
    food: "2 foods",
    date: "2024/12/20",
    total: "$26.97",
    address: "2024/12/СБД, 12-р хороолол, СБД нэгдсэн эмнэлэг",
    status: "Cancelled",
  },
  {
    id: 12,
    customer: "Test@gamil.com",
    food: "2 foods",
    date: "2024/12/20",
    total: "$26.97",
    address: "2024/12/СБД, 12-р хороолол, СБД нэгдсэн эмнэлэг",
    status: "Cancelled",
  },
];

export default function AdminPage() {
  const [activeButton, setActiveButton] = useState("orders");

  const [selectedOrders, setSelectedOrders] = useState<number[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedStatus, setSelectedStatus] =
    useState<Order["status"]>("Pending");

  const toggleOrder = (id: number) => {
    setSelectedOrders((prev) =>
      prev.includes(id)
        ? prev.filter((orderId) => orderId !== id)
        : [...prev, id],
    );
  };

  const toggleAllOrders = () => {
    if (selectedOrders.length === orders.length) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(orders.map((order) => order.id));
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f7f7] p-6">
      <div className="mx-auto flex max-w-[1440px] gap-6">
        {/* ================= SIDEBAR ================= */}

        <aside className="flex h-[calc(100vh-48px)] w-[205px] shrink-0 flex-col items-center gap-8 rounded-[20px] bg-white p-4">
          {/* Logo */}

          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="logo" width={40} height={40} />

            <div className="flex flex-col">
              <span className="text-[18px] font-bold leading-[20px] text-[#111827]">
                NomNom
              </span>

              <span className="text-[11px] leading-[14px] text-gray-400">
                Swift delivery
              </span>
            </div>
          </div>

          {/* Sidebar buttons */}

          <div className="flex w-full flex-col gap-1">
            <button
              onClick={() => setActiveButton("food")}
              className={`flex h-10 w-full items-center gap-2 rounded-lg px-4 text-left ${
                activeButton === "food"
                  ? "bg-[#171717] text-white"
                  : "bg-white text-[#111827]"
              }`}
            >
              <Image src="/4-4.png" alt="Food menu" width={20} height={20} />

              <span className="text-sm font-medium">Food menu</span>
            </button>

            <button
              onClick={() => setActiveButton("orders")}
              className={`flex h-10 w-full items-center gap-2 rounded-lg px-4 text-left ${
                activeButton === "orders"
                  ? "bg-[#171717] text-white"
                  : "bg-white text-[#111827]"
              }`}
            >
              <Image src="/Truck.png" alt="Orders" width={20} height={20} />

              <span className="text-sm font-medium">Orders</span>
            </button>
          </div>
        </aside>

        {/* ================= MAIN ================= */}

        <main className="min-w-0 flex-1">
          {/* Avatar */}

          <div className="mb-6 flex justify-end">
            <Image src="/Avatar.png" alt="profile" width={38} height={38} />
          </div>

          {/* Orders card */}

          <section className="rounded-[20px] bg-white p-6">
            {/* Header */}

            <div className="mb-6 flex items-center justify-between">
              <div>
                <h1 className="text-[24px] font-bold text-[#111827]">Orders</h1>

                <p className="text-sm text-gray-400">32 items</p>
              </div>

              <div className="flex items-center gap-3">
                {/* Date */}

                <button className="flex h-10 items-center gap-2 rounded-full border border-gray-200 px-4 text-sm text-gray-600">
                  <span>▣</span>
                  <span>13 June 2023 - 14 July 2023</span>
                </button>

                {/* Change delivery state */}

                <button
                  onClick={() => setIsModalOpen(true)}
                  disabled={selectedOrders.length === 0}
                  className="flex h-10 items-center gap-2 rounded-full bg-[#171717] px-4 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Change delivery state
                  {selectedOrders.length > 0 && (
                    <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1 text-xs text-black">
                      {selectedOrders.length}
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* ================= TABLE ================= */}

            <div className="overflow-hidden rounded-xl border border-gray-200">
              {/* Table header */}

              <div className="grid grid-cols-[50px_50px_1.4fr_1fr_1fr_1fr_2fr_1.1fr] items-center border-b border-gray-200 bg-white px-4 py-3 text-xs font-medium text-gray-400">
                <div>
                  <input
                    type="checkbox"
                    checked={selectedOrders.length === orders.length}
                    onChange={toggleAllOrders}
                    className="h-4 w-4"
                  />
                </div>

                <div>№</div>
                <div>Customer</div>
                <div>Food</div>
                <div>Date</div>
                <div>Total</div>
                <div>Delivery Address</div>
                <div>Delivery state</div>
              </div>

              {/* Table rows */}

              {orders.map((order) => (
                <div
                  key={order.id}
                  className={`grid grid-cols-[50px_50px_1.4fr_1fr_1fr_1fr_2fr_1.1fr] items-center border-b border-gray-100 px-4 py-3 text-sm ${
                    selectedOrders.includes(order.id)
                      ? "bg-gray-100"
                      : "bg-white"
                  }`}
                >
                  {/* Checkbox */}

                  <div>
                    <input
                      type="checkbox"
                      checked={selectedOrders.includes(order.id)}
                      onChange={() => toggleOrder(order.id)}
                      className="h-4 w-4"
                    />
                  </div>

                  {/* Number */}

                  <div className="text-gray-500">{order.id}</div>

                  {/* Customer */}

                  <div className="truncate pr-4 text-gray-600">
                    {order.customer}
                  </div>

                  {/* Food */}

                  <div className="text-gray-600">{order.food}</div>

                  {/* Date */}

                  <div className="text-gray-500">{order.date}</div>

                  {/* Total */}

                  <div className="text-gray-600">{order.total}</div>

                  {/* Address */}

                  <div className="pr-6 text-xs leading-4 text-gray-500">
                    {order.address}
                  </div>

                  {/* Status */}

                  <div>
                    <button
                      className={`rounded-full border px-3 py-1 text-xs font-medium ${
                        order.status === "Pending"
                          ? "border-red-300 text-gray-700"
                          : order.status === "Delivered"
                            ? "border-green-300 text-gray-700"
                            : "border-gray-300 text-gray-700"
                      }`}
                    >
                      {order.status} ↕
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* ================= PAGINATION ================= */}

            <div className="mt-6 flex justify-end">
              <div className="flex items-center gap-2">
                <button className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400">
                  ‹
                </button>

                <button className="flex h-8 w-8 items-center justify-center rounded-full bg-[#171717] text-sm text-white">
                  1
                </button>

                {[2, 3, 4, 5].map((page) => (
                  <button
                    key={page}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-sm text-gray-600 hover:bg-gray-100"
                  >
                    {page}
                  </button>
                ))}

                <span className="px-1 text-gray-400">...</span>

                <button className="flex h-8 w-8 items-center justify-center rounded-full text-sm text-gray-600 hover:bg-gray-100">
                  10
                </button>

                <button className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400">
                  ›
                </button>
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* ================= MODAL ================= */}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="w-[364px] rounded-xl bg-white p-6 shadow-xl">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-gray-800">
                Change delivery state
              </h2>

              <button
                onClick={() => setIsModalOpen(false)}
                className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 text-gray-500"
              >
                ×
              </button>
            </div>

            <div className="mb-6 flex items-center justify-between rounded-full bg-gray-100 p-1">
              {(["Delivered", "Pending", "Cancelled"] as Order["status"][]).map(
                (status) => (
                  <button
                    key={status}
                    onClick={() => setSelectedStatus(status)}
                    className={`rounded-full px-4 py-2 text-xs ${
                      selectedStatus === status
                        ? "bg-white shadow-sm"
                        : "text-gray-500"
                    }`}
                  >
                    {status}
                  </button>
                ),
              )}
            </div>

            <button
              onClick={() => setIsModalOpen(false)}
              className="h-10 w-full rounded-full bg-[#171717] text-sm font-medium text-white"
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
