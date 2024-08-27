import NotFound from "@/components/NotFound/NotFound";
import Main from "@/layout/Main";
import Booking from "@/pages/Booking/Booking";
import UserDashboard from "@/pages/Dashboard/UserDashboard";
import Home from "@/pages/Home/Home/Home";
import Login from "@/pages/Login/Login";
import ServiceDetails from "@/pages/ServiceDetails/ServiceDetails";
import Services from "@/pages/Services/Services";
import SignUp from "@/pages/SignUp/SignUp";
import SuccessPage from "@/pages/Success/Success";
import { createBrowserRouter } from "react-router-dom";

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
        element: <UserDashboard></UserDashboard>,
      },
      {
        path: "/dashboard",
        element: <UserDashboard></UserDashboard>,
      },
      {
        path: "/success",
        element: <SuccessPage></SuccessPage>,
      },
    ],
  },
]);

export default router;
