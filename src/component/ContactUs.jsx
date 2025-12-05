// src/component/ContactUs.jsx
import React, { useEffect, useState } from 'react';
import { FaCheckCircle, FaStar, FaPaperPlane, FaUser, FaEnvelope, FaPhone, FaComment, FaMapMarkerAlt } from 'react-icons/fa';
import { FiMessageSquare, FiSend } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useAuth } from '../Authorization/AuthContext';
import axiosInstance from '../Authorization/axiosInstance';


function ContactUs() {
    const { userData, latitude, longitude } = useAuth();
    const userId = userData?.id;
    const userName = userData?.firstName;

    const allSubjects = ["COMPLAINT", "FEEDBACK", "SUPPORT", "SUGGESTION", "QUERY"];
    const subjectOptions = userId
        ? allSubjects.filter(sub => sub !== "QUERY")
        : ["QUERY"];
    const [formData, setFormData] = useState({
        userId: userId,
        userName: userName,
        name: "",
        email: "",
        phoneNumber: "",
        rating: "",
        comments: "",
        source: "WEB",
        subject: userId ? "" : "QUERY",
        ipAddress: "",
        latitude: "",
        longitude: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [hoverRating, setHoverRating] = useState(0);
    const [toastMsg, setToastMsg] = useState("");

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        navigator.geolocation.getCurrentPosition((pos) => {
            setFormData(prev => ({
                ...prev,
                latitude: pos.coords.latitude,
                longitude: pos.coords.longitude
            }));
        });

        fetch('https://api.ipify.org?format=json')
            .then(res => res.json())
            .then(data => {
                setFormData(prev => ({
                    ...prev,
                    ipAddress: data.ip
                }));
            });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "phoneNumber") {
            let val = value.replace(/\D/g, ""); // allow only numbers except '+'

            // Allow + only if typed first
            if (value.startsWith("+")) {
                val = "+" + val;
            }

            // Conditions:
            if (val.startsWith("+91")) {
                // +91XXXXXXXXXX → total 13 chars (+ + 2 digits + 10 digits)
                val = val.slice(0, 13);
            }
            else if (val.startsWith("91")) {
                // 91XXXXXXXXXX → total 12 digits
                val = val.slice(0, 12);
            }
            else if (val.startsWith("0")) {
                // 0XXXXXXXXXX → max 11 digits
                val = val.slice(0, 11);
            }
            else {
                // Normal 10-digit number
                val = val.slice(0, 10);
            }

            setFormData(prev => ({ ...prev, phoneNumber: val }));
            return;
        }

        setFormData(prev => ({ ...prev, [name]: value }));
    };


    useEffect(() => {
        if (toastMsg) {
            const timer = setTimeout(() => { setToastMsg("") }, 2000);
            return () => clearTimeout(timer);
        }
    }, [toastMsg]);

    const renderStars = () => {
        const stars = [];
        const currentRating = parseFloat(formData.rating) || 0;

        for (let i = 1; i <= 5; i++) {
            const isActive = currentRating >= i;

            stars.push(
                <motion.button
                    key={i}
                    type="button"
                    whileHover={{ scale: 1.3, rotate: 15 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    onClick={() =>
                        setFormData(prev => ({ ...prev, rating: i.toString() }))
                    }
                    onMouseEnter={() => setHoverRating(i)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="relative group"
                >
                    <FaStar
                        className={`w-6 h-6 md:w-8 md:h-8 transition-all duration-300 ${isActive || hoverRating >= i
                            ? 'text-yellow-500 drop-shadow-lg'
                            : 'text-gray-300'
                            } group-hover:drop-shadow-xl`}
                    />
                    <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                        {i} star{i > 1 ? 's' : ''}
                    </span>
                </motion.button>
            );
        }
        return stars;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        if (!formData.subject && userId) {
            setToastMsg("Please select a subject!");
            setIsSubmitting(false);
            return;
        }

        let payload = { ...formData };

        if (formData.subject === "QUERY") {
            delete payload.userId;
            delete payload.userName;
        }

        try {
            const response = await axiosInstance.post(`/feedback/import`, payload);
            // console.log("feed",response)
            setIsSubmitted(true);
            setFormData({
                userId: userData?.id,
                userName: userData?.firstName,
                name: "",
                email: "",
                phoneNumber: "",
                rating: "",
                comments: "",
                source: "WEB",
                subject: userId ? "" : "QUERY", // default subject
                ipAddress: "",
                latitude: latitude,
                longitude: longitude,
            });
        } catch (err) {
            setToastMsg("Failed to submit feedback. Please try again.");
        }

        setIsSubmitting(false);
    };

    const subjectIcons = {
        "COMPLAINT": "🚨",
        "FEEDBACK": "📝",
        "SUPPORT": "🛠️",
        "SUGGESTION": "💡",
        "QUERY": "❓"
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-teal-50/30 py-4 px-4 sm:px-6 lg:px-8">
            {/* Toast Notification */}
            {toastMsg && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="fixed top-4 right-4 z-50 max-w-sm"
                >
                    <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-6 py-3 rounded-xl shadow-lg flex items-center space-x-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <span className="font-medium">{toastMsg}</span>
                    </div>
                </motion.div>
            )}

            <div className="container mx-auto">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-2"
                >
                    <h1 className="text-md md:text-2xl  font-bold mb-4 bg-gradient-to-r from-teal-600 to-cyan-500 bg-clip-text text-transparent">
                        Get In Touch
                    </h1>
                    <p className="text-gray-600 text-md max-w-2xl mx-auto">
                        We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* Left Column - Image & Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="order-1"
                    >
                        <div className="relative h-full min-h-[500px] lg:min-h-[600px] rounded-2xl overflow-hidden bg-gradient-to-br from-teal-500/10 to-cyan-500/10 p-6 md:p-8">
                            {/* Animated Background Elements */}
                            <div className="absolute inset-0 overflow-hidden">
                                {[...Array(3)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        animate={{
                                            y: [0, -20, 0],
                                            x: [0, 10, 0],
                                            rotate: [0, 5, 0]
                                        }}
                                        transition={{
                                            duration: 3 + i,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }}
                                        className="absolute w-64 h-64 bg-teal-200/30 rounded-full blur-3xl"
                                        style={{
                                            top: `${20 + i * 30}%`,
                                            left: `${40 + i * 20}%`
                                        }}
                                    />
                                ))}
                            </div>

                            {/* Content Container */}
                            <div className="relative z-10 h-full flex flex-col justify-center items-center text-center">
                                {/* Animated Illustration/Image */}
                                <motion.div
                                    animate={{
                                        y: [0, -15, 0],
                                        rotate: [0, 2, 0, -2, 0]
                                    }}
                                    transition={{
                                        y: {
                                            duration: 3,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        },
                                        rotate: {
                                            duration: 4,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }
                                    }}
                                    className="mb-8 md:mb-12"
                                >
                                    <div className="w-64 h-64 md:w-80 md:h-80 bg-gradient-to-br from-teal-400/20 to-cyan-400/20 rounded-full flex items-center justify-center p-8">
                                        <FaPaperPlane className="w-full h-full text-teal-500/40" />
                                    </div>
                                </motion.div>

                                {/* Contact Info */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6 }}
                                    className="space-y-6 max-w-md"
                                >
                                    <h3 className="text-2xl md:text-3xl font-bold text-gray-800">
                                        We're Here to Help
                                    </h3>
                                    <p className="text-gray-600">
                                        Our team typically responds within 24 hours during business days.
                                        For urgent matters, please call our support line.
                                    </p>

                                    {/* Quick Info Cards */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                                        <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-sm border border-gray-100">
                                            <div className="text-teal-500 text-2xl mb-2">📧</div>
                                            <h4 className="font-semibold text-gray-800">Email</h4>
                                            <p className="text-sm text-gray-600">info@curo24.com</p>
                                        </div>
                                        <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-sm border border-gray-100">
                                            <div className="text-teal-500 text-2xl mb-2">📞</div>
                                            <h4 className="font-semibold text-gray-800">Phone</h4>
                                            <p className="text-sm text-gray-600">18002962424</p>
                                        </div>
                                    </div>

                                    {/* Location Indicator (if coordinates available) */}
                                    {(latitude && longitude) && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.8 }}
                                            className="inline-flex items-center space-x-2 text-teal-600 bg-teal-50 px-4 py-2 rounded-lg"
                                        >
                                            <FaMapMarkerAlt />
                                            <span className="text-sm">Location detected for better support</span>
                                        </motion.div>
                                    )}
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column - Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="order-2"
                    >
                        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-6 sm:p-8 border border-gray-100">
                            {isSubmitted ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center py-12 sm:py-16"
                                >
                                    <div className="relative inline-block mb-8">
                                        <FaCheckCircle className="text-teal-500 text-7xl sm:text-8xl" />
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: [0, 1.2, 1] }}
                                            transition={{ delay: 0.3 }}
                                            className="absolute -top-2 -right-2 w-8 h-8 bg-teal-100 rounded-full"
                                        />
                                    </div>
                                    <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-800">
                                        Message Sent Successfully!
                                    </h2>
                                    <p className="text-gray-600 mb-8 max-w-md mx-auto">
                                        Thank you for contacting us. We'll get back to you within 24 hours.
                                    </p>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => {
                                            setIsSubmitted(false);
                                            setFormData(prev => ({
                                                ...prev,
                                                rating: "",
                                                comments: "",
                                                subject: userId ? "" : "QUERY"
                                            }));
                                        }}
                                        className="px-8 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center space-x-2 mx-auto"
                                    >
                                        <FiMessageSquare className="text-lg" />
                                        <span>Send Another Message</span>
                                    </motion.button>
                                </motion.div>
                            ) : (
                                <>
                                    {/* Subject Selection */}
                                    {userId && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.3 }}
                                            className="mb-10"
                                        >
                                            <label className="block mb-2 font-semibold text-gray-700 text-lg">
                                                Select Subject <span className="text-red-500">*</span>
                                            </label>
                                            <div className="grid grid-cols-4 gap-2">
                                                {subjectOptions.map((sub, index) => (
                                                    <motion.button
                                                        key={sub}
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: 0.4 + index * 0.1 }}
                                                        whileHover={{ scale: 1.05, y: -2 }}
                                                        whileTap={{ scale: 0.98 }}
                                                        onClick={() =>
                                                            setFormData(prev => ({ ...prev, subject: sub }))
                                                        }
                                                        className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-300 ${formData.subject === sub
                                                            ? "bg-gradient-to-br from-teal-700 to-cyan-700 text-white border-teal-500 shadow-lg"
                                                            : "bg-white text-gray-700 border-gray-200 hover:border-teal-300 hover:shadow-md"
                                                            }`}
                                                    >
                                                        <span className="text-md md:text-2xl mb-2">{subjectIcons[sub]}</span>
                                                        <span className="md:font-semibold text-[8px] md:text-sm">{sub}</span>
                                                    </motion.button>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* Form */}
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        {/* Name Input */}
                                        <motion.div
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.5 }}
                                        >
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Full Name <span className="text-red-500">*</span>
                                            </label>
                                            <div className="relative">
                                                <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                                <input
                                                    type="text"
                                                    name="name"
                                                    placeholder="John Doe"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                                                />
                                            </div>
                                        </motion.div>

                                        {/* Email Input */}
                                        <motion.div
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.6 }}
                                        >
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Email Address <span className="text-red-500">*</span>
                                            </label>
                                            <div className="relative">
                                                <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                                <input
                                                    type="email"
                                                    name="email"
                                                    placeholder="john@example.com"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                                                />
                                            </div>
                                        </motion.div>

                                        {/* Phone Input */}
                                        <div className='flex justify-center items-center gap-2 '>
                                            <motion.div
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.7 }}
                                                className='w-full md:w-1/2 '
                                            >
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Phone Number <span className="text-red-500">*</span>
                                                </label>
                                                <div className="relative">
                                                    <FaPhone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                                    <input
                                                        type="tel"
                                                        name="phoneNumber"
                                                        placeholder="+91"
                                                        value={formData.phoneNumber}
                                                        onChange={handleChange}
                                                        required
                                                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                                                    />
                                                </div>
                                            </motion.div>
                                            {/* Rating Section */}
                                            <motion.div
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.8 }}
                                                className="w-full md:w-1/2"
                                             >
                                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                                    Your Rating <span className="text-red-500">*</span>
                                                </label>
                                                <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
                                                    <div className="flex space-x-2 sm:space-x-4">
                                                        {renderStars()}
                                                    </div>
                                                    {formData.rating && (
                                                        <motion.span
                                                            initial={{ opacity: 0, scale: 0.8 }}
                                                            animate={{ opacity: 1, scale: 1 }}
                                                            className="text-lg font-semibold text-teal-600"
                                                        >
                                                            {formData.rating} / 5
                                                        </motion.span>
                                                    )}
                                                </div>
                                            </motion.div>
                                        </div>




                                        {/* Comments Input */}
                                        <motion.div
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.9 }}
                                        >
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Your Message <span className="text-red-500">*</span>
                                            </label>
                                            <div className="relative">
                                                <FaComment className="absolute left-4 top-4 text-gray-400" />
                                                <textarea
                                                    name="comments"
                                                    rows="5"
                                                    value={formData.comments}
                                                    onChange={handleChange}
                                                    placeholder="Tell us what's on your mind..."
                                                    required
                                                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all resize-none"
                                                />
                                            </div>
                                        </motion.div>

                                        {/* Submit Button */}
                                        <motion.button
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 1 }}
                                            whileHover={{ scale: 1.02, boxShadow: "0 10px 25px -5px rgba(20, 184, 166, 0.4)" }}
                                            whileTap={{ scale: 0.98 }}
                                            type="submit"
                                            disabled={isSubmitting || !formData.rating || (userId && !formData.subject)}
                                            className="w-full py-4 bg-gradient-to-r from-teal-700 cursor-pointer to-cyan-700 text-white rounded-xl font-semibold text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center space-x-3"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    <span>Sending...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <FiSend className="text-xl" />
                                                    <span>Send Message</span>
                                                </>
                                            )}
                                        </motion.button>
                                    </form>
                                </>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

export default ContactUs;