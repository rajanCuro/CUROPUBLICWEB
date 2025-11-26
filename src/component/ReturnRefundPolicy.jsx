// src/component/ReturnRefundPolicy.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaInfoCircle, FaListUl, FaRegListAlt, FaMoneyBillWave, FaFileContract } from 'react-icons/fa';
import { MdCancel, MdOutlineAccessTime, MdReportProblem, MdSupportAgent, MdSecurity, MdHelpOutline } from 'react-icons/md';

const ReturnRefundPolicy = () => {
  const [expandedSections, setExpandedSections] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    setExpandedSections({ overview: true });
  }, []);

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const handleContactSupport = () => {
    window.location.href = 'mailto:support@curo24.com?subject=Cancellation%20and%20Refund%20Query';
  };

  const initiateReturn = () => {
    window.open('https://curo24.com/returns', '_blank');
  };

  const checkRefundStatus = () => {
    window.open('https://curo24.com/refund-status', '_blank');
  };

  const SectionHeader = ({ title, id, isExpanded, icon, badge }) => (
    <button
      onClick={() => toggleSection(id)}
      className={`
        flex justify-between items-center w-full p-4 sm:p-5 rounded-xl border-2 mb-3 transition-all duration-300
        ${isExpanded
          ? 'bg-teal-50 border-teal-300 shadow-md transform -translate-y-1'
          : 'bg-white border-gray-100 shadow-sm hover:shadow-md'
        } hover:border-teal-200
      `}
    >
      <div className="flex items-center flex-1">
        <span className={`text-lg sm:text-xl mr-3 sm:mr-4 ${isExpanded ? 'text-teal-600' : 'text-teal-500'}`}>
          {icon}
        </span>
        <span className={`
          font-semibold flex-1 text-left
          ${isExpanded ? 'text-teal-900' : 'text-gray-900'}
          text-sm sm:text-base lg:text-lg
        `}>
          {title}
        </span>
        {badge && (
          <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${badge.color}`}>
            {badge.text}
          </span>
        )}
      </div>
      <span className={`transform transition-transform duration-300 text-teal-500 ${isExpanded ? 'rotate-180' : ''}`}>
        ▼
      </span>
    </button>
  );

  const SectionContent = ({ children, isExpanded }) => {
    if (!isExpanded) return null;

    return (
      <div className="bg-white rounded-b-xl p-4 sm:p-5 border-2 border-t-0 border-teal-100 mb-6 animate-slide-down">
        {children}
      </div>
    );
  };


  const QuickActionButton = ({ icon, title, description, onClick, variant = "primary" }) => (
    <button
      onClick={onClick}
      className={`
        w-full text-left p-4 sm:p-5 rounded-xl border-2 transition-all duration-300 transform hover:-translate-y-1
        ${variant === 'primary' 
          ? 'bg-teal-50 border-teal-200 hover:bg-teal-100 hover:shadow-md' 
          : 'bg-white border-gray-200 hover:bg-gray-50 hover:shadow-sm'
        }
      `}
    >
      <div className="flex items-center mb-2">
        <span className={`text-xl mr-3 ${variant === 'primary' ? 'text-teal-600' : 'text-gray-600'}`}>
          {icon}
        </span>
        <h3 className={`font-semibold text-sm sm:text-base ${variant === 'primary' ? 'text-teal-900' : 'text-gray-900'}`}>
          {title}
        </h3>
      </div>
      <p className="text-gray-600 text-xs sm:text-sm leading-6">{description}</p>
    </button>
  );

 

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-25 to-indigo-25 py-4 sm:py-6">
      <div className="container mx-auto px-3 sm:px-4">

        {/* Header */}
        <div className="md:text-center text-start mb-6 sm:mb-8 animate-fade-in">
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border-2 border-teal-100 mb-4">
            <h1 className="text-lg sm:text-3xl lg:text-4xl font-bold text-gray-900 md:mb-3">
              Cancellation & Refund Policy
            </h1>
            <p className="text-gray-600 md:text-sm text-xs italic mb-4">
              Last updated: November 26, 2025
            </p>
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 inline-block">
              <p className="text-green-800 text-xs sm:text-sm font-medium">
                🛡️ Transparency first — here’s how cancellations and refunds work at Curo24.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <QuickActionButton
            icon={<FaRegListAlt />}
            title="Initiate Cancellation"
            description="Cancel a booking, order, or subscription"
            onClick={initiateReturn}
            variant="primary"
          />
          <QuickActionButton
            icon={<MdOutlineAccessTime />}
            title="Check Refund Status"
            description="Track your refund progress"
            onClick={checkRefundStatus}
          />
        </div>

        {/* 1. Purpose */}
        <div className="mb-8 animate-fade-in" style={{ animationDelay: '0.15s' }}>
          <SectionHeader
            title="Purpose"
            id="purpose"
            isExpanded={expandedSections.purpose}
            icon={<FaInfoCircle />}
          />
          <SectionContent isExpanded={expandedSections.purpose}>
            <div>
              <p className="text-gray-700 text-xs sm:text-sm leading-6">
                This page explains how users can cancel bookings, subscriptions, or orders on the Curo24 app, when they are eligible for refunds, and how refunds are processed.
              </p>
            </div>
          </SectionContent>
        </div>

        {/* 2. What this policy covers */}
        <div className="mb-8 animate-fade-in" style={{ animationDelay: '0.18s' }}>
          <SectionHeader
            title="What this policy covers"
            id="what-covers"
            isExpanded={expandedSections['what-covers']}
            icon={<FaListUl />}
          />
          <SectionContent isExpanded={expandedSections['what-covers']}>
            <div className="space-y-2">
              <p className="text-gray-700 text-xs sm:text-sm leading-6">
                ● Doctor appointments (video/in-person)
              </p>
              <p className="text-gray-700 text-xs sm:text-sm leading-6">
                ● Lab test orders
              </p>
              <p className="text-gray-700 text-xs sm:text-sm leading-6">
                ● Medicine orders
              </p>
              <p className="text-gray-700 text-xs sm:text-sm leading-6">
                ● One-time digital purchases (reports, premium features)
              </p>
              <p className="text-gray-700 text-xs sm:text-sm leading-6 mt-2">
                This policy does not cover third-party charges (payment gateway fees, external telemedicine partner fees) unless explicitly stated.
              </p>
            </div>
          </SectionContent>
        </div>

        {/* 3. Cancellation rules */}
        <div className="mb-8 animate-fade-in" style={{ animationDelay: '0.21s' }}>
          <SectionHeader
            title="Cancellation rules"
            id="cancellation-rules"
            isExpanded={expandedSections['cancellation-rules']}
            icon={<MdCancel />}
          />
          <SectionContent isExpanded={expandedSections['cancellation-rules']}>
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900 text-sm sm:text-base">A. Appointments</h4>
              <p className="text-gray-700 text-xs sm:text-sm leading-6">
                Free cancellation window: Cancel up to 24 hours before scheduled appointment for a full refund (if prepaid). If the appointment was free or pay-on-visit, no refund applies.
              </p>
              <p className="text-gray-700 text-xs sm:text-sm leading-6">
                Less than 24 hours: Partial refunds or no refund may apply depending on the doctor/clinic cancellation policy. The app will show the exact refund outcome before confirming cancellation.
              </p>
              <p className="text-gray-700 text-xs sm:text-sm leading-6">
                Doctor no-show: If the doctor does not join within the scheduled time and you report it within 48 hours, you are eligible for a full refund or credit.
              </p>

              <h4 className="font-semibold text-gray-900 text-sm sm:text-base mt-3">B. Lab Tests</h4>
              <p className="text-gray-700 text-xs sm:text-sm leading-6">
                Before sample pickup: Full refund if cancelled before the lab technician has been dispatched.
              </p>
              <p className="text-gray-700 text-xs sm:text-sm leading-6">
                After sample pickup / tests started: No refund; you may request a store credit at the lab’s discretion.
              </p>

              <h4 className="font-semibold text-gray-900 text-sm sm:text-base mt-3">C. Medicine Orders</h4>
              <p className="text-gray-700 text-xs sm:text-sm leading-6">
                Before dispatch: Full refund available when cancellation is made before the order status changes to “Dispatched”.
              </p>
              <p className="text-gray-700 text-xs sm:text-sm leading-6">
                After dispatch / out for delivery: Refunds are processed only if the return is accepted by the delivery partner and pharmacy. Shipping charges may be deducted.
              </p>
              <p className="text-gray-700 text-xs sm:text-sm leading-6">
                Prescription issues: If the pharmacy cannot fulfill due to prescription/stock issues, you will receive a full refund.
              </p>

              <h4 className="font-semibold text-gray-900 text-sm sm:text-base mt-3">D. Subscriptions</h4>
              <p className="text-gray-700 text-xs sm:text-sm leading-6">
                Monthly subscriptions: Can cancel anytime. No refunds for partial months by default, but prorated refunds may be offered in special cases — shown at time of cancellation.
              </p>
              <p className="text-gray-700 text-xs sm:text-sm leading-6">
                Annual subscriptions: We offer prorated refunds for cancellations made within the first 30 days. After 30 days, refunds are discretionary and evaluated case-by-case.
              </p>
              <p className="text-gray-700 text-xs sm:text-sm leading-6">
                Trial period: If you are in a free trial, cancelling before trial expiration prevents future billing. No refunds are needed for unused free trials.
              </p>

              <h4 className="font-semibold text-gray-900 text-sm sm:text-base mt-3">E. Digital goods & premium features</h4>
              <p className="text-gray-700 text-xs sm:text-sm leading-6">
                Non-refundable after access has been granted, except where required by law or if the product is defective or not delivered.
              </p>
            </div>
          </SectionContent>
        </div>

        {/* 4. How to cancel (step-by-step) */}
        <div className="mb-8 animate-fade-in" style={{ animationDelay: '0.24s' }}>
          <SectionHeader
            title="How to cancel (step-by-step)"
            id="how-to-cancel"
            isExpanded={expandedSections['how-to-cancel']}
            icon={<FaRegListAlt />}
          />
          <SectionContent isExpanded={expandedSections['how-to-cancel']}>
            <div className="space-y-2">
              <p className="text-gray-700 text-xs sm:text-sm leading-6">
                Within the app:
              </p>
              <ol className="list-decimal list-inside text-gray-700 text-xs sm:text-sm leading-6 space-y-1">
                <li>Open the Curo24 app → My Bookings / Orders</li>
                <li>Select the item you want to cancel.</li>
                <li>Tap Cancel → Choose a reason from the dropdown (required) → Confirm.</li>
                <li>You’ll receive an email & in-app notification confirming cancellation and the expected refund outcome.</li>
              </ol>

              <p className="text-gray-700 text-xs sm:text-sm leading-6 mt-3">
                Via web: - Sign in → My Account → Bookings/Orders/Subscriptions → Cancel as above.
              </p>

              <p className="text-gray-700 text-xs sm:text-sm leading-6">
                By support: - If you cannot cancel in-app, contact Support (see section 9). Provide order/booking ID and registered phone/email.
              </p>
            </div>
          </SectionContent>
        </div>

        {/* 5. Refund process & timeline */}
        <div className="mb-8 animate-fade-in" style={{ animationDelay: '0.27s' }}>
          <SectionHeader
            title="Refund process & timeline"
            id="refund-process"
            isExpanded={expandedSections['refund-process']}
            icon={<MdOutlineAccessTime />}
          />
          <SectionContent isExpanded={expandedSections['refund-process']}>
            <div className="space-y-3">
              <p className="text-gray-700 text-xs sm:text-sm leading-6">
                Acknowledgement: Immediate in-app confirmation and email once cancellation is accepted.
              </p>
              <p className="text-gray-700 text-xs sm:text-sm leading-6">
                Processing time: Refunds are processed within 3–7 business days by Curo24, then depending on your bank/payment method it can take an additional 2–7 business days to reflect in your account.
              </p>
              <p className="text-gray-700 text-xs sm:text-sm leading-6">
                Total typical time: 5–14 business days.
              </p>
              <p className="text-gray-700 text-xs sm:text-sm leading-6">
                Refund method: Refunds are credited to the original payment method. If the original method is unavailable (expired card), we may issue store credit after verifying identity.
              </p>
            </div>
          </SectionContent>
        </div>

        {/* 6. Fees, deductions & exceptions */}
        <div className="mb-8 animate-fade-in" style={{ animationDelay: '0.30s' }}>
          <SectionHeader
            title="Fees, deductions & exceptions"
            id="fees"
            isExpanded={expandedSections.fees}
            icon={<FaMoneyBillWave />}
          />
          <SectionContent isExpanded={expandedSections.fees}>
            <div className="space-y-2">
              <p className="text-gray-700 text-xs sm:text-sm leading-6">
                ● Transaction fees charged by payment gateways are not refundable if they are non-refundable per the gateway terms — this will be displayed to the user at cancellation time where applicable.
              </p>
              <p className="text-gray-700 text-xs sm:text-sm leading-6">
                ● Coupon/discounts: Refunds return the net amount paid after discounts. If a coupon was used and the refund would change coupon eligibility, coupon refunds are managed per coupon terms.
              </p>
              <p className="text-gray-700 text-xs sm:text-sm leading-6">
                ● Shipping and convenience fees may be non-refundable for certain items; these exceptions are displayed during cancellation.
              </p>
            </div>
          </SectionContent>
        </div>

        {/* 7. Disputes & chargebacks */}
        <div className="mb-8 animate-fade-in" style={{ animationDelay: '0.33s' }}>
          <SectionHeader
            title="Disputes & chargebacks"
            id="disputes"
            isExpanded={expandedSections.disputes}
            icon={<MdReportProblem />}
          />
          <SectionContent isExpanded={expandedSections.disputes}>
            <div className="space-y-2">
              <p className="text-gray-700 text-xs sm:text-sm leading-6">
                If you disagree with a refund decision, contact Support within 30 days of the cancellation outcome. Provide booking/order ID and screenshots where possible.
              </p>
              <p className="text-gray-700 text-xs sm:text-sm leading-6">
                If you file a chargeback with your bank, we will respond with transaction records. Excessive or fraudulent chargebacks may lead to account restrictions.
              </p>
            </div>
          </SectionContent>
        </div>

        {/* 8. Contact & support */}
        <div className="mb-8 animate-fade-in" style={{ animationDelay: '0.36s' }}>
          <SectionHeader
            title="Contact & support"
            id="contact-support"
            isExpanded={expandedSections['contact-support']}
            icon={<MdSupportAgent />}
          />
          <SectionContent isExpanded={expandedSections['contact-support']}>
            <div className="space-y-2">
              <p className="text-gray-700 text-xs sm:text-sm leading-6">
                In-app: Help → Chat with us (available 8:00–22:00 local time)
              </p>
              <p className="text-gray-700 text-xs sm:text-sm leading-6">
                Email: _______@curo24.com
              </p>
              <p className="text-gray-700 text-xs sm:text-sm leading-6">
                Phone (India): +91-7458033370 (Mon–Sat, 09:00–18:00)
              </p>
              <p className="text-gray-700 text-xs sm:text-sm leading-6">
                When contacting, please include: Order/Booking ID, registered email/phone, cancellation reason, supporting screenshots.
              </p>
            </div>
          </SectionContent>
        </div>

        {/* 9. Privacy & security */}
        <div className="mb-8 animate-fade-in" style={{ animationDelay: '0.39s' }}>
          <SectionHeader
            title="Privacy & security"
            id="privacy"
            isExpanded={expandedSections.privacy}
            icon={<MdSecurity />}
          />
          <SectionContent isExpanded={expandedSections.privacy}>
            <div>
              <p className="text-gray-700 text-xs sm:text-sm leading-6">
                Refunds and cancellations use only the minimum payment data necessary. We don’t store card CVV. Transactions are processed through PCI-compliant payment gateways.
              </p>
            </div>
          </SectionContent>
        </div>

        {/* 10. FAQ */}
        <div className="mb-8 animate-fade-in" style={{ animationDelay: '0.42s' }}>
          <SectionHeader
            title="FAQ"
            id="faq"
            isExpanded={expandedSections.faq}
            icon={<MdHelpOutline />}
          />
          <SectionContent isExpanded={expandedSections.faq}>
            <div className="space-y-3">
              <div>
                <p className="font-semibold text-gray-900 text-sm sm:text-base">Q: How long will refund show in my account?</p>
                <p className="text-gray-700 text-xs sm:text-sm leading-6">A: Typically within 5–14 business days depending on bank/Payment Provider.</p>
              </div>

              <div>
                <p className="font-semibold text-gray-900 text-sm sm:text-base">Q: I cancelled but didn’t get a refund — what next?</p>
                <p className="text-gray-700 text-xs sm:text-sm leading-6">A: Check the cancellation confirmation email for refund status. If it shows Processed, contact your bank. If Pending or Not processed, reach out to Support with the booking ID.</p>
              </div>

              <div>
                <p className="font-semibold text-gray-900 text-sm sm:text-base">Q: Can I get a credit instead of a refund?</p>
                <p className="text-gray-700 text-xs sm:text-sm leading-6">A: Yes — you can choose store credit for faster processing in many cases.</p>
              </div>

              <div>
                <p className="font-semibold text-gray-900 text-sm sm:text-base">Q: Will I be charged if the doctor cancels?</p>
                <p className="text-gray-700 text-xs sm:text-sm leading-6">A: No — if the doctor cancels, you’re eligible for a full refund or reschedule option.</p>
              </div>
            </div>
          </SectionContent>
        </div>

        {/* 11. Change log & legal */}
        <div className="mb-8 animate-fade-in" style={{ animationDelay: '0.45s' }}>
          <SectionHeader
            title="Change log & legal"
            id="change-log"
            isExpanded={expandedSections['change-log']}
            icon={<FaFileContract />}
          />
          <SectionContent isExpanded={expandedSections['change-log']}>
            <div className="space-y-2">
              <p className="text-gray-700 text-xs sm:text-sm leading-6">
                We may update this policy. Significant changes will be communicated 7 days in advance where required by law.
              </p>
              <p className="text-gray-700 text-xs sm:text-sm leading-6">
                For legal concerns, see Terms of Service and Privacy Policy (linked). {`{Provide the link here}`}
              </p>
            </div>
          </SectionContent>
        </div>

        {/* Contact (support CTA) */}
        <div className="text-center animate-fade-in" style={{ animationDelay: '0.48s' }}>
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border-2 border-teal-100">
            <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl text-teal-600">💬</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
              Need Help with Your Cancellation?
            </h3>

            <p className="text-gray-600 text-sm sm:text-base mb-6 max-w-2xl mx-auto">
              Our support team is here to help you with any questions about cancellations, refunds, or booking issues.
            </p>

            <button
              onClick={handleContactSupport}
              className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-sm sm:text-base hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
            >
              Contact Support Team
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-xs sm:text-sm">
          <p>© 2025 Curo24 Healthcare Services. All rights reserved.</p>
          <p className="mt-1">For assistance, contact: +91-7458033370</p>
        </div>

      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes fade-in {
          from { 
            opacity: 0; 
            transform: translateY(20px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        @keyframes slide-down {
          from { 
            opacity: 0;
            max-height: 0;
            transform: translateY(-10px);
          }
          to { 
            opacity: 1;
            max-height: 1000px;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .animate-slide-down {
          animation: slide-down 0.4s ease-out forwards;
        }
        
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
};

export default ReturnRefundPolicy;
