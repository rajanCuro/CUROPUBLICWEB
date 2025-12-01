// src/pages/doctor/doctorHome/doctors/ViewDoctorDetails.jsx
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaUserMd, FaGraduationCap, FaHospitalAlt, FaBriefcaseMedical } from "react-icons/fa";
import { MdInfo, MdWork } from "react-icons/md";
import { FaClinicMedical, FaMapMarkerAlt, FaClock, FaStar, FaUserCircle } from "react-icons/fa";

export default function ViewDoctorDetails() {
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }, [])
    const { state } = useLocation();
    const doctor = state?.doctor;

    const reviews = [
        {
            name: "Amit Verma",
            date: "Jan 12, 2025",
            rating: 5,
            review: `Dr. ${doctor?.name} is extremely polite and knowledgeable. He explained the condition very clearly. Highly recommended!`
        },
        {
            name: "Rohini Sharma",
            date: "Feb 03, 2025",
            rating: 4,
            review: "Excellent doctor. Listens patiently and gives effective treatment. Clinic staff is also very helpful."
        },
        {
            name: "Suresh Patil",
            date: "Feb 18, 2025",
            rating: 5,
            review: "Very experienced and friendly doctor. My chest pain issue was resolved quickly. Truly appreciate his guidance."
        }
    ];
    const navigate = useNavigate()
    const handleBookAppiotment = (doctor) => {
        if (!doctor) {
            return;
        }
        navigate('/doctor-book-appoitment', { state: { doctor } })

    }

    return (
        <div className="container mx-auto px-4 sm:px-6 py-6">
            {/* Header */}
            <div className="bg-white shadow-lg rounded-2xl p-4 sm:p-6 flex items-center gap-4">
                <img
                    src={doctor?.image}
                    className='h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 rounded-full object-cover'
                    alt={`Dr. ${doctor?.name}`}
                />
                <div className="flex-1 min-w-0">
                    <h1 className="text-lg sm:text-xl md:text-2xl font-bold truncate">{doctor?.name}</h1>
                    <p className="text-gray-600 text-sm sm:text-base truncate">{doctor?.specialty}</p>
                    <p className="text-yellow-500 font-semibold text-sm sm:text-base flex items-center gap-1">
                        ⭐ {doctor?.rating} <span className="text-gray-500 font-normal">({doctor?.reviews} reviews)</span>
                    </p>
                </div>
                <button
                    onClick={() => handleBookAppiotment(doctor)}
                    className='bg-teal-700 rounded-md text-white px-3 py-2 hover:bg-teal-700 cursor-pointer'>Book Appotment</button>
            </div>

            {/* Consultation Modes */}
            <div className="bg-white shadow-lg rounded-2xl p-4 sm:p-6 mt-4 sm:mt-6">
                <h2 className="text-base sm:text-lg md:text-xl font-semibold mb-3 sm:mb-4 text-teal-700">Consultation Modes</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="border border-gray-200 rounded-xl p-3 sm:p-4 hover:border-teal-500 transition-colors">
                        <p className="font-medium text-sm sm:text-base">Online Consultation</p>
                        <div className='flex justify-between items-center mt-1 sm:mt-2'>
                            <p className='text-gray-600 text-xs sm:text-sm'>40 min</p>
                            <p className="text-teal-700 font-semibold text-sm sm:text-base">₹ {doctor?.fees}</p>
                        </div>
                    </div>
                    <div className="border border-gray-200 rounded-xl p-3 sm:p-4 hover:border-teal-500 transition-colors">
                        <p className="font-medium text-sm sm:text-base">In‑Clinic Visit</p>
                        <div className='flex justify-between items-center mt-1 sm:mt-2'>
                            <p className='text-gray-600 text-xs sm:text-sm'>60 min</p>
                            <p className="text-teal-700 font-semibold text-sm sm:text-base">₹ 2000</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* About */}
            <div className="bg-white shadow-lg rounded-2xl p-4 sm:p-6 mt-4 sm:mt-6">
                <h2 className="text-base sm:text-lg md:text-xl font-semibold mb-3 sm:mb-4 flex items-center gap-2">
                    <MdInfo className="text-blue-600 text-lg sm:text-xl" />
                    About {doctor?.name}
                </h2>
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                    Dr. {doctor?.name} is a highly experienced cardiologist with over {doctor?.experience}+ years
                    of dedicated practice. He specializes in advanced cardiovascular treatments and is known for
                    his compassionate and evidence-based approach.
                </p>
            </div>

            {/* Qualifications & Experience */}
            <div className="bg-white shadow-lg rounded-2xl p-4 sm:p-6 mt-4 sm:mt-6">
                <h2 className="text-base sm:text-lg md:text-xl font-semibold mb-3 sm:mb-4 flex items-center gap-2">
                    <FaUserMd className="text-green-600 text-lg sm:text-xl" />
                    Qualifications & Experience
                </h2>

                {/* Qualifications */}
                <div className="mb-4 sm:mb-6">
                    <h3 className="font-semibold mb-2 sm:mb-3 flex items-center gap-2 text-sm sm:text-base md:text-lg">
                        <FaGraduationCap className="text-indigo-600" />
                        Qualifications
                    </h3>
                    <ul className="list-disc ml-5 sm:ml-6 text-gray-700 text-sm sm:text-base">
                        <li>{doctor?.education}</li>
                    </ul>
                </div>

                {/* Experience */}
                <div>
                    <h3 className="font-semibold mb-2 sm:mb-3 flex items-center gap-2 text-sm sm:text-base md:text-lg">
                        <MdWork className="text-orange-500" />
                        Experience
                    </h3>
                    <ul className="list-disc ml-5 sm:ml-6 text-gray-700 text-sm sm:text-base space-y-1">
                        <li>{doctor?.experience}+ years of experience</li>
                        <li className="flex items-center gap-2">
                            <FaHospitalAlt className="text-red-500 flex-shrink-0" />
                            <span>Currently practicing at {doctor?.hospital}</span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Languages */}
            <div className="bg-white shadow-lg rounded-2xl p-4 sm:p-6 mt-4 sm:mt-6">
                <h2 className="text-base sm:text-lg md:text-xl font-semibold mb-3 sm:mb-4">Languages Spoken</h2>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                    {doctor?.languages?.map((lang, index) => (
                        <span
                            key={index}
                            className="bg-gray-100 hover:bg-gray-200 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-gray-700 text-xs sm:text-sm transition-colors"
                        >
                            {lang}
                        </span>
                    ))}
                </div>
            </div>

            {/* Availability */}
            <div className="bg-white shadow-lg rounded-2xl p-4 sm:p-6 mt-4 sm:mt-6">
                <h2 className="text-base sm:text-lg md:text-xl font-semibold mb-2 sm:mb-3">Availability</h2>
                <p className="text-gray-700 text-sm sm:text-base">{doctor?.availability}</p>
            </div>

            {/* Clinic Details */}
            <div className="bg-white shadow-lg rounded-2xl p-4 sm:p-6 mt-4 sm:mt-6">
                <h2 className="text-base sm:text-lg md:text-xl font-semibold mb-3 sm:mb-4 flex items-center gap-2">
                    <FaClinicMedical className="text-blue-600 text-lg sm:text-xl" />
                    Clinic Details
                </h2>
                <div className="space-y-2 sm:space-y-3 text-gray-700">
                    <div className="flex items-start sm:items-center gap-2 sm:gap-3">
                        <FaMapMarkerAlt className="text-red-500 mt-1 sm:mt-0 flex-shrink-0" />
                        <p className="text-sm sm:text-base">
                            <strong className="font-semibold">Address:</strong> {doctor?.clinicAddress || "Sunrise Heart Clinic, Mumbai"}
                        </p>
                    </div>
                    <div className="flex items-start sm:items-center gap-2 sm:gap-3">
                        <FaClock className="text-green-600 mt-1 sm:mt-0 flex-shrink-0" />
                        <p className="text-sm sm:text-base">
                            <strong className="font-semibold">Timings:</strong> {doctor?.clinicTimings || "Mon–Sat, 10:00 AM – 7:00 PM"}
                        </p>
                    </div>
                    <div className="flex items-start sm:items-center gap-2 sm:gap-3">
                        <FaHospitalAlt className="text-indigo-600 mt-1 sm:mt-0 flex-shrink-0" />
                        <p className="text-sm sm:text-base">
                            <strong className="font-semibold">Consultation Fee:</strong> ₹{doctor?.fees || "1200"}
                        </p>
                    </div>
                </div>
            </div>

            {/* Patient Reviews */}
            <div className="bg-white shadow-lg rounded-2xl p-4 sm:p-6 mt-4 sm:mt-6 mb-6 sm:mb-8">
                <h2 className="text-base sm:text-lg md:text-xl font-semibold mb-4 sm:mb-6">Patient Reviews</h2>
                <div className="space-y-4 sm:space-y-6">
                    {reviews.map((item, index) => (
                        <div
                            key={index}
                            className={`pb-4 sm:pb-6 ${index !== reviews.length - 1 ? "border-b border-gray-200" : ""}`}
                        >
                            {/* Header (Avatar + Name + Date) */}
                            <div className="flex justify-between items-start mb-2 sm:mb-3">
                                <div className="flex items-center gap-2 sm:gap-3">
                                    <FaUserCircle className="text-3xl sm:text-4xl text-gray-400 flex-shrink-0" />
                                    <div>
                                        <p className="font-semibold text-sm sm:text-base">{item.name}</p>
                                        <div className="flex text-yellow-400 text-xs sm:text-sm mb-1">
                                            {Array(item.rating).fill().map((_, i) => (
                                                <FaStar key={i} />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <p className="text-xs text-gray-500 flex-shrink-0 ml-2">{item.date}</p>
                            </div>

                            {/* Review Text */}
                            <p className="text-gray-700 text-xs sm:text-sm leading-relaxed">
                                {item.review}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}