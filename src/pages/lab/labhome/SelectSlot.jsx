// src/pages/lab/labhome/SelectSlot.jsx

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useLabAuth } from "../../../Authorization/LabAuthContext";
import axiosInstance from "../../../Authorization/axiosInstance";

function SelectSlot({ labCartItems }) {
    const { userData, getAllLabCartItems } = useLabAuth();
    const userId = userData?.id;
    const navigate = useNavigate();
    const [appointmentDate, setAppointmentDate] = useState(
        new Date().toISOString().split("T")[0]
    );

    const [slots, setSlots] = useState([]);
    const [familyMembers, setFamilyMembers] = useState([]);
    const [addresses, setAddresses] = useState([]);

    const [activePackage, setActivePackage] = useState(null);
    const [activeStep, setActiveStep] = useState(null);

    const [selections, setSelections] = useState({});
    const [applyToAllEnabled, setApplyToAllEnabled] = useState(false);
    const [loading, setLoading] = useState(false);

    // --- API Calls ---
    const fetchSlots = async (labId) => {
        try {
            const res = await axiosInstance.get(
                `/endUserEndPoint/findLabSlot/${labId}?date=${appointmentDate}`
            );
            setSlots(res.data || []);
        } catch (err) {
            console.error("fetchSlots:", err);
            setSlots([]);
        }
    };

    const fetchFamilyMembers = async () => {
        try {
            const res = await axiosInstance.get(
                `/endUserEndPoint/getFamilyMembersByEndUserId?endUserId=${userData?.id}`
            );
            setFamilyMembers(res.data?.dtoList || []);
        } catch (err) {
            console.error("fetchFamilyMembers:", err);
            setFamilyMembers([]);
        }
    };

    const fetchAddress = async () => {
        try {
            const res = await axiosInstance.get(
                `/endUserAddress/getAddressByUserId/${userData?.id}`
            );
            setAddresses(res.data?.dto || res.data || []);
        } catch (err) {
            console.error("fetchAddress:", err);
            setAddresses([]);
        }
    };

    useEffect(() => {
        fetchFamilyMembers();
        fetchAddress();
    }, []);

    useEffect(() => {
        if (activePackage) {
            const pkg = labCartItems.find((p) => p.labPackage.id === activePackage);
            if (pkg) {
                fetchSlots(pkg.labPackage.lab.id);
                setActiveStep("slots");
            }
        } else {
            setSlots([]);
            setActiveStep(null);
        }
    }, [activePackage]);

    useEffect(() => {
        if (activePackage) {
            const pkg = labCartItems.find((p) => p.labPackage.id === activePackage);
            if (pkg) fetchSlots(pkg.labPackage.lab.id);
        }
    }, [appointmentDate]);

    // --- Selection Handlers ---
    const updateSelectionForActivePackage = (obj) => {
        if (!activePackage) return;
        setSelections((prev) => ({
            ...prev,
            [activePackage]: {
                ...(prev[activePackage] || {}),
                ...obj,
                appointmentDate,
                selectedPackageId: String(activePackage),
            },
        }));
    };

    const toggleApplyToAll = () => {
        if (!applyToAllEnabled) {
            const firstPkgId = Object.keys(selections)[0];
            if (!firstPkgId) return;

            const firstSelection = selections[firstPkgId];
            const newSelections = {};

            labCartItems.forEach((pkg) => {
                const pkgId = pkg.labPackage.id;
                newSelections[pkgId] = { ...firstSelection, selectedPackageId: String(pkgId) };
            });

            setSelections(newSelections);
            setApplyToAllEnabled(true);
        } else {
            const firstPkgId = Object.keys(selections)[0];
            const firstSelection = selections[firstPkgId];
            setSelections({ [firstPkgId]: firstSelection });
            setApplyToAllEnabled(false);
        }
    };

    const onClickPackage = (pkg) => setActivePackage(pkg.labPackage.id);

    const onSelectSlot = (slot) => {
        updateSelectionForActivePackage({
            selectedSlotId: String(slot.id),
            slotStartAt: slot.startAt,
            slotEndAt: slot.endAt
        });
        setActiveStep("family");
    };

    const onSelectFamily = (fm) => {
        updateSelectionForActivePackage({
            patientId: String(fm.id),
            patientName: fm.name
        });
        setActiveStep("address");
    };

    const onSelectAddress = (ad) => {
        updateSelectionForActivePackage({
            selectedAddressId: String(ad.id),
            addressName: ad.city + " - " + (ad.houseNumber || ad.fullAddress)
        });
        setActivePackage(null);
        setActiveStep(null);
    };

    const handleCheckout = async () => {
        setLoading(true);
        // Only include selections that have all required IDs
        const order = Object.values(selections)
            .filter(
                s =>
                    s &&
                    s.appointmentDate &&
                    s.selectedSlotId &&
                    s.selectedAddressId &&
                    s.selectedPackageId &&
                    s.patientId
            )
            .map(s => ({
                appointmentDate: s.appointmentDate,
                selectedSlotId: s.selectedSlotId,
                selectedAddressId: s.selectedAddressId,
                selectedPackageId: s.selectedPackageId,
                patientId: s.patientId
            }));

        const payload = { order };
        console.log("FINAL PAYLOAD:", payload);

        try {
            const response = await axiosInstance.post(
                `/endUserEndPoint/createMultipleAppointmentForTestPackage?endUserId=${userId}`,
                payload
            );
            console.log("Order response:", response.data);
            await getAllLabCartItems()
            navigate('/lab/appointment/confirm', { state: { orderResponse: response.data } });

            // navigate('/lab/appointment/confirm');
        } catch (error) {
            console.error("Order error:", error.response?.data || error.message);
            // You might want to add error notification here
        } finally {
            setLoading(false);
        }
    };

    const isPackageCompleted = (pkgId) => {
        const s = selections[pkgId];
        return (
            s &&
            s.appointmentDate &&
            s.selectedSlotId &&
            s.selectedAddressId &&
            s.selectedPackageId &&
            s.patientId
        );
    };

    const renderSelectedSummary = (pkgId) => {
        const s = selections[pkgId];
        if (!s) return null;
        const slotName = s.slotStartAt && s.slotEndAt ? `${s.slotStartAt} - ${s.slotEndAt}` : "N/A";
        const patientName = s.patientName || "N/A";
        const addressName = s.addressName || "N/A";

        return (
            <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 bg-teal-600 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">All details selected</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="flex flex-col">
                        <span className="text-xs font-medium text-gray-500 mb-1">Date</span>
                        <span className="text-sm font-semibold text-gray-900">{s.appointmentDate}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs font-medium text-gray-500 mb-1">Time Slot</span>
                        <span className="text-sm font-semibold text-gray-900">{slotName}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs font-medium text-gray-500 mb-1">Patient</span>
                        <span className="text-sm font-semibold text-gray-900">{patientName}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs font-medium text-gray-500 mb-1">Address</span>
                        <span className="text-sm font-semibold text-gray-900 truncate" title={addressName}>{addressName}</span>
                    </div>
                </div>
            </div>
        );
    };

    const renderStepIndicator = () => {
        const steps = [
            { key: "slots", label: "Select Slot", icon: "🕒" },
            { key: "family", label: "Select Patient", icon: "👨‍👩‍👧‍👦" },
            { key: "address", label: "Select Address", icon: "📍" }
        ];

        const currentIndex = steps.findIndex(step => step.key === activeStep);

        return (
            <div className="mb-8">
                <div className="flex items-center justify-between max-w-2xl mx-auto">
                    {steps.map((step, index) => (
                        <React.Fragment key={step.key}>
                            <div className="flex flex-col items-center">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-base font-medium transition-all duration-300 ${index < currentIndex
                                    ? "bg-teal-600 text-white"
                                    : index === currentIndex
                                        ? "bg-teal-600 text-white ring-2 ring-teal-200"
                                        : "bg-gray-100 text-gray-400 border border-gray-300"
                                    }`}>
                                    {index < currentIndex ? "✓" : step.icon}
                                </div>
                                <span className={`text-xs font-medium mt-2 ${index <= currentIndex ? "text-gray-900" : "text-gray-400"
                                    }`}>
                                    {step.label}
                                </span>
                            </div>
                            {index < steps.length - 1 && (
                                <div className={`flex-1 h-1 mx-4 rounded-full transition-all duration-300 ${index < currentIndex ? "bg-teal-500" : "bg-gray-200"
                                    }`} />
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        );
    };

    const completedPackagesCount = Object.keys(selections).filter(pkgId =>
        isPackageCompleted(pkgId)
    ).length;

    const allPackagesCompleted = completedPackagesCount === labCartItems.length;

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8 flex flex-col items-start">
                    <h1 className="text-md md:text-3xl font-bold text-gray-900 mb-1">
                        Schedule Lab Tests
                    </h1>
                    <p className="text-gray-600 text-[12px] md:text-sm">
                        Select time slots and details for your lab packages
                    </p>
                </div>


                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left Sidebar - Progress Summary */}
                    <div className="lg:w-1/4">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Booking Progress</h3>

                            <div className="space-y-4 mb-6">
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm font-medium text-gray-700">Packages Completed</span>
                                        <span className="text-sm font-semibold text-gray-900">
                                            {completedPackagesCount}/{labCartItems.length}
                                        </span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className="bg-teal-600 h-2 rounded-full transition-all duration-500"
                                            style={{ width: `${(completedPackagesCount / labCartItems.length) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>

                                <div className="text-center">
                                    <div className="text-2xl font-bold text-gray-900 mb-1">
                                        {Math.round((completedPackagesCount / labCartItems.length) * 100)}%
                                    </div>
                                    <div className="text-xs text-gray-500">Complete</div>
                                </div>
                            </div>

                            {/* Apply to All Toggle */}
                            {Object.keys(selections).length > 0 && (
                                <div className="border-t border-gray-200 pt-4">
                                    <label className="flex items-center justify-between cursor-pointer">
                                        <span className="text-sm font-medium text-gray-700">
                                            Apply to all packages
                                        </span>
                                        <div
                                            onClick={toggleApplyToAll}
                                            className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${applyToAllEnabled ? 'bg-teal-600' : 'bg-gray-300'
                                                }`}
                                        >
                                            <span
                                                className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${applyToAllEnabled ? 'translate-x-6' : 'translate-x-1'
                                                    }`}
                                            />
                                        </div>
                                    </label>
                                    <p className="text-xs text-gray-500 mt-2">
                                        Apply first package's selections to all packages
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:w-3/4">
                        {/* Packages List */}
                        <div className="space-y-4 mb-8">
                            {labCartItems?.map((pkg, index) => {
                                const pkgId = pkg.labPackage.id;
                                const completed = isPackageCompleted(pkgId);
                                const isActive = activePackage === pkgId;

                                return (
                                    <div
                                        key={pkgId}
                                        className={`bg-white rounded-lg shadow-sm border transition-all duration-200 ${isActive
                                            ? 'ring-2 ring-teal-500 border-teal-300'
                                            : completed
                                                ? 'border-teal-200'
                                                : 'border-gray-200'
                                            }`}
                                    >
                                        {/* Package Header */}
                                        <div className="p-6">
                                            <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">
                                                <div className="flex-1">
                                                    <div className="flex items-start gap-4 mb-3">
                                                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white font-semibold ${completed
                                                            ? 'bg-teal-600'
                                                            : 'bg-gray-600'
                                                            }`}>
                                                            {index + 1}
                                                        </div>
                                                        <div className="flex-1">
                                                            <div className="flex flex-wrap items-center gap-2 mb-2">
                                                                <h3 className="text-xl font-semibold text-gray-900">
                                                                    {pkg.labPackage.packageName}
                                                                </h3>
                                                                {completed && (
                                                                    <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-teal-100 text-teal-800 border border-teal-200">
                                                                        Scheduled
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <div className="flex flex-wrap gap-4 text-sm">
                                                                <div className="flex items-center gap-2">
                                                                    <span className="font-medium text-gray-700">Price:</span>
                                                                    <span className="text-teal-700 font-semibold">₹{pkg.unitPrice}</span>
                                                                </div>
                                                                <div className="flex items-center gap-2">
                                                                    <span className="font-medium text-gray-700">Lab:</span>
                                                                    <span className="text-gray-900">{pkg.labPackage.lab?.labName || pkg.labPackage.lab?.firstName || "N/A"}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => onClickPackage(pkg)}
                                                        className={`px-6 py-2 rounded-lg font-medium text-sm transition-colors border cursor-pointer ${isActive
                                                            ? "bg-teal-50 text-teal-700 border-teal-300"
                                                            : completed
                                                                ? "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
                                                                : "bg-teal-600 text-white border-teal-600 hover:bg-teal-700"
                                                            }`}
                                                    >
                                                        {isActive ? "Editing..." : completed ? "Edit" : "Select Patient & Slot"}
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Selected Summary */}
                                            {completed && renderSelectedSummary(pkgId)}
                                        </div>

                                        {/* Selection Steps */}
                                        {isActive && (
                                            <div className="border-t border-gray-200 bg-gray-50 p-6 rounded-b-lg">
                                                {/* Step Indicator */}
                                                {renderStepIndicator()}

                                                {/* Date Selection */}
                                                <div className="mb-6 bg-white p-4 rounded-lg border border-gray-200">
                                                    <label className="block text-base font-medium text-gray-900 mb-3">
                                                        Appointment Date
                                                    </label>
                                                    <div className="flex items-center gap-4">
                                                        <input
                                                            type="date"
                                                            value={appointmentDate}
                                                            onChange={(e) => setAppointmentDate(e.target.value)}
                                                            min={new Date().toISOString().split('T')[0]}
                                                            className="block px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors text-base font-medium"
                                                        />
                                                        <span className="text-sm text-gray-500">
                                                            Select your preferred appointment date
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Slots Selection */}
                                                {activeStep === "slots" && (
                                                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                                                        <h4 className="text-base font-medium text-gray-900 mb-4">
                                                            Available Time Slots
                                                        </h4>
                                                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                                                            {slots.length === 0 ? (
                                                                <div className="col-span-full text-center py-8 text-gray-500 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                                                                    <div className="text-lg mb-2">No slots available</div>
                                                                    <p className="text-sm">Please try selecting a different date</p>
                                                                </div>
                                                            ) : (
                                                                slots.map((slot) => {
                                                                    const isChosen = selections[pkgId]?.selectedSlotId === String(slot.id);
                                                                    return (
                                                                        <button
                                                                            key={slot.id}
                                                                            onClick={() => onSelectSlot(slot)}
                                                                            className={`p-4 rounded-lg border text-left transition-colors ${isChosen
                                                                                ? "border-teal-500 bg-teal-50 ring-1 ring-teal-200"
                                                                                : "border-gray-200 bg-white hover:border-teal-400 hover:bg-teal-50"
                                                                                }`}
                                                                        >
                                                                            <div className="flex items-center justify-between mb-2">
                                                                                <div className="font-medium text-gray-900">
                                                                                    {slot.startAt} - {slot.endAt}
                                                                                </div>
                                                                                {isChosen && (
                                                                                    <div className="w-5 h-5 bg-teal-500 rounded-full flex items-center justify-center">
                                                                                        <span className="text-white text-xs">✓</span>
                                                                                    </div>
                                                                                )}
                                                                            </div>
                                                                            <div className="text-xs text-gray-600">
                                                                                {slot.capacity} slots available
                                                                            </div>
                                                                        </button>
                                                                    );
                                                                })
                                                            )}
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Family Members Selection */}
                                                {activeStep === "family" && (
                                                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                                                        <h4 className="text-base font-medium text-gray-900 mb-4">
                                                            Select Patient
                                                        </h4>
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                            {familyMembers.length === 0 ? (
                                                                <div className="col-span-full text-center py-8 text-gray-500 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                                                                    <div className="text-lg mb-2">No family members found</div>
                                                                    <p className="text-sm">Add family members in your profile</p>
                                                                </div>
                                                            ) : (
                                                                familyMembers.map((fm) => {
                                                                    const chosen = selections[pkgId]?.patientId === String(fm.id);
                                                                    return (
                                                                        <button
                                                                            key={fm.id}
                                                                            onClick={() => onSelectFamily(fm)}
                                                                            className={`p-4 rounded-lg border text-left transition-colors ${chosen
                                                                                ? "border-teal-500 bg-teal-50 ring-1 ring-teal-200"
                                                                                : "border-gray-200 bg-white hover:border-teal-400 hover:bg-teal-50"
                                                                                }`}
                                                                        >
                                                                            <div className="flex items-center justify-between mb-2">
                                                                                <div className="font-medium text-gray-900">
                                                                                    {fm.name}
                                                                                </div>
                                                                                {chosen && (
                                                                                    <div className="w-5 h-5 bg-teal-500 rounded-full flex items-center justify-center">
                                                                                        <span className="text-white text-xs">✓</span>
                                                                                    </div>
                                                                                )}
                                                                            </div>
                                                                            {fm.relationship && (
                                                                                <div className="text-xs text-gray-600">
                                                                                    {fm.relationship}
                                                                                </div>
                                                                            )}
                                                                        </button>
                                                                    );
                                                                })
                                                            )}
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Address Selection */}
                                                {activeStep === "address" && (
                                                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                                                        <h4 className="text-base font-medium text-gray-900 mb-4">
                                                            Select Address
                                                        </h4>
                                                        <div className="grid grid-cols-1 gap-3">
                                                            {addresses.length === 0 ? (
                                                                <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                                                                    <div className="text-lg mb-2">No addresses found</div>
                                                                    <p className="text-sm">Add addresses in your profile</p>
                                                                </div>
                                                            ) : (
                                                                addresses.map((ad) => {
                                                                    const chosen = selections[pkgId]?.selectedAddressId === String(ad.id);
                                                                    return (
                                                                        <button
                                                                            key={ad.id}
                                                                            onClick={() => onSelectAddress(ad)}
                                                                            className={`p-4 rounded-lg border text-left transition-colors ${chosen
                                                                                ? "border-teal-500 bg-teal-50 ring-1 ring-teal-200"
                                                                                : "border-gray-200 bg-white hover:border-teal-400 hover:bg-teal-50"
                                                                                }`}
                                                                        >
                                                                            <div className="flex items-center justify-between mb-2">
                                                                                <div className="font-medium text-gray-900">
                                                                                    {ad.city}
                                                                                </div>
                                                                                {chosen && (
                                                                                    <div className="w-5 h-5 bg-teal-500 rounded-full flex items-center justify-center">
                                                                                        <span className="text-white text-xs">✓</span>
                                                                                    </div>
                                                                                )}
                                                                            </div>
                                                                            <div className="text-sm text-gray-600">
                                                                                {ad.houseNumber || ad.fullAddress}
                                                                            </div>
                                                                        </button>
                                                                    );
                                                                })
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        {/* Checkout Button */}
                        {allPackagesCompleted && (
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
                                    <div>
                                        <div className="text-lg font-semibold text-gray-900 mb-1">
                                            Ready to Book
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            All {labCartItems.length} packages are scheduled and confirmed
                                        </div>
                                    </div>
                                    <button
                                        onClick={handleCheckout}
                                        disabled={loading}
                                        className={`px-8 py-3 rounded-lg font-semibold text-white transition-colors min-w-[140px] ${loading
                                            ? "bg-gray-400 cursor-not-allowed"
                                            : "bg-teal-600 hover:bg-teal-700"
                                            }`}
                                    >
                                        {loading ? (
                                            <div className="flex items-center justify-center gap-2">
                                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                Processing...
                                            </div>
                                        ) : (
                                            `Book All Tests`
                                        )}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SelectSlot;