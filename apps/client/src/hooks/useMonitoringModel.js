import { useCallback, useEffect, useState } from "react";
import monitoringServiceDI from "../api/monitoringService"

const useMonitoringModel = (monitoringService = monitoringServiceDI) => {
	const [monitoringData, setMonitoringData] = useState([])

	useEffect(() => {
		monitoringService.getAll().then((data) => {
			setMonitoringData(data);
		});
	}, [monitoringService]);

	const handleClear = useCallback(() => {
		monitoringService.clear().then(() => {
			monitoringService.getAll().then((data) => {
				setMonitoringData(data);
			});
		})
	}, [monitoringService]);

	return {
		monitoringData,
		save: monitoringService.save,
		getAll: monitoringService.getAll,
		getById: monitoringService.getById,
		handleClear
	}
}

export default useMonitoringModel;
