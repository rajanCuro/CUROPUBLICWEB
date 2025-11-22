// src/pages/lab/labhome/LabAppoitmentConfirm.jsx
// src/pages/lab/labhome/LabAppointmentConfirm.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Calendar, Clock, MapPin, User, Phone, FileText } from 'lucide-react';

function LabAppointmentConfirm() {
  const [appointment, setAppointment] = useState({
    id: 'APT-2024-00123',
    patientName: 'Sarah Johnson',
    testType: 'Complete Blood Count (CBC)',
    date: '2024-01-15',
    time: '10:30 AM',
    labName: 'Metro Diagnostic Center',
    address: '123 Healthcare Ave, Medical District, NY 10001',
    phone: '+1 (555) 123-4567',
    duration: '30 minutes',
    preparation: 'Fasting required for 8 hours before the test',
    status: 'confirmed'
  });

  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          // Redirect or perform action when countdown ends
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
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
        duration: 0.5
      }
    }
  };

  const downloadReport = () => {
    // Simulate download functionality
    alert('Downloading appointment details...');
  };

  const shareAppointment = () => {
    // Simulate share functionality
    if (navigator.share) {
      navigator.share({
        title: 'Lab Appointment Confirmation',
        text: `Your lab appointment is confirmed for ${appointment.date} at ${appointment.time}`,
        url: window.location.href,
      });
    } else {
      alert('Appointment details copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Appointment Confirmed!</h1>
          <p className="text-gray-600">Your lab test has been successfully scheduled</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          {/* Success Header */}
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-white text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="flex justify-center mb-4"
            >
              <CheckCircle size={64} className="text-white" />
            </motion.div>
            <h2 className="text-2xl font-bold mb-2">Booking Confirmed</h2>
            <p className="opacity-90">Your appointment ID: {appointment.id}</p>
          </motion.div>

          {/* Appointment Details */}
          <div className="p-6 space-y-6">
            {/* Patient Information */}
            <motion.div variants={itemVariants}>
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <User className="w-5 h-5 mr-2 text-blue-600" />
                Patient Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600">Patient Name</p>
                  <p className="font-semibold text-gray-800">{appointment.patientName}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600">Test Type</p>
                  <p className="font-semibold text-gray-800">{appointment.testType}</p>
                </div>
              </div>
            </motion.div>

            {/* Appointment Schedule */}
            <motion.div variants={itemVariants}>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Appointment Schedule</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <Calendar className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Date</p>
                  <p className="font-semibold text-gray-800">{appointment.date}</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <Clock className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Time</p>
                  <p className="font-semibold text-gray-800">{appointment.time}</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <Clock className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Duration</p>
                  <p className="font-semibold text-gray-800">{appointment.duration}</p>
                </div>
              </div>
            </motion.div>

            {/* Lab Information */}
            <motion.div variants={itemVariants}>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Lab Information</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-800">{appointment.labName}</p>
                      <p className="text-gray-600 text-sm mt-1">{appointment.address}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 text-green-600 mr-3" />
                    <div>
                      <p className="font-semibold text-gray-800">{appointment.phone}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Preparation Instructions */}
            <motion.div variants={itemVariants}>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Preparation Instructions</h3>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-yellow-800 text-sm">{appointment.preparation}</p>
              </div>
            </motion.div>

            {/* Important Notes */}
            <motion.div variants={itemVariants}>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Important Notes</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 mr-3"></div>
                  <span>Please arrive 15 minutes before your scheduled appointment time</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 mr-3"></div>
                  <span>Bring your ID and insurance card (if applicable)</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 mr-3"></div>
                  <span>Wear comfortable clothing with easy access to your arm</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 mr-3"></div>
                  <span>Stay hydrated before your test</span>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Action Buttons */}
          <motion.div
            variants={itemVariants}
            className="bg-gray-50 px-6 py-4 border-t border-gray-200"
          >
            <div className="flex flex-col sm:flex-row gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={downloadReport}
                className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold flex items-center justify-center hover:bg-blue-700 transition-colors"
              >
                <FileText className="w-5 h-5 mr-2" />
                Download Details
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={shareAppointment}
                className="flex-1 bg-white text-blue-600 py-3 px-6 rounded-lg font-semibold border border-blue-600 flex items-center justify-center hover:bg-blue-50 transition-colors"
              >
                Share Appointment
              </motion.button>
            </div>
          </motion.div>
        </motion.div>

        {/* Countdown & Next Steps */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-6 text-center"
        >
          <p className="text-gray-600 mb-2">
            You will be redirected to the dashboard in <span className="font-bold text-blue-600">{countdown}</span> seconds
          </p>
          <p className="text-sm text-gray-500">
            Check your email for the confirmation and reminder
          </p>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="bg-white p-4 rounded-xl shadow-md text-center hover:shadow-lg transition-shadow"
          >
            <Calendar className="w-6 h-6 text-blue-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-700">Reschedule</p>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="bg-white p-4 rounded-xl shadow-md text-center hover:shadow-lg transition-shadow"
          >
            <Clock className="w-6 h-6 text-orange-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-700">Add to Calendar</p>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="bg-white p-4 rounded-xl shadow-md text-center hover:shadow-lg transition-shadow"
          >
            <MapPin className="w-6 h-6 text-red-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-700">Get Directions</p>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="bg-white p-4 rounded-xl shadow-md text-center hover:shadow-lg transition-shadow"
          >
            <Phone className="w-6 h-6 text-green-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-700">Contact Lab</p>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}

export default LabAppointmentConfirm;