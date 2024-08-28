import NotFound from "@/components/NotFound/NotFound";
import Main from "@/layout/Main";
import Booking from "@/pages/Booking/Booking";
import Home from "@/pages/Home/Home/Home";
import Login from "@/pages/Login/Login";
import ServiceDetails from "@/pages/ServiceDetails/ServiceDetails";
import Services from "@/pages/Services/Services";
import SignUp from "@/pages/SignUp/SignUp";
import SuccessPage from "@/pages/Success/Success";
import { createBrowserRouter } from "react-router-dom";
import Dashboard from "@/pages/Dashboard/Dashboard";
import ServiceManagement from "@/pages/AdminDashboard/ServiceManagement/ServiceManagement";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <NotFound></NotFound>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>,
      },
      {
        path: "/services",
        element: <Services></Services>,
      },
      {
        path: "/services/:id",
        element: <ServiceDetails></ServiceDetails>,
      },
      {
        path: "/booking/:serviceId/:slotId",
        element: <Booking></Booking>,
      },
      {
        path: "/dashboard",
        element: <Dashboard></Dashboard>,
      },
      {
        path: "/success",
        element: <SuccessPage></SuccessPage>,
      },
      //! DON'T USE
      {
        path: "/service",
        element: <ServiceManagement></ServiceManagement>,
      },
    ],
  },
]);

export default router;
