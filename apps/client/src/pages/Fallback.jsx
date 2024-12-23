import { Link } from "react-router";

import styles from "./Fallback.module.scss"

const Fallback = () => {
	return (
		<div className="fallback">
			<h1>Oops! Something went wrong.</h1>
			<p>We're sorry, but it seems there was an error.</p>
			<Link to="/" className={styles.homeLink}>
				Return to Home
			</Link>
		</div>
	);
};

export default Fallback;