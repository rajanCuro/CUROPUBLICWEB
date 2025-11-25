// src/component/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png"; // Update path to your logo
import { FaFacebook, FaInstagram, FaWhatsapp, FaLinkedin, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";  // Twitter X icon


function Footer() {
  return (
    <footer className="bg-gradient-to-r from-teal-50 via-white to-teal-50  py-10 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 items-center">

        {/* Left Section - Info */}
        <div className="text-center md:text-left">
          <img
            src={Logo}
            alt="PharmaConnect Logo"
            className="w-32 md:w-40 drop-shadow-md hover:scale-105 transition-transform duration-300"
          />

          <p className="text-gray-500 text-sm leading-6 mt-2">
            Your trusted partner for medicines, diagnostics, and pharmacy solutions.
          </p>
          <p className="text-gray-400 text-xs mt-4">
            © {new Date().getFullYear()} Curo24 digital health services pvt Ltd. All rights reserved.
          </p>
        </div>

        {/* Center Section - Links */}
        <div className="flex justify-center gap-16">
          {/* Support */}
          <div>
            <h3 className="text-gray-800 font-semibold mb-3 text-sm uppercase">Support</h3>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li><a href="#" className="hover:text-teal-700 transition">Contact Us</a></li>
              <li><a href="#" className="hover:text-teal-700 transition">FAQs</a></li>
              <li><a href="#" className="hover:text-teal-700 transition">Help Center</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-gray-800 font-semibold mb-3 text-sm uppercase">Legal</h3>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li><Link to="/privacy_policy" className="hover:text-teal-700 transition">Privacy Policy</Link></li>
              <li><Link to="/terms_of_service" className="hover:text-teal-700 transition">Terms of Service</Link></li>
              <li><Link to="/return_refund_policies" className="hover:text-teal-700 transition">Return & Refund Policies</Link></li>
            </ul>
          </div>
        </div>

        {/* Right Section - Social Icons */}
        <div className="flex flex-col items-center md:items-end gap-3">
          <p className="text-lg font-bold uppercase">Our Social Platform</p>

          <div className="grid grid-cols-5 gap-4 mt-2">
            <a href="https://www.facebook.com/profile.php?id=61574058501599" target="_blank" className="flex justify-center text-gray-600 text-2xl hover:text-teal-700 transition">
              <FaFacebook className="text-blue-500" />
            </a>
            <a href="https://www.instagram.com/curo24_healthtech/" target="_blank" className="flex justify-center text-gray-600 text-2xl hover:text-teal-700 transition">
              <FaInstagram className="text-pink-600" />
            </a>
            <a href="https://x.com/24Curo" target="_blank" className="flex justify-center text-gray-600 text-2xl hover:text-teal-700 transition">
              <FaXTwitter className="text-black" />
            </a>
            <a href="https://www.linkedin.com/company/curo24/" target="_blank" className="flex justify-center text-gray-600 text-2xl hover:text-teal-700 transition">
              <FaLinkedin className="text-blue-600" />
            </a>
            <a
              href="https://www.youtube.com/@curo24"
              target="_blank"
              rel="noopener noreferrer"
              className="flex justify-center text-gray-600 text-2xl hover:text-red-600 transition"
            >
              <FaYoutube size={30} className="text-red-500" />
            </a>

          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
