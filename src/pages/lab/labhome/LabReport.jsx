// src/pages/lab/LabReport.jsx

import React, { useEffect, useState } from "react";
import axiosInstance from "../../../Authorization/axiosInstance";
import { useAuth } from "../../../Authorization/AuthContext";

function LabReport() {
    const { userData } = useAuth();
    const userId = userData?.id;

    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedReport, setSelectedReport] = useState(null);

    const [searchTerm, setSearchTerm] = useState("");
    const [dateFilter, setDateFilter] = useState("all");
    const [customDate, setCustomDate] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    useEffect(() => {
        if (userId) getAllReports();
    }, [userId]);

    // Fetch all reports
    const getAllReports = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get(`/endUserEndPoint/fetchLabReport/${userId}`);
            console.log("Lab Reports API Response:", response.data);

            let reportsData = [];

            if (Array.isArray(response.data)) {
                reportsData = response.data;
            } else if (response.data && Array.isArray(response.data.response)) {
                reportsData = response.data.response;
            } else if (response.data && Array.isArray(response.data.data)) {
                reportsData = response.data.data;
            } else if (response.data && typeof response.data === "object") {
                reportsData = [response.data];
            }

            console.log("Processed Reports:", reportsData);
            setReports(reportsData || []);
        } catch (error) {
            console.error("Error fetching lab reports:", error);
            setReports([]);
        } finally {
            setLoading(false);
        }
    };

    // Status badge UI
    const getStatusVariant = (status) => {
        switch (status?.toUpperCase()) {
            case "COMPLETED": return { bg: "bg-green-100 text-green-800", dot: "bg-green-500" };
            case "PENDING": return { bg: "bg-yellow-100 text-yellow-800", dot: "bg-yellow-500" };
            case "IN_PROGRESS":
            case "ACCEPTED": return { bg: "bg-blue-100 text-blue-800", dot: "bg-blue-500" };
            default: return { bg: "bg-gray-100 text-gray-800", dot: "bg-gray-500" };
        }
    };

    // Date handling
    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        return new Date(dateString).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
    };

    const isToday = (dateString) => {
        const d = new Date(dateString);
        return d.toDateString() === new Date().toDateString();
    };

    const isYesterday = (dateString) => {
        const y = new Date();
        y.setDate(y.getDate() - 1);
        return new Date(dateString).toDateString() === y.toDateString();
    };

    const isCustomDate = (dateString, customDate) =>
        new Date(dateString).toDateString() === new Date(customDate).toDateString();

    // Filtering logic
    const filteredReports = reports.filter((item) => {
        if (!item) return false;

        const matchesSearch =
            searchTerm === "" ||
            item.patientDetail?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.id?.toString().includes(searchTerm);

        const matchesStatus = statusFilter === "all" || item.status?.toUpperCase() === statusFilter.toUpperCase();

        let matchesDate = true;
        if (dateFilter === "today") matchesDate = isToday(item.updatedAt);
        else if (dateFilter === "yesterday") matchesDate = isYesterday(item.updatedAt);
        else if (dateFilter === "custom" && customDate) matchesDate = isCustomDate(item.updatedAt, customDate);

        return matchesSearch && matchesStatus && matchesDate;
    });

    const clearFilters = () => {
        setSearchTerm("");
        setStatusFilter("all");
        setDateFilter("all");
        setCustomDate("");
    };

    const getStatusOptions = () => [...new Set(reports.map((i) => i.status).filter(Boolean))];

    return (
        <div className="">
            <div className="">

                <h1 className="text-3xl font-bold text-gray-900 mb-2">Lab Reports</h1>
                <p className="text-gray-600 mb-6">Access and manage your laboratory test results</p>

                {/* Filters */}
                <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

                        <input
                            type="text"
                            placeholder="Search by Patient or Report ID"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="border px-3 py-2 rounded-md text-sm"
                        />

                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="border px-3 py-2 rounded-md text-sm"
                        >
                            <option value="all">All Status</option>
                            {getStatusOptions().map((status, index) => (
                                <option key={index} value={status}>{status}</option>
                            ))}
                        </select>

                        <select
                            value={dateFilter}
                            onChange={(e) => setDateFilter(e.target.value)}
                            className="border px-3 py-2 rounded-md text-sm"
                        >
                            <option value="all">All Dates</option>
                            <option value="today">Today</option>
                            <option value="yesterday">Yesterday</option>
                            <option value="custom">Custom Date</option>
                        </select>

                        {dateFilter === "custom" && (
                            <input
                                type="date"
                                value={customDate}
                                onChange={(e) => setCustomDate(e.target.value)}
                                className="border px-3 py-2 rounded-md text-sm"
                            />
                        )}
                    </div>

                    <button
                        onClick={clearFilters}
                        className="mt-3 px-4 py-2 bg-gray-200 rounded text-sm"
                    >
                        Clear Filters
                    </button>
                </div>

                {/* Table */}
                <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                    <div className="grid grid-cols-12 px-6 py-4 bg-gray-50 border-b text-xs font-semibold text-gray-600">
                        <div className="col-span-2">Report ID</div>
                        <div className="col-span-2">Patient</div>
                        <div className="col-span-2">Date</div>
                        <div className="col-span-3">Status</div>
                        <div className="col-span-3 text-center">Actions</div>
                    </div>

                    <div className="divide-y divide-gray-200">
                        {[...filteredReports].reverse().map((item) => {
                            const statusVariant = getStatusVariant(item.status);
                            return (
                                <div key={item.id} className="grid grid-cols-12 px-6 py-4 hover:bg-gray-50">

                                    <div className="col-span-2 font-mono text-sm">#{item.id}</div>

                                    <div className="col-span-2 text-gray-900 font-medium">
                                        {item.patientDetail?.name}
                                        <span className="text-sm text-gray-600">
                                            ({item.patientDetail?.age} {item.patientDetail?.gender?.charAt(0)})
                                        </span>
                                    </div>

                                    <div className="col-span-2 text-sm text-gray-700 flex items-center">
                                        {formatDate(item.updatedAt)}
                                        {isToday(item.updatedAt) && (
                                            <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-1 rounded">Today</span>
                                        )}
                                        {isYesterday(item.updatedAt) && (
                                            <span className="ml-2 text-xs bg-gray-100 text-gray-800 px-1 rounded">Yesterday</span>
                                        )}
                                    </div>

                                    <div className="col-span-3 flex items-center space-x-2">
                                        <span className={`w-2 h-2 rounded-full ${statusVariant.dot}`}></span>
                                        <span className={`text-xs px-2 py-1 rounded-full ${statusVariant.bg}`}>
                                            {item.status}
                                        </span>
                                    </div>

                                    <div className="col-span-3 flex justify-center space-x-2">
                                        {item.reportUrl ? (
                                            <>
                                                <button
                                                    onClick={() => setSelectedReport(item)}
                                                    className="px-3 py-1 border rounded text-xs"
                                                >
                                                    View
                                                </button>
                                                <a
                                                    href={item.reportUrl}
                                                    target="_blank"
                                                    className="px-3 py-1 text-xs bg-teal-600 text-white rounded"
                                                >
                                                    Download
                                                </a>
                                            </>
                                        ) : (
                                            <span className="text-xs text-gray-500 italic">Report in Progress</span>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {selectedReport && (
                    <div
                        onClick={() => setSelectedReport(null)}
                        className="fixed inset-0 backdrop-brightness-50 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded shadow-lg w-3/4 h-3/4 overflow-auto">
                            <h2 className="text-xl font-bold mb-4">Report Viewer</h2>
                            <iframe
                                src={selectedReport.reportUrl}
                                className="w-full h-full border"
                                title="Report Viewer"
                            ></iframe>
                            <button
                                onClick={() => setSelectedReport(null)}
                                className="mt-3 px-4 py-2 bg-red-500 text-white rounded"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}

export default LabReport;
