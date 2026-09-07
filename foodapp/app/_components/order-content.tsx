"use client";

import type { Order } from "./cart-sheet";

export default function OrderContent({ orders }: { orders: Order[] }) {
  return (
    <div className="flex min-h-0 flex-1 flex-col rounded-[16px] bg-white p-4">
      <h2 className="mb-3 text-[16px] font-semibold">Order history</h2>

      {orders.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center rounded-xl bg-[#F4F4F5]">
          <div className="text-4xl">🍽️</div>

          <p className="mt-3 text-sm font-semibold">No Orders Yet?</p>

          <p className="mt-1 max-w-[250px] text-center text-xs text-[#71717A]">
            You haven't placed any orders yet. Start exploring our menu and
            satisfy your cravings!
          </p>
        </div>
      ) : (
        <div className="overflow-y-auto">
          {orders.map((order) => (
            <div key={order.id} className="border-b border-[#E4E4E7] py-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold">
                  ${order.total.toFixed(2)} ({order.id})
                </span>

                <span className="rounded-full border border-[#F04444] px-2 py-1 text-[10px] text-[#F04444]">
                  {order.status === "DELIVERED"
                    ? "Delivered"
                    : order.status === "CANCELLED"
                      ? "Cancelled"
                      : "Pending"}
                </span>
              </div>

              <div className="mt-3 space-y-1">
                {order.items.map((item) => (
                  <div
                    key={item._id}
                    className="flex justify-between text-xs text-[#71717A]"
                  >
                    <span>
                      {item.foodName} × {item.quantity}
                    </span>

                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <p className="mt-3 text-[10px] text-[#A1A1AA]">{order.date}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
