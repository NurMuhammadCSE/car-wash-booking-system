import { baseApi } from "./baseApi";

const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: (token) => ({
        url: "/users",
        methods: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      }),
      providesTags: ["User"],
    }),
    updateUserRole: builder.mutation({
      query: ({ userId, role, token }) => ({
        url: `/users/${userId}`,
        method: "PATCH",
        body: { role },
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useGetAllUsersQuery, useUpdateUserRoleMutation } = usersApi;
