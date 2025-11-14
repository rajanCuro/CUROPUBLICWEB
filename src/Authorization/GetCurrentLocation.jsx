// src/Authorization/GetCurrentLocation.jsx
import React, { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

function GetCurrentLocation() {
    const [location, setLocation] = useState(null);
    const [address, setAddress] = useState("");
    const [error, setError] = useState("");
    const { setLatitude, setLongitude } = useAuth()

    useEffect(() => {
        if (!navigator.geolocation) {
            setError("Geolocation is not supported by your browser.");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;

                setLocation({ latitude, longitude });

                console.log("Latitude:", latitude);
                console.log("Longitude:", longitude);
                setLatitude(latitude)
                setLongitude(longitude)

                try {
                    // ✅ FIX: Using CORS proxy to avoid CORS blocking
                    const url =
                        `https://api.allorigins.win/get?url=` +
                        encodeURIComponent(
                            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
                        );

                    const res = await fetch(url);
                    const wrappedData = await res.json();
                    const data = JSON.parse(wrappedData.contents);
                    setAddress(data.display_name || "Address not found");
                } catch (err) {
                    console.error(err);
                    setAddress("Unable to fetch address.");
                }
            },
            (err) => {
                setError("Location access denied by user.");
            }
        );
    }, []);

    return (
        <div className="p-4">
            {error && (
                <p className="text-red-500 mt-3">
                    <strong>Error:</strong> {error}
                </p>
            )}
            {address && (
                <p className="text-xs">
                    {address}
                </p>
            )}
        </div>
    );
}

export default GetCurrentLocation;
