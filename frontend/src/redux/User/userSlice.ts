import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
    },
    signOutUserSuccess: (state) => {
      state.currentUser = null;
    },
  },
});

export const { signInSuccess,signOutUserSuccess } = userSlice.actions;

export default userSlice.reducer;
