import api from "../../services/api";

export const fetchDashboardAPI = () => api.get("/dashboard");