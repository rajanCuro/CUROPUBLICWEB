// src/pages/doctor/doctorHome/quickConsult/QuickConsultDoctorPayment.jsx
// src/pages/doctor/doctorHome/QuickConsultDoctorPayment.jsx
import React, { useEffect, useState } from 'react';
import { CreditCard, Building2, Smartphone, CheckCircle, Lock, Shield } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const QuickConsultDoctorPayment = () => {
    const location = useLocation();
    const { doctor } = location.state || {};
    console.log(doctor)
    const [selectedMethod, setSelectedMethod] = useState('card');
    const [platformFee, setPlatformFee] = useState(49)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const [cardDetails, setCardDetails] = useState({
        cardNumber: '',
        expiry: '',
        cvv: '',
        name: ''
    });
    const [upiId, setUpiId] = useState('');
    const [selectedBank, setSelectedBank] = useState('');
    useEffect(() => {
        if (!doctor) {
            navigate('/quick-consult')
        }
    }, [])

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }, [])

    const banks = [
        { id: 'sbi', name: 'State Bank of India', logo: '🏦' },
        { id: 'hdfc', name: 'HDFC Bank', logo: '🏦' },
        { id: 'icici', name: 'ICICI Bank', logo: '🏦' },
        { id: 'axis', name: 'Axis Bank', logo: '🏦' },
        { id: 'kotak', name: 'Kotak Mahindra Bank', logo: '🏦' },
        { id: 'yes', name: 'YES Bank', logo: '🏦' }
    ];

    const totalAmount = Number(doctor?.consultationFee ?? 0) + Number(platformFee ?? 0);


    const handleCardInputChange = (e) => {
        const { name, value } = e.target;
        let formattedValue = value;

        if (name === 'cardNumber') {
            formattedValue = value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();
            if (formattedValue.length > 19) formattedValue = formattedValue.slice(0, 19);
        }

        if (name === 'expiry') {
            formattedValue = value.replace(/\D/g, '').replace(/(.{2})/g, '$1/').slice(0, 5);
        }

        if (name === 'cvv' && value.length > 3) return;

        setCardDetails(prev => ({
            ...prev,
            [name]: formattedValue
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();      // Prevent page reload
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
            navigate('/doctor/payment-success', { state: { amount: totalAmount, receipt: doctor } });
        }, 2000);
    };


    const confirmPayemntTest = () => {
        navigate('/doctor/quick-consult')
    }
    return (
        <div className="min-h-screen  py-12 px-4 sm:px-6 lg:px-8 container mx-auto">
            <div className="mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Order Summary */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-semibold text-gray-800">Payment Methods</h2>
                                <div className="flex items-center text-teal-600">
                                    <Shield className="w-5 h-5 mr-2" />
                                    <span className="text-sm font-medium">Secure Payment</span>
                                </div>
                            </div>

                            {/* Payment Method Selection */}
                            <div className="grid grid-cols-3 gap-4 mb-8">
                                <button
                                    onClick={() => setSelectedMethod('card')}
                                    className={`p-4 rounded-xl border-2 transition-all duration-200 ${selectedMethod === 'card' ? 'border-teal-500 bg-teal-50' : 'border-gray-200 hover:border-gray-300'}`}
                                >
                                    <CreditCard className={`w-8 h-8 mx-auto mb-2 ${selectedMethod === 'card' ? 'text-teal-500' : 'text-gray-400'}`} />
                                    <span className={`font-medium ${selectedMethod === 'card' ? 'text-teal-500' : 'text-gray-700'}`}>Card</span>
                                </button>

                                <button
                                    onClick={() => setSelectedMethod('upi')}
                                    className={`p-4 rounded-xl border-2 transition-all duration-200 ${selectedMethod === 'upi' ? 'border-teal-500 bg-teal-50' : 'border-gray-200 hover:border-gray-300'}`}
                                >
                                    <Smartphone className={`w-8 h-8 mx-auto mb-2 ${selectedMethod === 'upi' ? 'text-teal-500' : 'text-gray-400'}`} />
                                    <span className={`font-medium ${selectedMethod === 'upi' ? 'text-teal-500' : 'text-gray-700'}`}>UPI</span>
                                </button>

                                <button
                                    onClick={() => setSelectedMethod('netbanking')}
                                    className={`p-4 rounded-xl border-2 transition-all duration-200 ${selectedMethod === 'netbanking' ? 'border-teal-500 bg-teal-50' : 'border-gray-200 hover:border-gray-300'}`}
                                >
                                    <Building2 className={`w-8 h-8 mx-auto mb-2 ${selectedMethod === 'netbanking' ? 'text-teal-500' : 'text-gray-400'}`} />
                                    <span className={`font-medium ${selectedMethod === 'netbanking' ? 'text-teal-500' : 'text-gray-700'}`}>Net Banking</span>
                                </button>
                            </div>

                            {/* Card Payment Form */}
                            {selectedMethod === 'card' && (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Card Number
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                name="cardNumber"
                                                value={cardDetails.cardNumber}
                                                onChange={handleCardInputChange}
                                                placeholder="1234 5678 9012 3456"
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
                                                required
                                            />
                                            <div className="absolute right-3 top-3 flex space-x-2">
                                                <span className="text-xs font-semibold text-gray-500">VISA</span>
                                                <span className="text-xs font-semibold text-gray-500">MC</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Expiry Date
                                            </label>
                                            <input
                                                type="text"
                                                name="expiry"
                                                value={cardDetails.expiry}
                                                onChange={handleCardInputChange}
                                                placeholder="MM/YY"
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                CVV
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="password"
                                                    name="cvv"
                                                    value={cardDetails.cvv}
                                                    onChange={handleCardInputChange}
                                                    placeholder="123"
                                                    maxLength="3"
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
                                                    required
                                                />
                                                <Lock className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Cardholder Name
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={cardDetails.name}
                                            onChange={handleCardInputChange}
                                            placeholder="John Doe"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
                                            required
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full cursor-pointer bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition duration-200 flex items-center justify-center"
                                    >
                                        {loading ? <span className="loading loading-spinner loading-sm"></span> : <span className='flex'><Lock className="w-5 h-5 mr-2" />
                                            Pay Now</span>}
                                    </button>
                                </form>
                            )}

                            {/* UPI Payment Form */}
                            {selectedMethod === 'upi' && (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            UPI ID
                                        </label>
                                        <input
                                            type="text"
                                            value={upiId}
                                            onChange={(e) => setUpiId(e.target.value)}
                                            placeholder="username@bank"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
                                            required
                                        />
                                        <p className="mt-2 text-sm text-gray-500">Enter your UPI ID (e.g., username@okbank)</p>
                                    </div>

                                    <div className="space-y-4">
                                        <h3 className="font-medium text-gray-700">Popular UPI Apps</h3>
                                        <div className="grid grid-cols-4 gap-3">
                                            {['Google Pay', 'PhonePe', 'Paytm', 'BHIM'].map((app) => (
                                                <button
                                                    key={app}
                                                    type="button"
                                                    className="p-3 border border-gray-200 rounded-lg hover:border-teal-400 hover:bg-teal-50 transition text-center"
                                                >
                                                    <div className="font-medium text-sm text-gray-700">{app}</div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition duration-200"
                                    >
                                        Verify & Pay
                                    </button>
                                </form>
                            )}

                            {/* Net Banking Form */}
                            {selectedMethod === 'netbanking' && (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-4">
                                            Select Your Bank
                                        </label>
                                        <div className="space-y-3">
                                            {banks.map((bank) => (
                                                <div
                                                    key={bank.id}
                                                    onClick={() => setSelectedBank(bank.id)}
                                                    className={`p-4 border rounded-lg cursor-pointer transition ${selectedBank === bank.id ? 'border-teal-500 bg-teal-50' : 'border-gray-200 hover:border-gray-300'}`}
                                                >
                                                    <div className="flex items-center">
                                                        <span className="text-2xl mr-4">{bank.logo}</span>
                                                        <span className="font-medium text-gray-800">{bank.name}</span>
                                                        {selectedBank === bank.id && (
                                                            <CheckCircle className="w-5 h-5 text-teal-500 ml-auto" />
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={!selectedBank}
                                        className={`w-full py-3 rounded-lg font-semibold transition duration-200 ${selectedBank ? 'bg-teal-600 hover:bg-teal-700 text-white cursor-pointer' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                                    >
                                        Continue to Bank
                                    </button>
                                </form>
                            )}
                        </div>


                    </div>

                    {/* Right Column - Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
                            <h2 className="text-xl font-semibold text-gray-800 mb-6">Order Summary</h2>

                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Subtotal</span>
                                    <span className="font-medium">₹{doctor?.consultationFee}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Platform Fee</span>
                                    <span className="font-medium">₹{platformFee}</span>
                                </div>

                                <div className="border-t pt-4">
                                    <div className="flex justify-between text-lg font-bold">
                                        <span>Total</span>
                                        <span className="text-teal-600">
                                            ₹ {totalAmount}
                                        </span>
                                    </div>
                                </div>

                            </div>

                            <div className="space-y-4 text-sm text-gray-600">
                                <div className="flex items-start">
                                    <CheckCircle className="w-4 h-4 text-teal-500 mr-2 mt-0.5 flex-shrink-0" />
                                    <span>Your payment is secured with 256-bit encryption</span>
                                </div>
                                <div className="flex items-start">
                                    <CheckCircle className="w-4 h-4 text-teal-500 mr-2 mt-0.5 flex-shrink-0" />
                                    <span>No extra charges for online payments</span>
                                </div>
                                <div className="flex items-start">
                                    <CheckCircle className="w-4 h-4 text-teal-500 mr-2 mt-0.5 flex-shrink-0" />
                                    <span>Instant payment confirmation</span>
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t">
                                <p className="text-xs text-gray-500 text-center">
                                    By completing your purchase, you agree to our Terms of Service and Privacy Policy.
                                    Your payment information is processed securely.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default QuickConsultDoctorPayment;