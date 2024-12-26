//https://www.npmjs.com/package/react-error-boundary
import { createBrowserRouter } from "react-router"
import Home from "./pages/Home"
import Phones from "./pages/Phones";
import AccountGrid from "./components/AccountGrid";
import Fallback from "./pages/Fallback";
import NotFound from "./pages/NotFound";
import Monitoring from "./pages/Monitoring";

const routes = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
		errorElement: <Fallback />,
		children: [
			{
				path: "phones",
				errorElement: <Fallback />,
				element: <Phones />
			},
			{
				path: "accounts",
				errorElement: <Fallback />,
				element: <AccountGrid />
			},
			{
				path: "monitoring",
				errorElement: <Fallback />,
				element: <Monitoring />
			},
			{
				path: "*",
				element: <NotFound />
			}
		]
	}
])

export default routes;
