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
        if (filter.price) {
          queryString += `price=${filter.price}&`;
        }
        if (filter.duration) {
          queryString += `duration=${filter.duration}&`;
        }

        // Remove the trailing '&' or '?' if no filters are applied
        queryString = queryString.slice(0, -1);

        return {
          url: queryString,
          method: "GET",
        };
      },
      // providesTags: ["Service"],
    }),

    getAllServices: builder.query({
      query: () => ({
        url: "/services",
        method: "GET",
      }),
      providesTags: ["Service"],
    }),

    getServiceById: builder.query({
      query: (id: string) => ({
        url: `/services/${id}`,
        method: "GET",
      }),
    }),
    getSlotsByServiceId: builder.query({
      query: (id: string) => {
        // console.log(id);
        return {
          url: `/slots/availability?serviceId=${id}`,
          method: "GET",
        };
      },
    }),
    getSingleSlotsById: builder.query({
      query: (id: string) => ({
        url: `/slots/availability/${id}`,
        method: "GET",
      }),
    }),

    //! CRUD
    addService: builder.mutation({
      query: ({ serviceDetails, token }) => {
        // console.log(serviceDetails, "Token", token);
        return {
          url: "/services",
          method: "POST",
          body: serviceDetails,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      invalidatesTags: ["Service"],
    }),
    updateService: builder.mutation({
      query: ({ id, token, updatedService }) => {
        // console.log(id, token, updatedService);
        return {
          url: `/services/${id}`,
          method: "PATCH",
          body: updatedService,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      invalidatesTags: ["Service"],
    }),
    deleteService: builder.mutation({
      query: ({ serviceId, token }) => ({
        url: `/services/${serviceId}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Service"],
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
  useUpdateServiceMutation,
  useGetAllServicesQuery,
} = authApi;
