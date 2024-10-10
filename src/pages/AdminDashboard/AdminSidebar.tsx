// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import {
//   FaBars,
//   FaServicestack,
//   FaUser,
//   FaCalendarAlt,
//   FaBook,
//   FaHouseDamage,
// } from "react-icons/fa";

// const AdminSidebar: React.FC = () => {
//   const [isOpen, setIsOpen] = useState(true);
//   const [isMobile, setIsMobile] = useState(false);

//   // Check if the screen size is mobile or not
//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth <= 768); // Adjust this for tablets and mobile
//     };

//     handleResize(); // Initialize the state based on the current window size
//     window.addEventListener("resize", handleResize);

//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);

//   const toggleSidebar = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <div
//       // className={`flex flex-col ${
//       //   isOpen ? "w-64" : isMobile ? "w-0" : "w-16"
//       // } bg-[#30415A] text-white h-screen transition-all duration-300 fixed md:relative z-50`}

//       className={`fixed top-0 left-0 h-screen bg-[#30415A] text-white transition-all duration-300 z-50 ${
//         isOpen ? "w-64" : isMobile ? "w-0" : "w-16"
//       }`}

//     >
//       {/* Sidebar Header */}
//       <div className="flex items-center justify-between p-4">
//         <div className="text-xl font-bold">{isOpen && "Admin Dashboard"}</div>
//         <button
//           onClick={toggleSidebar}
//           className="text-white focus:outline-none"
//         >
//           <FaBars size={24} />
//         </button>
//       </div>
//       {/* Sidebar Links */}
//       <nav className="flex flex-col gap-4 p-4">
//         <Link
//           to="/admin/services"
//           className="flex items-center gap-2 p-2 rounded hover:bg-gray-700"
//           onClick={() => setIsOpen(false)} // Close sidebar on mobile when clicking
//         >
//           <FaServicestack size={24} />
//           {isOpen && <span>Service Management</span>}
//         </Link>
//         <Link
//           to="/admin/slots"
//           className="flex items-center gap-2 p-2 rounded hover:bg-gray-700"
//           onClick={() => setIsOpen(false)}
//         >
//           <FaCalendarAlt size={24} />
//           {isOpen && <span>Slot Management</span>}
//         </Link>
//         <Link
//           to="/admin/users"
//           className="flex items-center gap-2 p-2 rounded hover:bg-gray-700"
//           onClick={() => setIsOpen(false)}
//         >
//           <FaUser size={24} />
//           {isOpen && <span>User Management</span>}
//         </Link>
//         <Link
//           to="/admin/bookings"
//           className="flex items-center gap-2 p-2 rounded hover:bg-gray-700"
//           onClick={() => setIsOpen(false)}
//         >
//           <FaBook size={24} />
//           {isOpen && <span>Bookings Management</span>}
//         </Link>
//         <Link
//           to="/"
//           className="flex items-center gap-2 p-2 rounded hover:bg-gray-700"
//           onClick={() => setIsOpen(false)}
//         >
//           <FaHouseDamage size={24} />
//           {isOpen && <span>Home</span>}
//         </Link>
//       </nav>

//       {/* For mobile, overlay effect */}
//       {isMobile && isOpen && (
//         <div
//           className="fixed inset-0 bg-black opacity-50 z-40"
//           onClick={toggleSidebar} // Close sidebar when clicking outside
//         />
//       )}
//     </div>
//   );
// };

// export default AdminSidebar;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaBars,
  FaServicestack,
  FaUser,
  FaCalendarAlt,
  FaBook,
  FaHouseDamage,
} from "react-icons/fa";

const AdminSidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Check if the screen size is mobile or not
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust this for tablets and mobile
    };

    handleResize(); // Initialize the state based on the current window size
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Sidebar */}
      <div
        // className={`fixed top-0 left-0 h-screen bg-[#30415A] text-white transition-all duration-300 z-50 ${
        //   isOpen ? "w-64" : isMobile ? "w-0" : "w-16"
        // }`}

        className={`flex flex-col ${
          isOpen ? "w-64" : isMobile ? "w-0" : "w-16"
        } bg-[#30415A] text-white h-screen transition-all duration-300 fixed md:relative z-50`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between px-2 p-4">
          <div className="text-xl font-bold">{isOpen && "Admin Dashboard"}</div>
          <button
            onClick={toggleSidebar}
            className="text-white focus:outline-none"
          >
            <FaBars size={24} />
          </button>
        </div>
        {/* Sidebar Links */}
        <nav className="flex flex-col gap-4 p-4">
          <Link
            to="/admin/services"
            className="flex items-center gap-2 p-2 rounded hover:bg-gray-700"
            onClick={() => setIsOpen(false)} // Close sidebar on mobile when clicking
          >
            <FaServicestack size={24} />
            {isOpen && <span>Service Management</span>}
          </Link>
          <Link
            to="/admin/slots"
            className="flex items-center gap-2 p-2 rounded hover:bg-gray-700"
            onClick={() => setIsOpen(false)} // Close sidebar on mobile when clicking
          >
            <FaCalendarAlt size={24} />
            {isOpen && <span>Slot Management</span>}
          </Link>
          <Link
            to="/admin/users"
            className="flex items-center gap-2 p-2 rounded hover:bg-gray-700"
            onClick={() => setIsOpen(false)} // Close sidebar on mobile when clicking
          >
            <FaUser size={24} />
            {isOpen && <span>User Management</span>}
          </Link>
          <Link
            to="/admin/bookings"
            className="flex items-center gap-2 p-2 rounded hover:bg-gray-700"
            onClick={() => setIsOpen(false)} // Close sidebar on mobile when clicking
          >
            <FaBook size={24} />
            {isOpen && <span>Bookings Management</span>}
          </Link>
          <Link
            to="/"
            className="flex items-center gap-2 p-2 rounded hover:bg-gray-700"
            onClick={() => setIsOpen(false)} // Close sidebar on mobile when clicking
          >
            <FaHouseDamage size={24} />
            {isOpen && <span>Home</span>}
          </Link>
        </nav>
      </div>

      {/* Overlay for mobile */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={toggleSidebar} // Close sidebar when clicking outside
        />
      )}
    </>
  );
};

export default AdminSidebar;
