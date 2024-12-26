//Model with WebSocket connection and CRUD operations
import { useEffect, useState } from "react";

import phoneService from "../api/phoneService";

const { createPhone, removePhone, init, findAllPhones, isConnected } = phoneService

const usePhonesModel = () => {
    const [phones, setPhones] = useState([]);
    const hasConnected = isConnected();
    useEffect(() => {
        const onFindAllPhones = (data) => {
            setPhones(prevState => [...prevState, ...data])
        }
        const onRemovePhone = (phoneId) => {
            setPhones(prevState => prevState.filter(phone => phone.id !== phoneId));
        }
        const onCreatePhone = (phone) => {
            setPhones(prevState => [...prevState, phone]);
        }
        const onOpen = () => {
            findAllPhones();
        }
        const socket = init({
            onOpen,
            onFindAllPhones,
            onCreatePhone,
            onRemovePhone
        });
        return () => {
            socket?.close();
        }
    }, []);

    return {
        phones,
        findAllPhones,
        createPhone,
        removePhone,
        hasConnected
    }
}

export default usePhonesModel;
