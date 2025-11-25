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

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.5, ease: "easeOut" }
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

    const combinedData = apiCategories.map((name, index) => ({
        name,
        icon: dummyIcons[index % dummyIcons.length].icon,
    }));

    return (
        <div className="my-10">
            <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="md:text-3xl text-xl font-bold text-gray-800 mb-8 text-start"
            >
                Shop by Health Concerns
            </motion.h2>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-2  sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6 justify-items-center px-8"
             >
                {combinedData.map((item, index) => (
                    <motion.div
                        key={index}
                        variants={itemVariants}
                        onClick={() =>
                            navigate(`/medicine/shopbyhealthconcern/medicine/${item.name}`)
                        }
                        className="relative cursor-pointer  w-full bg-white hover:scale-105 hover:bg-teal-600/20  rounded-xl  p-3 md:p-4 flex flex-col items-center justify-center shadow-sm transition-all duration-300 border border-gray-100"
                        style={{ aspectRatio: "1/1", maxWidth: "160px" }}
                    >
                        <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-2xl flex items-center justify-center mb-2 bg-gray-50 shadow-md">
                            {item.icon}
                        </div>

                        <p className="text-xs md:text-sm font-medium text-gray-700 text-center px-1 leading-tight line-clamp-2">
                            {item.name}
                        </p>
                    </motion.div>
                ))}
            </motion.div>

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
