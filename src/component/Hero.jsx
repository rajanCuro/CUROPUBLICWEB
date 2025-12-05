// src/component/Hero.jsx
import React, { useEffect, useState } from "react";
import { FiSearch, FiArrowRight, FiShield, FiClock, FiStar } from "react-icons/fi";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";

// Import all your images
import doctorImg from '../assets/doctor/doc.png';
import ambulanceImg from '../assets/doctor/ambulance.png';
import pharmacyImg from '../assets/doctor/ph.png';
import bloodBankImg from '../assets/doctor/blood1.png';

const Hero = () => {
    const [searchValue, setSearchValue] = useState("");
    const [isTransitioning, setIsTransitioning] = useState(false);

    // Items with their corresponding images
    const items = [
        {
            big: "Curo24",
            small: "Doctors",
            image: doctorImg,
        },
        {
            big: "Curo24",
            small: "Ambulance",
            image: ambulanceImg,
        },
        {
            big: "Curo24",
            small: "Pharmacy",
            image: pharmacyImg,
        },
        {
            big: "Curo24",
            small: "Blood Bank",
            image: bloodBankImg,
        }
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            if (!isTransitioning) {
                setIsTransitioning(true);
                setCurrentIndex(prev => (prev + 1) % items.length);
                // Reset transitioning state after animation completes
                setTimeout(() => {
                    setIsTransitioning(false);
                }, 3000); // Match this with your animation duration
            }
        }, 6000); // Increased interval to 6 seconds for slower transitions

        return () => clearInterval(interval);
    }, [isTransitioning, items.length]);

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: 0.3,
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.8,
                ease: "easeOut"
            }
        }
    };

    const floatingAnimation = {
        y: [-10, 10, -10],
        transition: {
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
        }
    };

    // Slow motion image transition variants
    const imageTransitionVariants = {
        initial: { 
            opacity: 0, 
            scale: 0.9,
            rotateY: -5,
            filter: "blur(4px)"
        },
        animate: { 
            opacity: 1, 
            scale: 1,
            rotateY: 0,
            filter: "blur(0px)",
            transition: {
                duration: 3, // Increased to 3 seconds for slow motion
                ease: [0.25, 0.46, 0.45, 0.94], // Custom ease for smoothness
                opacity: { duration: 2 },
                scale: { duration: 2.5 }
            }
        },
        exit: { 
            opacity: 0, 
            scale: 1.05,
            rotateY: 5,
            filter: "blur(4px)",
            transition: {
                duration: 2,
                ease: "easeInOut"
            }
        }
    };

    // Fixed styling constants
    const bgColor = "from-teal-50 via-blue-50 to-purple-50";
    const gradientColors = "from-teal-600 to-blue-600";
    const textGradient = "from-teal-600 via-blue-600 to-purple-600";

    return (
        <section className="w-full relative overflow-hidden min-h-screen">
            {/* Static Background Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${bgColor}`}></div>

            {/* Animated Background Elements - Slowed down */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    className="absolute top-10 left-10 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-20"
                    animate={{
                        x: [0, 100, 0],
                        y: [0, -50, 0],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div
                    className="absolute top-40 right-20 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20"
                    animate={{
                        x: [0, -80, 0],
                        y: [0, 60, 0],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div
                    className="absolute bottom-20 left-1/3 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20"
                    animate={{
                        x: [0, 60, 0],
                        y: [0, -80, 0],
                    }}
                    transition={{
                        duration: 30,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            </div>

            <div className="relative w-full py-16 md:py-24 container mx-auto px-4 md:px-6">
                <div className="w-full mx-auto flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
                    {/* Left Content */}
                    <motion.div
                        className="flex-1 text-center md:text-left"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                     >
                        {/* <motion.div variants={itemVariants}>
                            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-teal-200 rounded-full px-4 py-2 mb-6 shadow-sm">
                                <FiStar className="text-teal-600 w-4 h-4" />
                                <span className="text-[10px] font-medium text-teal-800">
                                    Trusted by 1M+ Patients Across India
                                </span>
                            </div>
                        </motion.div> */}

                        <motion.h1
                            variants={itemVariants}
                            className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight"
                        >
                            <span className={`bg-gradient-to-r ${textGradient} bg-clip-text text-transparent`}>
                                Curo24
                            </span>
                        </motion.h1>

                        <motion.h2
                            variants={itemVariants}
                            className="text-xl md:text-3xl lg:text-4xl font-semibold mt-2 md:mt-4"
                        >
                            <span className={`bg-gradient-to-r ${gradientColors} bg-clip-text text-transparent`}>
                                <TypeAnimation
                                    sequence={[
                                        "Your Complete Digital Healthcare Partner",
                                        3000,
                                        "Trusted Care, Anytime and Anywhere",
                                        3000,
                                        "24/7 Healthcare at Your Fingertips",
                                        3000,
                                    ]}
                                    wrapper="span"
                                    speed={40}
                                    repeat={Infinity}
                                    cursor={true}
                                />
                            </span>
                        </motion.h2>

                        <motion.p
                            variants={itemVariants}
                            className="text-gray-600 mt-4 md:mt-6 text-lg md:text-xl max-w-2xl leading-relaxed capitalizes caption-bottom"
                        >
                            Your health, simplified — medicines, doctors, lab tests ambulance and blood bank in one app.
                        </motion.p>

                        {/* Search Bar */}
                        <motion.div
                            variants={itemVariants}
                            className="mt-8 max-w-2xl"
                        >
                            <div className="relative flex items-center bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl px-4 py-4 shadow-lg hover:shadow-xl transition-all duration-300">
                                <FiSearch className="text-gray-400 mr-3 w-5 h-5" />
                                <input
                                    type="text"
                                    value={searchValue}
                                    onChange={(e) => setSearchValue(e.target.value)}
                                    placeholder="Search medicines, doctors, lab tests, health products..."
                                    className="w-full border-0 outline-none text-base bg-transparent placeholder-gray-400"
                                />
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`ml-2 bg-gradient-to-r ${gradientColors} text-white px-6 py-2 rounded-xl font-semibold flex items-center gap-2 hover:shadow-lg transition-all duration-300`}
                                >
                                    Search
                                    <FiArrowRight className="w-4 h-4" />
                                </motion.button>
                            </div>
                        </motion.div>

                        {/* Features */}
                        <motion.div
                            variants={itemVariants}
                            className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl"
                        >
                            {[
                                { icon: FiShield, text: "100% Safe & Secure" },
                                { icon: FiClock, text: "24/7 Available" },
                                { icon: FiStar, text: "4.8/5 Rating" }
                            ].map((feature, index) => (
                                <motion.div
                                    key={index}
                                    whileHover={{ scale: 1.05 }}
                                    className="flex items-center gap-2 text-sm text-gray-600"
                                >
                                    <feature.icon className="w-4 h-4 text-teal-600" />
                                    <span>{feature.text}</span>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Right Image with Slow Motion */}
                    <div className="flex-1 flex justify-center">
                        <div className="relative">
                            {/* Main Image Container */}
                            <motion.div
                                className="relative"
                                animate={floatingAnimation}
                            >
                                {/* Fixed size image container with perspective */}
                                <div className="w-[350px] h-[350px] md:w-[450px] md:h-[450px] lg:w-[550px] lg:h-[550px] flex items-center justify-center perspective-1000">
                                    <motion.div
                                        key={currentIndex}
                                        initial="initial"
                                        animate="animate"
                                        variants={imageTransitionVariants}
                                        className="relative w-full h-full preserve-3d"
                                        style={{
                                            transformStyle: 'preserve-3d'
                                        }}
                                    >
                                        <img
                                            src={items[currentIndex].image}
                                            alt={`${items[currentIndex].small} illustration`}
                                            className="w-full h-full object-contain drop-shadow-2xl"
                                            style={{ 
                                                maxWidth: '100%', 
                                                maxHeight: '100%',
                                                width: 'auto',
                                                height: 'auto'
                                            }}
                                        />
                                        
                                        {/* Glow effect during transition */}
                                        {isTransitioning && (
                                            <motion.div
                                                className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-blue-500/10 rounded-full"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 0.3 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 1.5 }}
                                            />
                                        )}
                                    </motion.div>
                                </div>

                                {/* Floating Elements - Slowed down */}
                                <motion.div
                                    className="absolute top-0 -right-4 bg-white rounded-2xl p-4 shadow-2xl border border-gray-100"
                                    animate={{
                                        y: [-5, 5, -5],
                                        rotate: [0, 3, 0],
                                    }}
                                    transition={{
                                        duration: 8,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                >
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                                        <span className="text-xs font-semibold text-gray-700">Quick Response</span>
                                    </div>
                                </motion.div>

                                <motion.div
                                    className={`absolute bottom-4 -left-4 bg-gradient-to-r ${gradientColors} text-white rounded-2xl p-4 shadow-2xl w-32`}
                                    animate={{
                                        y: [5, -5, 5],
                                        scale: [1, 1.05, 1],
                                    }}
                                    transition={{
                                        duration: 10,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                >
                                    <div className="text-center">
                                        <div className="text-sm font-bold">{items[currentIndex].big}</div>
                                        <div className="text-xs">{items[currentIndex].small}</div>
                                    </div>
                                </motion.div>
                            </motion.div>

                            {/* Static Background Decoration */}
                            <div className="absolute inset-0 bg-gradient-to-r from-teal-400/20 to-blue-500/20 rounded-full blur-3xl -z-10 scale-150"></div>
                        </div>
                    </div>
                </div>

                {/* Manual Navigation Dots with slow animation */}
                

                {/* Current Service Indicator */}
                
            </div>
        </section>
    );
};

export default Hero;