// src/pages/lab/labhome/LabPackageDetails.jsx

import React from 'react'
import { useLocation } from 'react-router-dom';

function LabPackageDetails() {
    const location = useLocation();
    const item = location.state;   // <-- your data is here

    console.log("PACKAGE DATA:", item);
    return (
        <div>LabPackageDetails</div>
    )
}

export default LabPackageDetails