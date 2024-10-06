// src/layout/AdminLayout.tsx
import AdminSidebar from "@/pages/AdminDashboard/AdminSidebar";
import React from "react";
import { Outlet } from "react-router-dom";

const AdminLayout: React.FC = () => {
  return (
    <div className="flex">
      <AdminSidebar />
      {/* <Statistics></Statistics> */}
      <div className="flex-1 p-6 overflow-y-auto h-screen bg-gray-100">
        <h1 className="text-center text-3xl font-extrabold text-[#30415A] mb-6">
          Welcome to Admin Dashboard
        </h1>
        <div className="bg-white p-4 rounded-lg shadow">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
