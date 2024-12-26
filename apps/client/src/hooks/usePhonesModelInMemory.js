import { useState } from "react";

const usePhonesModelInMemory = () => {
	const [phones, setPhones] = useState([]);

	console.log(" --- Initializing in-memory phone model --- ", phones);

	const findAllPhones = () => {
		return phones;
	}

	const createPhone = (phone) => {
		phone.id = Date.now().toString();
		setPhones(prevState => [...prevState, phone]);
	}

	const removePhone = (phoneId) => {
		setPhones(prevState => prevState.filter(phone => phone.id !== phoneId));
	}

	return {
		phones,
		hasConnected: true,
		findAllPhones,
		createPhone,
		removePhone
	}
}

export default usePhonesModelInMemory;
