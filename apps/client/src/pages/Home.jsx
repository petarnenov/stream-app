import React from 'react'
import { Outlet } from 'react-router'

const Home = () => {
	return (
		<div>
			<h1>Home</h1>
			<p>Welcome to our website!</p>
			<Outlet />
		</div>
	)
}

export default Home
