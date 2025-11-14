// src/component/profile/AddnewAddress.jsx
// src/Components/AddNewAddress.jsx
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { MdHome, MdLocationPin } from "react-icons/md";
import { FaBuilding } from "react-icons/fa";
import axiosInstance from "../../Authorization/axiosInstance";
import { useAuth } from "../../Authorization/AuthContext";

const AddNewAddress = ({ onClose }) => {
  const { userData } = useAuth();
  const userId = userData?.id;
  const navigate = useNavigate();
  const location = useLocation();
  const { address } = location.state || {};

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
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.houseNo.trim()) newErrors.houseNo = "House/Building No. is required";
    if (!formData.area.trim()) newErrors.area = "Area/Street is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    if (!formData.pincode.trim()) newErrors.pincode = "Pincode is required";
    else if (formData.pincode.length !== 6) newErrors.pincode = "Pincode must be 6 digits";
    if (!formData.mobileNumber.trim()) newErrors.mobileNumber = "Mobile number is required";
    else if (formData.mobileNumber.length !== 10) newErrors.mobileNumber = "Mobile number must be 10 digits";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const addNewAddress = async () => {
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
      const endpoint =
        formData.addressType === "home"
          ? "/endUserAddress/addHomeAddress"
          : formData.addressType === "work"
          ? "/endUserAddress/addOfficeAddress"
          : "/endUserAddress/addOtherAddress";

      const response = await axiosInstance.post(endpoint, payload);
      console.log("add",response)
      onClose();
      setLoading(false);
      setFormData({
        mobileNumber: "",
        pincode: "",
        houseNo: "",
        area: "",
        city: "",
        state: "",
        addressType: "home",
      });
      
    } catch (error) {
      setLoading(false);
      
    }
  };

  const updateAddress = async () => {
    if (!validate()) return;

    const payload = {
      user: { id: userId },
      phoneNumber: formData.mobileNumber,
      postalCode: formData.pincode,
      houseNumber: formData.houseNo,
      street: formData.area,
      city: formData.city,
      state: formData.state,
      id: address?.id,
    };

    try {
      setLoading(true);
      await axiosInstance.put("/endUserAddress/updateAddressById", payload);
      setLoading(false);
      navigate(-1);
    } catch (error) {
      setLoading(false);
      alert(error.response?.data?.message || "Failed to update address");
    }
  };

  return (
    <div className="mx-auto p-4 ">
      <h2 className="text-2xl font-bold mb-6">{address ? "Edit Address" : "Add New Address"}</h2>

      <div className="space-y-4">
        {/** House No */}
        <div>
          <label className="block font-semibold text-gray-700">House/Building No. <span className="text-red-500">*</span></label>
          <input
            type="text"
            className="w-full border rounded-lg p-2 mt-1"
            value={formData.houseNo}
            onChange={(e) => handleInputChange("houseNo", e.target.value)}
            maxLength={30}
          />
          {errors.houseNo && <p className="text-red-500 text-sm">{errors.houseNo}</p>}
        </div>

        {/** Area/Street */}
        <div>
          <label className="block font-semibold text-gray-700">Area/Street <span className="text-red-500">*</span></label>
          <input
            type="text"
            className="w-full border rounded-lg p-2 mt-1"
            value={formData.area}
            onChange={(e) => handleInputChange("area", e.target.value)}
            maxLength={30}
          />
          {errors.area && <p className="text-red-500 text-sm">{errors.area}</p>}
        </div>

        {/** City */}
        <div>
          <label className="block font-semibold text-gray-700">City <span className="text-red-500">*</span></label>
          <input
            type="text"
            className="w-full border rounded-lg p-2 mt-1"
            value={formData.city}
            onChange={(e) => handleInputChange("city", e.target.value)}
          />
          {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
        </div>

        {/** State */}
        <div>
          <label className="block font-semibold text-gray-700">State <span className="text-red-500">*</span></label>
          <input
            type="text"
            className="w-full border rounded-lg p-2 mt-1"
            value={formData.state}
            onChange={(e) => handleInputChange("state", e.target.value)}
          />
          {errors.state && <p className="text-red-500 text-sm">{errors.state}</p>}
        </div>

        {/** Pincode */}
        <div>
          <label className="block font-semibold text-gray-700">Pincode <span className="text-red-500">*</span></label>
          <input
            type="text"
            className="w-full border rounded-lg p-2 mt-1"
            value={formData.pincode}
            onChange={(e) => handleInputChange("pincode", e.target.value)}
            maxLength={6}
          />
          {errors.pincode && <p className="text-red-500 text-sm">{errors.pincode}</p>}
        </div>

        {/** Mobile Number */}
        <div>
          <label className="block font-semibold text-gray-700">Mobile Number <span className="text-red-500">*</span></label>
          <input
            type="text"
            className="w-full border rounded-lg p-2 mt-1"
            value={formData.mobileNumber}
            onChange={(e) => handleInputChange("mobileNumber", e.target.value)}
            maxLength={10}
          />
          {errors.mobileNumber && <p className="text-red-500 text-sm">{errors.mobileNumber}</p>}
        </div>

        {/** Address Type */}
        <div>
          <label className="block font-semibold text-gray-700 mb-2">Address Type</label>
          <div className="flex gap-2">
            <button
              className={`flex-1 flex items-center justify-center p-2 border rounded-lg ${formData.addressType === "home" ? "border-green-500 bg-green-50" : "border-gray-200"}`}
              onClick={() => handleInputChange("addressType", "home")}
            >
              <MdHome className="mr-1" /> Home
            </button>
            <button
              className={`flex-1 flex items-center justify-center p-2 border rounded-lg ${formData.addressType === "work" ? "border-blue-500 bg-blue-50" : "border-gray-200"}`}
              onClick={() => handleInputChange("addressType", "work")}
            >
              <FaBuilding className="mr-1" /> Work
            </button>
            <button
              className={`flex-1 flex items-center justify-center p-2 border rounded-lg ${formData.addressType === "other" ? "border-purple-500 bg-purple-50" : "border-gray-200"}`}
              onClick={() => handleInputChange("addressType", "other")}
            >
              <MdLocationPin className="mr-1" /> Other
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <button
          className={`w-full py-3 rounded-lg text-white font-semibold ${loading ? "bg-green-400" : "bg-green-600 hover:bg-green-700"}`}
          onClick={!address ? addNewAddress : updateAddress}
          disabled={loading}
        >
          {loading ? "Saving..." : !address ? "Save Address" : "Update Address"}
        </button>
      </div>
    </div>
  );
};

export default AddNewAddress;
