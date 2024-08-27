import { baseApi } from "./baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getServices: builder.query({
      query: ({ searchTerm, sort, filter }) => {
        let queryString = `/services?`;

        if (searchTerm) {
          queryString += `searchTerm=${searchTerm}&`;
        }
        if (sort) {
          queryString += `sort=${sort}&`;
        }
        if (filter) {
          queryString += `filter=${filter}&`;
        }

        // Remove trailing '&' or '?' if no params are added
        queryString = queryString.slice(0, -1);

        return {
          url: queryString,
          method: "GET",
        };
      },
    }),
    getServiceById: builder.query({
      query: (id: string) => ({
        url: `/services/${id}`,
        method: "GET",
      }),
    }),
    getSlotsByServiceId: builder.query({
      query: (id: string) => ({
        url: `/slots/availability?serviceId=${id}`,
        method: "GET",
      }),
    }),
    getSingleSlotsById: builder.query({
      query: (id: string) => ({
        url: `/slots/availability/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetServicesQuery,
  useGetServiceByIdQuery,
  useGetSlotsByServiceIdQuery,
  useGetSingleSlotsByIdQuery
} = authApi;
