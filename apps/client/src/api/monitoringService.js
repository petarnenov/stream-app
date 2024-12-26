import api from './api';

const monitoringService = ({
	save: async (source, stackTrace) => {
		api.post("/monitoring", { source, stackTrace })
	},
	getAll: async () => {
		const response = await api.get("/monitoring");
		return response.data;
	},
	clear: ()=>{
		api.delete("/monitoring?clear=true");
	}
})

export default monitoringService;
