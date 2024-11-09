// store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import dropdownReducer from "../slices/dropdownslice";
// Configure the Redux store
const store = configureStore({
  reducer: {
    dropdown: dropdownReducer
  },
});

// Define RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
