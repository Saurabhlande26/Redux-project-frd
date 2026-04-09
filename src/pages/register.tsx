import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { registerUser } from "../features/auth/authSlice";

export default function Register() {
    const dispatch = useAppDispatch();
    const { loading, error } = useAppSelector((state) => state.auth);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async () => {
        const res = await dispatch(registerUser({ email, password }));
        // 👉 Optional: redirect after success
        if (res.meta.requestStatus === "fulfilled") {
            alert("Registered successfully. Please login.");
        }
    };

    return (
        <div>
            <h2>Register</h2>

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

            <button onClick={handleRegister}>
                {loading ? "Registering..." : "Register"}
            </button>

            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
}