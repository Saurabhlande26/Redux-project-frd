import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { fetchDashboardAPI } from "../features/dashbaord/dashboardAPI";

export default function DashboardPage() {
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector((state: any) => state.dashboard);

    // useEffect(() => {
    //     dispatch(fetchDashboardAPI() as any);
    // }, []);

    return (
        <div>
            <h2>Dashboard</h2>

            {loading && <Loader />}
            {error && <Error message={error} />}

            {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
        </div>
    );
}