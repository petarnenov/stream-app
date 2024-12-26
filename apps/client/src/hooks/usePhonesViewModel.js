import usePhonesModelDI from "./usePhonesModel";
//import usePhonesModelInMemoryDI from "./usePhonesModelInMemory";

const usePhonesViewModel = (usePhonesModel = usePhonesModelDI) => {
	const { phones, createPhone, removePhone, hasConnected } = usePhonesModel();

	//DO additional business logic here

	return {
		phones,
		createPhone,
		removePhone,
		hasConnected
	};
}

export default usePhonesViewModel;
