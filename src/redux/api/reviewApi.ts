import { baseApi } from "./baseApi";

const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllReviews: builder.query({
      query: () => "/reviews",
      providesTags:['Review']
    }),
    createReview: builder.mutation({
      query: (review) => ({
        url: "/reviews",
        method: "POST",
        body: review,
      }),
      invalidatesTags:['Review']
    }),
  }),
});

export const { useCreateReviewMutation, useGetAllReviewsQuery } = reviewApi;
