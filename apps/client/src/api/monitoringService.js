import api from './api';

const monitoringService = ({
	save: async ({ source = 'fe', message, stackTrace, stepsToReproduce }) => {
		const data = { source, message, stackTrace, stepsToReproduce: JSON.stringify(stepsToReproduce) };
		//console.log("Saving monitoring data:", data);
		api.post("/monitoring", data);
	},
	getAll: async () => {
		const response = await api.get("/monitoring");
		return response.data;
	},
	clear: () => {
		api.delete("/monitoring?clear=true");
	}
})

export default monitoringService;
