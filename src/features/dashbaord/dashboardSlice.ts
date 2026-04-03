import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchDashboardAPI } from "./dashboardAPI";

interface DashboardState {
    data: any;
    loading: boolean;
    error: string | null;
}

const initialState: DashboardState = {
    data: null,
    loading: false,
    error: null
};

export const fetchDashboard = createAsyncThunk(
    "dashboard/fetchDashboard",
    async (_, thunkAPI) => {
        try {
            const res = await fetchDashboardAPI();
            return res.data;
        } catch (err: any) {
            return thunkAPI.rejectWithValue("Failed to load dashboard");
        }
    }
);

const dashboardSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDashboard.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchDashboard.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchDashboard.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    }
});

export default dashboardSlice.reducer;