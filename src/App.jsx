// src/App.jsx
import React from 'react'
import Header from './component/Header'
import Footer from './component/Footer'
import Router from './router/Router'
import Hero from './component/Hero'
import UploadPrescription from './component/UploadPrescription'
import OurServices from './component/OurServices'
import HealthRecords from './component/HealthRecords'
import UpcommingStaus from './component/UpcommingStaus'


function App() {
  return (
    <>
      <Header />
      <div className='h-screen'>
        <Hero />
        <UploadPrescription />
        <OurServices />
        <UpcommingStaus />
        <HealthRecords />
        <Router />
      </div>
      {/* <Footer /> */}
    </>
  )
}

export default App