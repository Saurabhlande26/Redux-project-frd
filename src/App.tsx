import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import { useAppDispatch, useAppSelector } from "./hooks/reduxHooks";
import { useEffect } from "react";
import axios from "axios";
import { logout, setAccessToken } from "./features/auth/authSlice";

export default function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <PublicRoute>
          <LoginPage />
        </PublicRoute>
      )
    },
    {
      path: "/dashboard",
      element: (
        <ProtectedRoute>
          <DashboardPage />
        </ProtectedRoute>
      )
    }
  ]);

  return (
    <AppInitializer>
      <RouterProvider router={router} />
    </AppInitializer>
  );
}

const ProtectedRoute = ({ children }: any) => {
  const token = useAppSelector((state) => state.auth.accessToken);
  if (!token) return <Navigate to="/" replace />;
  return children;
}

const PublicRoute = ({ children }: any) => {
  const token = useAppSelector((state) => state.auth.accessToken);
  if (token) return <Navigate to="/dashboard" replace />;
  return children;
}

function AppInitializer({ children }: any) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const tryAutoLogin = async () => {
      const refreshToken = localStorage.getItem("refreshToken");

      if (!refreshToken) return;

      try {
        const res = await axios.post(
          "http://localhost:5000/api/refresh",
          { refreshToken }
        );

        dispatch(setAccessToken(res.data.accessToken));
      } catch {
        dispatch(logout());
      }
    };

    tryAutoLogin();
  }, []);

  return children;
}