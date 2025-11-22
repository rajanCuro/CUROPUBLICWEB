// src/pages/medicine/ShopByHealthConcern.jsx

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
    MdMedicalServices,
} from "react-icons/md";
import {
    FaBone,
    FaHeadSideVirus,
    FaBed,
    FaVirus,
    FaHeart,
} from "react-icons/fa";
import {
    GiStomach,
    GiKidneys,
    GiLiver,
} from "react-icons/gi";
import { IoBagAddSharp } from "react-icons/io5";
import {
    PiFlowerLotusBold,
} from "react-icons/pi";
import {
    TbHeartRateMonitor,
} from "react-icons/tb";
import axiosInstance from "../../Authorization/axiosInstance";

// Dummy icon set but with React Icons
const dummyIcons = [
    { icon: <IoBagAddSharp size={30} color="#800572" /> },
    { icon: <FaHeart size={28} color="#16a34a" /> },
    { icon: <GiStomach size={30} color="#800572" /> },
    { icon: <FaBone size={28} color="#16a34a" /> },
    { icon: <IoBagAddSharp size={30} color="#800572" /> },
    { icon: <FaHeadSideVirus size={30} color="#800572" /> },
    { icon: <MdMedicalServices size={30} color="#9E7505" /> },
    { icon: <FaBed size={28} color="#16a34a" /> },
    { icon: <TbHeartRateMonitor size={30} color="#800572" /> },
    { icon: <PiFlowerLotusBold size={30} color="#9E4705" /> },
    { icon: <FaVirus size={28} color="#16a34a" /> },
    { icon: <GiLiver size={30} color="#800572" /> },
    { icon: <GiKidneys size={30} color="#800572" /> },
];

function ShopByHealthConcern() {
    const navigate = useNavigate();
    const [apiCategories, setApiCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hoveredIndex, setHoveredIndex] = useState(null);

    // Fetch health concern list
    const getAllShopByHealth = async () => {
        try {
            const response = await axiosInstance.get(
                "/endUserEndPoint/getHealthConcernList"
            );
            setApiCategories(response.data || []);
        } catch (error) {
            console.log("Error fetching categories:", error.response);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllShopByHealth();
    }, []);

    // Gradient colors for different health categories
    const gradientColors = [
        "from-purple-500 via-pink-500 to-red-500",
        "from-blue-500 via-cyan-500 to-green-500",
        "from-green-500 via-emerald-500 to-teal-500",
        "from-orange-500 via-amber-500 to-yellow-500",
        "from-red-500 via-rose-500 to-pink-500",
        "from-indigo-500 via-purple-500 to-violet-500",
        "from-teal-500 via-cyan-500 to-blue-500",
        "from-amber-500 via-orange-500 to-red-500",
        "from-lime-500 via-green-500 to-emerald-500",
        "from-rose-500 via-pink-500 to-purple-500",
        "from-sky-500 via-blue-500 to-indigo-500",
        "from-violet-500 via-purple-500 to-fuchsia-500",
        "from-emerald-500 via-teal-500 to-cyan-500",
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center w-full py-20">
                <div className="relative">
                    <div className="w-16 h-16 border-4 border-blue-200 rounded-full"></div>
                    <div className="w-16 h-16 border-4 border-transparent border-t-blue-600 rounded-full animate-spin absolute top-0 left-0"></div>
                </div>
            </div>
        );
    }

    // Combine dummy icons with API names
    const combinedData = apiCategories.map((name, index) => ({
        name,
        icon: dummyIcons[index % dummyIcons.length].icon,
        gradient: gradientColors[index % gradientColors.length],
    }));

    return (
        <div className="my-10  ">
            <motion.h2 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="md:text-3xl text-xl font-bold text-gray-800 mb-8 text-start "
             >
                Shop by Health Concerns
            </motion.h2>

            <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6 justify-items-center px-8 "
             >
                {combinedData.map((item, index) => (
                    <motion.div
                        key={index}
                        variants={itemVariants}
                        whileHover={{ 
                            scale: 1.05,
                            transition: { duration: 0.2 }
                        }}
                        whileTap={{ scale: 0.95 }}
                        onHoverStart={() => setHoveredIndex(index)}
                        onHoverEnd={() => setHoveredIndex(null)}
                        onClick={() =>
                            navigate(`/medicine/shopbyhealthconcern/medicine/${item.name}`)
                        }
                        className="relative cursor-pointer group w-full"
                        style={{
                            // Equal height and width for all cards
                            aspectRatio: "1/1",
                            maxWidth: "160px"
                        }}
                    >
                        {/* Animated Gradient Border */}
                        <div className={`
                            absolute -inset-0.5 rounded-xl bg-gradient-to-r ${item.gradient} 
                            opacity-0 group-hover:opacity-100 transition-all duration-300 blur-sm
                            ${hoveredIndex === index ? 'opacity-100' : 'opacity-0'}
                        `}></div>
                        
                        {/* Inner Glow Effect */}
                        <div className={`
                            absolute -inset-0.5 rounded-xl bg-gradient-to-r ${item.gradient} 
                            opacity-0 group-hover:opacity-30 transition-all duration-500
                            ${hoveredIndex === index ? 'opacity-30' : 'opacity-0'}
                        `}></div>

                        {/* Main Card Content */}
                        <div className="relative bg-white rounded-xl h-full w-full p-3 md:p-4 flex flex-col items-center justify-center shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group-hover:border-transparent">
                            
                            {/* Icon Container with Gradient Background on Hover */}
                            <div className={`
                                w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-2xl flex items-center justify-center mb-2 md:mb-3
                                bg-gray-50 group-hover:bg-gradient-to-br ${item.gradient}
                                transition-all duration-300 transform group-hover:scale-110
                                shadow-md group-hover:shadow-lg
                            `}>
                                <div className="transform group-hover:scale-110 transition-transform duration-300">
                                    {React.cloneElement(item.icon, {
                                        className: "group-hover:text-white transition-colors duration-300",
                                        size: window.innerWidth < 768 ? 24 : window.innerWidth < 1024 ? 26 : 30
                                    })}
                                </div>
                            </div>

                            {/* Health Concern Name */}
                            <p className="text-xs md:text-sm font-medium text-gray-700 group-hover:text-gray-900 text-center px-1 leading-tight transition-colors duration-300 line-clamp-2">
                                {item.name}
                            </p>

                            {/* Subtle Hover Indicator */}
                            <div className={`
                                absolute bottom-2 left-1/2 transform -translate-x-1/2
                                w-6 h-0.5 bg-gradient-to-r ${item.gradient} rounded-full
                                opacity-0 group-hover:opacity-100 transition-all duration-300
                                group-hover:w-8
                            `}></div>
                        </div>

                        {/* Pulse Animation on Hover */}
                        {hoveredIndex === index && (
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.8, opacity: 0 }}
                                className="absolute -inset-1 rounded-xl bg-gradient-to-r from-transparent via-white to-transparent opacity-20"
                                style={{
                                    background: `conic-gradient(from 0deg, transparent, white, transparent)`
                                }}
                            />
                        )}
                    </motion.div>
                ))}
            </motion.div>

            {/* Optional: Loading state for grid items */}
            {combinedData.length === 0 && !loading && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-12"
                >
                    <div className="w-24 h-24 mx-auto mb-4 text-gray-300">
                        <MdMedicalServices size={64} />
                    </div>
                    <p className="text-gray-500 text-lg">No health concerns found</p>
                    <p className="text-gray-400 text-sm mt-2">Please check back later</p>
                </motion.div>
            )}
        </div>
    );
}

export default ShopByHealthConcern;