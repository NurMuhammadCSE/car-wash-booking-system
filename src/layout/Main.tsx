import Footer from "@/pages/shared/Footer/Footer";
import Navbar from "@/pages/shared/Navbar/Navbar";
import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <div className="min-h-screen w-full mx-auto">
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default Main;
