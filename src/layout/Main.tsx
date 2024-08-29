import Footer from "@/pages/shared/Footer/Footer";
import Navbar from "@/pages/shared/Navbar/Navbar";
import { Outlet } from "react-router-dom";

const Main = () => {
  const noHeaderFooter =
    location.pathname.includes("login") || location.pathname.includes("signup");

  return (
    <div className="">
      {noHeaderFooter || <Navbar></Navbar>}
      <div className=" min-h-[calc(100vh-68px)]">
        <Outlet />
      </div>
      {noHeaderFooter || <Footer></Footer>}
    </div>
  );
};

export default Main;
