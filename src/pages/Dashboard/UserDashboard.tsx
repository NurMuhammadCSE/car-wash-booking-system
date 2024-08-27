// src/pages/UserDashboard.tsx
import React from "react";
import { useAppSelector } from "@/redux/hooks";
import { useNavigate } from "react-router-dom";
import Countdown from "react-countdown";
import { format } from "date-fns";

const UserDashboard = () => {
  const { user } = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  if (!user || user.role !== "user") {
    navigate("/"); // Redirect to home page if user is not logged in or not a "user"
    return null;
  }

  const pastBookings = [
    // Example data, replace with actual API data
    { id: 1, serviceName: "Car Wash", date: "2024-08-20", status: "Completed" },
    { id: 2, serviceName: "Interior Cleaning", date: "2024-08-21", status: "Completed" },
  ];

  const upcomingBookings = [
    // Example data, replace with actual API data
    { id: 3, serviceName: "Exterior Cleaning", date: "2024-09-01T10:00:00Z" },
    { id: 4, serviceName: "Waxing", date: "2024-09-02T12:00:00Z" },
  ];

  const renderCountdown = ({ days, hours, minutes, seconds, completed }: any) => {
    if (completed) {
      return <span>Time's up!</span>;
    } else {
      return (
        <span>
          {days}d {hours}h {minutes}m {seconds}s
        </span>
      );
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">User Dashboard</h1>

      {/* Overview Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Account Information</h2>
          <p className="text-lg"><strong>Name:</strong> {user.name}</p>
          <p className="text-lg"><strong>Email:</strong> {user.email}</p>
          <button
            onClick={() => navigate("/update-profile")}
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Update Profile
          </button>
        </div>

        {/* Service Slot Countdown */}
        {upcomingBookings.length > 0 && (
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Next Service Slot</h2>
            <p className="text-lg font-bold">{upcomingBookings[0].serviceName}</p>
            <Countdown
              date={new Date(upcomingBookings[0].date)}
              renderer={renderCountdown}
            />
          </div>
        )}
      </div>

      {/* Past Bookings */}
      <div className="p-6 bg-white rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">Past Bookings</h2>
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Service</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {pastBookings.map((booking) => (
              <tr key={booking.id}>
                <td className="border px-4 py-2">{booking.serviceName}</td>
                <td className="border px-4 py-2">{format(new Date(booking.date), "yyyy-MM-dd")}</td>
                <td className="border px-4 py-2">{booking.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Upcoming Bookings */}
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Upcoming Bookings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {upcomingBookings.map((booking) => (
            <div key={booking.id} className="p-4 bg-gray-100 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">{booking.serviceName}</h3>
              <p className="text-lg">{format(new Date(booking.date), "yyyy-MM-dd HH:mm")}</p>
              <Countdown
                date={new Date(booking.date)}
                renderer={renderCountdown}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
