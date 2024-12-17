import Cookies from "js-cookie";
import baseApi from "../baseApi";

export const UserApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => ({
        url: `/user`,
        method: "GET",
        headers: {
          Authorization: `${Cookies.get("accessToken")}`,
        },
      }),
      providesTags: ["User"],
    }),

    deleteUser: builder.mutation({
      query: (id: string) => ({
        url: `/user/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `${Cookies.get("accessToken")}`,
        },
      }),
      invalidatesTags: ["User"],
    }),

    changeRole: builder.mutation({
      query: ({ id, role }) => ({
        url: `/user/change-role/${id}`,
        method: "PATCH",
        headers: {
          Authorization: `${Cookies.get("accessToken")}`,
        },
        body: { role },
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useDeleteUserMutation,
  useChangeRoleMutation,
} = UserApi;
