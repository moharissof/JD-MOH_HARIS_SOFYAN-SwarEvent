import DashboardLayout from "@/components/dashboard/main-layout";
import React from "react";

export default function layoutDashboard({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
