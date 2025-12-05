// src/pages/medicine/MedicneOrderConfirm.jsx
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function MedicineOrderConfirm() {
  const [animate, setAnimate] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const { payment, cartData, totalAmount, order } = location.state || {};

  // Debug
  console.log("Payment:", payment);
  console.log("Cart Data:", cartData);
  console.log("Order:", order);
  console.log("Total Amount:", totalAmount);

  // Extracting values safely
  const orderId = order?.id || "mdicine_order_001";
  const orderDate = order?.orderDate
    ? new Date(order.orderDate).toLocaleString()
    : "17-10-2023 10:00 AM";

  const paymentMode = order?.paymentMode || "cash on delivery";
  const paymentStatus = order?.paymentStatus || "done";

  const payableAmount = order?.payableAmount || totalAmount || 0;

  const delivery = order?.deliveryAddress || cartData?.deliveryAddress || {};

  const fullAddress = `${delivery?.houseNumber || "123/12"}, ${delivery?.street || "ratapur"
    }, ${delivery?.city || "padao"}, ${delivery?.state || "up"} - ${delivery?.pincode || "221008"
    }`;

  useEffect(() => {
    setTimeout(() => setAnimate(true), 300);
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-xl rounded-lg shadow-lg p-6">

        {/* TICK ANIMATION */}
        <div className="flex flex-col items-center gap-1 justify-center">
          <div className="relative">
            {/* Green Circle */}
            <div
              className={`w-20 h-20 bg-green-500 rounded-full shadow-lg 
              transition-all duration-500 
              ${animate ? "scale-100 opacity-100" : "scale-0 opacity-0"}`}
            ></div>

            {/* White Tick */}
            <svg
              className={`absolute top-0 left-0 w-20 h-20 p-2 transition-opacity duration-500 
                ${animate ? "opacity-100" : "opacity-0"}`}
              viewBox="0 0 52 52"
            >
              <path
                className="tick stroke-white"
                fill="none"
                strokeWidth="5"
                d="M14 27 L22 35 L38 18"
              />
            </svg>
          </div>

          <h2 className="text-2xl font-bold text-teal-700 mt-2">
            Order Confirmed!
          </h2>
        </div>

        {/* Description */}
        <p className="text-center text-gray-600 mt-2">
          Thank you! Your medicine order has been successfully placed.
        </p>

        {/* ORDER DETAILS BOX */}
        <div className="mt-6 bg-teal-100 rounded-xl p-4 border border-teal-300">
          <h3 className="text-lg font-semibold text-teal-800 mb-3">
            Order Details
          </h3>

          {/* ORDER ID */}
          <div className="flex justify-between text-gray-700 mb-2">
            <span>Order ID:</span>
            <span className="font-semibold">#{orderId}</span>
          </div>

          {/* ORDER DATE */}
          <div className="flex justify-between text-gray-700 mb-2">
            <span>Order Date:</span>
            <span className="font-semibold">{orderDate}</span>
          </div>

          {/* PAYMENT MODE */}
          <div className="flex justify-between text-gray-700 mb-2">
            <span>Payment Mode:</span>
            <span className="font-semibold">{paymentMode}</span>
          </div>

          {/* PAYMENT STATUS */}
          <div className="flex justify-between text-gray-700 mb-2">
            <span>Payment Status:</span>
            <span className="font-semibold">{paymentStatus}</span>
          </div>

          {/* AMOUNT */}
          <div className="flex justify-between text-gray-700 mb-2">
            <span>Total Amount:</span>
            <span className="font-semibold">₹{payableAmount}</span>
          </div>

          {/* DELIVERY ADDRESS */}
          <div className="mt-3">
            <p className="text-gray-700 font-semibold mb-1">Delivery Address:</p>
            <p className="text-gray-600 text-sm">{fullAddress}</p>
          </div>
        </div>

        {/* HELP SECTION */}
        <div className="mt-6 text-center">
          <p className="text-gray-700">Need help?</p>
          <p className="font-semibold text-teal-700 mt-1">📞 +91 94XXXXXXXX</p>
        </div>

        {/* BUTTONS */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={() => navigate("/medicine/delivery")}
            className="flex-1 bg-gray-500 text-white py-3 rounded-xl font-semibold 
            hover:bg-gray-600 transition"
          >
            Continue Shopping
          </button>
          <button
            onClick={() => navigate("/medicine/track-order")}
            className="flex-1 bg-teal-600 text-white py-3 rounded-xl font-semibold 
            hover:bg-teal-700 transition"
          >
            Track Order
          </button>
        </div>
      </div>

      {/* Tick Animation CSS */}
      <style>{`
        .tick {
          stroke-dasharray: 48;
          stroke-dashoffset: 48;
          animation: drawTick 0.7s ease forwards 0.4s;
        }
        @keyframes drawTick {
          to { stroke-dashoffset: 0; }
        }
      `}</style>
    </div>
  );
}

export default MedicineOrderConfirm;
