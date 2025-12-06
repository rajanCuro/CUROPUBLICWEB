// src/pages/doctor/doctorHome/quickConsult/QuickConsultHome.jsx
import React, { useEffect, useState } from 'react'
import FilterDoctorList from './FilterDoctorList'

function QuickConsultHome() {
    useEffect(() => {
        window.scrollTo({
            top:0,
            behavior:'smooth'
        })
    }, [])
    return (
        <div className='min-h-screen  container mx-auto'>
            <div className=''>
                <FilterDoctorList categories={['Cardiology', 'Neurology', 'Dermatology']}
                    symptoms={['Headache', 'Fever', 'Cough', 'Rash']} />

            </div>


        </div>
    )
}

export default QuickConsultHome