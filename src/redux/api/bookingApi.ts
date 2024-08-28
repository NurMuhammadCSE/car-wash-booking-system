/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "./baseApi";

const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBooking: builder.mutation({
      query: (bookingInfo: any) => {
        const token = bookingInfo.token; // Extract token from bookingInfo
        return {
          url: "/bookings",
          method: "POST",
          body: bookingInfo,
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        };
      },
    }),
    getBooking: builder.query({
      query: (token) => ({
        url: "/my-bookings",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      }),
    }),
    getAllBookings: builder.query({
      query: (token) => ({
        url: `/bookings`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      }),
    }),
  }),
});

export const {
  useCreateBookingMutation,
  useGetBookingQuery,
  useGetAllBookingsQuery,
} = bookingApi;
