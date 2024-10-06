/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAppSelector } from "@/redux/hooks";
import { useNavigate } from "react-router-dom";
import Countdown from "react-countdown";
import { format } from "date-fns";
import { useGetBookingQuery } from "@/redux/api/bookingApi";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";

const UserDashboard = () => {
  const { user, token } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const { data, isLoading } = useGetBookingQuery(token);
  console.log(data?.data);

  if (!user || user.role !== "user") {
    navigate("/"); // Redirect to home page if user is not logged in or not a "user"
    return null;
  }

  if (isLoading)
    return (
      <p>
        {/* <Loader></Loader>{" "} */}
        <LoadingSpinner></LoadingSpinner>
      </p>
    );

  const pastBookings = data?.data?.filter(
    (booking: any) => new Date(booking.slot.date) < new Date()
  );
  const upcomingBookings = data?.data?.filter(
    (booking: any) => new Date(booking.slot.date) >= new Date()
  );

  const renderCountdown = ({
    days,
    hours,
    minutes,
    seconds,
    completed,
  }: any) => {
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
        <Card>
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg">
              <strong>Name:</strong> {user.name}
            </p>
            <p className="text-lg">
              <strong>Email:</strong> {user.email}
            </p>
            <Button
              onClick={() => navigate("/update-profile")}
              className="mt-4"
            >
              Profile Info
            </Button>
          </CardContent>
        </Card>

        {upcomingBookings.length > 0 && (
          <Card className="relative">
            <CardHeader>
              <CardTitle>Next Service Slot</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-bold">
                {upcomingBookings[0].service.name}
              </p>
              <Countdown
                date={new Date(upcomingBookings[0].slot.date)}
                renderer={renderCountdown}
              />
              {/* <div className="mt-4">
                <Button
                  variant="outline"
                  onClick={() =>
                    navigate(`/bookings/${upcomingBookings[0]._id}`)
                  }
                >
                  View Details
                </Button>
              </div> */}
            </CardContent>
          </Card>
        )}
      </div>

      {/* Past Bookings */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Past Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Service</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pastBookings.map((booking: any) => (
                <TableRow key={booking._id}>
                  <TableCell>{booking.service.name}</TableCell>
                  <TableCell>
                    {format(new Date(booking.slot.date), "yyyy-MM-dd")}
                  </TableCell>
                  <TableCell>{booking.slot.isBooked}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Upcoming Bookings */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {upcomingBookings.map((booking: any) => (
              <Card
                key={booking._id}
                className="p-4 dark:text-white dark:bg-[#020817] bg-gray-100 rounded-lg shadow-md"
              >
                <CardTitle className="text-xl font-semibold">
                  {booking.service.name}
                </CardTitle>
                <p className="text-lg">
                  {format(new Date(booking.slot.date), "yyyy-MM-dd")}{" "}
                  {booking.slot.startTime}
                </p>
                <Countdown
                  date={new Date(upcomingBookings[0].slot.date)}
                  renderer={renderCountdown}
                />
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserDashboard;
