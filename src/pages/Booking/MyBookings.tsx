/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetBookingQuery } from "@/redux/api/bookingApi";
import { useAppSelector } from "@/redux/hooks";
import { CheckCircle } from "lucide-react";
import { format } from "date-fns";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";

const MyBookings = () => {
  const { token } = useAppSelector((state) => state.user);
  const { data: bookings, isLoading } = useGetBookingQuery(token);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-full">
        <LoadingSpinner />
      </div>
    );

  return (
    <div className="container mx-auto p-6 dark:bg-gray-900 dark:text-white bg-white rounded-lg shadow-xl">
      <Card className="dark:bg-gray-800 mt-14">
        <CardHeader className="flex items-center justify-center border-b border-gray-300 dark:border-gray-700 pb-4">
          <CardTitle className="text-3xl font-bold flex items-center gap-3">
            My Bookings
          </CardTitle>
        </CardHeader>
        <CardContent>
          {bookings?.data?.length > 0 ? (
            <Table className="w-full">
              <TableHeader>
                <TableRow className="text-text-left bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                  <TableHead className="text-center">Service</TableHead>
                  <TableHead className="text-center">Date</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bookings.data.map((booking: any) => (
                  <TableRow
                    key={booking._id}
                    className="text-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
                  >
                    <TableCell className="py-3 px-4 font-medium text-gray-900 dark:text-gray-100">
                      {booking.service.name}
                    </TableCell>
                    <TableCell className="py-3 px-4">
                      {format(new Date(booking.slot.date), "yyyy-MM-dd")}
                    </TableCell>
                    <TableCell className="py-3 px-4 flex justify-center items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="capitalize">
                        {booking.slot.isBooked}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center text-xl mt-4">You have no bookings</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MyBookings;
