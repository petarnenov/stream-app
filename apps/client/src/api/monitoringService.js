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
	getById: async (id) => {
		const response = await api.get(`/monitoring/${id}`);
		return response.data;
	},
	clear: async () => {
		const response = await api.delete("/monitoring?clear=true");
		return response.data;
	}
})

export default monitoringService;
