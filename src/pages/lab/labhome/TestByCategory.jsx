// src/pages/lab/labhome/TestByCategory.jsx
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchTestByVitalOrgan } from '../../../redux/features/labSilice';
import { useAuth } from '../../../Authorization/AuthContext';
import { useNavigate } from 'react-router-dom';

function TestByCategory() {
    const dispatch = useDispatch();
    const { latitude, longitude } = useAuth();
    const navigate = useNavigate();

    const [distance, setDistance] = useState(5);
    const [categoryList, setCategoryList] = useState([]);
    const [symtomList, setSymtomList] = useState([]);
    const [vitalOrganList, setVitalOrganList] = useState([]);
    const [activeTab, setActiveTab] = useState('category');

    const { organList, loading } = useSelector((state) => state.packages);

    useEffect(() => {
        if (!vitalOrganList.length > 0) {
            dispatch(fetchTestByVitalOrgan({ latitude, longitude, distance }));
        }
    }, [vitalOrganList]);

    useEffect(() => {
        if (organList?.response) {
            dispatch(fetchTestByVitalOrgan({ latitude, longitude, distance }));
        }
    }, [distance]);

    useEffect(() => {
        if (organList?.response) {
            setCategoryList(organList.response.category || []);
            setSymtomList(organList.response.symptom || []);
            setVitalOrganList(organList.response.vitalOrgan || []);
        }
    }, [organList]);


    // -----------------------
    // CARD COMPONENT
    // -----------------------
    const CategoryCard = ({ item, type, index }) => {
        const [isHovered, setIsHovered] = useState(false);

        const getTypeStyles = () => {
            switch (type) {
                case 'category':
                    return {
                        gradient: 'from-teal-500 via-teal-700 to-teal-400',
                        bg: '',
                        text: 'text-blue-600'
                    };
                case 'symptom':
                    return {
                        gradient: 'from-green-200 via-teal-500 to-teal-700',
                        bg: 'bg-green-50',
                        text: 'text-green-600'
                    };
                case 'vitalOrgan':
                    return {
                        gradient: 'from-teal-200 via-teal-500 to-teal-800',
                        bg: 'bg-purple-50',
                        text: 'text-purple-600'
                    };
                default:
                    return {
                        gradient: 'from-gray-500 via-gray-600 to-gray-700',
                        bg: 'bg-gray-50',
                        text: 'text-gray-600'
                    };
            }
        };

        const styles = getTypeStyles();

        return (
            <div
                className={`relative p-0.5 rounded-2xl m-2 bg-gradient-to-r ${styles.gradient} transition-all duration-500 hover:shadow-2xl cursor-pointer group`}
                onClick={() => navigate('/lab/package/Alltests', { state: item })}
            >
                <div className="relative bg-white rounded-2xl p-4 h-full">
                    <div className="flex items-center justify-between mb-3">
                        <div className={`p-2 rounded-xl ${styles.bg}`}></div>
                        <div className="text-right">
                            <span className="text-2xl font-bold text-gray-900">{item.count}</span>
                            <p className="text-xs text-gray-500">Tests</p>
                        </div>
                    </div>

                    <h3 className="font-semibold text-gray-900 text-sm md:text-base mb-2">
                        {item.name}
                    </h3>
                    <p className="text-xs text-gray-500 capitalize mb-3">
                        {type}
                    </p>

                    <button className={`w-full py-2 text-xs font-semibold rounded-xl border border-gray-300 text-teal-700 hover:bg-teal-50`}>
                        View Tests
                    </button>
                </div>
            </div>
        );
    };


    // -----------------------
    // TAB BUTTON COMPONENT
    // -----------------------
    const TabButton = ({ tab, label, count, icon, isActive }) => (
        <button
            onClick={() => setActiveTab(tab)}
            className={`flex items-center space-x-3 px-4 py-3 rounded-xl font-medium text-sm border-2
                ${isActive
                    ? 'border-teal-500 bg-teal-50 text-teal-700 shadow-md'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-teal-300 hover:bg-teal-50'
                }`}
        >
            {icon}
            <span className="font-semibold">{label}</span>
            {count > 0 && (
                <span className={`px-2 py-1 rounded-full text-xs font-bold 
                    ${isActive ? 'bg-teal-500 text-white' : 'bg-gray-100 text-gray-600'}`}>
                    {count}
                </span>
            )}
        </button>
    );


    // -----------------------
    // RENDER CONTENT
    // -----------------------
    const renderContent = () => {
        const data =
            activeTab === 'category'
                ? categoryList
                : activeTab === 'symptom'
                    ? symtomList
                    : vitalOrganList;

        if (loading) {
            return (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {[...Array(10)].map((_, i) => (
                        <div key={i} className="bg-white rounded-2xl p-4 animate-pulse border border-gray-100" />
                    ))}
                </div>
            );
        }

        if (!data?.length) {
            return (
                <div className="text-center py-12 bg-white rounded-2xl border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        No {activeTab} data found
                    </h3>
                    <p className="text-gray-600">Try adjusting your search criteria</p>
                </div>
            );
        }

        return (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {data.map((item, index) => (
                    <CategoryCard key={index} item={item} type={activeTab} index={index} />
                ))}
            </div>
        );
    };


    // -----------------------
    // MAIN RETURN
    // -----------------------
    return (
        <div className="w-full mx-auto py-8">

            {/* Header */}
            <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                    Find Tests by Category
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Browse tests organized by categories, symptoms and vital organs
                </p>
            </div>

            {/* Distance Filter */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Search within distance:
                </label>

                <div className="flex items-center space-x-3">
                    <input
                        type="range"
                        min="1"
                        max="50"
                        value={distance}
                        onChange={(e) => setDistance(Number(e.target.value))}
                        className="w-48 h-2 bg-teal-700 rounded-lg cursor-pointer"
                    />
                    <span className="text-sm font-semibold text-teal-700 bg-teal-50 px-3 py-1 rounded-full">
                        {distance} km
                    </span>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex flex-wrap gap-3 mb-8">
                <TabButton
                    tab="category"
                    label="Categories"
                    count={categoryList.length}
                    isActive={activeTab === 'category'}
                />
                <TabButton
                    tab="symptom"
                    label="Symptoms"
                    count={symtomList.length}
                    isActive={activeTab === 'symptom'}
                />
                <TabButton
                    tab="vitalOrgan"
                    label="Vital Organs"
                    count={vitalOrganList.length}
                    isActive={activeTab === 'vitalOrgan'}
                />
            </div>

            {/* Content */}
            {renderContent()}

            {/* Footer */}
            {!loading && (
                <div className="mt-6 text-center">
                    <p className="text-gray-600">
                        <span className="font-semibold text-teal-700">
                            {
                                activeTab === 'category'
                                    ? categoryList.length
                                    : activeTab === 'symptom'
                                        ? symtomList.length
                                        : vitalOrganList.length
                            }
                        </span>{' '}
                        {activeTab} available in your area
                    </p>
                </div>
            )}
        </div>
    );
}

export default TestByCategory;
