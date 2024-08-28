import NotFound from "@/components/NotFound/NotFound";
import Main from "@/layout/Main";
import Booking from "@/pages/Booking/Booking";
import Home from "@/pages/Home/Home/Home";
import Login from "@/pages/Login/Login";
import ServiceDetails from "@/pages/ServiceDetails/ServiceDetails";
import Services from "@/pages/Services/Services";
import SignUp from "@/pages/SignUp/SignUp";
import SuccessPage from "@/pages/Success/Success";
import Dashboard from "@/pages/Dashboard/Dashboard";
import ServiceManagement from "@/pages/AdminDashboard/ServiceManagement/ServiceManagement";
import AdminLayout from "@/layout/AdminLayout";
import { createBrowserRouter } from "react-router-dom";
import SlotManagement from "@/components/SlotManagement/SlotManagement";
import UserManagement from "@/components/UserManagement/UserManagement";
import BookingList from "@/components/UserManagement/BookingList";
import UpdateProfile from "@/components/UpdateProfiles/UpdateProfiles";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <SignUp /> },
      { path: "services", element: <Services /> },
      { path: "services/:id", element: <ServiceDetails /> },
      { path: "booking/:serviceId/:slotId", element: <Booking /> },
      { path: "update-profile", element: <UpdateProfile /> },
      { path: "success", element: <SuccessPage /> },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    errorElement: <NotFound />,
    children: [
      { path: "services", element: <ServiceManagement /> },
      { path: "slots", element: <SlotManagement /> },
      { path: "users", element: <UserManagement /> },
      { path: "bookings", element: <BookingList /> },
      // Additional admin routes can be added here
    ],
  },
]);

export default router;
