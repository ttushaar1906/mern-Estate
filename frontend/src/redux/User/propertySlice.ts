import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentProperty: null,
};

export const propertySlice = createSlice({
  name: "property",
  initialState,
  reducers: {
    viewPropertySuccess: (state, action) => {
      state.currentProperty = action.payload;
    },
    closePropertySuccess: (state) => {
      state.currentProperty = null;
    },
  },
});

export const { viewPropertySuccess,closePropertySuccess } = propertySlice.actions;

export default propertySlice.reducer;
