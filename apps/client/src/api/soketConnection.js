const socket = new WebSocket('ws://localhost:3001');

socket.onerror = (error) => {
	console.error('WebSocket error:', error);
};

socket.onclose = () => {
	console.log('WebSocket connection closed');
};

export default socket;
