// src/component/AddNewAddress.jsx
import React, { useState } from "react";
import { MdHome, MdLocationPin } from "react-icons/md";
import { FaBuilding } from "react-icons/fa";
import axiosInstance from "../Authorization/axiosInstance";
import { useAuth } from "../Authorization/AuthContext";

export default function AddNewAddressModal({ address = null, onClose, onSuccess }) {
    const { userData } = useAuth();
    const userId = userData?.id;

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const [formData, setFormData] = useState({
        mobileNumber: address?.phoneNumber || "",
        pincode: address?.postalCode || "",
        houseNo: address?.houseNumber || "",
        area: address?.street || "",
        city: address?.city || "",
        state: address?.state || "",
        addressType: address?.addressType?.toLowerCase() || "home",
    });

    const handleInputChange = (field, value) => {
        setFormData((p) => ({ ...p, [field]: value }));
        setErrors((p) => ({ ...p, [field]: "" }));
    };

    const validate = () => {
        const err = {};

        if (!formData.houseNo) err.houseNo = "House/Building No. is required";
        if (!formData.area) err.area = "Area/Street is required";
        if (!formData.city) err.city = "City is required";
        if (!formData.state) err.state = "State is required";

        if (!formData.pincode) err.pincode = "Pincode is required";
        else if (formData.pincode.length !== 6)
            err.pincode = "Pincode must be 6 digits";

        if (!formData.mobileNumber) err.mobileNumber = "Mobile number is required";
        else if (formData.mobileNumber.length !== 10)
            err.mobileNumber = "Mobile number must be 10 digits";

        setErrors(err);
        return Object.keys(err).length === 0;
    };

    const handleSave = async () => {
        if (!validate()) return;

        const payload = {
            user: { id: userId },
            phoneNumber: formData.mobileNumber,
            postalCode: formData.pincode,
            houseNumber: formData.houseNo,
            street: formData.area,
            city: formData.city,
            state: formData.state,
        };

        try {
            setLoading(true);
            let response;

            if (!address) {
                const endpoint =
                    formData.addressType === "home"
                        ? "/endUserAddress/addHomeAddress"
                        : formData.addressType === "work"
                            ? "/endUserAddress/addOfficeAddress"
                            : "/endUserAddress/addOtherAddress";

                response = await axiosInstance.post(endpoint, payload);
            } else {
                response = await axiosInstance.put("/endUserAddress/updateAddressById", {
                    ...payload,
                    id: address.id,
                });
            }

            console.log("Address API response:", response);
            await onSuccess()
            onClose()
        } catch (err) {
            console.error("API error:", err);
            alert("Error occurred");
        } finally {
            setLoading(false);
        }

    };

    return (
        <div className="">
            {/* Modal Container */}
            <div className=" w-full overflow-hidden flex flex-col">

                {/* Header */}


                {/* Body */}
                <div className="flex-1 overflow-y-auto p-4 md:p-6">
                    <div className="space-y-4 md:space-y-6">

                        {/* House No & Area Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    House/Building No. *
                                </label>
                                <input
                                    type="text"
                                    value={formData.houseNo}
                                    onChange={(e) => handleInputChange("houseNo", e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter house/building number"
                                />
                                {errors.houseNo && <p className="text-red-500 text-sm mt-1">{errors.houseNo}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Area / Street *
                                </label>
                                <input
                                    type="text"
                                    value={formData.area}
                                    onChange={(e) => handleInputChange("area", e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter area/street"
                                />
                                {errors.area && <p className="text-red-500 text-sm mt-1">{errors.area}</p>}
                            </div>
                        </div>

                        {/* City & State Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    City *
                                </label>
                                <input
                                    type="text"
                                    value={formData.city}
                                    onChange={(e) => handleInputChange("city", e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter city"
                                />
                                {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    State *
                                </label>
                                <input
                                    type="text"
                                    value={formData.state}
                                    onChange={(e) => handleInputChange("state", e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter state"
                                />
                                {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
                            </div>
                        </div>

                        {/* Pincode & Mobile Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Pincode *
                                </label>
                                <input
                                    type="text"
                                    value={formData.pincode}
                                    maxLength={6}
                                    inputMode="numeric"
                                    onChange={(e) => handleInputChange("pincode", e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter 6-digit pincode"
                                />
                                {errors.pincode && <p className="text-red-500 text-sm mt-1">{errors.pincode}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Mobile Number *
                                </label>
                                <input
                                    type="text"
                                    value={formData.mobileNumber}
                                    maxLength={10}
                                    inputMode="numeric"
                                    onChange={(e) => handleInputChange("mobileNumber", e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter 10-digit mobile number"
                                />
                                {errors.mobileNumber && (
                                    <p className="text-red-500 text-sm mt-1">{errors.mobileNumber}</p>
                                )}
                            </div>
                        </div>

                        {/* Address Type */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                Address Type
                            </label>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <button
                                    type="button"
                                    onClick={() => handleInputChange("addressType", "home")}
                                    className={`flex items-center justify-center gap-2 p-3 rounded-lg border transition-colors
                                        ${formData.addressType === "home"
                                            ? "border-green-600 bg-green-50 text-green-700"
                                            : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                                        }`}
                                >
                                    <MdHome className="text-lg" />
                                    <span>Home</span>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => handleInputChange("addressType", "work")}
                                    className={`flex items-center justify-center gap-2 p-3 rounded-lg border transition-colors
                                        ${formData.addressType === "work"
                                            ? "border-blue-600 bg-blue-50 text-blue-700"
                                            : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                                        }`}
                                >
                                    <FaBuilding className="text-lg" />
                                    <span>Work</span>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => handleInputChange("addressType", "other")}
                                    className={`flex items-center justify-center gap-2 p-3 rounded-lg border transition-colors
                                        ${formData.addressType === "other"
                                            ? "border-purple-600 bg-purple-50 text-purple-700"
                                            : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                                        }`}
                                >
                                    <MdLocationPin className="text-lg" />
                                    <span>Other</span>
                                </button>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 border-t ">
                    <div className="flex flex-col sm:flex-row gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={loading}
                            className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors font-medium flex-1"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={loading}
                            className={`px-6 py-3 rounded-lg text-white font-semibold transition-colors flex-1
                                ${loading
                                    ? "bg-green-400 cursor-not-allowed"
                                    : "bg-green-600 hover:bg-green-700"
                                }`}
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Saving...
                                </span>
                            ) : address ? "Update Address" : "Save Address"}
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}