// src/pages/doctor/doctorHome/quickConsult/PaymentSuccessScreen.jsx
import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const PaymentSuccessScreen = () => {
  const [showConfetti, setShowConfetti] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { amount, receipt } = location.state || {};
  const [currentDateTime, setCurrentDateTime] = useState("");
  const receiptRef = useRef(null);

  useEffect(() => {
    function getFormattedDateTime() {
      const now = new Date();

      // ---- DATE ----
      const day = String(now.getDate()).padStart(2, "0");
      const monthNames = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
      ];
      const month = monthNames[now.getMonth()];
      const year = now.getFullYear();

      const formattedDate = `${day} ${month} ${year}`;

      // ---- TIME (12-HOUR FORMAT) ----
      let hours = now.getHours();
      let minutes = String(now.getMinutes()).padStart(2, "0");
      let ampm = hours >= 12 ? "PM" : "AM";

      hours = hours % 12 || 12; // convert 0 → 12
      hours = String(hours).padStart(2, "0");

      const formattedTime = `${hours}:${minutes} ${ampm}`;

      return `${formattedDate}, ${formattedTime}`;
    }

    setCurrentDateTime(getFormattedDateTime());
  }, []);

  // Generate transaction ID
  const transactionId = `TXN-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

  // Function to download PDF
  const downloadPDF = () => {
    const doc = new jsPDF('p', 'mm', 'a4');
    const width = doc.internal.pageSize.getWidth();
    const leftMargin = 20;
    const rightMargin = width - 20;
    let y = 25;

    // Professional gradient header background (simulated with two rectangles)
    doc.setFillColor(16, 163, 127);
    doc.rect(0, 0, width, 60, 'F');
    doc.setFillColor(5, 150, 105);
    doc.rect(0, 0, width, 30, 'F');

    // Header content
    doc.setFontSize(28);
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.text('MEDICAL CONSULTATION RECEIPT', width / 2, 35, { align: 'center' });

    doc.setFontSize(12);
    doc.setTextColor(255, 255, 255, 0.9);
    doc.setFont('helvetica', 'normal');
    doc.text('Official Payment Confirmation', width / 2, 43, { align: 'center' });

    y = 70;

    // Transaction Summary Card
    doc.setFillColor(249, 250, 251);
    doc.roundedRect(leftMargin, y, width - 40, 40, 3, 3, 'F');

    doc.setFontSize(18);
    doc.setTextColor(16, 163, 127);
    doc.setFont('helvetica', 'bold');
    doc.text(`₹ ${amount}`, leftMargin + 15, y + 15);

    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.setFont('helvetica', 'normal');
    doc.text('TOTAL AMOUNT', leftMargin + 15, y + 22);

    // Vertical divider
    doc.setDrawColor(229, 231, 235);
    doc.setLineWidth(0.5);
    doc.line(leftMargin + 70, y + 5, leftMargin + 70, y + 35);

    // Transaction details
    doc.setFontSize(10);
    doc.setTextColor(75, 85, 99);
    doc.text('Transaction ID:', leftMargin + 80, y + 15);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(31, 41, 55);
    doc.text(transactionId, leftMargin + 110, y + 15);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(75, 85, 99);
    doc.text('Date & Time:', leftMargin + 80, y + 25);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(31, 41, 55);
    doc.text(currentDateTime, leftMargin + 110, y + 25);

    y += 50;

    // Doctor Information Section
    doc.setFontSize(14);
    doc.setTextColor(31, 41, 55);
    doc.setFont('helvetica', 'bold');
    doc.text('DOCTOR INFORMATION', leftMargin, y);
    y += 5;

    // Horizontal line
    doc.setDrawColor(16, 163, 127);
    doc.setLineWidth(1);
    doc.line(leftMargin, y, leftMargin + 60, y);
    y += 10;

    // Doctor card with subtle border
    doc.setDrawColor(229, 231, 235);
    doc.setLineWidth(0.3);
    doc.roundedRect(leftMargin, y, width - 40, 45, 2, 2, 'S');

    // Doctor avatar placeholder
    doc.setFillColor(209, 250, 229);
    doc.circle(leftMargin + 25, y + 23, 15, 'F');
    doc.setFontSize(16);
    doc.setTextColor(5, 150, 105);
    doc.text('DC', leftMargin + 23, y + 26);

    // Doctor details
    doc.setFontSize(14);
    doc.setTextColor(31, 41, 55);
    doc.setFont('helvetica', 'bold');
    doc.text(`Dr. ${receipt?.name || 'Michael Chen'}`, leftMargin + 50, y + 15);

    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(75, 85, 99);
    doc.text(receipt?.specialization || 'Senior Cardiologist', leftMargin + 50, y + 25);

    // Rating and experience with icons
    doc.setFontSize(10);
    doc.setTextColor(245, 158, 11);
    doc.text('★', leftMargin + 50, y + 35);
    doc.setTextColor(31, 41, 55);
    doc.text(`${receipt?.rating || 4.9}/5`, leftMargin + 55, y + 35);

    doc.setTextColor(156, 163, 175);
    doc.text('•', leftMargin + 75, y + 35);

    doc.setTextColor(75, 85, 99);
    doc.text(`${receipt?.experience || 15} years experience`, leftMargin + 80, y + 35);

    y += 55;

    

    // Horizontal line
    doc.setDrawColor(16, 163, 127);
    doc.setLineWidth(1);
    doc.line(leftMargin, y, leftMargin + 85, y);
    y += 15;

    const column1X = leftMargin;
    const column2X = width / 2;

    // Column 1
    

    // Symptoms Section with improved styling
    if (receipt?.symptoms?.length > 0) {
      doc.setFontSize(14);
      doc.setTextColor(31, 41, 55);
      doc.setFont('helvetica', 'bold');
      doc.text('REPORTED SYMPTOMS', leftMargin, y);
      y += 5;

      doc.setDrawColor(16, 163, 127);
      doc.setLineWidth(1);
      doc.line(leftMargin, y, leftMargin + 85, y);
      y += 15;

      let x = leftMargin;
      receipt.symptoms.forEach((symptom, i) => {
        const textWidth = doc.getStringUnitWidth(symptom) * doc.getFontSize() / doc.internal.scaleFactor;
        const boxWidth = textWidth + 12;

        if (x + boxWidth > rightMargin - 20) {
          x = leftMargin;
          y += 12;
        }

        // Modern pill design
        doc.setFillColor(240, 253, 244);
        doc.setDrawColor(220, 252, 231);
        doc.setLineWidth(0.5);
        doc.roundedRect(x, y - 6, boxWidth, 8, 4, 4, 'FD');

        doc.setFontSize(9);
        doc.setTextColor(21, 128, 61);
        doc.setFont('helvetica', 'bold');
        doc.text(symptom, x + 6, y);

        x += boxWidth + 8;
      });

      y += 20;
    }

    // Payment Information


    doc.setDrawColor(16, 163, 127);
    doc.setLineWidth(1);
    doc.line(leftMargin, y, leftMargin + 95, y);
    y += 15;

    // Payment details with subtle background
    doc.setFillColor(249, 250, 251);
    doc.roundedRect(leftMargin, y, width - 40, 35, 3, 3, 'F');

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(75, 85, 99);
    doc.text('Total Amount:', leftMargin + 10, y + 12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(31, 41, 55);
    doc.text(`₹ ${amount}`, leftMargin + 120, y + 12);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(75, 85, 99);
    doc.text('Payment Method:', leftMargin + 10, y + 25);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(31, 41, 55);
    doc.text('Visa •••• 4242', leftMargin + 120, y + 25);

    y += 50;

    // Professional footer
    doc.setFontSize(9);
    doc.setTextColor(156, 163, 175);
    doc.setFont('helvetica', 'normal');
    doc.text('This is an electronically generated receipt. No signature required.', width / 2, y, { align: 'center' });
    y += 6;
    doc.text('For any queries, contact support@healthcare.com or call +91-9876543210', width / 2, y, { align: 'center' });

    // Company info
    y += 15;
    doc.setFontSize(10);
    doc.setTextColor(16, 163, 127);
    doc.setFont('helvetica', 'bold');
    doc.text('MedCare Pro', width / 2, y, { align: 'center' });
    y += 5;
    doc.setFontSize(8);
    doc.setTextColor(156, 163, 175);
    doc.setFont('helvetica', 'normal');
    doc.text('© 2024 MedCare Pro. All rights reserved.', width / 2, y, { align: 'center' });

    // Add watermark
    doc.setFontSize(20);
    doc.setTextColor(243, 244, 246);
    doc.setFont('helvetica', 'bold');
    doc.text('PAID', width / 2, 150, { align: 'center', angle: 45 });

    // Save the PDF
    doc.save(`consultation-receipt-${transactionId}.pdf`);
  };

  // Simplified HiddenReceipt component without problematic Tailwind classes
  const HiddenReceipt = () => (
    <div ref={receiptRef} className="hidden">
      <div style={{
        padding: '32px',
        backgroundColor: '#ffffff',
        maxWidth: '210mm',
        margin: '0 auto',
        fontFamily: 'Arial, sans-serif'
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937', marginBottom: '8px' }}>
            Curo24 Consultation Receipt
          </h1>
          <p style={{ color: '#4b5563', fontSize: '14px' }}>Payment Successful</p>
          <div style={{ marginTop: '16px', fontSize: '24px', fontWeight: 'bold', color: '#059669' }}>
            ₹ {amount}
          </div>
        </div>

        {/* Doctor Details */}
        <div style={{
          marginBottom: '32px',
          padding: '24px',
          backgroundColor: '#f9fafb',
          borderRadius: '12px',
          border: '1px solid #e5e7eb'
        }}>
          <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', marginBottom: '16px' }}>
            Doctor Information
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '64px',
              height: '64px',
              backgroundColor: receipt?.imageColor === 'bg-red-100' ? '#fee2e2' : '#dbeafe',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
              fontWeight: 'bold'
            }}>
              {receipt?.name?.charAt(0) || 'D'}
            </div>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1f2937' }}>
                {receipt?.name || 'Dr. Michael Chen'}
              </h3>
              <p style={{ color: '#4b5563', fontSize: '14px' }}>
                {receipt?.specialization || 'Cardiologist'}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                <span style={{ color: '#f59e0b', fontSize: '14px' }}>
                  ★ {receipt?.rating || 4.9}
                </span>
                <span style={{ color: '#9ca3af' }}>•</span>
                <span style={{ color: '#4b5563', fontSize: '14px' }}>
                  {receipt?.experience || 15} years experience
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Consultation Details */}
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', marginBottom: '16px' }}>
            Consultation Details
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#4b5563' }}>Consultation Fee:</span>
              <span style={{ fontWeight: '500' }}>₹ {receipt?.consultationFee || 1200}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#4b5563' }}>Next Available Slot:</span>
              <span style={{ fontWeight: '500' }}>{receipt?.availability || 'Available Tomorrow'}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#4b5563' }}>Preferred Time:</span>
              <span style={{ fontWeight: '500' }}>{receipt?.nextSlot || '11:00 AM'}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#4b5563' }}>Languages:</span>
              <span style={{ fontWeight: '500' }}>{receipt?.languages?.join(', ') || 'English'}</span>
            </div>
          </div>
        </div>

        {/* Symptoms */}
        {receipt?.symptoms && receipt.symptoms.length > 0 && (
          <div style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', marginBottom: '16px' }}>
              Reported Symptoms
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {receipt.symptoms.map((symptom, index) => (
                <span key={index} style={{
                  padding: '4px 12px',
                  backgroundColor: '#fee2e2',
                  color: '#b91c1c',
                  borderRadius: '9999px',
                  fontSize: '12px'
                }}>
                  {symptom}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Payment Details */}
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', marginBottom: '16px' }}>
            Payment Information
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#4b5563' }}>Transaction ID:</span>
              <span style={{ fontWeight: '500' }}>{transactionId}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#4b5563' }}>Date & Time:</span>
              <span style={{ fontWeight: '500' }}>{currentDateTime}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#4b5563' }}>Payment Method:</span>
              <span style={{ fontWeight: '500' }}>Visa •••• 4242</span>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              borderTop: '1px solid #e5e7eb',
              paddingTop: '12px',
              marginTop: '12px'
            }}>
              <span style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937' }}>Total Amount:</span>
              <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#059669' }}>₹ {amount}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          paddingTop: '32px',
          borderTop: '1px solid #e5e7eb'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '12px', height: '12px', backgroundColor: '#10b981', borderRadius: '50%' }}></div>
                <span style={{ fontSize: '12px', color: '#4b5563' }}>Payment Verified</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
                <div style={{ width: '12px', height: '12px', backgroundColor: '#3b82f6', borderRadius: '50%' }}></div>
                <span style={{ fontSize: '12px', color: '#4b5563' }}>Secure Transaction</span>
              </div>
            </div>
            {receipt?.isVerified && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10b981' }}>
                <svg style={{ width: '16px', height: '16px' }} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span style={{ fontWeight: '600' }}>Verified Doctor</span>
              </div>
            )}
          </div>
          <p style={{ fontSize: '12px', color: '#6b7280', textAlign: 'center' }}>
            Thank you for choosing our service. For any queries, please contact our support team.
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      {/* Hidden receipt for PDF */}
      <HiddenReceipt />

      {/* Confetti Animation */}
      <AnimatePresence>
        {showConfetti && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  backgroundColor: ['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B'][Math.floor(Math.random() * 4)],
                }}
                initial={{ y: -20, opacity: 0 }}
                animate={{
                  y: [0, 800],
                  x: [0, Math.random() * 200 - 100],
                  rotate: 360,
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  duration: 2 + Math.random(),
                  delay: Math.random() * 0.5,
                  repeatDelay: 5,
                  repeat: Infinity,
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, type: 'spring', bounce: 0.3 }}
        className="bg-white rounded-2xl shadow-xl max-w-3xl w-full overflow-hidden"
      >
        {/* Header */}
        <div className="p-8 text-center">
          {/* Success Icon Animation */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="relative w-24 h-24 mx-auto mb-6"
          >
            <motion.div
              className="absolute inset-0 bg-green-100 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            />
            <motion.svg
              className="relative w-full h-full"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <motion.path
                d="M22 11.08V12a10 10 0 1 1-5.93-9.14"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-green-500"
              />
              <motion.path
                d="M22 4L12 14.01l-3-3"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.3, delay: 0.8 }}
                className="text-green-500"
              />
            </motion.svg>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-3xl font-bold text-gray-800 mb-2"
          >
            Payment Successful!
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-gray-600 mb-8"
          >
            Your payment has been processed successfully
          </motion.p>

          {/* Amount Display */}
          <div className="bg-[#f0fdf4] rounded-xl p-6 mb-8 border border-green-100">
            <div className="flex items-center justify-center space-x-2">
              <span className="text-gray-600">Amount Paid:</span>
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.7, type: 'spring' }}
                className="text-3xl font-bold text-green-600"
              >
                ₹ {amount}
              </motion.span>
            </div>
          </div>

          {/* Doctor Summary */}


          {/* Transaction Details */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="space-y-4 mb-8"
          >
            <div className="flex justify-between py-3 border-b border-gray-100">
              <span className="text-gray-600">Transaction ID</span>
              <span className="font-mono text-sm font-semibold text-gray-800">
                {transactionId}
              </span>
            </div>

            <div className="flex justify-between py-3 border-b border-gray-100">
              <span className="text-gray-600">Date & Time</span>
              <span className="font-medium text-gray-800">
                {currentDateTime}
              </span>
            </div>

            <div className="flex justify-between py-3 border-b border-gray-100">
              <span className="text-gray-600">Payment Method</span>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">V</span>
                </div>
                <span className="font-medium text-gray-800">Visa •••• 4242</span>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="space-y-4"
          >
            <motion.button
              onClick={downloadPDF}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold py-3 px-6 rounded-lg hover:shadow-lg transition-shadow duration-200 flex items-center justify-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Download Receipt</span>
            </motion.button>



            <motion.button
              onClick={() => navigate('/doctor')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full border border-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              Back to Home
            </motion.button>
          </motion.div>

          {/* Additional Info */}

        </div>

        {/* Progress Indicator */}
        <div className="h-1 bg-gray-100 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-green-400 to-emerald-500"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 2, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentSuccessScreen;