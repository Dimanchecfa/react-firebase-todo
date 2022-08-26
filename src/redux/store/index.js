import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "../slices/todoSlice";

export default configureStore({
  reducer: {
    todos: todosReducer,
  },
});
