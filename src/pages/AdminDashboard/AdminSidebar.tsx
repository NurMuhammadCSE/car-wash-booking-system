import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaServicestack, FaUser, FaCalendarAlt, FaBook, FaHouseDamage } from "react-icons/fa";

const AdminSidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`flex flex-col ${
        isOpen ? "w-64" : "w-16"
      } bg-[#30415A] text-white h-screen  transition-all duration-300`}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between p-4">
        <div className="text-xl font-bold">{isOpen && "Admin Dashboard"}</div>
        <button onClick={toggleSidebar} className="text-white focus:outline-none">
          <FaBars size={24} />
        </button>
      </div>
      {/* Sidebar Links */}
      <nav className="flex flex-col gap-4 p-4">
        <Link to="/admin/services" className="flex items-center gap-2 p-2 rounded hover:bg-gray-700">
          <FaServicestack size={24} />
          {isOpen && <span>Service Management</span>}
        </Link>
        <Link to="/admin/slots" className="flex items-center gap-2 p-2 rounded hover:bg-gray-700">
          <FaCalendarAlt size={24} />
          {isOpen && <span>Slot Management</span>}
        </Link>
        <Link to="/admin/users" className="flex items-center gap-2 p-2 rounded hover:bg-gray-700">
          <FaUser size={24} />
          {isOpen && <span>User Management</span>}
        </Link>
        <Link to="/admin/bookings" className="flex items-center gap-2 p-2 rounded hover:bg-gray-700">
          <FaBook size={24} />
          {isOpen && <span>Bookings Management</span>}
        </Link>
        <Link to="/" className="flex items-center gap-2 p-2 rounded hover:bg-gray-700">
          <FaHouseDamage size={24} />
          {isOpen && <span>Home</span>}
        </Link>
      </nav>
    </div>
  );
};

export default AdminSidebar;
