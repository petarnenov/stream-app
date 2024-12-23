//https://www.npmjs.com/package/react-error-boundary
import { createBrowserRouter } from "react-router"
import Home from "./pages/Home"
import Phones from "./pages/Phones";
import AccountGrid from "./components/AccountGrid";
import Fallback from "./pages/Fallback";
import NotFound from "./pages/NotFound";

const routes = createBrowserRouter([
	{
		path: "/",
		ErrorBoundary: Fallback,
		element: <Home />,
		children: [
			{
				path: "phones",
				ErrorBoundary: Fallback,
				element: <Phones />
			},
			{
				path: "accounts",
				ErrorBoundary: Fallback,
				element: <AccountGrid />
			},
			{
				path: "*",
				errorBoundary: Fallback,
				element: <NotFound />
			}
		]
	}
])

export default routes;
