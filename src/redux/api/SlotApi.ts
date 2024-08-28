import { baseApi } from "./baseApi";

const slotApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSlots: builder.query({
      query: () => "/slots/availability",
    }),
    updateSlot: builder.mutation({
      query: ({ id, status }) => ({
        url: `/slots/${id}`,
        method: "PATCH",
        body: { status },
      }),
    }),
    createSlot: builder.mutation({
      query: (slot) => ({
        url: "/slots",
        method: "POST",
        body: slot,
      }),
    }),
  }),
});

export const {
  useGetSlotsQuery,
  useCreateSlotMutation,
  useUpdateSlotMutation,
} = slotApi;
