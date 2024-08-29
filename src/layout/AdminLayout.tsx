import AdminSidebar from "@/pages/AdminDashboard/AdminSidebar";
import React from "react";
import { Outlet } from "react-router-dom";

const AdminLayout: React.FC = () => {
  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 p-6 overflow-y-auto h-screen">
        <h1 className="text-center text-3xl font-extrabold">Welcome to admin Dashboard</h1>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
