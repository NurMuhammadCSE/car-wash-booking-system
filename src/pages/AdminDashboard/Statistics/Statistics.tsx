import React from "react";
import { Chart } from "react-google-charts";
import { useGetAllServicesQuery } from "@/redux/api/servicesApi";
import { useGetSlotsQuery } from "@/redux/api/SlotApi";
import { useGetAllUsersQuery } from "@/redux/api/usersApi";
import { useGetAllBookingsQuery } from "@/redux/api/bookingApi";
import { useAppSelector } from "@/redux/hooks";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";

const Statistics: React.FC = () => {
  const { token } = useAppSelector((state) => state.user);

  // Fetch data from APIs
  const { data: servicesData, isLoading: isLoadingServices } =
    useGetAllServicesQuery(undefined);
  const { data: bookingsData, isLoading: isLoadingBookings } =
    useGetAllBookingsQuery(token);
  const { data: slotsData, isLoading: isLoadingSlots } =
    useGetSlotsQuery(undefined);
  const { data: usersData, isLoading: isLoadingUsers } =
    useGetAllUsersQuery(token);

  // console.log(bookingsData, usersData);

  // Options for the Google Charts
  const chartOptions = (title: string) => ({
    title,
    hAxis: { title: "Time" },
    vAxis: { title: "Count" },
    legend: "none",
  });

  const pieChartOptions = {
    title: "Overall Data Distribution",
    is3D: true,
  };

  // Check if any data is loading
  if (
    isLoadingServices ||
    isLoadingBookings ||
    isLoadingSlots ||
    isLoadingUsers
  ) {
    return <div>

      <LoadingSpinner></LoadingSpinner>
    </div>;
  }

  // Sample dummy data for charts (replace with actual data from APIs)
  const serviceChartData = [
    ["x", "Services"],
    [0, servicesData?.data?.length || 0],
  ];

  const bookingChartData = [
    ["x", "Bookings"],
    [0, bookingsData?.data?.length || 0],
  ];

  const slotChartData = [
    ["x", "Slots"],
    [0, slotsData?.data?.length || 0],
  ];

  const userChartData = [
    ["x", "Users"],
    [0, usersData?.data?.length || 0],
  ];

  // Pie Chart data: showing proportion of services, bookings, slots, and users
  const pieChartData = [
    ["Data Type", "Count"],
    ["Services", servicesData?.data?.length || 0],
    ["Bookings", bookingsData?.data?.length || 0],
    ["Slots", slotsData?.data?.length || 0],
    ["Users", usersData?.data?.length || 0],
  ];

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-center text-3xl font-extrabold">
        Admin Dashboard Statistics
      </h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-blue-500 text-white p-4 rounded-lg shadow-lg text-center">
          <h2 className="text-xl font-bold">Total Services</h2>
          <p className="text-3xl mt-2">{servicesData?.data?.length || 0}</p>
        </div>
        <div className="bg-green-500 text-white p-4 rounded-lg shadow-lg text-center">
          <h2 className="text-xl font-bold">Total Bookings</h2>
          <p className="text-3xl mt-2">{bookingsData?.data?.length || 0}</p>
        </div>
        <div className="bg-yellow-500 text-white p-4 rounded-lg shadow-lg text-center">
          <h2 className="text-xl font-bold">Total Slots</h2>
          <p className="text-3xl mt-2">{slotsData?.data?.length || 0}</p>
        </div>
        <div className="bg-red-500 text-white p-4 rounded-lg shadow-lg text-center">
          <h2 className="text-xl font-bold">Total Users</h2>
          <p className="text-3xl mt-2">{usersData?.data?.length || 0}</p>
        </div>
      </div>

      {/* Separate Charts for each type of data */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Services Chart */}
        <div className="w-full h-96 dark:text-black dark:bg-black bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-center text-2xl font-bold mb-6">
            Services Overview
          </h2>
          <Chart
            chartType="LineChart"
            width="100%"
            data={serviceChartData}
            options={chartOptions("Services")}
          />
        </div>

        {/* Bookings Chart */}
        <div className="w-full h-96 dark:text-black dark:bg-black bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-center  text-2xl font-bold mb-6">
            Bookings Overview
          </h2>
          <Chart
            chartType="LineChart"
            width="100%"
            data={bookingChartData}
            options={chartOptions("Bookings")}
          />
        </div>

        {/* Slots Chart */}
        <div className="w-full h-96 dark:text-black dark:bg-black bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-center text-2xl font-bold mb-6">
            Slots Overview
          </h2>
          <Chart
            chartType="LineChart"
            width="100%"
            data={slotChartData}
            options={chartOptions("Slots")}
          />
        </div>

        {/* Users Chart */}
        <div className="w-full h-96  dark:text-black dark:bg-black bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-center text-2xl font-bold mb-6">
            Users Overview
          </h2>
          <Chart
            chartType="LineChart"
            width="100%"
            data={userChartData}
            options={chartOptions("Users")}
          />
        </div>

        {/* Pie Chart for Overall Data Distribution */}
        <div className="w-full h-96 dark:text-black dark:bg-black bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-center text-2xl font-bold mb-6">
            Data Distribution
          </h2>
          <Chart
            chartType="PieChart"
            width="100%"
            data={pieChartData}
            options={pieChartOptions}
          />
        </div>
      </div>
    </div>
  );
};

export default Statistics;
