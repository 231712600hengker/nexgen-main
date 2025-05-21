'use client';

import { Suspense } from "react";
import HomePageChart from "@/components/dashboard/charts/HomePageChart";
import ProductOverviewChart from "@/components/dashboard/charts/ProductOverviewChart";
import RecentOrdersSection from "@/components/dashboard/order/RecentOrders";
import StatisticsCard from "@/components/dashboard/statistics/StatisticsCard";
import { Activity, DollarSign, ShoppingBag, Users } from "lucide-react";

import { StatisticsCardSkeleton } from "@/components/dashboard/statistics/StatisticsCardSkeleton";
import { ChartSkeleton } from "@/components/dashboard/charts/ChartSkeleton";
import { OrdersTableSkeleton } from "@/components/dashboard/order/OrderSkeleton";

// Helper untuk delay (simulasi fetch)
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Wrapper async component untuk delay seluruh group statistik sekaligus
async function DelayedStatisticsCards() {
  await delay(1000); // delay 1 detik
  return (
    <div className="grid gap-2 lg:gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-4">
      <StatisticsCard iconColor="bg-rose-500" title="Revenue" value="$10,000" icon={DollarSign} />
      <StatisticsCard iconColor="bg-lime-500" title="Sales" value="$1,000" icon={ShoppingBag} />
      <StatisticsCard iconColor="bg-rose-500" title="Orders" value="$4,000" icon={Activity} />
      <StatisticsCard iconColor="bg-violet-500" title="Customers" value="500" icon={Users} />
    </div>
  );
}

async function DelayedHomePageChart() {
  await delay(1500); // delay 1.5 detik
  return <HomePageChart />;
}

async function DelayedRecentOrdersSection() {
  await delay(2000); // delay 2 detik
  return <RecentOrdersSection />;
}

async function DelayedProductOverviewChart() {
  await delay(2500); // delay 2.5 detik
  return <ProductOverviewChart />;
}

const DashboardPageOne = () => {
  return (
    <section className="max-w-screen-xl mx-auto py-4">
      <Suspense fallback={<StatisticsCardSkeleton />}>
        <DelayedStatisticsCards />
      </Suspense>

      <Suspense fallback={<ChartSkeleton />}>
        <DelayedHomePageChart />
      </Suspense>

      <Suspense fallback={<OrdersTableSkeleton />}>
        <DelayedRecentOrdersSection />
      </Suspense>

      <Suspense fallback={<ChartSkeleton />}>
        <DelayedProductOverviewChart />
      </Suspense>
    </section>
  );
};

export default DashboardPageOne;
