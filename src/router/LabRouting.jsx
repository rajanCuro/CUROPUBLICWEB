// src/router/LabRouting.jsx
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LabHome from '../pages/lab/labhome/LabHome'
import LabPackageDetails from '../pages/lab/labhome/LabPackageDetails'

function LabRouting() {
  return (
    <div>
        <Routes>
            <Route path='/lab' element={<LabHome/>}/>
            <Route path='/labPackage_details' element={<LabPackageDetails/>}/>
        </Routes>
    </div>
  )
}

export default LabRouting