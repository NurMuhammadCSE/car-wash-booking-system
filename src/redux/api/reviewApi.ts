import { baseApi } from "./baseApi";

const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllReviews: builder.query({
      query: () => "/reviews",
    }),
    createReview: builder.mutation({
      query: (review) => ({
        url: "/reviews",
        method: "POST",
        body: review,
      }),
    }),
  }),
});

export const { useCreateReviewMutation, useGetAllReviewsQuery } = reviewApi;
