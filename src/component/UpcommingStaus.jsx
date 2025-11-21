// src/component/UpcommingStaus.jsx
// src/component/UpcomingStatus.jsx
import React from "react";
import { FiTruck, FiCalendar, FiClock, FiMapPin, FiUser, FiPlus } from "react-icons/fi";

export default function UpcomingStatus() {
  return (
    <div className="container mx-auto">
      {/* MAIN CONTAINER */}
      <div className=" rounded-2xl  overflow-hidden  max-w-full mx-auto">
        <div className=" space-y-6">

          {/* DELIVERY STATUS CARD */}
          <div className="group relative">
            <div className="absolute -left-3 top-1/2 transform -translate-y-1/2">
              <div className="w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl p-5 border-l-4 border-teal-500 hover:shadow-md transition-all duration-300 group-hover:scale-[1.02]">

              {/* HEADER */}
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-teal-100 rounded-lg group-hover:scale-110 transition-transform duration-300">
                  <FiTruck className="text-teal-600 text-lg" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 text-lg">Delivery Status</h3>
                  <p className="text-sm text-teal-600 font-medium">In Transit</p>
                </div>
                <div className="ml-auto bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs font-semibold">
                  Today
                </div>
              </div>

              {/* CONTENT */}
              <div className="space-y-2">
                <p className="text-gray-600 text-sm">
                  Order <span className="font-semibold text-gray-800">#C24-98765</span> is out for delivery
                </p>

                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <FiClock className="text-teal-500" />
                    <span>Expected by <span className="font-semibold">5:00 PM</span></span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <FiMapPin className="text-teal-500" />
                    <span>Tracking available</span>
                  </div>
                </div>

                {/* PROGRESS BAR */}
                <div className="mt-3">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Order placed</span>
                    <span>Out for delivery</span>
                    <span>Delivered</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-teal-500 h-2 rounded-full w-3/4 animate-pulse"></div>
                  </div>
                </div>

                {/* ACTION BUTTON */}
                <button className="mt-3 bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 hover:scale-105 transform flex items-center gap-2">
                  Track Order
                  <FiTruck className="text-sm" />
                </button>
              </div>
            </div>
          </div>

          {/* SEPARATOR */}
          <div className="relative flex items-center justify-center">
            <div className="flex-1 border-t border-gray-200"></div>
            <div className="px-4">
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            </div>
            <div className="flex-1 border-t border-gray-200"></div>
          </div>

          {/* UPCOMING APPOINTMENTS CARD */}
          <div className="group relative">
            <div className="absolute -left-3 top-1/2 transform -translate-y-1/2">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-5 border-l-4 border-blue-500 hover:shadow-md transition-all duration-300 group-hover:scale-[1.02]">

              {/* HEADER */}
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-blue-100 rounded-lg group-hover:scale-110 transition-transform duration-300">
                  <FiCalendar className="text-blue-600 text-lg" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 text-lg">Upcoming Appointment</h3>
                  <p className="text-sm text-blue-600 font-medium">General Checkup</p>
                </div>
                <div className="ml-auto bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-semibold">
                  Confirmed
                </div>
              </div>

              {/* CONTENT */}
              <div className="space-y-3">
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <FiUser className="text-blue-500" />
                    <span>Dr. <span className="font-semibold text-gray-800">Alice Smith</span></span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <FiClock className="text-blue-500" />
                    <span>July 20, 2024 • <span className="font-semibold">10:00 AM</span></span>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-3 border border-gray-200">
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold text-gray-800">Note:</span> Please arrive 15 minutes early for registration and paperwork.
                  </p>
                </div>

                {/* ACTION BUTTONS */}
                <div className="flex flex-wrap gap-3">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 hover:scale-105 transform flex items-center gap-2">
                    Add to Calendar
                    <FiCalendar className="text-sm" />
                  </button>
                  <button className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 hover:scale-105 transform flex items-center gap-2">
                    Reschedule
                    <FiClock className="text-sm" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* QUICK ACTIONS */}

        </div>

      </div>
    </div>
  );
}