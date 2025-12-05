// src/component/UploadPrescription.jsx
import React, { useState } from 'react'
import { FiUpload } from "react-icons/fi";
import { useAuth } from '../Authorization/AuthContext';
import MedicineUploadPrescription from '../pages/medicine/MedicineUploadPrescription';

function UploadPrescription() {
    const { setAuthModal, token } = useAuth()
    const [uploadPrescriptionModal, setUploadPrescriptionModal] = useState(false)
    const [uploadMode, setUploadMode] = useState("continue");

    const handleUploadPrescription = () => {
        if (!token) {
            setAuthModal(true)
        }
        setUploadPrescriptionModal(true)
    }

    return (
        <div className="w-full container mx-auto ">
            <div className="w-full bg-gray-50  sm:py-8 md:py-10 rounded-md shadow-md py-4 ">

                <div className="flex flex-col items-center justify-center text-center px-4">

                    {/* Icon */}
                    <div className="bg-teal-600 p-3 sm:p-4 md:p-5 rounded-full">
                        <FiUpload

                            className="text-white sm:size-8"
                        />
                    </div>

                    {/* Title */}
                    <h1 className="font-bold my-2 text-base sm:text-lg md:text-xl text-gray-800">
                        Order Medicine
                    </h1>

                    {/* Description */}
                    <p className="text-xs sm:text-sm md:text-base text-gray-700 max-w-md">
                        Upload your prescription and get medicines delivered to your doorstep.
                    </p>

                    {/* Button */}
                    <button
                        onClick={() => handleUploadPrescription()}
                        className="cursor-pointer text-white bg-teal-700 px-4 md:px-6 py-2 rounded-md text-xs sm:text-sm md:text-base font-medium mt-3"
                    >
                        Upload Prescription
                    </button>

                </div>
            </div>
            {uploadPrescriptionModal && (
                <div className="fixed inset-0 backdrop-brightness-50 flex items-center justify-center z-50">
                    <div className="relative bg-white max-w-7xl w-full rounded-lg shadow-lg overflow-auto">

                        {/* CLOSE BUTTON */}
                        <button
                            onClick={() => setUploadPrescriptionModal(false)}
                            className="absolute top-3 right-3 z-50 cursor-pointer bg-gray-200 hover:bg-gray-300 text-gray-700 
                            rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold"
                        >
                            ×
                        </button>

                        {/* MODAL CONTENT */}
                        <MedicineUploadPrescription
                            mode={uploadMode}
                            onClose={() => setUploadPrescriptionModal(false)}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}

export default UploadPrescription
