
const bigDataService = async () => {
	let data = [];
	try {
		const response = await fetch('http://192.168.0.164:3000/api/account');
		const reader = response.body.getReader();
		const decoder = new TextDecoder();

		let counter = 0;

		while (true) {
			const { value, done } = await reader.read();
			if (done) {
				return JSON.parse(data.replaceAll('][', ','));
			}
			const chunk = decoder.decode(value)
			console.log("chunk:", ++counter, chunk);
			data += chunk; 
		}

	} catch (error) {
		console.error('Error fetching data: ', error);
		throw error;
	}
}
export default bigDataService;