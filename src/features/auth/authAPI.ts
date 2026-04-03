import api from "../../services/api";

export const loginAPI = (data: { email: string; password: string }) =>
    api.post("/login", data);