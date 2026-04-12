import { createBrowserRouter } from "react-router";
import DashboardPage from "./pages/DashboardPage";

const routes = createBrowserRouter([
    {
        path: "/",
        Component: DashboardPage,
        // children: [
        //     { index: true, Component: Home },
        //     { path: "about", Component: About },
        //     {
        //         path: "auth",
        //         Component: AuthLayout,
        //         children: [
        //             { path: "login", Component: Login },
        //             { path: "register", Component: Register },
        //         ],
        //     },
        //     {
        //         path: "concerts",
        //         children: [
        //             { index: true, Component: ConcertsHome },
        //             { path: ":city", Component: ConcertsCity },
        //             { path: "trending", Component: ConcertsTrending },
        //         ],
        //     },
        // ],
    },
]);
export default routes