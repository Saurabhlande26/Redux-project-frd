import { useSelector } from "react-redux";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";

export default function App() {
  const token = useSelector((state: any) => state.auth.token);
  console.log({ token })
  return token ? <DashboardPage /> : <LoginPage />;
}