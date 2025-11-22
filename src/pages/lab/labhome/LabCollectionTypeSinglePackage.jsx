// src/pages/lab/labhome/LabCollectionTypeSinglePackage.jsx

import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import { MdHome } from "react-icons/md";
import { BiBuildingHouse } from "react-icons/bi";


function LabCollectionTypeSinglePackage() {
    const [collectionType, setCollectionType] = useState('home');
    const location = useLocation();
    const labCartItems = location.state || [];
    // const labCartItems = location.state || [];

    return (
        <div className="container mx-auto p-4">

            {/* Toggle Buttons */}
            <div className="flex mb-6 gap-2">
                <button
                    onClick={() => setCollectionType('home')}
                    className={`flex cursor-pointer items-center gap-2 px-5 py-3 text-sm font-medium rounded-t-lg
                    ${collectionType === 'home'
                            ? "bg-teal-700 text-white shadow-md"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-200"
                        }`}
                >
                    <MdHome className="text-lg" />
                    Home Collection
                </button>

                <button
                    onClick={() => setCollectionType('lab')}
                    className={`flex cursor-pointer items-center gap-2 px-5 py-3 text-sm font-medium rounded-t-lg
                    ${collectionType === 'lab'
                            ? "bg-teal-700 text-white shadow-md"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-200"
                        }`}
                >
                    <BiBuildingHouse className="text-lg" />
                    Visit Lab
                </button>
            </div>

            {/* Conditional Rendering */}
            {collectionType === 'home' ? (
                <div>
                    home collection single package slot selection component here
                </div>
            ) : (
                <div>
                    visit lab single package slot selection component here
                </div>
            )}

        </div>
    );
}

export default LabCollectionTypeSinglePackage;
