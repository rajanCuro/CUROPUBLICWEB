// src/pages/medicine/MedicineHero.jsx

import React, { useState, useEffect } from "react";
import { FiSearch, FiUpload } from "react-icons/fi";
import { HiOutlineFolderOpen } from "react-icons/hi";
import heroImg from "../../assets/h1.png";
import sl1 from '../../assets/h2.png'
import sl2 from '../../assets/h3.png'
import MedicinePopularCategories from "../medicine/MedicinePopularCategories";
import ShopByHealthConcern from "./ShopByHealthConcern";
import MedicineUploadPrescription from "./MedicineUploadPrescription";
import { useNavigate } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import { useLabAuth } from "../../Authorization/LabAuthContext";

const MedicineHero = () => {
    const navigate = useNavigate();
    const sliderImages = [
        `https://images.pexels.com/photos/2280551/pexels-photo-2280551.jpeg`,
        `https://images.pexels.com/photos/1164531/pexels-photo-1164531.jpeg`,
        `https://images.pexels.com/photos/4167541/pexels-photo-4167541.jpeg`
    ];
    const [uploadPrescriptionModal, setUploadPrescriptionModal] = useState(false);
    const [uploadMode, setUploadMode] = useState("normal");
    const [searchText, setSearchText] = useState("");
    const [searchHistory, setSearchHistory] = useState([]);
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const { screen, setScreen } = useLabAuth()
    const [placeholderIndex, setPlaceholderIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    // Check if mobile device
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // AUTO ROTATE PLACEHOLDER USING SEARCH HISTORY
    useEffect(() => {
        if (searchText.length > 0) return; // Stop rotation while typing

        if (searchHistory.length === 0) return; // No history → no rotation

        const interval = setInterval(() => {
            setPlaceholderIndex((prev) =>
                prev === searchHistory.length - 1 ? 0 : prev + 1
            );
        }, 2000); // every 2 seconds

        return () => clearInterval(interval);
    }, [searchText, searchHistory]);


    useEffect(() => {
        const interval = setInterval(() => {
            handleNextSlide();
        }, 3000); // 3 seconds
        return () => clearInterval(interval);
    }, [currentIndex]);

    useEffect(() => {
        setScreen('Pharmacy')
    }, [setScreen])

    // Smooth slide transition
    const handleNextSlide = () => {
        setIsTransitioning(true);
        setTimeout(() => {
            setCurrentIndex((prev) =>
                prev === sliderImages.length - 1 ? 0 : prev + 1
            );
            setIsTransitioning(false);
        }, 500); // Match this with CSS transition duration
    };

    const goToSlide = (index) => {
        if (index === currentIndex) return;
        setIsTransitioning(true);
        setTimeout(() => {
            setCurrentIndex(index);
            setIsTransitioning(false);
        }, 500);
    };

    // -------------------------------
    // LOAD SAVED SEARCH HISTORY
    // -------------------------------
    useEffect(() => {
        const stored = localStorage.getItem("medicineSearchHistory");
        if (stored) {
            setSearchHistory(JSON.parse(stored));
        }
    }, []);

    // -------------------------------
    // LIVE AUTO-SUGGEST FILTERING
    // -------------------------------
    useEffect(() => {
        if (searchText.trim() === "") {
            setFilteredSuggestions([]);
            return;
        }

        const results = searchHistory.filter(item =>
            item.toLowerCase().includes(searchText.toLowerCase())
        );
        setFilteredSuggestions(results);
    }, [searchText, searchHistory]);

    // -------------------------------
    // SAVE SEARCH TERM TO HISTORY
    // -------------------------------
    const saveSearchHistory = (text) => {
        if (!text.trim()) return;

        let updated = [...searchHistory];

        // Avoid duplicates
        if (!updated.includes(text)) {
            updated.unshift(text);
        }

        updated = updated.slice(0, 10); // Limit history

        setSearchHistory(updated);
        localStorage.setItem("medicineSearchHistory", JSON.stringify(updated));
    };

    // -------------------------------
    // SEARCH ACTION
    // -------------------------------
    const handleSearch = (text) => {
        if (!text.trim()) return;

        saveSearchHistory(text);

        navigate(`/medicine/shopbyhealthconcern/medicine/${text}`);
    };

    return (
        <section className="w-full px-3 sm:px-4 md:px-6 lg:container mx-auto">
            <div className="w-full mx-auto flex flex-col-reverse md:flex-row items-center mt-4 md:mt-20 justify-between">
                {/* LEFT AREA - Mobile: full width, Desktop: 1/2 */}
                <div className="w-full md:w-1/2 text-center md:text-left p-2 md:p-4 space-y-4 md:space-y-6">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight md:leading-tight">
                        <span className="bg-gradient-to-r from-teal-800 to-teal-300 text-transparent bg-clip-text block min-h-[60px] md:min-h-auto">
                            <TypeAnimation
                                sequence={[
                                    "Your Health, Our Priority",
                                    1500,
                                    "Quality Care, Delivered Fast",
                                    1500,
                                    "Your Wellness Matters",
                                    1500,
                                ]}
                                wrapper="span"
                                speed={50}
                                repeat={Infinity}
                            />
                        </span>
                    </h1>

                    <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800">
                        Fast & Reliable Pharmacy Services
                    </h2>

                    <p className="text-gray-600 text-sm sm:text-base max-w-md mx-auto md:mx-0">
                        Order medicines, health products, and consultation from trusted pharmacies.
                    </p>

                    {/* SEARCH BAR - Mobile optimized */}
                    <div className="relative mt-4 md:mt-6 max-w-full md:max-w-[525px] mx-auto md:mx-0">
                        <div className="relative flex items-center bg-white border border-gray-300 rounded-lg px-3 py-2.5 sm:py-2 shadow-sm">
                            <FiSearch
                                className="text-gray-400 mr-2 cursor-pointer"
                                onClick={() => handleSearch(searchText)}
                                size={isMobile ? 18 : 16}
                            />

                            <input
                                type="text"
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                placeholder={
                                    searchHistory.length > 0 && searchText.length === 0
                                        ? `Search for ${searchHistory[placeholderIndex]}`
                                        : "Search medicines, health products..."
                                }
                                className="w-full outline-none text-sm sm:text-base border-0 pr-8 capitalize placeholder:text-sm sm:placeholder:text-base"
                            />

                            {searchText.length > 0 && (
                                <span
                                    onClick={() => handleSearch(searchText)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer 
                                    text-gray-700 hover:text-teal-700 text-lg font-bold"
                                >
                                    ➤
                                </span>
                            )}
                        </div>

                        {filteredSuggestions.length > 0 && (
                            <div className="absolute w-full bg-white shadow-lg border rounded-lg mt-1 z-20 max-h-60 overflow-y-auto">
                                {filteredSuggestions.map((item, index) => (
                                    <div
                                        key={index}
                                        onClick={() => {
                                            setSearchText(item);
                                            handleSearch(item);
                                        }}
                                        className="px-3 py-2.5 text-sm cursor-pointer hover:bg-gray-100 border-b last:border-b-0"
                                    >
                                        {item}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* BUTTONS - Mobile stack vertically */}
                    <div className="mt-4 md:mt-5 flex md:flex-row flex-col gap-3 justify-center md:justify-start">
                        <button
                            onClick={() => {
                                setUploadMode("normal");
                                setUploadPrescriptionModal(true);
                            }}
                            className="bg-teal-700 hover:bg-teal-800 text-white text-sm font-semibold py-3 md:py-2.5 px-5 rounded-lg flex items-center justify-center gap-2 w-full md:w-auto"
                        >
                            <FiUpload size={isMobile ? 18 : 16} />
                            Upload Prescription
                        </button>

                        <button
                            onClick={() => {
                                setUploadMode("saved");
                                setUploadPrescriptionModal(true);
                            }}
                            className="border border-gray-300 text-gray-800 hover:bg-gray-100 text-sm font-medium py-3 md:py-2.5 px-5 rounded-lg flex items-center justify-center gap-2 w-full md:w-auto"
                        >
                            <HiOutlineFolderOpen size={isMobile ? 20 : 18} />
                            Upload from Saved Medical Records
                        </button>
                    </div>
                </div>

                {/* RIGHT SLIDER - Mobile: full width, Desktop: 1/2 */}
                <div className="w-full md:w-1/2 max-w-2xl relative rounded-xl md:rounded-2xl overflow-hidden h-48 sm:h-60 md:h-80 lg:h-[400px] mx-auto mb-4 md:mb-0">
                    <div className="relative w-full h-full overflow-hidden">
                        {sliderImages.map((image, index) => (
                            <div
                                key={index}
                                className={`absolute inset-0 w-full h-full transition-all duration-700 ease-in-out ${index === currentIndex
                                    ? "opacity-100 scale-100"
                                    : "opacity-0 scale-105"
                                    }`}
                            >
                                <img
                                    src={image}
                                    alt={`Slide ${index + 1}`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ))}
                    </div>

                    {/* DOTS - Smaller on mobile */}
                    <div className="absolute bottom-3 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1.5 sm:space-x-2">
                        {sliderImages.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full cursor-pointer transition-all ${index === currentIndex
                                    ? "bg-white scale-125"
                                    : "bg-white/50"
                                    }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <div className="px-2 sm:px-0">
                <MedicinePopularCategories />
                <ShopByHealthConcern />
            </div>

            {/* UPLOAD PRESCRIPTION MODAL - Mobile responsive */}
            {uploadPrescriptionModal && (
                <div className="fixed inset-0 backdrop-brightness-50 flex items-center justify-center z-50 p-3 sm:p-4">
                    <div className="relative bg-white w-full max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-7xl rounded-lg shadow-lg overflow-auto max-h-[90vh] sm:max-h-[95vh]">

                        {/* CLOSE BUTTON - Larger touch target on mobile */}
                        <button
                            onClick={() => setUploadPrescriptionModal(false)}
                            className="absolute top-3 right-3 z-50 cursor-pointer bg-gray-200 hover:bg-gray-300 text-gray-700 
                            rounded-full w-9 h-9 sm:w-8 sm:h-8 flex items-center justify-center text-lg font-bold"
                            aria-label="Close modal"
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

export default MedicineHero;