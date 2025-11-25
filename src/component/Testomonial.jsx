// src/component/Testomonial.jsx
// src/component/Testimonial.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Testimonial() {
    const testimonials = [
        { id: 1, name: "Priya Sharma", location: "Lanka, Varanasi", rating: 5, comment: "Excellent service! The lab tests were done quickly and the reports were very detailed. Highly recommended.", avatar: "PS" },
        { id: 2, name: "Rajesh Kumar", location: "Sigra, Varanasi", rating: 4, comment: "Very professional staff and hygienic environment. Got my blood test done without any pain.", avatar: "RK" },
        { id: 3, name: "Anjali Patel", location: "Sarnath, Varanasi", rating: 5, comment: "The home collection service is amazing! The technician was punctual and very skilled.", avatar: "AP" },
        { id: 4, name: "Vikram Singh", location: "Assi Ghat, Varanasi", rating: 5, comment: "Best lab in the city. Accurate reports and reasonable prices.", avatar: "VS" },
        { id: 5, name: "Sneha Reddy", location: "DLW, Varanasi", rating: 4, comment: "Quick and efficient service. Got my reports within 24 hours.", avatar: "SR" },
        { id: 6, name: "Amit Verma", location: "BHU, Varanasi", rating: 5, comment: "Modern equipment and knowledgeable technicians. Felt very comfortable.", avatar: "AV" },
        { id: 7, name: "Rohan Gupta", location: "Mahmoorganj, Varanasi", rating: 5, comment: "Very trustworthy lab and super fast service.", avatar: "RG" },
        { id: 8, name: "Karan Singh", location: "Cantt, Varanasi", rating: 4, comment: "Affordable pricing and great support.", avatar: "KS" },
        { id: 9, name: "Deepak Mishra", location: "Pandeypur, Varanasi", rating: 5, comment: "Smooth home sample collection experience.", avatar: "DM" },
        { id: 10, name: "Suman Jain", location: "Bhelupur, Varanasi", rating: 5, comment: "Very polite staff and clean facility.", avatar: "SJ" },
        { id: 11, name: "Neha Tiwari", location: "Chandua Chhittupur, Varanasi", rating: 5, comment: "Got accurate reports earlier than expected.", avatar: "NT" },
        { id: 12, name: "Manish Yadav", location: "Orderly Bazaar, Varanasi", rating: 5, comment: "Highly recommended service!", avatar: "MY" },
        { id: 13, name: "Sahil Khan", location: "Rathyatra, Varanasi", rating: 4, comment: "Super convenient and reliable.", avatar: "SK" },
        { id: 14, name: "Ankit Srivastava", location: "Chaukaghat, Varanasi", rating: 5, comment: "Amazing overall experience.", avatar: "AS" },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
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

    // Auto slide every 3 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [testimonials.length]);

    const nextTestimonial = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const goToTestimonial = (index) => {
        setCurrentIndex(index);
    };

    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, index) => (
            <svg
                key={index}
                className={`w-4 h-4 ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
            >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
        ));
    };

    // For desktop - show 4 cards
    const DesktopTestimonials = () => {
        const groupsPerView = 4;
        const totalGroups = Math.ceil(testimonials.length / groupsPerView);
        const [currentGroup, setCurrentGroup] = useState(0);

        // Group testimonials into sets of 4
        const groupedTestimonials = [];
        for (let i = 0; i < testimonials.length; i += groupsPerView) {
            groupedTestimonials.push(testimonials.slice(i, i + groupsPerView));
        }

        // Auto slide every 3 seconds for desktop
        useEffect(() => {
            const interval = setInterval(() => {
                setCurrentGroup((prev) => (prev + 1) % totalGroups);
            }, 3000);
            return () => clearInterval(interval);
        }, [totalGroups]);

        const nextGroup = () => {
            setCurrentGroup((prev) => (prev + 1) % totalGroups);
        };

        const prevGroup = () => {
            setCurrentGroup((prev) => (prev - 1 + totalGroups) % totalGroups);
        };

        const goToGroup = (index) => {
            setCurrentGroup(index);
        };

        return (
            <div className="relative">
                {/* Navigation Arrows */}
                <button
                    onClick={prevGroup}
                    className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white backdrop-blur-sm border border-gray-200 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
                >
                    <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                <button
                    onClick={nextGroup}
                    className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white backdrop-blur-sm border border-gray-200 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
                >
                    <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>

                {/* Testimonials Grid */}
                <div className="overflow-hidden">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentGroup}
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                        >
                            {groupedTestimonials[currentGroup]?.map((testimonial) => (
                                <motion.div
                                    key={testimonial.id}
                                    whileHover={{ 
                                        scale: 1.03,
                                        y: -5,
                                        transition: { duration: 0.3 }
                                    }}
                                    className="bg-white rounded-2xl   transition-all duration-300 border border-gray-100 p-6 h-full"
                                >
                                    {/* Rating */}
                                    <div className="flex items-center mb-4">
                                        <div className="flex space-x-1">
                                            {renderStars(testimonial.rating)}
                                        </div>
                                        <span className="ml-2 text-sm text-gray-600 font-medium">
                                            {testimonial.rating}.0
                                        </span>
                                    </div>

                                    {/* Comment */}
                                    <p className="text-gray-700 mb-6 leading-relaxed text-sm md:text-base">
                                        "{testimonial.comment}"
                                    </p>

                                    {/* User Info */}
                                    <div className="flex items-center">
                                        <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-lg shadow-md">
                                            {testimonial.avatar}
                                        </div>
                                        <div className="ml-4">
                                            <h4 className="font-bold text-gray-900 text-sm md:text-base">
                                                {testimonial.name}
                                            </h4>
                                            <p className="text-sm text-gray-600">
                                                {testimonial.location}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Dots Indicator */}
                {/* <div className="flex justify-center space-x-3 mt-8">
                    {groupedTestimonials.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToGroup(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                index === currentGroup 
                                ? 'bg-teal-600 w-8' 
                                : 'bg-gray-300 hover:bg-gray-400'
                            }`}
                        />
                    ))}
                </div> */}
            </div>
        );
    };

    // For mobile - show single card
    const MobileTestimonials = () => (
        <div className="relative">
            {/* Navigation Arrows */}
            <button
                onClick={prevTestimonial}
                className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white backdrop-blur-sm border border-gray-200 rounded-full p-3  hover:shadow-xl transition-all duration-300 hover:scale-110"
            >
                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>

            <button
                onClick={nextTestimonial}
                className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white backdrop-blur-sm border border-gray-200 rounded-full p-3  hover:shadow-xl transition-all duration-300 hover:scale-110"
            >
                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>

            {/* Single Testimonial Card */}
            <div className="overflow-hidden px-8">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                    >
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="bg-white rounded-2xl  border border-gray-100 p-6 mx-auto max-w-sm"
                        >
                            {/* Rating */}
                            <div className="flex items-center justify-center mb-4">
                                <div className="flex space-x-1">
                                    {renderStars(testimonials[currentIndex].rating)}
                                </div>
                                <span className="ml-2 text-sm text-gray-600 font-medium">
                                    {testimonials[currentIndex].rating}.0
                                </span>
                            </div>

                            {/* Comment */}
                            <p className="text-gray-700 mb-6 leading-relaxed text-center text-base">
                                "{testimonials[currentIndex].comment}"
                            </p>

                            {/* User Info */}
                            <div className="flex items-center justify-center">
                                <div className="w-14 h-14 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-xl shadow-md">
                                    {testimonials[currentIndex].avatar}
                                </div>
                                <div className="ml-4">
                                    <h4 className="font-bold text-gray-900 text-lg">
                                        {testimonials[currentIndex].name}
                                    </h4>
                                    <p className="text-sm text-gray-600">
                                        {testimonials[currentIndex].location}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center space-x-2 mt-8">
                {testimonials.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToTestimonial(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            index === currentIndex 
                            ? 'bg-teal-600 w-6' 
                            : 'bg-gray-300 hover:bg-gray-400'
                        }`}
                    />
                ))}
            </div>
        </div>
    );

    return (
        <div className="w-full bg-gradient-to-br from-teal-50 to-blue-50 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-md md:text-2xl font-bold text-gray-900 mb-4"
                     >
                        What Our Patients Say
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-[14px] text-gray-600 max-w-3xl mx-auto"
                    >
                        Trusted by thousands of patients across Varanasi for accurate diagnostics and exceptional healthcare services
                    </motion.p>
                </div>

                {/* Conditional Rendering based on device */}
                {isMobile ? <MobileTestimonials /> : <DesktopTestimonials />}

                {/* Stats Section */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-12 border-t border-gray-200"
                >
                    {[
                        { number: "10K+", label: "Happy Patients", icon: "😊" },
                        { number: "50+", label: "Locations", icon: "📍" },
                        { number: "99%", label: "Accuracy Rate", icon: "🎯" },
                        { number: "4.8/5", label: "Avg Rating", icon: "⭐" }
                    ].map((stat, index) => (
                        <motion.div 
                            key={index}
                            whileHover={{ scale: 1.05 }}
                            className="text-center bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/80 shadow-sm hover:shadow-md transition-all duration-300"
                        >
                            <div className="text-4xl mb-2">{stat.icon}</div>
                            <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-teal-600 to-blue-900 bg-clip-text text-transparent">
                                {stat.number}
                            </div>
                            <div className="text-gray-600 font-medium mt-2">{stat.label}</div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* CTA Section */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="text-center mt-12"
                >
                    <p className="text-gray-600 mb-6 text-lg">
                        Join thousands of satisfied patients in Varanasi
                    </p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-700 hover:to-teal-900 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300  hover:shadow-xl"
                    >
                        Book Your Test Today
                    </motion.button>
                </motion.div>
            </div>
        </div>
    );
}

export default Testimonial;