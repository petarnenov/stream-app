//import socket from "./soketConnection";

const getAllPhones = async () => {
	socket.send(JSON.stringify({ type: "GET_ALL_PHONES" }));
};


export { getAllPhones };
