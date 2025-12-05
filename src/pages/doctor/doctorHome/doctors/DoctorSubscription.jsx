// src/pages/doctor/doctorHome/doctors/DoctorSubscription.jsx
import { useState } from "react";
import { HiCheckCircle, HiStar, HiShieldCheck } from "react-icons/hi2";

const plans = [
    {
        name: "Starter",
        tagline: "Ideal for new practitioners",
        price: 799,
        originalPrice: 999,
        period: "month",
        features: [
            "3 consultations per month",
            "Basic patient management",

        ],
        popular: false,
    },
    {
        name: "Professional",
        tagline: "Best for growing practices",
        price: 7999,
        originalPrice: 9988,
        period: "year",
        savings: "Save ₹1,989",
        features: [
            "Unlimited consultations",
            "24/7 priority support",
            "Advanced analytics & reports",

        ],
        popular: true,
    },
];

export default function DoctorSubscription() {
    const [selecetdmemeberShip, setSelectedMemberShip] = useState(false)
    return (
        <div className="">

            {/* Header */}


            {/* Pricing Cards */}
            <div className="grid md:grid-cols-2 gap-8 ">
                {plans.map((plan) => (
                    <div
                        onClick={() => setSelectedMemberShip(plan.name)}
                        key={plan.name}
                        className={`relative rounded-2xl p-4 ${selecetdmemeberShip == plan.name
                            ? "border-2 border-teal-500  "
                            : "border border-gray-200 "
                            }`}
                    >


                        <div className="text-start">
                            <div className="flex justify-between items-center gap-4">
                                <div className="mt-6">
                                    <h3 className="text-md font-bold text-gray-900">{plan.name}</h3>
                                    <p className="text-gray-600 mt-1 text-sm">{plan.tagline}</p>
                                    <div className="flex items-baseline justify-start gap-2">
                                        <span className="text-lg font-bold text-gray-900">₹{plan.price.toLocaleString()}</span>
                                        <span className="text-gray-500">/{plan.period}</span>
                                    </div>
                                    {plan.originalPrice && (
                                        <div className="mt-2 flex items-start justify-start gap-3">
                                            <span className="text-xs text-gray-500 line-through">
                                                ₹{plan.originalPrice.toLocaleString()}
                                            </span>
                                            {plan.savings && (
                                                <span className="bg-teal-100 text-teal-700 text-xs font-bold px-3 py-1 rounded-full">
                                                    {plan.savings}
                                                </span>
                                            )}
                                        </div>
                                    )}
                                </div>

                                <ul className="mt-8 space-y-4 text-left">
                                    {plan.features.map((feature) => (
                                        <li key={feature} className="flex items-start gap-3">
                                            <HiCheckCircle className="w-3 h-3 text-teal-600 mt-0.5 flex-shrink-0" />
                                            <span className="text-gray-700 text-xs">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <button
                                    disabled={selecetdmemeberShip != plan.name}
                                    className={`mt-5 py-2 h-10 px-4 rounded-xl font-semibold transition-all cursor-pointer
                                            disabled:cursor-not-allowed disabled:opacity-50
                                            ${selecetdmemeberShip == plan.name
                                            ? "bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white shadow-lg"
                                            : "bg-gray-900 text-white hover:bg-gray-800"
                                        }`}
                                >
                                    Select
                                </button>

                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Quick Comparison */}

        </div>

    );
}