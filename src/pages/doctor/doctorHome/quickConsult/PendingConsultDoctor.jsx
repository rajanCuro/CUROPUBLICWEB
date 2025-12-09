// src/pages/doctor/doctorHome/quickConsult/PendingConsultDoctor.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    FaUserMd,
    FaHeartbeat,
    FaClock,
    FaCheckCircle,
    FaComments,
    FaLightbulb,
    FaWifi,
    FaFileMedical,
    FaQuestionCircle,
    FaVideo,
    FaMicrophone
} from 'react-icons/fa';
import { RiSignalTowerLine } from 'react-icons/ri';
import { MdWifiCalling3, MdLightbulb } from 'react-icons/md';
import { BsCameraVideo } from 'react-icons/bs';
import { IoMdVolumeHigh } from 'react-icons/io';
import { GiMedicalPack } from 'react-icons/gi';
import StartCallWithDoctor from './StartCallWithDoctor';

function PendingConsultDoctor() {
    const [dots, setDots] = useState('');
    const [estimatedTime, setEstimatedTime] = useState(3);
    const [progress, setProgress] = useState(0);
    const [currentTipIndex, setCurrentTipIndex] = useState(0);
    const [doctorConnection, setDoctorConnection] = useState(false)

    const navigate = useNavigate();

    const tips = [
        {
            text: "Ensure you're in a quiet, well-lit environment",
            icon: <FaLightbulb className="w-5 h-5 text-yellow-500" />,
            bgColor: "bg-yellow-50",
            iconColor: "text-yellow-600"
        },
        {
            text: "Check your internet connection stability",
            icon: <FaWifi className="w-5 h-5 text-blue-500" />,
            bgColor: "bg-blue-50",
            iconColor: "text-blue-600"
        },
        {
            text: "Have your medical documents ready",
            icon: <FaFileMedical className="w-5 h-5 text-green-500" />,
            bgColor: "bg-green-50",
            iconColor: "text-green-600"
        },
        {
            text: "Prepare your questions for the doctor",
            icon: <FaQuestionCircle className="w-5 h-5 text-purple-500" />,
            bgColor: "bg-purple-50",
            iconColor: "text-purple-600"
        },
        {
            text: "Make sure your camera and microphone are working",
            icon: <div className="flex items-center space-x-1">
                <BsCameraVideo className="w-4 h-4 text-red-500" />
                <IoMdVolumeHigh className="w-4 h-4 text-teal-500" />
            </div>,
            bgColor: "bg-red-50",
            iconColor: "text-red-600"
        }
    ];

    useEffect(() => {
        // Dots Animation
        const dotsInterval = setInterval(() => {
            setDots(prev => (prev.length >= 3 ? '' : prev + '.'));
        }, 500);

        // Countdown every minute
        const timerInterval = setInterval(() => {
            setEstimatedTime(prev => (prev <= 0 ? 0 : prev - 1));
        }, 60000);

        // Progress Bar Animation
        const progressInterval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 95) return 95;
                return prev + Math.random() * 5;
            });
        }, 2000);

        // Rotate Tips every 4 seconds
        const tipInterval = setInterval(() => {
            setCurrentTipIndex(prev => (prev + 1) % tips.length);
        }, 4000);

        return () => {
            clearInterval(dotsInterval);
            clearInterval(timerInterval);
            clearInterval(progressInterval);
            clearInterval(tipInterval);
        };
    }, []);

    return (
        <>
            <button onClick={() => setDoctorConnection(!doctorConnection)}>Click</button>
            {
                doctorConnection ? <StartCallWithDoctor /> :

                    <div className="min-h-screen p-4 md:p-6">
                        <div className="max-w-6xl mx-auto">

                            {/* Connecting Card */}
                            <div className="lg:col-span-2 space-y-8">
                                <div>
                                    <div className="flex flex-col items-center justify-center text-center py-8">
                                        <div className="relative mb-6">
                                            <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-100 to-teal-100 flex items-center justify-center animate-pulse">
                                                <div className="absolute inset-0 rounded-full border-4 border-blue-200 animate-ping opacity-75"></div>
                                                <FaUserMd className="w-16 h-16 text-teal-600" />
                                            </div>
                                            <div className="absolute -bottom-2 -right-2 bg-green-500 text-white p-2 rounded-full animate-bounce">
                                                <MdWifiCalling3 className="w-6 h-6" />
                                            </div>
                                        </div>

                                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 w-1/2 ">
                                            Connecting with a Doctor{dots}
                                        </h2>

                                        <p className="text-gray-600 mb-6">
                                            Please wait. The doctor is busy and will connect with you in 5 minutes.
                                        </p>

                                        {/* Progress Bar */}
                                        <div className="w-full max-w-md mb-8">
                                            <div className="flex justify-between text-sm text-gray-500 mb-2">
                                                <span>Please wait</span>
                                                <span>{Math.round(progress)}%</span>
                                            </div>
                                            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-gradient-to-r from-teal-400 to-blue-500 rounded-full transition-all duration-1000 ease-out"
                                                    style={{ width: `${progress}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Preparation Tips */}
                                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                                    <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                                        <FaCheckCircle className="w-5 h-5 text-green-500 mr-2" />
                                        Preparation Tips
                                    </h3>

                                    <div className="space-y-3">
                                        <div
                                            key={currentTipIndex}
                                            className={`
                                    flex items-start space-x-3 p-4 
                                    ${tips[currentTipIndex].bgColor} rounded-lg 
                                    transition-all duration-700 ease-in-out
                                    animate-fadeIn
                                    `}
                                        >
                                            <div className={`w-10 h-10 rounded-full ${tips[currentTipIndex].bgColor.replace('50', '100')} flex items-center justify-center flex-shrink-0`}>
                                                <div className={tips[currentTipIndex].iconColor}>
                                                    {tips[currentTipIndex].icon}
                                                </div>
                                            </div>

                                            <div className="flex-1">
                                                <p className="text-gray-700 font-medium">
                                                    {tips[currentTipIndex].text}
                                                </p>
                                                <p className="text-sm text-gray-500 mt-1">
                                                    Tip {currentTipIndex + 1} of {tips.length}
                                                </p>
                                            </div>
                                        </div>


                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </>
    );
}

export default PendingConsultDoctor;