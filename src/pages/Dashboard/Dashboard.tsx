import { useAppSelector } from "@/redux/hooks";
import React from "react";
import AdminDashboard from "../AdminDashboard/AdminDashboard";
import UserDashboard from "../UserDashboard/UserDashboard";

const Dashboard = () => {
  const { user } = useAppSelector((state) => state.user);
  return (
    <div>
      {user.role === "admin" ? (
        <AdminDashboard></AdminDashboard>
      ) : (
        <UserDashboard></UserDashboard>
      )}
    </div>
  );
};

export default Dashboard;
