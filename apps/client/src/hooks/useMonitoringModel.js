import { useEffect, useState } from "react";
import monitoringServiceDI from "../api/monitoringService"

const useMonitoringModel = (monitoringService = monitoringServiceDI) => {
	const [monitoringData, setMonitoringData] = useState([])

	useEffect(() => {
		monitoringService.getAll().then((data) => {
			setMonitoringData(data);
		});
	}, [monitoringService]);

	return {
		monitoringData,
		save: monitoringService.save,
		getAll: monitoringService.getAll,
		clear: monitoringService.clear,
	}
}

export default useMonitoringModel;
