//https://www.npmjs.com/package/react-error-boundary
import { createBrowserRouter } from "react-router"
import Home from "./pages/Home"
import Phones from "./pages/Phones";
import AccountGrid from "./components/AccountGrid";
import NotFound from "./pages/NotFound";
import Monitoring from "./pages/Monitoring";

const routes = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
		children: [
			{
				path: "phones",
				element: <Phones />
			},
			{
				path: "accounts",
				element: <AccountGrid />
			},
			{
				path: "monitoring",
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
