import { baseApi } from "./baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getServices: builder.query({
      query: ({ searchTerm, sort, filter }) => {
        console.log(searchTerm, sort, filter);
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
  }),
});

export const { useGetServicesQuery } = authApi;
