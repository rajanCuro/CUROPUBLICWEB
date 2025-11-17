// src/component/familyMedical/FamilyMedicalHIstoryWrapper.jsx

import React from 'react'
import FamilyMemeberList from './FamilyMemberList'
import PrescriptionDocument from './PrescriptionDocument'

function FamilyMedicalHIstoryWrapper() {
    return (
        <div className='flex justify-between items-start container mx-2 md:mx-auto min-h-screen overflow-y-auto my-4 gap-2'>
            <div className='w-full'>
                <FamilyMemeberList />
            </div>
        </div>
    )
}

export default FamilyMedicalHIstoryWrapper