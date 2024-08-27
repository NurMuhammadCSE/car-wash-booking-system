import { baseApi } from "./baseApi";

const authApi = baseApi.injectEndpoints({
  // tagTypes: ['Service'],
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

    //! CRUD
    addService: builder.mutation({
      query: ({ newService, token }) => ({
        url: "/services",
        method: "POST",
        body: newService,
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      }),
      // invalidatesTags: ["Service"],
    }),
    updateService: builder.mutation({
      query: ({ id, token, ...updatedService }) => ({
        url: `/services/${id}`,
        method: "PUT",
        body: updatedService,
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      }),
      // invalidatesTags: (result, error, { id }) => [{ type: "Service", id }],
    }),
    deleteService: builder.mutation({
      query: ({ id, token }) => ({
        url: `/services/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      }),
      // invalidatesTags: (result, error, id) => [{ type: "Service", id }],
    }),
  }),
});

export const {
  useGetServicesQuery,
  useGetServiceByIdQuery,
  useGetSlotsByServiceIdQuery,
  useGetSingleSlotsByIdQuery,
  useAddServiceMutation,
  useDeleteServiceMutation,
  useUpdateServiceMutation
} = authApi;
