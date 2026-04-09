import LoginPage from "./pages/LoginPage";
import { useState } from "react";
import Register from "./pages/register";

export default function App() {
  const [isLogin, setIsLogin] = useState(true);

  
  return (
    <div>
      {isLogin ? <LoginPage /> : <Register />}

      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Go to Register" : "Go to Login"}
      </button>
    </div>
  );
}