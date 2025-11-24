// src/component/ReturnRefundPolicy.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ReturnRefundPolicy = () => {
  const [expandedSections, setExpandedSections] = useState({});
  const navigate = useNavigate();

  // Auto-expand first section
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
    window.location.href = 'mailto:support@curo24.com?subject=Return%20and%20Refund%20Query';
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
      <div className="bg-white rounded-b-xl  p-4 sm:p-5 border-2 border-t-0 border-teal-100 mb-6 animate-slide-down">
        {children}
      </div>
    );
  };

  const PolicyCard = ({ title, description, timeline, icon, color = "teal" }) => (
    <div className={`bg-${color}-50 border-2 border-${color}-200 rounded-xl p-4 sm:p-5 mb-4 transition-all duration-300 hover:shadow-md hover:transform hover:-translate-y-1`}>
      <div className="flex items-start mb-3">
        <div className={`bg-${color}-100 p-2 rounded-lg mr-3`}>
          <span className={`text-${color}-600 text-lg`}>{icon}</span>
        </div>
        <h4 className={`text-${color}-900 font-semibold text-sm sm:text-base flex-1`}>{title}</h4>
      </div>
      <p className="text-gray-700 text-xs sm:text-sm leading-6 mb-2">{description}</p>
      {timeline && (
        <div className="flex items-center text-xs text-gray-600">
          <span className="mr-1">⏱️</span>
          <span>{timeline}</span>
        </div>
      )}
    </div>
  );

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

  const ProcessStep = ({ number, title, description, icon, isLast = false }) => (
    <div className="flex">
      <div className="flex flex-col items-center mr-4">
        <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
          {icon || number}
        </div>
        {!isLast && <div className="w-0.5 h-full bg-teal-200 mt-2"></div>}
      </div>
      <div className="flex-1 pb-6">
        <h4 className="font-semibold text-gray-900 text-sm sm:text-base mb-2">{title}</h4>
        <p className="text-gray-700 text-xs sm:text-sm leading-6">{description}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-25 to-indigo-25 py-4 sm:py-6">
      {/* Centered Container */}
      <div className="container mx-auto px-3 sm:px-4 ">
        
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 animate-fade-in">
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border-2 border-teal-100 mb-4">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
              Return & Refund Policy
            </h1>
            <p className="text-gray-600 text-sm sm:text-base mb-4">
              Last updated: December 2025
            </p>
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 inline-block">
              <p className="text-green-800 text-xs sm:text-sm font-medium">
                🛡️ Your satisfaction is our priority. We offer easy returns and quick refunds.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <QuickActionButton
            icon="📦"
            title="Initiate Return"
            description="Start the return process for your order"
            onClick={initiateReturn}
            variant="primary"
          />
          <QuickActionButton
            icon="💳"
            title="Check Refund Status"
            description="Track your refund processing status"
            onClick={checkRefundStatus}
          />
        </div>

        {/* Policy Overview */}
        <div className="mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <SectionHeader
            title="Policy Overview"
            id="overview"
            isExpanded={expandedSections.overview}
            icon="📋"
          />
          <SectionContent isExpanded={expandedSections.overview}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <PolicyCard
                title="7-Day Return Window"
                description="Most products can be returned within 7 days of delivery"
                timeline="Within 7 days"
                icon="📅"
                color="green"
              />
              <PolicyCard
                title="Quick Refunds"
                description="Refunds processed within 5-7 business days"
                timeline="5-7 business days"
                icon="⚡"
                color="teal"
              />
              <PolicyCard
                title="Free Returns"
                description="No additional charges for return shipping"
                icon="🚚"
                color="purple"
              />
              <PolicyCard
                title="Quality Check"
                description="All returns undergo quality inspection"
                icon="🔍"
                color="orange"
              />
            </div>
          </SectionContent>
        </div>

        {/* Return Process */}
        <div className="mb-8 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <SectionHeader
            title="Return Process"
            id="process"
            isExpanded={expandedSections.process}
            icon="🔄"
          />
          <SectionContent isExpanded={expandedSections.process}>
            <div className="space-y-2">
              <ProcessStep
                number="1"
                title="Request Return"
                description="Initiate return through your account or contact support within 7 days of delivery"
                icon="📱"
              />
              <ProcessStep
                number="2"
                title="Get Approval"
                description="Wait for return approval email with instructions and return label"
                icon="✅"
              />
              <ProcessStep
                number="3"
                title="Package Item"
                description="Pack the product securely in original packaging with all accessories"
                icon="📦"
              />
              <ProcessStep
                number="4"
                title="Schedule Pickup"
                description="Use provided label for free pickup or drop at nearest center"
                icon="🚗"
              />
              <ProcessStep
                number="5"
                title="Quality Check"
                description="We inspect the returned item upon receipt (2-3 days)"
                icon="🔍"
              />
              <ProcessStep
                number="6"
                title="Refund Processed"
                description="Refund initiated to original payment method within 5-7 business days"
                icon="💳"
                isLast={true}
              />
            </div>
          </SectionContent>
        </div>

        {/* Eligible for Return */}
        <div className="mb-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <SectionHeader
            title="Eligible for Return"
            id="eligible"
            isExpanded={expandedSections.eligible}
            icon="✅"
            badge={{ text: '7 Days', color: 'bg-green-100 text-green-800' }}
          />
          <SectionContent isExpanded={expandedSections.eligible}>
            <div className="space-y-4">
              <div className="flex items-start">
                <span className="text-green-500 text-lg mr-3">✓</span>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Wrong Product Delivered</h4>
                  <p className="text-gray-700 text-xs sm:text-sm">Received different product than ordered</p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-green-500 text-lg mr-3">✓</span>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Damaged Product</h4>
                  <p className="text-gray-700 text-xs sm:text-sm">Product received in damaged condition</p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-green-500 text-lg mr-3">✓</span>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Defective Item</h4>
                  <p className="text-gray-700 text-xs sm:text-sm">Product not working as intended</p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-green-500 text-lg mr-3">✓</span>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Missing Parts</h4>
                  <p className="text-gray-700 text-xs sm:text-sm">Incomplete product or missing accessories</p>
                </div>
              </div>
            </div>
          </SectionContent>
        </div>

        {/* Not Eligible for Return */}
        <div className="mb-8 animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <SectionHeader
            title="Not Eligible for Return"
            id="not-eligible"
            isExpanded={expandedSections['not-eligible']}
            icon="❌"
            badge={{ text: 'No Return', color: 'bg-red-100 text-red-800' }}
          />
          <SectionContent isExpanded={expandedSections['not-eligible']}>
            <div className="space-y-4">
              <div className="flex items-start">
                <span className="text-red-500 text-lg mr-3">✗</span>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Opened Medicines</h4>
                  <p className="text-gray-700 text-xs sm:text-sm">Prescription drugs and opened medicine strips</p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-red-500 text-lg mr-3">✗</span>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Personal Care Items</h4>
                  <p className="text-gray-700 text-xs sm:text-sm">Opened personal hygiene and healthcare products</p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-red-500 text-lg mr-3">✗</span>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Perishable Goods</h4>
                  <p className="text-gray-700 text-xs sm:text-sm">Nutritional supplements and perishable items</p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-red-500 text-lg mr-3">✗</span>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Used Medical Devices</h4>
                  <p className="text-gray-700 text-xs sm:text-sm">Opened or used medical equipment and devices</p>
                </div>
              </div>
            </div>
          </SectionContent>
        </div>

        {/* Refund Information */}
        <div className="mb-8 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <SectionHeader
            title="Refund Information"
            id="refund"
            isExpanded={expandedSections.refund}
            icon="💳"
          />
          <SectionContent isExpanded={expandedSections.refund}>
            <div className="space-y-6">
              <div className="bg-teal-50 border border-teal-200 rounded-xl p-4">
                <h4 className="font-semibold text-teal-900 text-sm sm:text-base mb-2">Refund Timeline</h4>
                <ul className="text-teal-800 text-xs sm:text-sm space-y-2">
                  <li>• Refund initiated within 24 hours of quality check approval</li>
                  <li>• Credit Card/Debit Card: 5-7 business days</li>
                  <li>• UPI: 2-3 business days</li>
                  <li>• Net Banking: 3-5 business days</li>
                  <li>• Wallet: Instant to 24 hours</li>
                </ul>
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <h4 className="font-semibold text-green-900 text-sm sm:text-base mb-2">Partial Refunds</h4>
                <p className="text-green-800 text-xs sm:text-sm">
                  In cases where returned items show signs of use or missing accessories, 
                  a partial refund may be issued based on product condition.
                </p>
              </div>
            </div>
          </SectionContent>
        </div>

        {/* Contact Support */}
        <div className="text-center animate-fade-in" style={{ animationDelay: '0.7s' }}>
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border-2 border-teal-100">
            <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl text-teal-600">💬</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
              Need Help with Returns?
            </h3>
            <p className="text-gray-600 text-sm sm:text-base mb-6 max-w-2xl mx-auto">
              Our support team is here to help you with any questions about returns, refunds, or product issues.
            </p>
            <button
              onClick={handleContactSupport}
              className="bg-gradient-to-r cursor-pointer from-teal-600 to-teal-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-sm sm:text-base hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
            >
              Contact Support Team
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-xs sm:text-sm">
          <p>© 2025 Curo24 Healthcare Services. All rights reserved.</p>
          <p className="mt-1">For emergencies, contact: +91-XXXXX-XXXXX</p>
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
        
        /* Smooth scrolling for better mobile experience */
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
};

export default ReturnRefundPolicy;