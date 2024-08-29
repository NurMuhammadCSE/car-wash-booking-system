import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "@/redux/hooks";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { user } = useAppSelector((state) => state.user);
  const location = useLocation();

  // Check if the user is authenticated
  if (user.userId) {
    return <>{children}</>;
  }

  // Redirect to login page if not authenticated
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
