/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import {
  useGetServiceByIdQuery,
  useGetSingleSlotsByIdQuery,
} from "@/redux/api/servicesApi";
import Swal from "sweetalert2";
import { clearSlots } from "@/redux/features/slotSlice";
import { useForm } from "react-hook-form";
import { useCreateBookingMutation } from "@/redux/api/bookingApi";
import { jwtDecode } from "jwt-decode";
import { Helmet } from "react-helmet-async";

// Define the structure of your decoded token
interface DecodedToken {
  userId: string;
  name: string;
  email: string;
}

const BookingPage = () => {
  const { serviceId, slotId } = useParams<{
    serviceId: string;
    slotId: string;
  }>();

  const { data: serviceData } = useGetServiceByIdQuery(serviceId!);

  const dispatch = useAppDispatch();

  const { token } = useAppSelector((state) => state.user);
  // console.log(user);

  const { data: slotData } = useGetSingleSlotsByIdQuery(slotId!);
  const [createBooking] = useCreateBookingMutation();

  // Decode the token to get user details
  let decodedToken: DecodedToken | null = null;
  if (token) {
    decodedToken = jwtDecode<DecodedToken>(token);
  }

  // const {
  //   register,
  //   formState: { errors },
  // } = useForm<FormData>({
  //   defaultValues: {
  //     userName: decodedToken?.name || "Programming Hero", // Use the name from decoded token
  //     email: decodedToken?.email || "", // Use the email from decoded token
  //     timeSlot: slotData?.data?.startTime || "",
  //   },
  // });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // const onSubmit = async () => {
  //   const bookingInfo = {
  //     serviceId: serviceData?.data?._id,
  //     slotId: slotId,
  //     customer: decodedToken?.userId, // Use the userId from decoded token
  //     token: token,
  //   };

  //   try {
  //     const res = await createBooking(bookingInfo).unwrap();
  //     console.log(res);
  //     if (res.success) {
  //       window.location.href = res.data.paymentSession.payment_url;
  //       // Swal.fire({
  //       //   position: "center",
  //       //   icon: "success",
  //       //   title: "Payment successful",
  //       //   showConfirmButton: false,
  //       //   timer: 1500,
  //       // });
  //       // Clear selected slots after payment
  //       dispatch(clearSlots());

  //       // Redirect to success page after payment
  //       navigate("/success");
  //     } else {
  //       console.error("Order creation failed:", res.message);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     console.error("Payment failed:", error);
  //     if(error?.data?.data?.message === 'Slot is already booked'){
  //       Swal.fire({
  //         position: "center",
  //         icon: "error",
  //         title: "Slot is already booked",
  //         text: "Please try another",
  //         showConfirmButton: true,
  //       });
  //     }
  //     Swal.fire({
  //       position: "center",
  //       icon: "error",
  //       title: "Admin Can't Booking Slot",
  //       text: "Please try again",
  //       showConfirmButton: true,
  //     });
  //   }
  // };

  const onSubmit = async () => {
    const bookingInfo = {
      serviceId: serviceData?.data?._id,
      slotId: slotId,
      customer: decodedToken?.userId, // Use the userId from decoded token
      token: token,
    };

    try {
      const res = await createBooking(bookingInfo).unwrap();
      console.log(res);
      if (res.success) {
        window.location.href = res.data.paymentSession.payment_url;
        dispatch(clearSlots());
        // navigate("/success");
      } else {
        console.error("Order creation failed:", res.message);
      }
    } catch (error: any) {
      console.log(error);

      // Handle "Slot is already booked" error
      if (error?.data?.message === "Slot is already booked") {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Slot is already booked",
          text: "Please choose another available slot.",
          showConfirmButton: true,
        });
      } else if (error?.data?.message === "Admin Can't Booking Slot") {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Admin Can't Book Slot",
          text: "You do not have permission to book slots. Please contact support.",
          showConfirmButton: true,
        });
      } else {
        // Handle other errors
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Payment failed",
          text: "Something went wrong. Please try again.",
          showConfirmButton: true,
        });
      }
    }
  };

  return (
    <div className="container mx-auto p-6 ">
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
        <Helmet>
          <title> Booking Information - Car Washing</title>
        </Helmet>
        {/* Left Side: Selected Service and Slots */}
        <div className="p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-4">{serviceData?.data?.name}</h2>
          <img
            src={serviceData?.data?.image}
            alt={serviceData?.data?.name}
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
          <h3 className="text-xl font-semibold mb-2">Selected Slots:</h3>
          <div className="p-4 bg-blue-100 rounded-lg">
            <p className="text-lg font-semibold">
              {slotData?.data?.startTime} - {slotData?.data?.endTime}
            </p>
          </div>
        </div>

        {/* Right Side: User Information Form */}
        <div className="flex-1 p-6 mt-10 bg-gray-100 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Booking Details</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="userName" className="block text-lg font-medium">
                Name
              </label>
              <input
                defaultValue={decodedToken?.name}
                id="userName"
                {...register("userName", { required: true })}
                type="text"
                className="w-full p-2 border rounded-lg"
              />
              {errors.userName && (
                <p className="text-red-500">Name is Required</p>
              )}
            </div>
            <div>
              <label htmlFor="email" className="block text-lg font-medium">
                Email
              </label>
              <input
                defaultValue={decodedToken?.email}
                id="email"
                {...register("email", {
                  required: true,
                  pattern: {
                    value: /^[^@]+@[^@]+\.[^@]+$/,
                    message: "Invalid email address",
                  },
                })}
                type="email"
                className="w-full p-2 border rounded-lg"
              />
              {errors.email && (
                <p className="text-red-500">Email is Required</p>
              )}
            </div>
            <div>
              <label htmlFor="timeSlot" className="block text-lg font-medium">
                Time Slot
              </label>
              <input
                id="timeSlot"
                {...register("timeSlot")}
                type="text"
                className="w-full p-2 border rounded-lg"
                readOnly
                value={slotData?.data?.startTime || ""}
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-[#30415A] text-white py-2 px-6 rounded-lg hover:bg-[#30415A] transition duration-300"
              >
                Pay Now
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
