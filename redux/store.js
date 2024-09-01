import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducer/auth";
import api from "./api/api";
import miscSlice from "./reducer/mics";

export const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [miscSlice.name]: miscSlice.reducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (mid) => [...mid(), api.middleware],
});
