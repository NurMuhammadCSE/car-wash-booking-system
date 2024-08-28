import React from "react";
import SlotManagement from "@/components/SlotManagement/SlotManagement";
import ServiceManagement from "@/pages/AdminDashboard/ServiceManagement/ServiceManagement";
import UserManagement from "@/components/UserManagement/UserManagement";

const AdminDashboard: React.FC = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Admin Dashboard</h1>
      <ServiceManagement />
      <SlotManagement />
      <UserManagement />
    </div>
  );
};

export default AdminDashboard;
