import { useEffect } from "react";

import useMonitoringModelDI from "./useMonitoringModel";

const useMonitoring = (useMonitoringModel = useMonitoringModelDI) => {

	const { save } = useMonitoringModel();
	useEffect(() => {
		let clickCounter = 1;
		sessionStorage.clear();
		window.onerror = function (message, source, lineno, colno, error) {

			const sessionItemsNumber = sessionStorage.length;
			const stepsToReproduce = []
			for (let i = 0; i < sessionItemsNumber; i++) {
	
				const itemKey = sessionStorage.key(i);
				if (itemKey.startsWith('GEO_')) {
					stepsToReproduce.push({
						step: itemKey.split('GEO_')[1],
						data: sessionStorage.getItem(itemKey)
					});
				}
			}

			const errorData = {
				source,
				message,
				stack: error.stack,
				stepsToReproduce
			};

			save('fe', JSON.stringify(errorData));
		};

		window.onclick = function (event) {
			console.log("event: ", event)
			const clickData = {
				action: 'click',
				clickCounter: clickCounter,
				innerText: event.target.innerText,
				timeStamp: event.timeStamp
			}
			const serializedClickData = JSON.stringify(clickData);
			//save to session storage
			sessionStorage.setItem([`GEO_${clickCounter++}`], serializedClickData);
		}

		return () => {
			// Clean up the event handler when the component unmounts
			window.onerror = null;
			window.onclick = null;
		};
	}, [save])
}

export default useMonitoring;
