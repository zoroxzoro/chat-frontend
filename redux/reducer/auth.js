import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  loading: true,
  isAdmin: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userExist: (state, action) => {
      state.user = action.payload;
      state.loading = false;
    },
    userNotExists: (state) => {
      state.user = null;
      state.loader = false;
    },
  },
});

export default authSlice;
export const { userExist, userNotExists } = authSlice.actions;
