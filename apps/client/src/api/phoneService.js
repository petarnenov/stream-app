const webSocketUrlDI = 'ws://localhost:3001';

const phoneService = () => {
	let socket = null;

	const init = ({
		url = webSocketUrlDI,
		onOpen = () => { },
		onFindAllPhones = () => { },
		onCreatePhone = () => { },
		onRemovePhone = () => { }
	}) => {

		socket = new WebSocket(url);
		socket.onopen = () => {
			console.log('WebSocket connection established');
			onOpen();
		}
		socket.onmessage = (event) => {
			const data = JSON.parse(event.data);
			if (data.event === "findAllPhones") {
				onFindAllPhones(data.payload);
			}
			if (data.event === "createPhone") {
				onCreatePhone(data.payload);
			}
			if (data.event === "removePhone") {
				onRemovePhone(data.payload);
			}
			console.log("Received event:", event);
		}
		socket.onclose = () => {
			console.log('WebSocket connection closed');
		}
		socket.onerror = (error) => {
			console.error('WebSocket error:', error);
		}

		return socket;
	}

	const findAllPhones = () => {
		if (socket?.readyState === WebSocket.OPEN) {
			socket.send(JSON.stringify({ event: "findAllPhones" }));
		}
	}

	const createPhone = (phone) => {
		if (socket?.readyState === WebSocket.OPEN) {
			socket.send(JSON.stringify({ event: "createPhone", data: phone }));
		}
	}

	const removePhone = (phoneId) => {
		if (socket?.readyState === WebSocket.OPEN) {
			socket.send(JSON.stringify({ event: "removePhone", data: phoneId }));
		}
	}

	const isConnected = () => socket?.readyState === WebSocket.OPEN;

	return ({
		findAllPhones,
		createPhone,
		removePhone,
		init,
		isConnected
	})
}

export const phoneServiceDI = phoneService();

export default phoneServiceDI;
