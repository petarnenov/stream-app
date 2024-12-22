import { createBrowserRouter } from "react-router"
import Home from "./pages/Home"
import Phones from "./pages/Phones";
import AccountGrid from "./components/AccountGrid";

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
			}
		]
	}
])

export default routes;
