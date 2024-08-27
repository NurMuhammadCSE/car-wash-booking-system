// src/pages/BookingPage.tsx
import { useParams, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import {
  useGetServiceByIdQuery,
  useGetSingleSlotsByIdQuery,
} from "@/redux/api/servicesApi";
import Swal from "sweetalert2";
import { clearSlots } from "@/redux/features/slotSlice";
import { useForm } from "react-hook-form";

interface FormData {
  userName: string;
  email: string;
  timeSlot: string;
}

const BookingPage = () => {
  const { serviceId, slotId } = useParams<{
    serviceId: string;
    slotId: string;
  }>();

  const selectedSlots = useAppSelector((state) => state.slot.selectedSlots);
  const { data: serviceData } = useGetServiceByIdQuery(serviceId!);
  const { user } = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  selectedSlots.map((slot) => {
    const { data: slotData } = useGetSingleSlotsByIdQuery(slot!);
  });

  const { data: slotData } = useGetSingleSlotsByIdQuery(slotId!);

  const handlePayNow = async () => {
    if (!selectedSlots.length) {
      Swal.fire({
        icon: "error",
        title: "No slots selected",
        text: "Please select at least one slot.",
      });
      return;
    }

    try {
      // Redirect to AAMARPAY
      window.location.href = `https://aamarpay.com/?serviceId=${serviceId}&slots=${selectedSlots
        .map((slot) => `${slot.startTime}-${slot.endTime}`)
        .join(",")}`;

      // Clear selected slots after payment
      dispatch(clearSlots());

      // Redirect to success page after payment
      navigate("/success");
    } catch (error) {
      console.error("Payment failed", error);
      Swal.fire({
        icon: "error",
        title: "Payment failed",
        text: "Please try again later.",
      });
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      userName: user?.name || "",
      email: user?.email || "",
      timeSlot: slotData?.data?.startTime || "",
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
    <div className="container mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
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
        {/* 
        <ul className="mb-6">
          {selectedSlots.map((slot, index) => (
            <div className="p-4 bg-blue-100 rounded-lg">
              <p className="text-lg font-semibold">
                {slot?.startTime} - {slot?.endTime}
              </p>
            </div>
          ))}
        </ul> */}
      </div>

      {/* Right Side: User Information Form */}
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
              value={slotData?.data?.startTime || ""}
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
              onClick={handlePayNow}
            >
              Pay Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingPage;
