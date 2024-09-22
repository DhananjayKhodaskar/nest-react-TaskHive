import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices.jsx/userSlice";
import todoReducer from "./slices.jsx/todoSlice";

export default configureStore({
  reducer: { user: userReducer, todos: todoReducer },
});
