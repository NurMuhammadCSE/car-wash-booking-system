import Footer from "@/pages/shared/Footer/Footer";
import Navbar from "@/pages/shared/Navbar/Navbar";
import { Outlet } from "react-router-dom";

const Main = () => {
  const noHeaderFooter =
    location.pathname.includes("login") || location.pathname.includes("signup");

  return (
    <div className="min-h-screen w-full mx-auto">
      {noHeaderFooter || <Navbar></Navbar>}
      <Outlet></Outlet>
      {noHeaderFooter || <Footer></Footer>}
    </div>
  );
};

export default Main;
