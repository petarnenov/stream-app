import { useEffect, useState } from "react";
import { useNavigate as useNavigateDI, useParams as useParamsDI } from "react-router";

import useMonitoringModelDI from "./useMonitoringModel"

const useMonitoringDetailsViewModel = ({
	useMonitoringModel = useMonitoringModelDI,
	useParams = useParamsDI,
	useNavigate = useNavigateDI
} = {}) => {
	const { id } = useParams();
	const { getById } = useMonitoringModel();
	const [monitoringData, setMonitoringData] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		getById(id).then((data) => {
			setMonitoringData(data);
		});
	}, [id, getById]);

	return {
		monitoringData,
		handleBack: () => navigate(-1)
	}
}

export default useMonitoringDetailsViewModel;
