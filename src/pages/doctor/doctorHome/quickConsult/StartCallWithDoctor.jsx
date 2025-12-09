// src/pages/doctor/doctorHome/quickConsult/StartCallWithDoctor.jsx (Minimal Version)
import React from 'react';
import { FaUserMd, FaStethoscope, FaCheckCircle } from 'react-icons/fa';
import { BsCameraVideoFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

function StartCallWithDoctor() {
    const navigate = useNavigate()
    const handleStartCall = () => {
        console.log('Starting video call...');
        // Add your call start logic here
    };

    return (
        <div className="min-h-screen  flex items-start justify-center">
            <div className="max-w-md w-full mt-10">
                {/* Success Message */}
                <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                        <FaCheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800">
                        Doctor Connected Successfully!
                    </h1>
                </div>

                {/* Doctor Card */}
                <div className="p-6 mb-6">
                    <div className="flex flex-col gap-2 items-center space-x-4">
                        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                            <FaUserMd className="w-10 h-10 text-blue-600" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-800">
                                Dr. Evelyn Reed
                            </h2>
                            <div className="flex items-center mt-1">
                                <FaStethoscope className="w-4 h-4 text-gray-500 mr-2" />
                                <span className="text-gray-600">General Physician</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Ready Message */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-6">
                    <p className="text-center text-gray-700 text-lg">
                        Your consultation is ready to begin immediately.
                    </p>
                </div>

                {/* Start Call Button */}
                <button
                    onClick={handleStartCall}
                    className="w-full bg-teal-600 hover:bg-teal-700 cursor-pointer text-white font-semibold py-4 px-6 rounded-xl text-lg flex items-center justify-center space-x-3 transition-colors duration-300 shadow-md"
                >
                    <BsCameraVideoFill className="w-6 h-6" />
                    <span>Start Call</span>
                </button>
                <p onClick={() => navigate('/doctor/complete/consult')}>Click Here</p>
            </div>
        </div>
    );
}

export default StartCallWithDoctor;