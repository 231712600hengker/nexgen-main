"use client";

import { useEffect, useState } from "react";
import OrderActions from "@/components/dashboard/order/OrderActions";
import OrderSearch from "@/components/dashboard/order/OrderSearch";
import Pagination from "@/components/others/Pagination";
import { Skeleton } from "@/components/ui/skeleton"; // sesuaikan path sesuai strukturmu

type Order = {
  id: number;
  orderNumber: string;
  customerName: string;
  date: string;
  status: string;
};

// ✅ Skeleton row untuk order
function OrderSkeleton() {
  return (
    <tr className="bg-white dark:bg-gray-800">
      <td className="px-6 py-4 whitespace-nowrap"><Skeleton className="h-4 w-24" /></td>
      <td className="px-6 py-4 whitespace-nowrap"><Skeleton className="h-4 w-32" /></td>
      <td className="px-6 py-4 whitespace-nowrap"><Skeleton className="h-4 w-20" /></td>
      <td className="px-6 py-4 whitespace-nowrap"><Skeleton className="h-4 w-16" /></td>
      <td className="px-6 py-4 whitespace-nowrap"><Skeleton className="h-8 w-20" /></td>
    </tr>
  );
}

const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("/api/orders");
        if (!res.ok) throw new Error("Failed to fetch orders");
        const data = await res.json();
        setOrders(data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="max-w-screen-xl mx-auto w-full bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 my-4">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Orders
        </h2>
        <OrderSearch />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full w-full divide-y divide-gray-200 dark:divide-gray-700 border dark:border-gray-500 rounded-md">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium">Order Number</th>
              <th className="px-6 py-3 text-left text-xs font-medium">Customer Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {loading
              ? Array.from({ length: 5 }).map((_, i) => <OrderSkeleton key={i} />)
              : orders.map((order) => (
                  <tr key={order.id} className="bg-white dark:bg-gray-800">
                    <td className="px-6 py-4 whitespace-nowrap">{order.orderNumber}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{order.customerName}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{order.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          order.status === "Shipped"
                            ? "bg-green-100 text-green-800"
                            : order.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <OrderActions />
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
        <Pagination currentPage={1} pageName="orderpage" totalPages={10} />
      </div>
    </div>
  );
};

export default OrdersPage;
