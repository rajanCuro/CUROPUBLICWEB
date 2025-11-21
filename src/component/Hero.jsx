// src/component/Hero.jsx
import React, { useState } from "react";
import { FiSearch, FiUpload } from "react-icons/fi";
import { HiOutlineFolderOpen } from "react-icons/hi";
import heroImg from '../assets/doctor/doc.png'
import { TypeAnimation } from "react-type-animation";
import { useAuth } from "../Authorization/AuthContext";
import MedicineUploadPrescription from "../pages/medicine/MedicineUploadPrescription";

const Hero = () => {
    const [uploadPrescriptionModal, setUploadPrescriptionModal] = useState(false)
    const { token, setAuthModal } = useAuth()
    const [uploadMode, setUploadMode] = useState("normal");

    const handlePrescriptionUpload = (button) => {

        if (!token) {
            setAuthModal(true)
        }
        if (button == "saved") {
            setUploadMode('saved')
        }
        setUploadPrescriptionModal(true)
    }
    return (

        <section className="w-full  py-10 container md:mx-auto mx-4  mt-2">
            <div className="w-full mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
                {/* Left Content */}
                <div className="flex-1 text-center md:text-left">
                    <h1 className="text-2xl md:text-7xl font-bold text-gray-900 leading-tight">
                        Curo24
                    </h1>
                    <h2 className="text-md md:text-3xl font-semibold mt-1 md:mx-1 mx-4 ">
                        <span className="bg-gradient-to-r from-teal-400 via-teal-600 to-teal-800 bg-clip-text text-transparent">
                            <TypeAnimation
                                sequence={[
                                    "Your Complete Digital Healthcare Partner",
                                    2000,
                                    "Trusted Care, Anytime and Anywhere",
                                    2000,
                                ]}
                                wrapper="span"
                                speed={50}
                                repeat={Infinity}
                                cursor={true}
                            />
                        </span>
                    </h2>

                    <p className="text-gray-600 mt-3 max-w-md  px-5 md:px-1">
                        Order medicines, book doctor appointments, schedule lab tests, and access all your health information in one secure place.
                    </p>

                    {/* Search Bar */}
                    <div className="mx-6 md:mx-1">
                        <div className="mt-6  flex items-center bg-white border border-gray-200 rounded-lg px-3 py-2 shadow-sm max-w-md mx-auto md:mx-0">
                            <FiSearch className="text-gray-400 mr-2" />
                            <input
                                type="text"
                                placeholder="Search medicines, health products..."
                                className="w-full border-0 outline-none text-sm"
                            />
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="mx-6 md:mx-1">
                        <div className="mt-5 flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                            <button
                                onClick={() => handlePrescriptionUpload("continue")}
                                className="bg-teal-700 hover:bg-teal-800 text-white text-sm font-semibold py-2.5 px-5 rounded-lg flex items-center justify-center gap-2">
                                <FiUpload size={16} />
                                Upload Prescription
                            </button>
                            <button
                                onClick={() => handlePrescriptionUpload('saved')}
                                className="border border-gray-300 text-gray-800 hover:bg-gray-100 text-sm font-medium py-2.5 px-5 rounded-lg flex items-center justify-center gap-2">
                                <HiOutlineFolderOpen size={18} />
                                Upload from Saved Medical Records
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Image */}

                <div className="rounded-2xl      ">
                    <img
                        src={heroImg}
                        alt="Doctor illustration"
                        className="w-120 object-contain hidden md:block"
                    />
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
        </section>
    );
};

export default Hero;
