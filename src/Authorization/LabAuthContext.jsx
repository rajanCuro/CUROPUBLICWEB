// src/Authorization/LabAuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "./axiosInstance";

const LabAuthContext = createContext();
export const useLabAuth = () => useContext(LabAuthContext);

export const LabAuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [userData, setUserdata] = useState(null);
    const [loading, setLoading] = useState(true);
    const [screen, setScreen] = useState("Pharmacy");
    const [latitude, setLatitude] = useState(25.33297);
    const [longitude, setLongitude] = useState(82.966293);
    const [labCartItems, setLabCartItems] = useState([]);   // <<< NEW STATE
    const [labCartLoading, setLabCartLoading] = useState(false);

    const id = userData?.id;

    useEffect(() => {
        const storedUser = localStorage.getItem("userData");
        const storedToken = localStorage.getItem("token");

        if (storedUser) setUserdata(JSON.parse(storedUser));
        if (storedToken) setToken(storedToken);

        setLoading(false);
    }, []);

    const getAllCartItems = async () => {
        if (!id) return;
        setLabCartLoading(true);
        try {
            const response = await axiosInstance.get(
                `/endUserEndPoint/getLabCartItems?userId=${id}`
            );
            console.log("Lab cart items response: ", response.data);
            setLabCartItems(response.data.dtoList);    // <<< SAVE DATA HERE
        } catch (error) {
            console.log("Error fetching cart items:", error?.response);
        } finally {
            setLabCartLoading(false);
        }
    };

    const value = {
        token, setToken,
        userData, setUserdata,
        latitude, setLatitude,
        longitude, setLongitude,
        screen, setScreen,
        labCartItems,                 // <<< EXPOSE FOR UI
        labCartLoading,
        getAllCartItems
    };

    return (
        <LabAuthContext.Provider value={value}>
            {!loading && children}
        </LabAuthContext.Provider>
    );
};
