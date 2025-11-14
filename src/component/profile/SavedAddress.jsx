// src/component/profile/SavedAddress.jsx
// src/Components/Profile/SavedAddress.jsx

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { MdHome, MdWork, MdLocationOn, MdPhone, MdDelete, MdEdit, MdClose } from "react-icons/md";
import { FaBriefcase, FaPlus, FaMapMarkerAlt } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import axiosInstance from "../../Authorization/axiosInstance";
import { useAuth } from "../../Authorization/AuthContext";
import AddnewAddress from "./AddnewAddress";
import Swal from "sweetalert2";

const SavedAddress = () => {
    const navigate = useNavigate();
    const { userData } = useAuth();
    const userId = userData?.id;
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [confirmVisible, setConfirmVisible] = useState(false);
    const [selectedAddressId, setSelectedAddressId] = useState(null);
    const [addAddressModal, setAddaddressModal] = useState(false)

    // Colors
    const getTypeColor = (type) => {
        switch (type) {
            case "Home":
                return "#3B82F6";
            case "Work":
                return "#10B981";
            case "Other":
                return "#8B5CF6";
            default:
                return "#6B7280";
        }
    };

    // Icons
    const getTypeIcon = (type) => {
        switch (type) {
            case "Home":
                return <MdHome size={22} color={getTypeColor(type)} />;
            case "Work":
                return <FaBriefcase size={22} color={getTypeColor(type)} />;
            case "Other":
                return <FaMapMarkerAlt size={22} color={getTypeColor(type)} />;
            default:
                return <FaMapMarkerAlt size={22} color={getTypeColor(type)} />;
        }
    };

    // Fetch addresses
    const fetchAddresses = async () => {
        if (!userId) return;

        try {
            setLoading(true);
            const res = await axiosInstance.get(
                `/endUserAddress/getAddressByUserId/${userId}`
            );
            const list = Array.isArray(res?.data?.dto)
                ? [...res.data.dto].reverse()
                : [];
            setAddresses(list);
        } catch (error) {
            setAddresses([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAddresses();
    }, [userId]);



    // Delete confirm
    const confirmDeleteAddress = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This address will be permanently deleted.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axiosInstance.delete(
                        `/endUserAddress/deleteAddressById/${id}`
                    );
                    Swal.fire({
                        title: "Deleted!",
                        text: "Address has been deleted successfully.",
                        icon: "success",
                        timer: 1500,
                        showConfirmButton: false
                    });
                    fetchAddresses();
                } catch (error) {
                    console.log(error);
                    Swal.fire({
                        title: "Failed!",
                        text: "Something went wrong. Please try again.",
                        icon: "error",
                    });
                }
            }
        });
    };

    // Delete address
    const deleteAddress = async () => {
        try {
            setLoading(true);
            await axiosInstance.delete(
                `/endUserAddress/deleteAddressById/${selectedAddressId}`
            );
            setAddresses((prev) =>
                prev.filter((a) => a.id !== selectedAddressId)
            );
            setConfirmVisible(false);
        } catch (e) {
            console.log("Delete Error", e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="">
            {/* Header */}
            <div className=" py-4  flex justify-between items-center">
                <div>
                    <h1 className=" text-sm md:text-xl font-bold text-gray-800">Saved Addresses</h1>
                    <p className="text-gray-500 text-sm hidden md:block">Manage your delivery addresses</p>
                </div>
                <div className="flex flex-row justify-end items-center gap-4 rounded-full">
                    <div className="">
                        <button
                            onClick={() => setAddaddressModal(true)}
                            className="w-full bg-green-200 cursor-pointer py-1 text-[10px] md:text-sm md:py-1.5 whitespace-nowrap  px-1 md:px-3 rounded-full hover:bg-green-300 text-green-800 flex items-center justify-center gap-2 "
                        >
                            Add New Address
                        </button>
                    </div>

                    <div className="bg-green-200 md:px-4 px-1 md:py-2 py-1 text-[10px] md:text-sm rounded-full font-semibold text-green-800 whitespace-nowrap">
                        {addresses.length} {addresses.length === 1 ? "Address" : "Addresses"}
                    </div>
                </div>
            </div>

            {/* Address List */}
            <div className="p-2">
                {addresses.length > 0 ? (
                    <div
                        className="
                            grid 
                            grid-cols-1 
                            sm:grid-cols-2 
                            md:grid-cols-4 
                            gap-4
                        "
                    >
                        {addresses.map((address) => (
                            <div
                                key={address.id}
                                className="
                                bg-white 
                                rounded-lg 
                                shadow-md 
                                border 
                                border-gray-200 
                                p-2
                                flex 
                                flex-col 
                                justify-between
                                h-[260px]     /* FIXED CARD HEIGHT */
                                w-full        /* AUTO WIDTH */
                            "
                            >
                                {/* Card Header */}
                                <div className="flex justify-between items-center p-2">
                                    <div className="flex items-center gap-3">
                                        <div
                                            className="h-6 w-6 md:w-10 md:h-10 p-2 rounded-md flex items-center justify-center"
                                            style={{
                                                background: `${getTypeColor(address.addressType)}20`,
                                            }}
                                        >
                                            {getTypeIcon(address.addressType)}
                                        </div>
                                        <h2 className="text-xs md:text-sm font-semibold">
                                            {address.addressType}
                                        </h2>
                                    </div>
                                </div>

                                {/* Address Details */}
                                <div className="p-2 space-y-2 flex flex-col">
                                    <div className="flex gap-3">
                                        <IoLocationSharp size={20} className="text-red-500 mt-1" />
                                        <div>
                                            <p className="font-medium text-gray-800 capitalize text-sm">
                                                {address.houseNumber}, {address.street}
                                            </p>
                                            <p className="text-gray-600 text-xs">
                                                {address.city}, {address.state} - {address.postalCode}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex gap-3 items-center">
                                        <MdPhone size={18} className="text-gray-500" />
                                        <p className="text-gray-600 text-sm">{address.phoneNumber}</p>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex justify-between pt-2 border-t mt-auto">
                                    <button
                                        onClick={() =>
                                            navigate("/add-new-address", { state: { address } })
                                        }
                                        className="flex items-center gap-2 text-blue-600 text-sm"
                                    >
                                        <MdEdit size={16} />
                                        Edit
                                    </button>

                                    <button
                                        onClick={() => confirmDeleteAddress(address.id)}
                                        className="flex items-center gap-2 text-red-600 text-sm"
                                    >
                                        <MdDelete size={16} />
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    // Empty State
                    <div className="flex flex-col items-center mt-20">
                        <div className="bg-white p-8 rounded-xl shadow-lg text-center border">
                            <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                                <FaMapMarkerAlt size={45} className="text-purple-600" />
                            </div>

                            <h3 className="text-xl font-bold text-gray-800 mt-4">
                                No Address Found!
                            </h3>
                            <p className="text-gray-500 mt-2 text-sm">
                                You haven't saved any addresses yet.
                                <br />
                                Add your first address to get started.
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {addAddressModal && <div className="fixed inset-0 backdrop-brightness-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg shadow-lg max-w-5xl w-full p-5 relative">

                    {/* Close Button */}
                    <button
                        onClick={() => setAddaddressModal(false)}
                        className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                    >
                        <MdClose size={24} />
                    </button>

                    {/* Message */}
                    <AddnewAddress onClose={() => { fetchAddresses(), setAddaddressModal(false) }} />

                    {/* Buttons */}

                </div>
            </div>}


        </div>
    );
};

export default SavedAddress;
