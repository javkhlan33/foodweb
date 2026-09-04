"use client";

import Sidebar from "../_components/sidebar";
import OrdersTable from "../_components/orders-table";

export default function OrdersPage() {
  return (
    <div className="relative min-h-screen bg-[#F4F4F5]">
      <Sidebar />

      <main className="ml-[245px] min-h-screen p-6">
        <OrdersTable />
      </main>
    </div>
  );
}
