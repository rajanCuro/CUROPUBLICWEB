// src/component/UploadPrescription.jsx
import React from 'react'
import { FiUpload } from "react-icons/fi";


function UploadPrescription() {
    return (
        <>
            <div className='container  mx-auto'>
                <div className='w-full bg-[#e0ffff] py-8 rounded-md border border-gray-200'>
                    <div className='flex justify-center items-center flex-col'>
                        <div className='bg-teal-600 p-4 rounded-full'>
                            <FiUpload size={24} className='text-white' />
                        </div>
                        <h1 className='font-bold my-2'>Order Medicine</h1>
                        <p className='text-sm text-gray-700'>Upload your prescription and get medicines delivered to your doorstep.</p>
                        <button className='text-white bg-teal-700 md:px-4 py-1 rounded-md text-xs md:text-lg  px-1 my-2 md:my-3'>
                            Upload Prescription
                        </button>
                    </div>
                </div>

            </div>

        </>

    )
}

export default UploadPrescription