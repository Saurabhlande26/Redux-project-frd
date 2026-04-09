import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginAPI } from "./authAPI";
import api from "../../services/api";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  accessToken: localStorage.getItem("accessToken"),
  refreshToken: localStorage.getItem("refreshToken"),
  loading: false,
  error: null
};

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (data: { email: string; password: string }, thunkAPI) => {
    try {
      const res = await api.post("/login", data);
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

// Register function
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (data: { email: string; password: string }, thunkAPI) => {
    try {
      console.log({ api })
      const res = await api.post("/register", data);
      console.log({ res })
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Register failed"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.accessToken = null;
      state.refreshToken = null;

      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;

        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;

        localStorage.setItem("accessToken", action.payload.accessToken);
        localStorage.setItem("refreshToken", action.payload.refreshToken);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Register function
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});



export const { logout } = authSlice.actions;
export default authSlice.reducer;