import { useEffect } from "react";

import usePhonesModelDI from "./usePhonesModel";

const usePhonesViewModel = (usePhonesModel = usePhonesModelDI) => {
	const { phones, findAllPhones, createPhone, removePhone } = usePhonesModel();
	useEffect(() => {
		findAllPhones();
	}, [findAllPhones]);

	return {
		phones,
		createPhone,
		removePhone,
	};
}

export default usePhonesViewModel;
