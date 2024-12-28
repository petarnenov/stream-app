import { useState } from 'react'
import { Outlet } from 'react-router'
import { ErrorBoundary } from "react-error-boundary"
import { TopNavigation, BottomNavigation, SideBar } from "@repo/ui"
import Fallback from './Fallback'
import useMonitoring from '../hooks/useMonitoring'
//import useMonitoring from '../hooks/useMonitoring'

const streamNavItemsDI = [
	{
		id: 1,
		label: "Home",
		to: "/"
	},
	{
		id: 2,
		label: "Phones",
		to: "/phones",
	},
	{
		id: 3,
		label: "Accounts",
		to: "/accounts",
	},
	{
		id: 4,
		label: "Monitorin",
		to: "/monitoring",
	},
	{
		id: 4,
		label: "Login",
		to: "/login",
	},
	{
		id: 5,
		label: "Logout",
		to: "/logout",
	}
]

const Home = (navItemsDI = navItemsDI) => {
	const [navItems] = useState(streamNavItemsDI)
	const { handleError } = useMonitoring();

	return (
		<ErrorBoundary FallbackComponent={Fallback} onError={handleError}>
			<header>
				<TopNavigation navItems={navItems} />
			</header>
			<main style={{ display: "flex", direction: "flexStart" }}>
				<section>
					<SideBar />
				</section>
				<section style={{ marginTop: "1rem", marginLeft: "1rem", flex: 1, height: "80vh", overflow: "scroll" }}>
					<Outlet />
				</section>
			</main>
			<footer>
				<BottomNavigation />
			</footer>
		</ErrorBoundary>
	)
}

export default Home
