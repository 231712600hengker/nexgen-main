"use client";

import { useEffect, useState } from "react";
import DashboardPageOne from "@/components/pages/dashboard-pages/DashboardPageOne";
import DashboardPageSkeleton from "@/components/pages/dashboard-pages/DashboardPageSkeleton"; // Sesuaikan path

const DashboardPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulasi delay (bisa diganti dengan fetch ke API)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="w-full">
      {loading ? <DashboardPageSkeleton /> : <DashboardPageOne />}
    </main>
  );
};

export default DashboardPage;
