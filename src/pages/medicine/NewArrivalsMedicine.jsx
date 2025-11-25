// src/pages/medicine/NewArrivalsMedicine.jsx
import React, { useState, useEffect, useRef } from 'react';

function NewArrivalsMedicine() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const scrollContainerRef = useRef(null);

    const products = [
        {
            id: 1,
            image: 'https://images.pexels.com/photos/33756885/pexels-photo-33756885.jpeg',
            name: "Scalpe Plus Anti Dandruff Shampoo 75ml",
            currentPrice: "₹262.71",
            originalPrice: "₹1,315.00",
            discount: "17% OFF",
            hasDiscount: true,
            rating: 4.2,
            reviews: 128
        },
        {
            id: 2,
            image: 'https://images.pexels.com/photos/8088865/pexels-photo-8088865.jpeg',
            name: "Dr. Morepen Blood Pressure Monitor BP 14",
            currentPrice: "₹959.00",
            originalPrice: "₹1,400.00",
            discount: "32% OFF",
            hasDiscount: true,
            rating: 4.5,
            reviews: 89
        },
        {
            id: 3,
            image: 'https://media.istockphoto.com/id/163319574/photo/used-one-packs-of-pills.jpg?b=1&s=612x612&w=0&k=20&c=LzjxZIKAWGs_aY1xZJhui95EzjWu5zXFkTajndQ4znc=',
            name: "Maxirich Daily Multivitamin Capsules 10's",
            currentPrice: "₹299.40",
            originalPrice: "₹1,499.00",
            discount: "40% OFF",
            hasDiscount: true,
            rating: 4.1,
            reviews: 204
        },
        {
            id: 4,
            image: 'https://images.pexels.com/photos/7500228/pexels-photo-7500228.jpeg',
            name: "TEDIBAR BATHING Bar 3X75gm",
            currentPrice: "₹511.65",
            originalPrice: "",
            discount: "",
            hasDiscount: false,
            rating: 4.3,
            reviews: 67
        },
        {
            id: 5,
            image: 'https://images.pexels.com/photos/6823514/pexels-photo-6823514.jpeg',
            name: "SugarFit Smart Glucose Monitoring System",
            currentPrice: "₹4,473.60",
            originalPrice: "₹6,999.00",
            discount: "36% OFF",
            hasDiscount: true,
            rating: 4.7,
            reviews: 156
        },
        {
            id: 6,
            image: 'https://images.pexels.com/photos/28928000/pexels-photo-28928000.jpeg',
            name: "Vitamin C Immunity Boost Tablets 60's",
            currentPrice: "₹345.00",
            originalPrice: "₹690.00",
            discount: "50% OFF",
            hasDiscount: true,
            rating: 4.4,
            reviews: 312
        }
    ];


    // Auto-slide effect
    useEffect(() => {
        if (isPaused) return;

        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % products.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [isPaused, products.length]);

    // Scroll to current slide
    useEffect(() => {
        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            const card = container.children[currentSlide];
            if (card) {
                const scrollLeft = card.offsetLeft - container.offsetLeft - 20;
                container.scrollTo({
                    left: scrollLeft,
                    behavior: 'smooth'
                });
            }
        }
    }, [currentSlide]);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % products.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + products.length) % products.length);
    };

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    return (
        <div className="bg-gradient-to-br from-white to-teal-50 p-6 rounded-2xl shadow-xl my-8 border border-teal-100">
            {/* Header */}
            <div className="flex items-center justify-between ">
                <div>
                    <h1 className="text-xs md:text-lg font-bold text-gray-900">
                        New Arrivals
                    </h1>
                </div>

                {/* Navigation Controls */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={prevSlide}
                        className="p-3 rounded-full bg-white cursor-pointer shadow-lg hover:bg-teal-50 border border-teal-200 transition-all duration-200 hover:scale-110"
                        onMouseEnter={() => setIsPaused(true)}
                        onMouseLeave={() => setIsPaused(false)}
                    >
                        <svg className="w-3 h-3 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button
                        onClick={nextSlide}
                        className="p-3 rounded-full bg-white cursor-pointer shadow-lg hover:bg-teal-50 border border-teal-200 transition-all duration-200 hover:scale-110"
                        onMouseEnter={() => setIsPaused(true)}
                        onMouseLeave={() => setIsPaused(false)}
                    >
                        <svg className="w-3 h-3 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Slide Indicators */}
            <div className="flex justify-center gap-2 mb-6">
                {products.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide
                            ? 'bg-teal-600 w-8'
                            : 'bg-teal-300 hover:bg-teal-400'
                            }`}
                    />
                ))}
            </div>

            {/* Products Horizontal Scroll Container */}
            <div
                ref={scrollContainerRef}
                className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {products.map((product, index) => (
                    <div
                        key={product.id}
                        className={`flex-shrink-0 w-80 p-2 rounded-2xl  ${index === currentSlide
                            ? 'border-teal-500 shadow-2xl'
                            : 'border-gray-200 shadow-lg hover:border-teal-300'
                            }`}
                    >
                        {/* Product Image with Badge */}
                        <div className="relative p-6">
                            <div className="relative h-48 bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-32 h-32 object-contain transition-transform duration-300 hover:scale-110"
                                />

                                {/* Discount Badge */}
                                {product.hasDiscount && (
                                    <div className="absolute top-3 left-3 bg-red-500 text-white px-1 rounded-full text-xs py-1  shadow-lg">
                                        {product.discount}
                                    </div>
                                )}

                                {/* Rating Badge */}
                                <div className="absolute top-3 right-3 bg-white bg-opacity-90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1 text-sm font-semibold shadow-md">
                                    <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    <span className="text-gray-800">{product.rating}</span>
                                    <span className="text-gray-500 text-xs">({product.reviews})</span>
                                </div>
                            </div>
                        </div>

                        {/* Product Info */}
                        <div className="p-6 pt-0">
                            {/* Product Name */}
                            <h3 className="text-sm font-semibold text-gray-900 mb-3 leading-tight line-clamp-2">
                                {product.name}
                            </h3>

                            {/* Rating and Reviews */}
                            <div className="flex items-center gap-2 mb-4">
                                <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                        <svg
                                            key={i}
                                            className={`w-4 h-4 ${i < Math.floor(product.rating)
                                                ? 'text-yellow-400'
                                                : 'text-gray-300'
                                                }`}
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <span className="text-sm text-gray-600">({product.reviews} reviews)</span>
                            </div>

                            {/* Price Section */}
                            <div className="mb-4">
                                <div className="flex items-baseline gap-2">
                                    <span className="text-xs md:text-md font-bold text-gray-900">
                                        {product.currentPrice}
                                    </span>
                                    {product.hasDiscount && (
                                        <span className="text-xs md:text-sm text-gray-500 line-through">
                                            {product.originalPrice}
                                        </span>
                                    )}
                                </div>
                                {product.hasDiscount && (
                                    <div className="text-sm text-green-600 font-semibold mt-1">
                                        You save {product.discount}
                                    </div>
                                )}
                            </div>

                            {/* Add Button */}
                            <button
                                disabled={true}
                                className="w-full bg-gradient-to-r from-teal-600 to-teal-500 text-white font-semibold py-2 text-md px-6
                                    rounded-xl transition-all duration-300 transform shadow-lg flex items-center justify-center gap-2 group
                                    opacity-60 cursor-not-allowed"
                             >
                                Add to cart
                            </button>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default NewArrivalsMedicine;