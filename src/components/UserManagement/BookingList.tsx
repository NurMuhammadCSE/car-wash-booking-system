/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useAppSelector } from "@/redux/hooks";
import { useGetAllBookingsQuery } from "@/redux/api/bookingApi";
import Loader from "@/pages/shared/Loader/Loader";
import { Helmet } from "react-helmet-async";

const statusColors: { [key: string]: string } = {
  confirmed: "bg-green-500 text-white",
  pending: "bg-yellow-500 text-white",
  canceled: "bg-red-500 text-white",
  booked: "bg-[#30415A] text-white", // Assuming 'booked' status
};

const BookingList: React.FC = () => {
  const { token } = useAppSelector((state) => state.user);
  const { data: bookings, isLoading } = useGetAllBookingsQuery(token);

  if (isLoading) {
    return (
      <div>
        <Loader></Loader>{" "}
      </div>
    );
  }

  return (
    <div className="p-4">
      <Helmet>
        <title> Users Bookings - Car Washing</title>
      </Helmet>
      <h1 className="text-2xl font-bold mb-4">Users Bookings</h1>
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="px-4 py-2 text-center">Name</TableHead>
            <TableHead className="px-4 py-2 text-center">
              Service Name
            </TableHead>
            <TableHead className="px-4 py-2 text-center">Date</TableHead>
            <TableHead className="px-4 py-2 text-center">Status</TableHead>
            <TableHead className="px-4 py-2 text-center">Time Slot</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings?.data?.map((booking: any) => (
            <TableRow key={booking._id}>
              <TableCell className="text-center">
                {booking.customer.name || "N/A"}
              </TableCell>
              <TableCell className="text-center">
                {booking.service?.name || "Service Name Not Available"}
              </TableCell>
              <TableCell className="text-center">
                {new Date(booking.slot.date).toLocaleDateString()}
              </TableCell>
              <TableCell className="text-center">
                <span
                  className={`px-2 py-1 rounded ${
                    statusColors[booking.slot.isBooked]
                  }`}
                >
                  {booking.slot.isBooked}
                </span>
              </TableCell>
              <TableCell className="text-center">
                {booking.slot.startTime || "Time Not Available"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default BookingList;
