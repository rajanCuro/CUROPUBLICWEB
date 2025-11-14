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
        <div className="container mt-10 mx-2 md:mx-auto">
            <div className="max-w-full mx-auto">
                
                {/* Header Section */}
                <div className="text-start">
                    <h1 className="text-xl font-bold text-gray-900 mb-1">Our Services</h1>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                    {services.map((service, index) => (
                        <div
                            onClick={() => navigate(service.path)}
                            key={service.id}
                            className="bg-white rounded-md p-6 border border-gray-100 cursor-pointer hover:bg-gray-50 transition duration-200 ease-in-out"
                        >
                            {/* Icon in Circle */}
                            <div className="flex justify-center mb-4">
                                <div
                                    className={`h-10 w-10 md:w-16 md:h-16 rounded-full flex items-center justify-center text-lg md:text-4xl ${
                                        index >= services.length - 2
                                            ? 'bg-yellow-50 text-yellow-700'
                                            : 'bg-teal-50 text-teal-700'
                                    }`}
                                >
                                    {service.icon}
                                </div>
                            </div>

                            {/* Title */}
                            <h3 className="text-md md:text-lg font-semibold text-gray-700 mb-2 text-center">
                                {service.title}
                            </h3>

                            {/* Description */}
                            <p className="text-gray-600 text-center text-xs md:text-md">
                                {service.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default OurServices;
