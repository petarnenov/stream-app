import { useEffect } from "react";

import usePhonesModelDI from "./usePhonesModel";
import useAppStore from "../store/appStore";

const usePhonesViewModel = (usePhonesModel = usePhonesModelDI) => {
	const { phones, findAllPhones, createPhone, removePhone } = usePhonesModel();
	const {isConnected} = useAppStore();
	useEffect(() => {
		findAllPhones();
	}, [findAllPhones]);

	return {
		phones,
		createPhone,
		removePhone,
		isConnected
	};
}

export default usePhonesViewModel;
