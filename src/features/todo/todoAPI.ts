import api from "../../services/api";

export const fetchTodosAPI = () => api.get("/todos");

export const addTodoAPI = (data: { title: string }) =>
    api.post("/todos", data);

export const deleteTodoAPI = (id: number) =>
    api.delete(`/todos/${id}`);

export const updateTodoAPI = (id: number, data: { title: string }) =>
    api.put(`/todos/${id}`, data);