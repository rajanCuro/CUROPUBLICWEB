import React, { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

function GetCurrentLocation() {
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const { setLatitude, setLongitude, latitude, longitude } = useAuth();

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        setLatitude(lat);
        setLongitude(lng);
        reverseGeocodeWithOSM(lat, lng);
      },
      (err) => {
        console.error("Location Error:", err);
        setError("Unable to retrieve your location.");
      }
    );
  }, []);

  const reverseGeocodeWithOSM = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`,
        {
          headers: {
            "User-Agent": "PharmaConnect/1.0 (support@pharmaconnect.com)",
            "Accept-Language": "en",
          },
        }
      );

      const data = await response.json();
      console.log("Reverse Geocoding Data", data);

      if (!data || !data.address) {
        throw new Error("Invalid address response");
      }

      formatAddress(data.address);
    } catch (error) {
      console.error("Reverse Geocode Error:", error);
      setError("Failed to fetch address");
    }
  };

  const formatAddress = (addressObj) => {
    const formatted = [
      addressObj.road,
      addressObj.suburb,
      addressObj.city || addressObj.town,
      addressObj.state,
      addressObj.postcode,
      addressObj.country,
    ]
      .filter(Boolean)
      .join(", ");

    setAddress(formatted);
  };

  return (
    <div className="p-4">  
      {address ? (
        <p className="text-gray-600 text-sm mt-2">{address}</p>
      ) : (
        <p className="text-gray-400 text-sm mt-2">Fetching your location...</p>
      )}
    </div>
  );
}

export default GetCurrentLocation;
