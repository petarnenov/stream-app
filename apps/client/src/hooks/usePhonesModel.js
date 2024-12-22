import { useEffect, useState, useCallback } from "react";
import useAppStore from "../store/appStore";

const usePhonesModel = () => {
    const [phones, setPhones] = useState([]);

    //WebSocket connection setup
    const [socket, setSocket] = useState(null);
    const { setIsConnected } = useAppStore();

    useEffect(() => {
        const socket = new WebSocket('ws://localhost:3001');
        socket.onopen = () => {
            setSocket(socket);
            setIsConnected(true);
        }
        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.event === "findAllPhones") {
                setPhones(data.payload);
            }
            if (data.event === "createPhone") {
                setPhones(prev => [...prev, data.payload]);
            }
            if (data.event === "removePhone") {
                setPhones(prev => prev.filter(phone => phone.id !== data.payload.id));
            }
            console.log("Received event:", event);
        }
        socket.onclose = () => {
            setSocket(null);
            setIsConnected(false);
            console.log('WebSocket connection closed');
        }
        socket.onerror = (error) => {
            console.error('WebSocket error:', error);
        }
        return () => {
            socket.close();
        }
    }, [setIsConnected])
    //

    const findAllPhones = useCallback(() => {
        if (socket) {
            socket.send(JSON.stringify({ event: "findAllPhones" }));
        }
    }, [socket])

    const createPhone = useCallback((phone) => {
        if (socket) {
            socket.send(JSON.stringify({ event: "createPhone", data: phone }));
        }
    }, [socket])

    const removePhone = useCallback((phoneId) => {
        if (socket) {
            socket.send(JSON.stringify({ event: "removePhone", data: phoneId }));
        }
    }, [socket])

    return {
        phones,
        findAllPhones,
        createPhone,
        removePhone,
    }
}

export default usePhonesModel;
