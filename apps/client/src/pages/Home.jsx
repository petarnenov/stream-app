import { useState } from 'react'
import { Outlet } from 'react-router'
import { ErrorBoundary } from "react-error-boundary"
import { TopNavigation, BottomNavigation, SideBar } from "@repo/ui"
import Fallback from './Fallback'
import useMonitoring from '../hooks/useMonitoring'
// import {useMonitoringUI} from "monitoring-ui"
// import monitoringService from '../api/monitoringService'

const streamNavItemsDI = [
	{
		id: 1,
		label: "Home",
		to: "/"
	},
	{
		id: 2,
		label: "Monitoring",
		to: "/monitoring",
	},
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
