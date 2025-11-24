// src/Authorization/GetCurrentLocation.jsx
import React, { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

function GetCurrentLocation() {
    const [address, setAddress] = useState("");
    const [error, setError] = useState("");
    const { setLatitude, setLongitude, latitude, longitude } = useAuth();

    // 📍 Get browser location once on mount
    useEffect(() => {
        if (!navigator.geolocation) {
            setError("Geolocation is not supported by your browser.");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;

                setLatitude(latitude);
                setLongitude(longitude);

                console.log("Latitude:", latitude);
                console.log("Longitude:", longitude);
            },
            () => setError("Location access denied by user.")
        );
    }, []);

    // 🌍 Run reverse geocoding whenever lat/lng changes
    useEffect(() => {
        if (latitude && longitude) {
            reverseGeocodeWithOSM(latitude, longitude);
        }
    }, [latitude, longitude]); // <- triggers on change

    const reverseGeocodeWithOSM = async (lat, lng) => {
        try {
            const url =
                `https://api.allorigins.win/get?url=` +
                encodeURIComponent(
                    `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
                );

            const res = await fetch(url);
            const wrappedData = await res.json();
            const data = JSON.parse(wrappedData.contents);

            formatAddress(data.address);
        } catch (err) {
            console.error(err);
            setAddress("Unable to fetch address.");
        }
    };

    const formatAddress = (addr) => {
        const formatted = [
            addr.city || addr.town || addr.village || "",
            addr.suburb || "",
            addr.state_district || "",
            addr.state || "",
            addr.postcode || "",
            addr.country || "",
        ]
            .filter(Boolean)
            .join(", ");

        setAddress(formatted);
    };

    return (
        <div className="p-4">
            {error && <p className="text-red-500 text-xs"><strong>Error:</strong> {error}</p>}
            {address && (
                <p className="text-xs mt-2">
                    <strong>Location:</strong> {address}
                </p>
            )}
        </div>
    );
}

export default GetCurrentLocation;
