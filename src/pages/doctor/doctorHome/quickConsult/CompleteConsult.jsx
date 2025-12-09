// src/pages/doctor/doctorHome/quickConsult/CompleteConsult.jsx
import React, { useState } from 'react';
import { 
  FaUserMd, 
  FaCalendarAlt, 
  FaCheckCircle, 
  FaDownload, 
  FaStar, 
  FaRegStar,
  FaClipboardList,
  FaPills,
  FaSprayCan,
  FaSyringe,
  FaArrowRight
} from 'react-icons/fa';
import { BsCalendarPlus } from 'react-icons/bs';
import { GiMedicines } from 'react-icons/gi';

function CompleteConsult() {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  const handleSubmitRating = () => {
    console.log('Rating submitted:', rating, 'Feedback:', feedback);
    alert('Thank you for your feedback!');
  };

  const handleDownloadPrescriptions = () => {
    console.log('Downloading prescriptions...');
    // Add download logic here
  };

  const handleBookFollowUp = () => {
    console.log('Booking follow-up appointment...');
    // Add booking logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Consultation Overview
          </h1>
          <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Consultation Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Consultation Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="p-6 md:p-8">
                <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                  <FaClipboardList className="w-6 h-6 text-blue-600 mr-2" />
                  Consultation Details
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Doctor Info */}
                  <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-teal-100 rounded-full flex items-center justify-center mr-4">
                        <FaUserMd className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Doctor</h3>
                        <p className="text-lg font-bold text-gray-800">Dr. Eleanor Vance</p>
                      </div>
                    </div>
                    <div className="text-gray-600">
                      <span className="font-medium">Specialization:</span> General Physician
                    </div>
                  </div>

                  {/* Topic Info */}
                  <div className="bg-teal-50 rounded-xl p-5 border border-teal-100">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Topic</h3>
                    <p className="text-lg font-bold text-gray-800">Seasonal Allergy Management</p>
                    <div className="mt-3 text-sm text-gray-600">
                      Consultation focused on allergy symptoms and treatment
                    </div>
                  </div>

                  {/* Date Info */}
                  <div className="bg-purple-50 rounded-xl p-5 border border-purple-100">
                    <div className="flex items-center mb-3">
                      <FaCalendarAlt className="w-5 h-5 text-purple-600 mr-2" />
                      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Date</h3>
                    </div>
                    <p className="text-xl font-bold text-gray-800">October 26, 2023</p>
                    <div className="mt-2 text-sm text-gray-600">
                      10:30 AM - 11:15 AM
                    </div>
                  </div>

                  {/* Status */}
                  <div className="bg-green-50 rounded-xl p-5 border border-green-100">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Status</h3>
                      <div className="flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full">
                        <FaCheckCircle className="w-4 h-4 mr-2" />
                        <span className="font-bold">Completed</span>
                      </div>
                    </div>
                    <p className="mt-3 text-gray-700">
                      Consultation was successfully completed
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Prescriptions Section */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="p-6 md:p-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-800 flex items-center">
                    <GiMedicines className="w-6 h-6 text-green-600 mr-2" />
                    Prescriptions from Your Consultation
                  </h2>
                  <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    3 medications
                  </span>
                </div>

                {/* Prescriptions Table - Responsive */}
                <div className="overflow-x-auto rounded-xl border border-gray-200">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          Medication
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          Dosage
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          Instructions
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          Icon
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {/* Row 1 */}
                      <tr className="hover:bg-blue-50 transition-colors duration-200">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-bold text-gray-800">Foor/teodine</div>
                          <div className="text-sm text-gray-500">Antihistamine</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="bg-blue-100 text-blue-800 font-semibold px-3 py-1 rounded-lg inline-block">
                            1 Tablet daily
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-gray-700">
                            Take orally with water, preferably in the morning. Avoid fruit juice.
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <FaPills className="w-5 h-5 text-blue-600" />
                          </div>
                        </td>
                      </tr>
                      
                      {/* Row 2 */}
                      <tr className="hover:bg-green-50 transition-colors duration-200">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-bold text-gray-800">Islong Full/casore Nasal Spray</div>
                          <div className="text-sm text-gray-500">Nasal Decongestant</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="bg-green-100 text-green-800 font-semibold px-3 py-1 rounded-lg inline-block">
                            2 sprays per nostril daily
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-gray-700">
                            Use as directed, shake well before use. Clear nasal passage before spraying.
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                            <FaSprayCan className="w-5 h-5 text-green-600" />
                          </div>
                        </td>
                      </tr>
                      
                      {/* Row 3 */}
                      <tr className="hover:bg-purple-50 transition-colors duration-200">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-bold text-gray-800">Ceritrine Syrup</div>
                          <div className="text-sm text-gray-500">Children's Allergy Syrup</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="bg-purple-100 text-purple-800 font-semibold px-3 py-1 rounded-lg inline-block">
                            10ml once daily
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-gray-700">
                            For children 6+, take before bedtime. Measure with a spoon.
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                            <FaSyringe className="w-5 h-5 text-purple-600" />
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Download Button */}
                <div className="mt-8 flex justify-center">
                  <button
                    onClick={handleDownloadPrescriptions}
                    className="flex items-center justify-center space-x-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    <FaDownload className="w-5 h-5" />
                    <span className="text-lg">Download Prescriptions</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Feedback & Follow-up */}
          <div className="space-y-8">
            {/* Rating Section */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <FaStar className="w-6 h-6 text-yellow-500 mr-2" />
                Rate Your Consultation Experience
              </h2>

              {/* Star Rating */}
              <div className="mb-6">
                <div className="flex justify-center space-x-2 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      className="focus:outline-none transform hover:scale-110 transition-transform duration-200"
                    >
                      {star <= rating ? (
                        <FaStar className="w-10 h-10 text-yellow-500" />
                      ) : (
                        <FaRegStar className="w-10 h-10 text-gray-300" />
                      )}
                    </button>
                  ))}
                </div>
                <p className="text-center text-gray-600">
                  {rating === 0 ? 'Select a rating' : `You rated: ${rating} star${rating > 1 ? 's' : ''}`}
                </p>
              </div>

              {/* Feedback Input */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Share your feedback (optional)
                </label>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Tell us about your experience..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 min-h-[120px] resize-none"
                  rows="4"
                />
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmitRating}
                disabled={rating === 0}
                className={`w-full py-3 px-4 rounded-xl font-semibold text-white transition-all duration-300 ${
                  rating === 0
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 shadow-lg hover:shadow-xl'
                }`}
              >
                Submit Rating
              </button>
            </div>

            {/* Follow-up Section */}
            <div className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-2xl shadow-lg border border-teal-200 p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <BsCalendarPlus className="w-6 h-6 text-teal-600 mr-2" />
                Need Further Assistance?
              </h2>
              
              <p className="text-gray-700 mb-6">
                Book a follow-up appointment with your doctor to discuss your treatment plan or any new concerns.
              </p>

              <button
                onClick={handleBookFollowUp}
                className="w-full bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 group"
              >
                <span>Book Follow-up Appointment</span>
                <FaArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
              </button>

              {/* Additional Info */}
              <div className="mt-6 pt-6 border-t border-teal-200">
                <div className="flex items-start space-x-3 text-sm text-gray-600">
                  <FaCheckCircle className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" />
                  <p>Follow-up appointments help ensure proper recovery and treatment adjustment</p>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Consultation Summary</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Duration</span>
                  <span className="font-semibold text-gray-800">45 minutes</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Type</span>
                  <span className="font-semibold text-gray-800">Video Consultation</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Prescriptions</span>
                  <span className="font-semibold text-gray-800">3 issued</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Follow-up</span>
                  <span className="font-semibold text-gray-800">Recommended</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-10 text-center text-gray-500 text-sm">
          <p>Your consultation records are securely stored and accessible anytime.</p>
          <p className="mt-1">For emergency concerns, please contact emergency services immediately.</p>
        </div>
      </div>
    </div>
  );
}

export default CompleteConsult;