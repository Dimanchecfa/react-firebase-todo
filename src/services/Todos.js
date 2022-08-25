import HANDLER_STORAGE from "../constant/app.constant";

export const getTodos = () => {
    const { status, data } = HANDLER_STORAGE.GET("todos", "object");
    if (status) {
        return data;
    }
    return [];
    }
export const setTodos = (todos) => {
    HANDLER_STORAGE.SET("todos", todos, "object");
}
export const removeTodos = (todos) => {
    HANDLER_STORAGE.REMOVE("todos");
}

