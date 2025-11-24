// src/component/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-10 px-6 md:px-12 lg:px-20">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        {/* Left Section - Company Info */}
        <div className="text-center md:text-left w-full md:w-auto">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} PharmaConnect. All rights reserved.
          </p>
        </div>

        {/* Right Section - Links */}
        <div className="flex flex-col sm:flex-row gap-10 sm:gap-16 w-full md:w-auto justify-center md:justify-end">
          {/* Support */}
          <div>
            <h3 className="text-gray-800 font-semibold mb-3 text-sm">Support</h3>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li><a href="#" className="hover:text-teal-700">Contact Us</a></li>
              <li><a href="#" className="hover:text-teal-700">FAQs</a></li>
              <li><a href="#" className="hover:text-teal-700">Help Center</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-gray-800 font-semibold mb-3 text-sm">Legal</h3>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li><Link to="/privacy_policy" className="hover:text-teal-700">Privacy Policy</Link></li>
              <li><Link to="/terms_of_service" className="hover:text-teal-700">Terms of Service</Link></li>
              <li><Link to="/return_refund_policies" className="hover:text-teal-700">Return & Refund Policies</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
