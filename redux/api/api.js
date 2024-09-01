import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { server } from "../../src/components/constants/config";
const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${server}/api/v1/`,
  }),
  tagTypes: ["Chat", "User", "Message"],
  endpoints: (builder) => ({
    myChats: builder.query({
      query: () => ({
        url: "/chat/my",
        credentials: "include",
      }),
      providesTags: ["Chat"],
    }),

    searchUser: builder.query({
      query: (name) => ({
        url: `/user/search?name=${name}`,
        credentials: "include",
      }),
      providesTags: ["User"],
    }),
    sendFriendRequest: builder.mutation({
      query: (data) => ({
        url: `/user/send/request`,
        method: "PUT",
        credentials: "include",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    getNotifiactions: builder.query({
      query: () => ({
        url: `/user/notifications`,
        credentials: "include",
      }),
      keepUnusedDataFor: 0,
    }),
    acceptFriendRequest: builder.mutation({
      query: (data) => ({
        url: `/user/accept/request`,
        method: "PUT",
        credentials: "include",
        body: data,
      }),
      invalidatesTags: ["Chat"],
    }),
    chatDetailes: builder.query({
      query: ({ chatId, populate = false }) => {
        let url = `/chat/${chatId}`;
        if (populate) {
          url += "?populate=true";
        }
        return {
          url,
          credentials: "include",
          providesTags: ["Chat"], // Moved inside the return statement and properly indented
        };
      },
    }),
    getMessages: builder.query({
      query: ({ chatId, page }) => ({
        url: `chat/message/${chatId}?page=${page}`,
        credentials: "include",
      }),
      providesTags: ["Message"],
    }),
    sendAttachments: builder.mutation({
      query: (data) => ({
        url: `chat/attachments`,
        method: "POST",
        credentials: "include",
        body: data,
      }),
    }),
  }),
});

export default api;
export const {
  useMyChatsQuery,
  useLazySearchUserQuery,
  useSendFriendRequestMutation,
  useGetNotifiactionsQuery,
  useChatDetailesQuery,
  useAcceptFriendRequestMutation,
  useGetMessagesQuery,
  useSendAttachmentsMutation,
} = api;
