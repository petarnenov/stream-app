import styles from "./Fallback.module.scss"

const Fallback = () => {

	return (
		<div className={styles.fallback}>
			<h2>Oops! Something went wrong.</h2>
			<p>We are sorry, but it seems there was an error.</p>
			<p>Please try refreshing the page or contacting support.</p>
		</div>
	);
};

export default Fallback;