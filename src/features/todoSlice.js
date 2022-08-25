import { createSlice } from '@reduxjs/toolkit';


const todoSlice = createSlice({
    name: 'todo',
    initialState: {
        todos: null,
    },
    reducers: {

        setTodo: (state, {payload}) => {
            state.todos = payload;
        },
        addTodo: (state, {payload}) => {
            state.todos?.push(payload);
        },
        deleteTodos: (state, {payload}) => {
            state.todos = state.todos.filter(item => item?.title !== payload);
            localStorage.setItem("todos", JSON.stringify(state.todos));
        },
        getActiveTodos: (state , {payload}) => {
            state.todos = state.todos.filter(item => item?.completed !== payload.false);

        },
        getFinishedTodos: (state , {payload}) => {
            state.todos = state.todos.filter(item => item?.completed !== payload.true);

        }


    }

});

export const { setTodo, addTodo, deleteTodos } = todoSlice.actions;
export default todoSlice.reducer;
