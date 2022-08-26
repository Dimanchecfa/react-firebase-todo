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
            state.todos = state.todos?.filter(item => item?.completed === false);

        },
        getFinishedTodos: (state , {payload}) => {
            state.todos = state.todos?.filter(item => item?.completed ===  true);
        },
        handleToogle: (state, {payload}) => {
            state.todos = state.todos.map(item => {
                if (item.title === payload) {
                    item.completed = !item.completed;
                }
                return item;
            } );
            localStorage.setItem("todos", JSON.stringify(state.todos));
        }


    }

});

export const { setTodo, addTodo, deleteTodos , getActiveTodos , handleToogle} = todoSlice.actions;
export default todoSlice.reducer;
