import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    todos: null,
  },
  reducers: {
    getTodos: (state, { payload }) => {
      state.todos = payload;
    },
    addTodo: (state, { payload }) => {
      state.todos?.push(payload);
    },
    deleteTodos: (state, { payload }) => {
      state.todos = state.todos.filter((item) => item?.id !== payload);
    },

    // handleToogle: (state, { payload }) => {
    //   state.todos = state.todos?.map((item) => {
    //     if (item.id === payload) {
    //       item.completed = !item.completed;
    //
    //     }
    //     return item;
    //   });
    //   localStorage.setItem("todos", JSON.stringify(state.todos));
    // },
  },
});

export const { getTodos, addTodo, deleteTodos, getActiveTodos, handleToogle } =
  todoSlice.actions;
export default todoSlice.reducer;
