// src/component/familyMedical/AddNewFamily.jsx
import React, { useState, useEffect } from "react";
import { FaUserPlus } from "react-icons/fa";
import { MdInfoOutline, MdSecurity } from "react-icons/md";
import axiosInstance from "../../Authorization/axiosInstance";
import { useAuth } from "../../Authorization/AuthContext";


const AddNewFamily = ({ onClose, onSuccess, existingMember }) => {
    const { userData } = useAuth();
    const [customRelationship, setCustomRelationship] = useState("");
    const [familyMember, setFamilyMember] = useState({
        name: "",
        age: "",
        relationship: "Father",
        gender: "Male",
    });

    // Load existing data in edit mode
    useEffect(() => {
        if (existingMember) {
            setFamilyMember({
                name: existingMember.name || "",
                age: existingMember.age || "",
                relationship: existingMember.relationship || "Father",
                gender: existingMember.gender || "Male",
                notes: existingMember.notes || ""
            });

            if (!["Father", "Mother", "Son", "Daughter"].includes(existingMember.relationship)) {
                setCustomRelationship(existingMember.relationship);
                setFamilyMember((p) => ({ ...p, relationship: "" }));
            }
        }
    }, [existingMember]);

    const handleInputChange = (field, value) => {
        setFamilyMember((prev) => ({ ...prev, [field]: value }));
    };

    const handleRelationshipSelect = (option) => {
        if (option === "Other") {
            setCustomRelationship("");
            setFamilyMember((prev) => ({ ...prev, relationship: "" }));
        } else {
            setFamilyMember((prev) => ({ ...prev, relationship: option }));
        }
    };


    const handleSave = async () => {
        const payload = {
            endUser: { id: userData?.id },
            name: familyMember.name,
            age: Number(familyMember.age),
            relationship: familyMember.relationship || customRelationship,
            gender: familyMember.gender,
            notes: familyMember.notes,
        };

        try {
            const response = await axiosInstance.post(
                "endUserEndPoint/addNewFamilyMember",
                payload
            );
            onSuccess()
            onClose()
        } catch (err) {
            console.log(err)
        }
    };

    const updateFamilyMember = async () => {      
        const payload = {
            endUser: { id: userData?.id },
            id: existingMember.id,
            name: familyMember.name,
            age: Number(familyMember.age),
            relationship: familyMember.relationship || customRelationship,
            gender: familyMember.gender,
            notes: familyMember.notes,
        };

        try {
            await axiosInstance.put(
                "/endUserEndPoint/updateFamilyMember",
                payload
            );
            onSuccess()
            onClose()
        } catch (err) {
            console.log(err);

        }
    };



    return (
        <div className="w-full flex justify-center py-2 px-4">
            <div className="w-full ">
                <div className="flex items-center gap-2 mb-5">
                    <FaUserPlus className="text-teal-600" size={20} />
                    <h2 className="text-lg font-semibold text-gray-800">
                        Family Member Information
                    </h2>
                </div>

                {/* Name */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1">
                        Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        value={familyMember.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className="w-full border rounded-lg px-3 py-2"
                        placeholder="Enter full name"
                    />
                </div>

                {/* Age */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1">
                        Age <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="number"
                        value={familyMember.age}
                        onChange={(e) => handleInputChange("age", e.target.value)}
                        className="w-full border rounded-lg px-3 py-2"
                        placeholder="Enter age"
                    />
                </div>

                {/* Relationship */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1">
                        Relationship <span className="text-red-500">*</span>
                    </label>

                    <div className="flex flex-wrap gap-4">
                        {["Father", "Mother", "Son", "Daughter", "Other"].map((opt) => (
                            <label key={opt} className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    checked={
                                        familyMember.relationship === opt ||
                                        (opt === "Other" && familyMember.relationship === "" && customRelationship)
                                    }
                                    onChange={() => handleRelationshipSelect(opt)}
                                />
                                {opt}
                            </label>
                        ))}
                    </div>

                    {familyMember.relationship === "" && (
                        <input
                            type="text"
                            placeholder="Enter relationship"
                            value={customRelationship}
                            onChange={(e) => setCustomRelationship(e.target.value)}
                            className="border rounded-lg px-3 py-2 mt-3 w-full"
                        />
                    )}
                </div>

                {/* Gender */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1">
                        Gender <span className="text-red-500">*</span>
                    </label>
                    <div className="flex gap-6">
                        {["Male", "Female", "Other"].map((opt) => (
                            <label key={opt} className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    checked={familyMember.gender === opt}
                                    onChange={() => handleInputChange("gender", opt)}
                                />
                                {opt}
                            </label>
                        ))}
                    </div>
                </div>


                {/* Required Info */}
                <div className="flex items-center text-gray-500 text-sm mb-4">
                    <MdInfoOutline size={16} className="mr-1" />
                    Fields marked with <span className="text-red-500 mx-1">*</span> are required.
                </div>

                {/* Save / Update */}
                <div className="flex gap-3">
                    {existingMember ? (
                        <button
                            onClick={updateFamilyMember}
                            className="w-1/2 bg-teal-600 text-white py-2 rounded-md"
                        >
                            Update
                        </button>
                    ) : (
                        <button
                            onClick={handleSave}
                            className="w-1/2 bg-teal-600 text-white py-2 rounded-md"
                        >
                            Save
                        </button>

                    )}

                    <button
                        onClick={() => onClose()}
                        className="w-1/2 bg-gray-300 text-gray-700 py-2 rounded-md"
                    >
                        Cancel
                    </button>

                </div>


            </div>
        </div>
    );
};

export default AddNewFamily;
