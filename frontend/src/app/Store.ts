import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux/User/userSlice";
import propertyReducer from "../redux/User/propertySlice"

export const store = configureStore({
  reducer: {
    user: userReducer,
    property: propertyReducer,
  },
});
