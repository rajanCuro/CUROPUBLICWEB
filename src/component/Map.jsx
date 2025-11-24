// src/component/Map.jsx
import React, { useState, useRef, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import { useAuth } from "../Authorization/AuthContext";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Custom icon for better appearance
const customIcon = new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const containerStyle = {
  width: "100%",
  height: "400px",
};

function Map() {
  const { latitude, setLatitude, longitude, setLongitude } = useAuth();
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [map, setMap] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const markerRef = useRef(null);

  // 📍 Get user current location on component load
  useEffect(() => {
    if (!latitude || !longitude) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLatitude(latitude);
          setLongitude(longitude);
          setSelectedLocation([latitude, longitude]);
          reverseGeocodeWithOSM(latitude, longitude);
        },
        (err) => {
          setError("Location access denied. Using default location.");
          // Set default location if geolocation fails
          const defaultLocation = [28.6139, 77.2090]; // Delhi, India
          setSelectedLocation(defaultLocation);
          setLatitude(defaultLocation[0]);
          setLongitude(defaultLocation[1]);
          reverseGeocodeWithOSM(defaultLocation[0], defaultLocation[1]);
        }
      );
    } else {
      setSelectedLocation([latitude, longitude]);
      reverseGeocodeWithOSM(latitude, longitude);
    }
  }, [latitude, longitude, setLatitude, setLongitude]);

  // 🌍 Reverse Geocode via OpenStreetMap
  const reverseGeocodeWithOSM = async (lat, lng) => {
    try {
      const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`;
      
      const res = await fetch(url);
      const data = await res.json();
      
      if (data && data.address) {
        formatAddress(data.address);
      } else {
        setAddress("Address not found");
      }
    } catch (err) {
      console.error("Geocoding error:", err);
      setAddress("Unable to fetch address");
    }
  };

  // Format OSM address into custom string
  const formatAddress = (addr) => {
    if (!addr) {
      setAddress("No address information available");
      return;
    }

    const formatted = [
      addr.house_number,
      addr.road,
      addr.neighbourhood,
      addr.suburb,
      addr.city || addr.town || addr.village,
      addr.state,
      addr.postcode,
      addr.country,
    ]
      .filter(Boolean)
      .join(", ");

    setAddress(formatted || "Address format not available");
  };

  // 🖱 Map click handler
  const handleMapClick = (e) => {
    const { lat, lng } = e.latlng;
    setSelectedLocation([lat, lng]);
    setLatitude(lat);
    setLongitude(lng);
    reverseGeocodeWithOSM(lat, lng);
  };

  // 🎯 Marker drag end handler
  const handleMarkerDragEnd = (e) => {
    const marker = e.target;
    const position = marker.getLatLng();
    setSelectedLocation([position.lat, position.lng]);
    setLatitude(position.lat);
    setLongitude(position.lng);
    reverseGeocodeWithOSM(position.lat, position.lng);
  };

  // 🔍 Manual address search handler
  const handleAddressSearch = async (e) => {
    e.preventDefault();
    if (!address.trim()) return;

    setIsSearching(true);
    setError("");

    try {
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;
      
      const res = await fetch(url);
      const data = await res.json();

      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        const newLocation = [parseFloat(lat), parseFloat(lon)];
        setSelectedLocation(newLocation);
        setLatitude(newLocation[0]);
        setLongitude(newLocation[1]);
        
        if (map) {
          map.setView(newLocation, 16);
        }
        
        // Get the full address for the selected location
        reverseGeocodeWithOSM(newLocation[0], newLocation[1]);
      } else {
        setError("Address not found. Please try a different search term.");
      }
    } catch (err) {
      console.error("Search error:", err);
      setError("Error searching for address. Please try again.");
    } finally {
      setIsSearching(false);
    }
  };

  // 📍 Use Current Location handler
  const handleUseCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setSelectedLocation([latitude, longitude]);
        setLatitude(latitude);
        setLongitude(longitude);
        if (map) {
          map.setView([latitude, longitude], 16);
        }
        reverseGeocodeWithOSM(latitude, longitude);
        setError("");
      },
      (err) => {
        setError("Unable to get current location. Please check your location permissions.");
      }
    );
  };

  // Map events component
  function MapEvents() {
    useMapEvents({
      click: handleMapClick,
    });
    return null;
  }

  if (!selectedLocation) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 to-teal-700 px-6 py-4">
        <h2 className="text-xl font-semibold text-white">Location Selection</h2>
        <p className="text-teal-100 text-sm mt-1">Select your delivery location on the map</p>
      </div>

      {/* Search Section */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex flex-col sm:flex-row gap-3 mb-3">
          <div className="flex-1">
            <label htmlFor="address-search" className="block text-sm font-medium text-gray-700 mb-2">
              Search Address
            </label>
            <form onSubmit={handleAddressSearch} className="flex gap-2">
              <input
                id="address-search"
                type="text"
                placeholder="Enter full address (street, city, postal code)"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <button
                type="submit"
                disabled={isSearching}
                className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
              >
                {isSearching ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Searching</span>
                  </div>
                ) : (
                  "Search"
                )}
              </button>
            </form>
          </div>
          <button
            onClick={handleUseCurrentLocation}
            className="px-4 py-3 border border-teal-600 text-teal-600 rounded-lg hover:bg-teal-50 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-colors font-medium whitespace-nowrap mt-7 sm:mt-0"
          >
            📍 Current Location
          </button>
        </div>
        
        {error && (
          <div className="flex items-center gap-2 text-red-600 bg-red-50 px-4 py-3 rounded-lg border border-red-200">
            <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <span className="text-sm">{error}</span>
          </div>
        )}
      </div>

      {/* Map Container */}
      <div className="p-6">
        <div className="rounded-lg overflow-hidden border border-gray-300 shadow-sm">
          <MapContainer
            center={selectedLocation}
            zoom={14}
            style={containerStyle}
            whenCreated={setMap}
            className="w-full"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapEvents />
            <Marker
              position={selectedLocation}
              draggable={true}
              eventHandlers={{
                dragend: handleMarkerDragEnd,
              }}
              icon={customIcon}
              ref={markerRef}
            >
              <Popup className="custom-popup">
                <div className="text-sm min-w-[200px]">
                  <h3 className="font-semibold text-gray-900 mb-2">Selected Location</h3>
                  <div className="space-y-1">
                    <p className="text-gray-600">
                      <span className="font-medium">Lat:</span> {selectedLocation[0]?.toFixed(6)}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Lng:</span> {selectedLocation[1]?.toFixed(6)}
                    </p>
                    <p className="text-gray-600 mt-2">
                      <span className="font-medium">Address:</span> {address}
                    </p>
                  </div>
                </div>
              </Popup>
            </Marker>
          </MapContainer>
        </div>

        {/* Location Details */}
        <div className="mt-6 bg-gray-50 rounded-lg p-4 border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Selected Location Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-gray-500 font-medium">Latitude</p>
              <p className="text-gray-900 font-mono">{selectedLocation[0]?.toFixed(6)}</p>
            </div>
            <div>
              <p className="text-gray-500 font-medium">Longitude</p>
              <p className="text-gray-900 font-mono">{selectedLocation[1]?.toFixed(6)}</p>
            </div>
            <div className="md:col-span-1">
              <p className="text-gray-500 font-medium">Full Address</p>
              <p className="text-gray-900">{address}</p>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
          <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Click on the map or drag the marker to set your precise location</span>
        </div>
      </div>
    </div>
  );
}

export default Map;