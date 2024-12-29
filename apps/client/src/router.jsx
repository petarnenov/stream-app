//https://www.npmjs.com/package/react-error-boundary
import { createBrowserRouter } from "react-router"

import Home from "./pages/Home"
import NotFound from "./pages/NotFound";
import Monitoring from "./pages/Monitoring";
import MonitoringDetails from "./components/MonitoringDetails";

const routes = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
		children: [
			{
				path: "monitoring",
				element: <Monitoring />
			},
			{
				path: "monitoring/:id",
				element: <MonitoringDetails />
			},
			{
				path: "*",
				element: <NotFound />
			}
		]
	}
])

export default routes;
