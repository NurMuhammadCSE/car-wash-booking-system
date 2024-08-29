/* eslint-disable @typescript-eslint/no-unused-vars */
import { useGetBookingQuery } from "@/redux/api/bookingApi";
import {
  useGetServiceByIdQuery,
  useGetSlotsByServiceIdQuery,
} from "@/redux/api/servicesApi";
import { useAppSelector } from "@/redux/hooks";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

interface FormData {
  userName: string;
  email: string;
  timeSlot: string;
}

const Booking = () => {
  const { id, slotId } = useParams<{ id: string; slotId: string }>();

  const { token, user } = useAppSelector((state) => state.user);

  const { data } = useGetBookingQuery(token);

  const { data: serviceData } = useGetServiceByIdQuery(id!);
  const { data: slotData } = useGetSlotsByServiceIdQuery(slotId!);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      userName: user?.name || "",
      email: user?.email || "",
      timeSlot: slotData?.startTime || "",
    },
  });

  const onSubmit = async (formData: FormData) => {
    try {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Payment successful",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error("Payment failed:", error);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Payment failed",
        text: "Please try again",
        showConfirmButton: true,
      });
    }
  };

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg flex gap-8">
      {/* Left Side */}
      <div className="flex-1 p-6 bg-gray-100 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Selected Service</h2>
        {data?.data?.map((service, index) => (
          <div key={index} className="flex items-center mb-4">
            <img
              src={service?.service?.image}
              alt={service?.service?.name}
              className="w-24 h-24 object-cover rounded-lg"
            />
            <div className="ml-4">
              <h3 className="text-xl font-bold">{service?.service?.name}</h3>
              <p className="text-gray-700">{service?.service?.description}</p>
            </div>
          </div>
        ))}

        <h2 className="text-2xl font-semibold mb-4">Selected Time Slot</h2>
        <div className="p-4 bg-blue-100 rounded-lg">
          <p className="text-lg font-semibold">
            {slotData?.startTime} - {slotData?.endTime}
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex-1 p-6 bg-gray-100 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Booking Details</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="userName" className="block text-lg font-medium">
              Name
            </label>
            <input
              id="userName"
              {...register("userName", { required: "Name is required" })}
              type="text"
              className="w-full p-2 border rounded-lg"
            />
            {errors.userName && (
              <p className="text-red-500">{errors.userName.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="email" className="block text-lg font-medium">
              Email
            </label>
            <input
              id="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^@]+@[^@]+\.[^@]+$/,
                  message: "Invalid email address",
                },
              })}
              type="email"
              className="w-full p-2 border rounded-lg"
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
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
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-[#30415A] text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Pay Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Booking;
