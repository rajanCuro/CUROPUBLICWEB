// src/component/OurServices.jsx
import React from 'react';
import { GiMedicines, GiMicroscope } from "react-icons/gi";
import { FaUserDoctor } from "react-icons/fa6";
import { FaAmbulance } from "react-icons/fa";
import { RiHospitalFill, RiAlertFill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';

function OurServices() {
    const navigate = useNavigate();

    const services = [
        {
            id: 1,
            title: "Medicine Delivery",
            description: "Get your medications delivered to your home.",
            icon: <GiMedicines />,
            path: '/medicine/delivery'
        },
        {
            id: 2,
            title: "Lab Tests",
            description: "Book diagnostic tests and get results online.",
            icon: <GiMicroscope />,
            path: '/medicine/delivery'
        },
        {
            id: 3,
            title: "Doctor Consultation",
            description: "Consult with experienced doctors online.",
            icon: <FaUserDoctor />,
            path: '/medicine/delivery'
        },
        {
            id: 4,
            title: "Ambulance",
            description: "Request emergency medical transport.",
            icon: <FaAmbulance />,
            path: '/medicine/delivery'
        },
        {
            id: 5,
            title: "Hospitals",
            description: "Find the nearest hospital and receive reliable care.",
            icon: <RiHospitalFill />,
            path: '/medicine/delivery'
        },
        {
            id: 6,
            title: "Emergency Services",
            description: "Dispatch medical help instantly—fast, reliable, 24/7.",
            icon: <RiAlertFill />,
            path: '/medicine/delivery'
        }
    ];

    return (
        <div className="container mx-auto px-4 mt-12">
            
            {/* HEADER */}
            <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
                Our Services
            </h1>

            {/* GRID */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-8">

                {services.map((service, index) => (
                    <div
                        key={service.id}
                        onClick={() => navigate(service.path)}
                        className="
                            group relative bg-white rounded-xl p-5 md:p-6 
                            border border-gray-200 cursor-pointer 
                            transition-all duration-300 ease-out
                            hover:shadow-xl hover:scale-105
                            overflow-hidden
                        "
                    >
                        {/* ANIMATED GRADIENT BORDER */}
                        <div className="
                            absolute inset-0 rounded-xl 
                            bg-gradient-to-r from-teal-500 via-blue-500 to-purple-500 
                            opacity-0 group-hover:opacity-100 
                            transition-all duration-500
                            group-hover:animate-pulse
                        "></div>

                        {/* ROTATING BORDER EFFECT */}
                        <div className="
                            absolute inset-0 rounded-xl 
                            bg-gradient-to-r from-transparent via-teal-300 to-transparent
                            opacity-0 group-hover:opacity-100 
                            transition-opacity duration-700
                            group-hover:animate-[spin_3s_linear_infinite]
                        "></div>

                        {/* INNER BACKGROUND (WHITE) */}
                        <div className="
                            absolute inset-[2px] rounded-xl bg-white
                            transition-all duration-300
                        "></div>

                        {/* CONTENT */}
                        <div className="relative z-10 flex flex-col items-center">

                            {/* ICON */}
                            <div
                                className={`
                                    h-12 w-12 md:h-16 md:w-16 
                                    rounded-full flex items-center justify-center 
                                    text-2xl md:text-4xl mb-3
                                    transition-all duration-300 ease-out
                                    group-hover:scale-110 group-hover:rotate-6
                                    ${index >= services.length - 2
                                        ? 'bg-yellow-50 text-yellow-700 group-hover:bg-yellow-100 group-hover:shadow-lg'
                                        : 'bg-teal-50 text-teal-700 group-hover:bg-teal-100 group-hover:shadow-lg'}
                                `}
                            >
                                {service.icon}
                            </div>

                            {/* TITLE */}
                            <h3 className="text-sm md:text-lg font-semibold text-gray-800 text-center mb-1 transition-colors duration-300 group-hover:text-teal-700">
                                {service.title}
                            </h3>

                            {/* DESCRIPTION */}
                            <p className="text-gray-600 text-center text-xs md:text-sm transition-colors duration-300 group-hover:text-gray-800">
                                {service.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default OurServices;