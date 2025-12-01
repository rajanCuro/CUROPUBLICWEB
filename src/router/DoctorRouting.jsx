// src/router/DoctorRouting.jsx
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import DoctorHome from '../pages/doctor/doctorHome/DoctorHome'
import DoctorHero from '../pages/doctor/doctorHome/DoctorHero'
import DoctorCategory from '../pages/doctor/doctorHome/DoctorCategory'
import DoctorList from '../pages/doctor/doctorHome/doctors/DoctorList'
import ViewDoctorDetails from '../pages/doctor/doctorHome/doctors/ViewDoctorDetails'
import BookAppoitment from '../pages/doctor/doctorHome/doctors/BookAppoitment'

function DoctorRouting() {
    return (
        <div>
            <Routes>
                {/* <Route path='/doctor' element={<DoctorHome />} /> */}
                <Route path='/doctor' element={<DoctorHero />} />
                <Route path='/doctor-category' element={<DoctorCategory />} />
                <Route path='/doctor-allDoctor' element={<DoctorList />} />
                <Route path='/doctor-doctor-details' element={<ViewDoctorDetails />} />
                <Route path='/doctor-book-appoitment' element={<BookAppoitment />} />
            </Routes>
        </div>
    )
}

export default DoctorRouting