import { useCallback, useEffect, useState } from "react";
import monitoringServiceDI from "../api/monitoringService"

const useMonitoringModel = (monitoringService = monitoringServiceDI) => {
	const { getAll, clear, save, getById } = monitoringService;
	const [monitoringData, setMonitoringData] = useState([])

	useEffect(() => {
		getAll().then((data) => {
			setMonitoringData(data);
		});
	}, [getAll]);

	const handleClear = useCallback(() => {
		clear().then(() => {
			getAll().then((data) => {
				setMonitoringData(data);
			});
		})
	}, [clear, getAll]);

	return {
		monitoringData,
		save: save,
		getAll: getAll,
		getById: getById,
		handleClear
	}
}

export default useMonitoringModel;
