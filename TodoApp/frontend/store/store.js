import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../feature/todoSlice";

export const store = configureStore({
  reducer: {
    todo: todoReducer,
  },
});