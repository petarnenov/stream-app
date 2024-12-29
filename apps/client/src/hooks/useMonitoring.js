import { useCallback, useEffect } from "react";
import useMonitoringModelDI from "./useMonitoringModel";

const sessionItemPrefix = 'GEO_';

const useMonitoring = (useMonitoringModel = useMonitoringModelDI) => {
	const { save } = useMonitoringModel();
	useEffect(() => {
		let clickCounter = 1;
		sessionStorage.clear();

		window.onclick = function (event) {
			//console.log("event: ", event)
			const clickData = {
				action: 'click',
				clickCounter: clickCounter,
				innerText: event.target.innerText,
				timeStamp: Date.now(),
				path: event.view.location.pathname,
			}
			const serializedClickData = JSON.stringify(clickData);
			//save to session storage
			sessionStorage.setItem([`${sessionItemPrefix}${clickCounter++}`], serializedClickData);
		}

		return () => {
			// Clean up the event handler when the component unmounts
			window.onclick = null;
		};
	}, [])


	const handleError = useCallback((error, errorInfo) => {
		console.log("Error: ", error);
		console.log("Error info: ", errorInfo);

		const sessionItemsNumber = sessionStorage.length;
		const stepsToReproduce = []
		for (let i = 0; i < sessionItemsNumber; i++) {

			const itemKey = sessionStorage.key(i);
			if (itemKey.startsWith(sessionItemPrefix)) {
				stepsToReproduce.push({
					step: itemKey.split(sessionItemPrefix)[1],
					data: JSON.parse(sessionStorage.getItem(itemKey))
				});
			}
		}

		save({
			message: error.message,
			stackTrace: errorInfo?.componentStack,
			stepsToReproduce
		});

	}, [save])

	return {
		handleError
	}
}

export default useMonitoring;
