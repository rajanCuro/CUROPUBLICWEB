// src/pages/doctor/doctorHome/DoctorHero.jsx
import React, { useEffect, useState } from 'react';
import { TypeAnimation } from 'react-type-animation';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import DoctorPopular from './DoctorPopular';
import { useLabAuth } from '../../../Authorization/LabAuthContext';

// Import doctor-related images (you'll need to add these to your project)
// For demo purposes, I'm using placeholder URLs. Replace with your actual images.


function DoctorHero() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const { setScreen } = useLabAuth()
    const navigate = useNavigate()

    useEffect(() => {
        setScreen('Doctor')
    }, [])

    // Array of doctor-related images
    const doctorImages = [
        'https://media.istockphoto.com/id/1302688389/photo/female-doctor-writting-prescription-about-medicine-stock-photo.jpg?s=612x612&w=0&k=20&c=_T9TOGhqftWPZpcaBB-BWjS03TDMW9yrZ7ISTJVqS1I=',
        'https://images.pexels.com/photos/3902881/pexels-photo-3902881.jpeg',
        'https://images.pexels.com/photos/5738735/pexels-photo-5738735.jpeg',
        'https://media.istockphoto.com/id/1301605007/photo/female-doctor-stock-photo.jpg?s=612x612&w=0&k=20&c=ubxYKnw24gIYuQFaCTn5ydknhYUIMIs3Zm2l6-nbGv4=',
        'https://media.istockphoto.com/id/1359760270/photo/portrait-of-a-nurse.jpg?s=612x612&w=0&k=20&c=qf4C6ZvDYN5whLSBrTZly4O85nMp7lIM1yboT68gVpk=',
    ];

    // Animation for image rotation
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) =>
                prevIndex === doctorImages.length - 1 ? 0 : prevIndex + 1
            );
        }, 3000); // Change image every 3 seconds

        return () => clearInterval(interval);
    }, [doctorImages.length]);

    return (
        <div className='bg-gradient-to-br from-blue-50 to-cyan-50'>

            <div className="min-h-screen  flex items-center justify-center px-4 md:px-8 lg:px-16 ">
                <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-strart ">

                    {/* Left Side: Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-6"
                    >
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                            <span className="bg-gradient-to-r from-blue-600 via-teal-500 to-cyan-600 bg-clip-text text-transparent">
                                Expert Medical Care
                            </span>
                            <br />
                            <span className="text-gray-800">
                                When You Need It Most
                            </span>
                        </h1>

                        <div className="text-2xl md:text-3xl font-semibold h-16">
                            <TypeAnimation
                                sequence={[
                                    '24/7 Doctor Consultations',
                                    2000,
                                    'Specialized Medical Advice',
                                    2000,
                                    'Emergency Care Support',
                                    2000,
                                    'Personalized Treatment Plans',
                                    2000,
                                ]}
                                wrapper="span"
                                speed={50}
                                style={{
                                    display: 'inline-block',
                                    background: 'linear-gradient(90deg, #3b82f6, #06b6d4)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    fontWeight: 'bold'
                                }}
                                repeat={Infinity}
                            />
                        </div>

                        <p className="text-gray-600 text-lg leading-relaxed">
                            Access top medical professionals anytime, anywhere. Our platform connects you
                            with certified doctors for instant consultations, second opinions, and
                            continuous healthcare support.
                        </p>

                        <div className="flex flex-wrap gap-4 pt-4">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-3 bg-gradient-to-r cursor-pointer from-blue-600 to-cyan-500 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-shadow duration-300"
                            >
                                <Link to='/doctor-category'>
                                    Book Appointment
                                </Link>
                            </motion.button>
                            <motion.button
                                onClick={() => navigate('/doctor/quick-consult')}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-3 border-2 cursor-pointer border-blue-500 text-blue-600 rounded-full font-semibold hover:bg-blue-50 transition-colors duration-300"
                            >
                                Quick Consultaion
                            </motion.button>
                        </div>

                        {/* Stats Section */}
                        {/* <div className="grid grid-cols-3 gap-4 pt-8">
                        <div className="text-center">
                            <div className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">500+</div>
                            <div className="text-gray-600">Expert Doctors</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">24/7</div>
                            <div className="text-gray-600">Available Hours</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">50K+</div>
                            <div className="text-gray-600">Patients Helped</div>
                        </div>
                    </div> */}

                        <div className="text-2xl md:text-3xl font-semibold h-16">
                            <TypeAnimation
                                sequence={[
                                    "Book online doctor consultation with top specialists",
                                    2000,
                                    "Instant medical advice from certified doctors",
                                    2000,
                                    "Skip the clinic — consult your doctor from home",
                                    2000,
                                    "Online doctor consultation starting at just ₹199",
                                    2000,
                                ]}

                                wrapper="span"
                                speed={50}
                                style={{
                                    display: 'inline-block',
                                    background: 'linear-gradient(90deg, #3b82f6, #06b6d4)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                }}
                                repeat={Infinity}
                            />
                        </div>
                    </motion.div>

                    {/* Right Side: Animated Images */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative h-[500px] w-full"
                    >
                        {/* Main Image */}
                        <motion.div
                            key={currentImageIndex}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.1 }}
                            transition={{ duration: 0.6 }}
                            className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl"
                        >
                            <img
                                src={doctorImages[currentImageIndex]}
                                alt="Doctor"
                                className="w-full h-full object-cover"
                            />
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent"></div>
                        </motion.div>

                        {/* Floating Smaller Images */}
                        <motion.div
                            animate={{
                                y: [0, -10, 0],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="absolute -top-6 -left-6 w-40 h-40 rounded-2xl overflow-hidden shadow-xl border-4 border-white"
                        >
                            <img
                                src={doctorImages[(currentImageIndex + 1) % doctorImages.length]}
                                alt="Doctor Consultation"
                                className="w-full h-full object-cover"
                            />
                        </motion.div>

                        <motion.div
                            animate={{
                                y: [0, 10, 0],
                            }}
                            transition={{
                                duration: 3.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: 0.5,
                            }}
                            className="absolute -bottom-6 -right-6 w-48 h-48 rounded-2xl overflow-hidden shadow-xl border-4 border-white"
                        >
                            <img
                                src={doctorImages[(currentImageIndex + 2) % doctorImages.length]}
                                alt="Medical Team"
                                className="w-full h-full object-cover"
                            />
                        </motion.div>

                        {/* Floating Badge */}
                        <motion.div
                            animate={{
                                rotate: [0, 10, 0, -10, 0],
                            }}
                            transition={{
                                duration: 5,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="absolute top-10 right-10 bg-gradient-to-r from-emerald-500 to-green-400 text-white px-4 py-2 rounded-full font-bold shadow-lg z-10"
                        >
                            ⭐ 4.9/5 Rating
                        </motion.div>

                        {/* Image Indicator Dots */}
                        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
                            {doctorImages.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentImageIndex(index)}
                                    className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentImageIndex
                                        ? 'bg-blue-600 w-8'
                                        : 'bg-gray-300 hover:bg-blue-400'
                                        }`}
                                />
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
            <DoctorPopular />
        </div>
    );
}

export default DoctorHero;