// src/pages/medicine/MedicineDetails.jsx
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { PiCurrencyInrBold } from "react-icons/pi";
import { MdMedicalServices, MdLocalHospital } from "react-icons/md";

function MedicineDetails() {
    const { state } = useLocation();
    const medicine = state?.medicine;

    if (!medicine) {
        return <div>No medicine data found.</div>;
    }

    // Initially show first image
    const [activeImage, setActiveImage] = useState(medicine.medicine?.imagesUrl?.[0] || "");

    return (
        <div className="p-6 container mx-auto h-screen">
            {/* Title */}


            {/* Images Section */}
            <div className="flex flex-row gap-6 mb-6">

                {/* Large Image */}
                <div className="flex-row flex justify-between items-start gap-4">
                    <div>
                        <div className="w-full">
                            <img
                                src={activeImage}
                                alt={medicine.medicine?.name || medicine.name}
                                className="w-full h-30 md:h-80 object-contain border rounded-lg shadow"
                            />
                        </div>

                        {/* Thumbnails at Bottom */}
                        <div className="flex gap-3 w-full overflow-x-auto justify-start py-2 mt-2">
                            {medicine.medicine?.imagesUrl?.map((img, index) => (
                                <img
                                    key={index}
                                    src={img}
                                    alt={`Thumbnail ${index + 1}`}
                                    onClick={() => setActiveImage(img)}
                                    className={`h-10 w-10 md:w-18 md:h-18 ml-1 object-cover border rounded-lg cursor-pointer transition-all
                            ${activeImage === img ? "ring-2 ring-blue-500 scale-105" : "hover:scale-105"}`}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="mt-4 space-y-2">

                        {/* Name */}
                        <h1 className=" text-md md:text-3xl font-bold text-gray-800 flex items-center gap-2">
                            {medicine.medicine?.name || medicine.name}
                        </h1>

                        {/* Price */}
                        <p className="text-md md:text-xl font-semibold text-green-600 flex items-center gap-1">
                            <PiCurrencyInrBold className="text-sm md:text-2xl" />
                            {medicine.effectiveCostPrice}
                        </p>

                        {/* Used For */}
                        <p className="flex items-center gap-2 text-gray-700 text-lg">
                            <MdMedicalServices className="text-blue-600 text-md md:text-2xl" />
                            <span>
                                {medicine.medicine?.prescribedFor || "NA"}
                            </span>
                        </p>

                        {/* Symptoms */}
                        {medicine.medicine?.symptoms?.length > 0 && <p p className="flex items-center gap-2 text-gray-700 text-lg">
                            <MdLocalHospital className="text-red-600 text-2xl" />
                            <span>
                                <strong>Symptoms:</strong>{" "}
                                {medicine.medicine?.symptoms?.length
                                    ? medicine.medicine.symptoms.join(", ")
                                    : "NA"}
                            </span>
                        </p>}
                    </div>
                </div>

            </div>





        </div >
    );
}

// Helper component for consistent info row styling
const InfoRow = ({ label, value }) => (
    <div className="flex justify-between items-center py-2 border-b border-gray-100">
        <span className="font-medium text-gray-600">{label}:</span>
        <span className="text-gray-800">{value || "Not specified"}</span>
    </div>
);

export default MedicineDetails;