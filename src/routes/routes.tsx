import NotFound from "@/components/NotFound/NotFound";
import Main from "@/layout/Main";
import Booking from "@/pages/Booking/Booking";
import Home from "@/pages/Home/Home/Home";
import Login from "@/pages/Login/Login";
import ServiceDetails from "@/pages/ServiceDetails/ServiceDetails";
import Services from "@/pages/Services/Services";
import SignUp from "@/pages/SignUp/SignUp";
import Dashboard from "@/pages/Dashboard/Dashboard";
import ServiceManagement from "@/pages/AdminDashboard/ServiceManagement/ServiceManagement";
import AdminLayout from "@/layout/AdminLayout";
import { createBrowserRouter } from "react-router-dom";
import SlotManagement from "@/components/SlotManagement/SlotManagement";
import UserManagement from "@/components/UserManagement/UserManagement";
import BookingList from "@/components/UserManagement/BookingList";
import UpdateProfile from "@/components/UpdateProfiles/UpdateProfiles";
import AllReviews from "@/pages/Home/Reviews/AllReviews";
import PrivateRoute from "./PrivateRoutes";
import MyBookings from "@/pages/Booking/MyBookings";
import Statistics from "@/pages/AdminDashboard/Statistics/Statistics";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: "services", element: <Services /> },
      {
        path: "services/:id",
        element: (
          // <PrivateRoute>
            <ServiceDetails />
          // </PrivateRoute>
        ),
      },
      {
        path: "booking/:serviceId/:slotId",
        element: (
          <PrivateRoute>
            <Booking />
          </PrivateRoute>
        ),
      },
      {
        path: "update-profile",
        element: (
          <PrivateRoute>
            <UpdateProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "booking",
        element: (
          <PrivateRoute>
            <MyBookings />
          </PrivateRoute>
        ),
      },
      { path: "reviews", element: <AllReviews /> },
      {
        path: "dashboard",
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
        children: [
          {
            index: true,
            element: (
              <PrivateRoute>
                <Statistics />
              </PrivateRoute>
            ),
          },
        ],
      },

      {
        path: "/admin",
        element: (
          <PrivateRoute>
            <AdminLayout />
          </PrivateRoute>
        ),
        errorElement: <NotFound />,
        children: [
          {
            path: "services",
            element: (
              <PrivateRoute>
                <ServiceManagement />
              </PrivateRoute>
            ),
          },
          {
            path: "slots",
            element: (
              <PrivateRoute>
                <SlotManagement />
              </PrivateRoute>
            ),
          },
          {
            path: "users",
            element: (
              <PrivateRoute>
                <UserManagement />
              </PrivateRoute>
            ),
          },
          {
            path: "bookings",
            element: (
              <PrivateRoute>
                <BookingList />
              </PrivateRoute>
            ),
          },
        ],
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
  // {
  //   path: "/admin",
  //   element: <AdminLayout />,
  //   errorElement: <NotFound />,
  //   children: [
  //     { path: "services", element: <ServiceManagement /> },
  //     { path: "slots", element: <SlotManagement /> },
  //     { path: "users", element: <UserManagement /> },
  //     { path: "bookings", element: <BookingList /> },
  //     // Additional admin routes can be added here
  //   ],
  // },
]);

export default router;
