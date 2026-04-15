import { useState } from "react";
import { loginUser } from "../features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const dispatch = useAppDispatch();
    const { loading, error } = useAppSelector((state: any) => state.auth);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        // e.preventDeafult();
        const res = await dispatch(loginUser({ email, password }));
        if (res?.meta?.requestStatus == "fulfilled") {
            navigate("/dashboard")
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>
                {loading ? "Logging in..." : "Login"}
            </button>

            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
}

export default LoginPage;