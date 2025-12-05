// src/pages/lab/labhome/LabPopularPackages.jsx

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPopularPackages } from '../../../redux/features/labSilice';
import { useAuth } from "../../../Authorization/AuthContext";
import { useNavigate } from 'react-router-dom';
import LoadingAnimation from '../../../LoaderSpinner';
import axiosInstance from '../../../Authorization/axiosInstance';
import { useLabAuth } from '../../../Authorization/LabAuthContext';

function LabPopularPackages() {
  const [pageSize, setPageSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  const [distance] = useState(5);

  const { getAllLabCartItems, labCartItems } = useLabAuth();
  const [packageId, setPackageId] = useState(null);

  const dispatch = useDispatch();
  const { latitude, longitude, userData, setAuthModal } = useAuth();
  const navigate = useNavigate();
  const id = userData?.id;

  const { packages, loading } = useSelector((state) => state.packages);

  // === FETCH ONLY IF STORE IS EMPTY ===
  useEffect(() => {
    if (!latitude || !longitude) return;

    if (!packages || packages.length === 0) {
      dispatch(
        fetchPopularPackages({
          pageSize,
          pageNumber,
          latitude,
          longitude,
          distance,
        })
      );
    }
  }, [latitude, longitude, dispatch]);

  const loadMore = () => {
    setPageSize((prev) => prev + 10);

    dispatch(
      fetchPopularPackages({
        pageSize: pageSize + 10,
        pageNumber,
        latitude,
        longitude,
        distance,
      })
    );
  };

  // === CHECK IF PACKAGE ALREADY IN CART ===
  const isAlreadyInCart = (pkgId) => {
    return labCartItems?.some((cart) => cart.labPackage?.id === pkgId);
  };

  // === ADD TO CART ===
  const handleAddtoCart = async (e, item) => {
    e.stopPropagation();

    if (!id) {
      setAuthModal(true);
      return;
    }

    try {
      setPackageId(item.labPackage.id);

      const response = await axiosInstance.post(
        `endUserEndPoint/addTestPackageToCart?userId=${id}&packageId=${item.labPackage.id}`
      );

      await getAllLabCartItems();
      setPackageId(null);
    } catch (error) {
      console.log("Error adding to cart:", error);
      setPackageId(null);
    }
  };

  return (
    <div className="w-full my-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Popular Lab Packages</h2>
          <p className="text-gray-600 mt-1">Find the best health checkup packages near you</p>
        </div>
      </div>

      {/* LOADING */}
      {loading && packages.length === 0 && <LoadingAnimation />}

      {/* PACKAGES GRID */}
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 md:gap-6">
        {packages.map((item, index) => (
          <div
            key={index}
            onClick={() => navigate('/lab/labPackage_details', { state: item })}
            className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-teal-200 overflow-hidden transform hover:-translate-y-1 cursor-pointer"
          >
            {/* Top Section */}
            <div className="relative">
              <img
                src={item.labPackage.tests[0].imagesUrl[0]}
                alt="Package"
                className="w-full h-32 md:h-36 object-cover group-hover:scale-105 transition-transform duration-300"
              />

              {/* Distance */}
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
                <span className="text-xs font-semibold text-gray-700 flex items-center">
                  <svg className="w-3 h-3 mr-1 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  {item.distance.toFixed(1)} km
                </span>
              </div>

              {/* Discount */}
              {item.labPackage.discount > 0 && (
                <div className="absolute top-3 right-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-2 py-1 rounded-full shadow-lg">
                  <span className="text-xs font-bold">{item.labPackage.discount}% OFF</span>
                </div>
              )}
            </div>

            {/* Content Section */}
            <div className="p-4">
              <h3 className="font-bold text-gray-900 text-sm md:text-base leading-tight line-clamp-2 group-hover:text-teal-700 transition-colors min-h-[2.5rem]">
                {item.labPackage.packageName}
              </h3>

              <p className="text-gray-600 text-xs mt-1 line-clamp-2 leading-relaxed">
                {item.labPackage.description}
              </p>

              {/* Price */}
              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-baseline gap-2">
                  <span className="text-lg md:text-xl font-bold text-teal-700">
                    ₹{item.labPackage.price}
                  </span>
                </div>
              </div>

              {/* === BUTTON SECTION === */}
              <div className="mt-4">
                {isAlreadyInCart(item.labPackage.id) ? (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate("/lab/cartitems");
                    }}
                    className="w-full border border-teal-700 text-teal-700 hover:bg-teal-100 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-md hover:shadow-lg"
                  >
                    Go to Cart
                  </button>
                ) : (
                  <button
                    onClick={(e) => handleAddtoCart(e, item)}
                    className="w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 transform hover:scale-[1.02] shadow-md hover:shadow-lg"
                  >
                    {packageId === item.labPackage.id ? (
                      <span className="loading loading-spinner loading-sm"></span>
                    ) : (
                      "Add to Cart"
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* LOAD MORE */}
      {!loading && packages.length > 0 && (
        <div className="flex justify-center mt-8">
          <button
            onClick={loadMore}
            className="px-8 py-3 bg-white border border-teal-600 text-teal-700 rounded-xl hover:bg-teal-50 hover:border-teal-700 transition-all duration-300 font-semibold shadow-sm hover:shadow-md flex items-center gap-2"
          >
            Load More
          </button>
        </div>
      )}

      {/* PAGINATION LOADING */}
      {loading && packages.length > 0 && (
        <div className="flex justify-center items-center mt-6 py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600 mr-3"></div>
          <span className="text-gray-600">Loading more packages...</span>
        </div>
      )}

      {/* NO DATA */}
      {!loading && packages.length === 0 && (
        <div className="text-center py-12 text-gray-600">No packages found.</div>
      )}
    </div>
  );
}

export default LabPopularPackages;
