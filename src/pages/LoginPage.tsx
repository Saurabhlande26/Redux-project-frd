import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/auth/authSlice";
import { selectAuth } from "../features/auth/authSelectors";
import Error from "../components/Error";
import Loader from "../components/Loader";

export default function LoginPage() {
    const dispatch = useDispatch();
    const { loading, error } = useSelector(selectAuth);

    const handleLogin = () => {
        dispatch(loginUser({
            email: "admin@gmail.com",
            password: "123456"
        }) as any);
    };

    return (
        <div>
            <h2>Login</h2>

            {loading && <Loader />}
            {error && <Error message={error} />}

            <button onClick={handleLogin}>Login</button>
        </div>
    );
}