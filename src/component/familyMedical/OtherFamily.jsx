// src/component/familyMedical/OtherFamily.jsx

import React, { useEffect, useState } from "react";
import { useAuth } from "../../Authorization/AuthContext";
import axiosInstance from "../../Authorization/axiosInstance";
import { SlCalender } from "react-icons/sl";
import { MdDownload, MdEdit } from "react-icons/md";
import LoadingAnimation from "../../LoaderSpinner";

function OtherFamily() {
    const [prescriptionType, setPrescriptionType] = useState("Pharmacy");
    const { userData } = useAuth();
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(false);

    // 🔹 Edit Mode States
    const [editId, setEditId] = useState(null);
    const [editTag, setEditTag] = useState("");

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });

        if (userData?.id) {
            getAllFamilyMedicalHistory();
        }
    }, [userData?.id, prescriptionType]);

    const getAllFamilyMedicalHistory = async () => {
        try {
            setLoading(true);

            const payload = {
                uploadedBy: userData?.id,
            };

            const response = await axiosInstance.post(
                `/endUserEndPoint/getPrescription?prescriptionType=${prescriptionType}`,
                payload
            );

            const list = Array.isArray(response.data?.prescription)
                ? response.data.prescription
                : [];

            setRecords(list);
        } catch (error) {
            console.log("Error fetching prescriptions:", error);
        } finally {
            setLoading(false);
        }
    };

    const downloadFile = (url) => {
        window.open(url, "_blank");
    };

    // 🔹 Submit Edit
    const handleEditSubmit = (item) => {
        console.log("Updated Data:", {
            id: item.id,
            prescriptionTag: editTag,
        });

        // TODO: Update API call
        // axiosInstance.post("/endUserEndPoint/updatePrescriptionTag", {
        //     id: item.id,
        //     prescriptionTag: editTag
        // });

        setEditId(null);
    };

    return (
        <div className=" p-1 md:p-4">

            {/* Category Tabs */}
            <div className="flex gap-3 mb-6">
                {["Pharmacy", "Laboratory"].map((type) => (
                    <button
                        key={type}
                        onClick={() => setPrescriptionType(type)}
                        className={`px-4 py-2 rounded-full border text-sm font-medium transition-all
                        ${prescriptionType === type
                                ? "bg-green-500 text-white border-green-500 shadow"
                                : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"
                            }`}
                    >
                        {type}
                    </button>
                ))}
            </div>

            {/* Loader */}
            {loading && (
                <LoadingAnimation/>
            )}

            {/* No Records */}
            {!loading && records.length === 0 && (
                <p className="text-center text-gray-500 py-6">
                    No prescriptions found for {prescriptionType}.
                </p>
            )}

            {/* Record List */}
            <div className="">
                {records.map((item) => (
                    <div
                        key={item.id}
                        className="bg-white rounded-lg shadow-sm hover:shadow-md border border-gray-50 
                            p-1 md:p-4 flex flex-col md:flex-row justify-between gap-1 md:gap-4 transition-all mt-2"
                            >
                        {/* Left Section */}
                        <div className="flex gap-4 ">
                            {/* Image */}
                            <div className="h-16 w-16 md:h-24 md:w-24 rounded-lg overflow-hidden shadow-sm">
                                <img
                                    src={item.prescriptionUrl}
                                    alt="Prescription"
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Text */}
                            <div>
                                {editId === item.id ? (
                                    <input
                                        type="text"
                                        value={editTag}
                                        onChange={(e) => setEditTag(e.target.value)}
                                        className="w-full border rounded-md px-3 py-2 text-sm"
                                    />
                                ) : (
                                    <p className="font-medium text-gray-800 text-sm md:text-base">
                                        {item.prescriptionTag ||"Medicine Document"}
                                    </p>
                                )}

                                <p className="text-gray-700 text-xs md:text-sm flex md:mt-2 items-center gap-3">
                                    <span className="flex items-center gap-2 font-semibold">
                                        <SlCalender />
                                        {new Date(item.uploadedAt).toLocaleDateString()}
                                    </span>

                                    <span
                                        className={`px-3 py-1 rounded-full text-[10px] md:text-xs font-semibold 
                                    ${item.acceptedAt
                                                ? "bg-green-100 text-green-700"
                                                : "bg-yellow-100 text-yellow-700"
                                            }`}
                                    >
                                        {item.acceptedAt ? "Approved" : "Pending"}
                                    </span>
                                </p>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-2 items-center justify-end">
                            {editId === item.id ? (
                                <>
                                    {/* Submit */}
                                    <button
                                        onClick={() => handleEditSubmit(item)}
                                        className="px-3 py-2 bg-green-500 hover:bg-green-600 
                                    text-white rounded-md text-sm"
                                    >
                                        Submit
                                    </button>

                                    {/* Cancel */}
                                    <button
                                        onClick={() => setEditId(null)}
                                        className="px-3 py-2 bg-red-500 hover:bg-red-600 
                                    text-white rounded-md text-sm"
                                    >
                                        Cancel
                                    </button>
                                </>
                            ) : (
                                <div className=" gap-4 flex">
                                    {/* Edit */}
                                    <button
                                        onClick={() => {
                                            setEditId(item.id);
                                            setEditTag(item.prescriptionTag || "");
                                        }}
                                        className="flex items-center justify-center gap-1 
                                        bg-blue-500 hover:bg-blue-600 text-white rounded-md  
                                        p-2 md:px-3 md:py-2 text-sm"
                                     >
                                        <MdEdit className="text-xs md:text-lg" />
                                        <span className="hidden md:inline">Edit</span>
                                    </button>

                                    {/* Download */}
                                    <button
                                        onClick={() => downloadFile(item.prescriptionUrl)}
                                        className="flex items-center justify-center gap-1 
                                        bg-green-500 hover:bg-green-600 text-white rounded-md  
                                        p-2 md:px-3 md:py-2 text-sm"
                                     >
                                        <MdDownload className="text-xs md:text-lg" />
                                        <span className="hidden md:inline">Download</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default OtherFamily;
