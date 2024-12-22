import { create } from "zustand"

const useAppStore = create((set) => ({
	isConnected: false,
	setIsConnected: (isConnected) => {
		set(() => ({
			isConnected
		}))
	},
}))

export default useAppStore
