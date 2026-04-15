// import { useEffect } from "react";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../hooks/reduxHooks";
// import { fetchDashboardAPI } from "../features/dashbaord/dashboardAPI";

export default function DashboardPage() {
    // const dispatch = useDispatch();
    const navigate = useNavigate();
    const { data, loading, error } = useSelector((state: any) => state.todo);

    // useEffect(() => {
    //     dispatch(fetchDashboardAPI() as any);
    // }, []);
    console.log({ data })
    const AddTodoNavigate = () => {
        navigate("/addtodo")
    }

    return (
        <div>
            <h2>Dashboard</h2>
            <button onClick={AddTodoNavigate}>
                Add Todo
            </button>
            {loading && <Loader />}
            {error && <Error message={error} />}

            {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
        </div>
    );
}