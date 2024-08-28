import { baseApi } from "./baseApi";

const slotApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSlots: builder.query({
      query: () => "/slots/availability",
      providesTags: ["Slot"],
    }),
    updateSlot: builder.mutation({
      query: ({ id, status, token }) => ({
        url: `/services/${id}`,
        method: "PATCH",
        body: { status },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Slot"],
    }),
    // createSlot: builder.mutation({
    //   query: (slot) => ({
    //     url: "/services/slots",
    //     method: "POST",
    //     body: slot,
    //   }),
    // }),
    createSlot: builder.mutation({
      query: ({ slotDetails, token }) => {
        console.log(slotDetails, token);
        return {
          url: "/services/slots",
          method: "POST",
          body: slotDetails,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      invalidatesTags: ["Slot"],
    }),
  }),
});

export const {
  useGetSlotsQuery,
  useCreateSlotMutation,
  useUpdateSlotMutation,
} = slotApi;
