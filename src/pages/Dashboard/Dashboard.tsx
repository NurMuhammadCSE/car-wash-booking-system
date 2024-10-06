import React from "react";
import { useAppSelector } from "@/redux/hooks";
import UserDashboard from "@/pages/UserDashboard/UserDashboard";
import AdminLayout from "@/layout/AdminLayout";

const Dashboard: React.FC = () => {
  const { user } = useAppSelector((state) => state.user);

  return (
    <div>
      {user.role === "admin" ? <AdminLayout /> : <UserDashboard />}
    </div>
  );
};

export default Dashboard;
