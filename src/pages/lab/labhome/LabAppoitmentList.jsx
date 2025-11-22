// src/pages/lab/labhome/LabAppoitmentList.jsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../Authorization/AuthContext';
import axiosInstance from '../../../Authorization/axiosInstance';
import AppointmentsList from './AppotmentList';
import { FiFilter, FiList, FiSearch } from 'react-icons/fi';

function LabAppointmentList() {
  const { userData } = useAuth();
  const id = userData?.id;
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) getAppointmentsByUserId();
  }, [id]);

  const getAppointmentsByUserId = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        `/endUserEndPoint/getAllAppointmentsByBookedById?endUserId=${id}`
      );
      setAppointments([...(response.data.dtoList || [])].reverse());
    } catch (error) {
      console.error("Error fetching appointments", error);
    } finally {
      setLoading(false);
    }
  };





  if (loading) {
    return (
      <div className="min-h-screen  flex items-center justify-center hide-scrollbar">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading appointments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen hide-scrollbar">

      {/* Header */}
      <div className="mb-2">
        <h1 className="text-3xl font-bold text-gray-900">Appointments</h1>
        <p className="text-gray-600 mt-1">Total: {appointments.length} appointments</p>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 p-4 border-b border-gray-200">

        {/* Status Filter */}
        <div className="flex items-center gap-2">
          <FiFilter className="text-gray-600 text-lg" />
          <label className="text-sm font-medium text-gray-700">Status:</label>
          <select
            className="px-3 py-2 border border-gray-300 rounded-lg shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All</option>
            <option value="PENDING">Pending</option>
            <option value="CONFIRMED">Confirmed</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>

        {/* Search */}
        <div className="flex items-center w-full sm:w-72 relative">
          <FiSearch className="w-5 h-5 absolute left-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search appointments..."
            className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-300 shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Items per Page */}
        <div className="flex items-center gap-2">
          <FiList className="text-gray-600 text-lg" />
          <label className="text-sm font-medium text-gray-700">Items/Page:</label>
          <select
            className="px-3 py-2 border border-gray-300 rounded-lg shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="40">40</option>
          </select>
        </div>

      </div>

      {/* Appointments List */}
      <AppointmentsList appointments={appointments} />
    </div>

  );
}

export default LabAppointmentList;