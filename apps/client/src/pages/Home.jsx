import { Outlet } from 'react-router'
import { ErrorBoundary } from "react-error-boundary"
import Fallback from './Fallback'

const Home = () => {
	return (
		<ErrorBoundary FallbackComponent={Fallback}>
			<div>
				<h1>Home</h1>
				<p>Welcome to our website!</p>
				<Outlet />
			</div>
		</ErrorBoundary>
	)
}

export default Home
