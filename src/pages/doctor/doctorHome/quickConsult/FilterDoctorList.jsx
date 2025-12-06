// src/pages/doctor/doctorHome/quickConsult/FilterDoctorList.jsx
import React, { useEffect, useState } from 'react';
import {
  Search,
  Filter,
  Star,
  MapPin,
  Clock,
  CheckCircle,
  Award,
  Users,
  Calendar,
  X
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function FilterDoctorList({ categories = [], symptoms = [] }) {
  // If no props are passed, use default categories and symptoms
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }, [])

  const defaultCategories = [
    'General Physician', 'Cardiologist', 'Dermatologist', 'Pediatrician',
    'Orthopedic', 'Neurologist', 'Psychiatrist', 'Gynecologist',
    'ENT Specialist', 'Dentist', 'Ophthalmologist', 'Gastroenterologist'
  ];

  const defaultSymptoms = [
    'Fever', 'Cough', 'Headache', 'Fatigue', 'Body Pain',
    'Skin Rash', 'Stomach Pain', 'Chest Pain', 'Allergy',
    'Sore Throat', 'Back Pain', 'Anxiety', 'Insomnia', 'Joint Pain'
  ];

  const categoriesList = categories.length > 0 ? categories : defaultCategories;
  const symptomsList = symptoms.length > 0 ? symptoms : defaultSymptoms;

  // Dummy doctors data
  const dummyDoctors = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      specialization: 'General Physician',
      rating: 4.8,
      experience: 10,
      consultationFee: 500,
      availability: 'Available Today',
      nextSlot: '10:30 AM',
      languages: ['English', 'Hindi'],
      isVerified: true,
      imageColor: 'bg-teal-100',
      symptoms: ['Fever', 'Cough', 'Fatigue']
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      specialization: 'Cardiologist',
      rating: 4.9,
      experience: 15,
      consultationFee: 1200,
      availability: 'Available Tomorrow',
      nextSlot: '11:00 AM',
      languages: ['English'],
      isVerified: true,
      imageColor: 'bg-red-100',
      symptoms: ['Chest Pain', 'Fatigue']
    },
    {
      id: 3,
      name: 'Dr. Priya Sharma',
      specialization: 'Dermatologist',
      rating: 4.7,
      experience: 8,
      consultationFee: 800,
      availability: 'Available Today',
      nextSlot: '2:00 PM',
      languages: ['Hindi', 'English'],
      isVerified: true,
      imageColor: 'bg-purple-100',
      symptoms: ['Skin Rash', 'Allergy']
    },
    {
      id: 4,
      name: 'Dr. Robert Kim',
      specialization: 'Pediatrician',
      rating: 4.6,
      experience: 12,
      consultationFee: 600,
      availability: 'Available Today',
      nextSlot: '3:30 PM',
      languages: ['English', 'Spanish'],
      isVerified: true,
      imageColor: 'bg-teal-100',
      symptoms: ['Fever', 'Cough']
    },
    {
      id: 5,
      name: 'Dr. Anjali Mehta',
      specialization: 'Orthopedic',
      rating: 4.5,
      experience: 14,
      consultationFee: 900,
      availability: 'Available Tomorrow',
      nextSlot: '9:00 AM',
      languages: ['Hindi', 'English'],
      isVerified: true,
      imageColor: 'bg-yellow-100',
      symptoms: ['Joint Pain', 'Back Pain']
    },
    {
      id: 6,
      name: 'Dr. David Wilson',
      specialization: 'Neurologist',
      rating: 4.9,
      experience: 20,
      consultationFee: 1500,
      availability: 'Available Today',
      nextSlot: '4:00 PM',
      languages: ['English'],
      isVerified: true,
      imageColor: 'bg-indigo-100',
      symptoms: ['Headache', 'Insomnia']
    },
    {
      id: 7,
      name: 'Dr. Lisa Wong',
      specialization: 'Psychiatrist',
      rating: 4.7,
      experience: 9,
      consultationFee: 1000,
      availability: 'Available Tomorrow',
      nextSlot: '1:00 PM',
      languages: ['English', 'Mandarin'],
      isVerified: true,
      imageColor: 'bg-pink-100',
      symptoms: ['Anxiety', 'Insomnia']
    },
    {
      id: 8,
      name: 'Dr. James Patel',
      specialization: 'ENT Specialist',
      rating: 4.4,
      experience: 7,
      consultationFee: 700,
      availability: 'Available Today',
      nextSlot: '11:30 AM',
      languages: ['English', 'Gujarati'],
      isVerified: true,
      imageColor: 'bg-teal-100',
      symptoms: ['Sore Throat', 'Cough']
    },
    {
      id: 9,
      name: 'Dr. Maria Rodriguez',
      specialization: 'Gynecologist',
      rating: 4.8,
      experience: 11,
      consultationFee: 850,
      availability: 'Available Today',
      nextSlot: '12:00 PM',
      languages: ['English', 'Spanish'],
      isVerified: true,
      imageColor: 'bg-rose-100',
      symptoms: ['Stomach Pain']
    },
    {
      id: 10,
      name: 'Dr. Kevin Taylor',
      specialization: 'Dentist',
      rating: 4.3,
      experience: 6,
      consultationFee: 600,
      availability: 'Available Tomorrow',
      nextSlot: '10:00 AM',
      languages: ['English'],
      isVerified: true,
      imageColor: 'bg-cyan-100',
      symptoms: ['Body Pain']
    },
    {
      id: 11,
      name: 'Dr. Sunita Verma',
      specialization: 'Ophthalmologist',
      rating: 4.6,
      experience: 13,
      consultationFee: 900,
      availability: 'Available Today',
      nextSlot: '2:30 PM',
      languages: ['Hindi', 'English'],
      isVerified: true,
      imageColor: 'bg-teal-50',
      symptoms: ['Headache']
    },
    {
      id: 12,
      name: 'Dr. Andrew Park',
      specialization: 'Gastroenterologist',
      rating: 4.7,
      experience: 16,
      consultationFee: 1100,
      availability: 'Available Tomorrow',
      nextSlot: '3:00 PM',
      languages: ['English', 'Korean'],
      isVerified: true,
      imageColor: 'bg-orange-100',
      symptoms: ['Stomach Pain', 'Fatigue']
    },
    {
      id: 13,
      name: 'Dr. Neha Gupta',
      specialization: 'General Physician',
      rating: 4.5,
      experience: 5,
      consultationFee: 400,
      availability: 'Available Today',
      nextSlot: '4:30 PM',
      languages: ['Hindi', 'English'],
      isVerified: true,
      imageColor: 'bg-emerald-100',
      symptoms: ['Fever', 'Body Pain']
    },
    {
      id: 14,
      name: 'Dr. Thomas Lee',
      specialization: 'Cardiologist',
      rating: 4.8,
      experience: 18,
      consultationFee: 1400,
      availability: 'Available Today',
      nextSlot: '5:00 PM',
      languages: ['English'],
      isVerified: true,
      imageColor: 'bg-red-50',
      symptoms: ['Chest Pain', 'Fatigue']
    },
    {
      id: 15,
      name: 'Dr. Emily Davis',
      specialization: 'Dermatologist',
      rating: 4.4,
      experience: 7,
      consultationFee: 750,
      availability: 'Available Tomorrow',
      nextSlot: '11:00 AM',
      languages: ['English'],
      isVerified: true,
      imageColor: 'bg-purple-50',
      symptoms: ['Skin Rash', 'Allergy']
    },
    {
      id: 16,
      name: 'Dr. Rajesh Kumar',
      specialization: 'Pediatrician',
      rating: 4.7,
      experience: 9,
      consultationFee: 550,
      availability: 'Available Today',
      nextSlot: '1:30 PM',
      languages: ['Hindi', 'English'],
      isVerified: true,
      imageColor: 'bg-teal-50',
      symptoms: ['Fever', 'Cough']
    },
    {
      id: 17,
      name: 'Dr. Sophia Williams',
      specialization: 'Orthopedic',
      rating: 4.6,
      experience: 11,
      consultationFee: 850,
      availability: 'Available Tomorrow',
      nextSlot: '2:00 PM',
      languages: ['English'],
      isVerified: true,
      imageColor: 'bg-amber-50',
      symptoms: ['Joint Pain', 'Back Pain']
    },
    {
      id: 18,
      name: 'Dr. Alex Morgan',
      specialization: 'Psychiatrist',
      rating: 4.9,
      experience: 14,
      consultationFee: 1200,
      availability: 'Available Today',
      nextSlot: '3:30 PM',
      languages: ['English'],
      isVerified: true,
      imageColor: 'bg-pink-50',
      symptoms: ['Anxiety', 'Insomnia']
    },
    {
      id: 19,
      name: 'Dr. Nisha Singh',
      specialization: 'ENT Specialist',
      rating: 4.5,
      experience: 8,
      consultationFee: 650,
      availability: 'Available Tomorrow',
      nextSlot: '10:30 AM',
      languages: ['Hindi', 'English'],
      isVerified: true,
      imageColor: 'bg-teal-50',
      symptoms: ['Sore Throat']
    },
    {
      id: 20,
      name: 'Dr. Brian Carter',
      specialization: 'Gynecologist',
      rating: 4.7,
      experience: 10,
      consultationFee: 800,
      availability: 'Available Today',
      nextSlot: '12:30 PM',
      languages: ['English'],
      isVerified: true,
      imageColor: 'bg-rose-50',
      symptoms: ['Stomach Pain']
    }
  ];

  // State for filters
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('rating');

  // State for mobile UI
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [activeMobileTab, setActiveMobileTab] = useState('search');
  const navigate = useNavigate()
  // Filter doctors based on selected filters
  const filteredDoctors = dummyDoctors.filter(doctor => {
    // Filter by category
    if (selectedCategory !== 'All' && doctor.specialization !== selectedCategory) {
      return false;
    }

    // Filter by symptoms (if any selected)
    if (selectedSymptoms.length > 0) {
      const hasMatchingSymptom = selectedSymptoms.some(symptom =>
        doctor.symptoms.includes(symptom)
      );
      if (!hasMatchingSymptom) return false;
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        doctor.name.toLowerCase().includes(query) ||
        doctor.specialization.toLowerCase().includes(query) ||
        doctor.languages.some(lang => lang.toLowerCase().includes(query))
      );
    }

    return true;
  });

  // Sort doctors
  const sortedDoctors = [...filteredDoctors].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'experience':
        return b.experience - a.experience;
      case 'fee':
        return a.consultationFee - b.consultationFee;
      case 'availability':
        return a.availability === 'Available Today' ? -1 : 1;
      default:
        return 0;
    }
  });

  // Toggle symptom selection
  const toggleSymptom = (symptom) => {
    setSelectedSymptoms(prev =>
      prev.includes(symptom)
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    );
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedCategory('All');
    setSelectedSymptoms([]);
    setSearchQuery('');
    setShowSearchInput(false);
  };

  // Handle search icon click on mobile
  const handleSearchIconClick = () => {
    setShowSearchInput(true);
    setActiveMobileTab('search');
    setShowFilterPanel(false);
  };

  // Handle filter icon click on mobile
  const handleFilterIconClick = () => {
    setShowFilterPanel(!showFilterPanel);
    setActiveMobileTab('filter');
    setShowSearchInput(false);
  };

  // Close search input on mobile
  const closeSearchInput = () => {
    setShowSearchInput(false);
  };

  // Handle mobile tab change
  const handleMobileTabChange = (tab) => {
    setActiveMobileTab(tab);
    if (tab === 'search') {
      setShowSearchInput(true);
      setShowFilterPanel(false);
    } else if (tab === 'filter') {
      setShowSearchInput(false);
      setShowFilterPanel(true);
    }
  };


  const handleBookAppointment = (doctor) => {
    // console.log("chekc",doctor)
    navigate('/doctor/quick-consult/payment', { state: { doctor } });
  };


  return (
    <div className="">
      <div className="">
        {/* Header */}
        <div className="my-2">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Your Doctor</h1>
          <p className="text-gray-600">Book appointments with top-rated doctors online</p>
        </div>

        {/* Mobile Search and Filter Bar */}
        <div className="lg:hidden mb-6">
          {/* Mobile Search Input (Full width when active) */}
          {showSearchInput && (
            <div className="mb-4 bg-white p-3 rounded-xl shadow-sm">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search doctors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
                <button
                  onClick={closeSearchInput}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {/* Mobile Tabs Navigation */}
          <div className="bg-white rounded-xl shadow-sm p-2 mb-4">
            <div className="flex space-x-2">
              {/* Search Tab */}
              <button
                onClick={() => handleMobileTabChange('search')}
                className={`flex-1 flex items-center justify-center py-3 px-4 rounded-lg transition ${activeMobileTab === 'search' ? 'bg-teal-50 text-teal-600 border border-teal-200' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                <Search className="w-5 h-5 mr-2" />
                <span className="font-medium">Search</span>
              </button>

              {/* Filter Tab */}
              <button
                onClick={() => handleMobileTabChange('filter')}
                className={`flex-1 flex items-center justify-center py-3 px-4 rounded-lg transition ${activeMobileTab === 'filter' ? 'bg-teal-50 text-teal-600 border border-teal-200' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                <Filter className="w-5 h-5 mr-2" />
                <span className="font-medium">Filters</span>
                {(selectedCategory !== 'All' || selectedSymptoms.length > 0) && (
                  <span className="ml-2 bg-teal-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {(selectedCategory !== 'All' ? 1 : 0) + selectedSymptoms.length}
                  </span>
                )}
              </button>

              {/* Sort Tab */}
              <button
                onClick={() => handleMobileTabChange('sort')}
                className={`flex-1 flex items-center justify-center py-3 px-4 rounded-lg transition ${activeMobileTab === 'sort' ? 'bg-teal-50 text-teal-600 border border-teal-200' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
                </svg>
                <span className="font-medium">Sort</span>
              </button>
            </div>
          </div>

          {/* Mobile Filter Panel */}
          {showFilterPanel && (
            <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-800">Filters</h3>
                <button
                  onClick={() => setShowFilterPanel(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Category Filter */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedCategory('All')}
                    className={`px-3 py-2 rounded-lg text-sm transition ${selectedCategory === 'All' ? 'bg-teal-50 text-teal-600 border border-teal-200' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  >
                    All
                  </button>
                  {categoriesList.slice(0, 4).map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-3 py-2 rounded-lg text-sm transition ${selectedCategory === category ? 'bg-teal-50 text-teal-600 border border-teal-200' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                    >
                      {category.split(' ')[0]}
                    </button>
                  ))}
                  {categoriesList.length > 4 && (
                    <button
                      onClick={() => handleMobileTabChange('categories')}
                      className="px-3 py-2 rounded-lg text-sm bg-gray-100 text-gray-700 hover:bg-gray-200"
                    >
                      +{categoriesList.length - 4} more
                    </button>
                  )}
                </div>
              </div>

              {/* Symptoms Filter */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Symptoms
                </label>
                <div className="flex flex-wrap gap-2">
                  {symptomsList.slice(0, 4).map((symptom) => (
                    <button
                      key={symptom}
                      onClick={() => toggleSymptom(symptom)}
                      className={`px-3 py-2 rounded-lg text-sm transition flex items-center ${selectedSymptoms.includes(symptom) ? 'bg-teal-50 text-teal-600 border border-teal-200' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                    >
                      {symptom}
                      {selectedSymptoms.includes(symptom) && (
                        <X className="w-3 h-3 ml-1" />
                      )}
                    </button>
                  ))}
                  {symptomsList.length > 4 && (
                    <button
                      onClick={() => handleMobileTabChange('symptoms')}
                      className="px-3 py-2 rounded-lg text-sm bg-gray-100 text-gray-700 hover:bg-gray-200"
                    >
                      +{symptomsList.length - 4} more
                    </button>
                  )}
                </div>
              </div>

              <div className="flex space-x-2 pt-4 border-t">
                <button
                  onClick={clearFilters}
                  className="flex-1 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Clear All
                </button>
                <button
                  onClick={() => setShowFilterPanel(false)}
                  className="flex-1 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          )}

          {/* Mobile Sort Panel */}
          {activeMobileTab === 'sort' && (
            <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-800">Sort By</h3>
                <button
                  onClick={() => setActiveMobileTab('filter')}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-2">
                {[
                  { value: 'rating', label: 'Highest Rating' },
                  { value: 'experience', label: 'Most Experienced' },
                  { value: 'fee', label: 'Lowest Fee' },
                  { value: 'availability', label: 'Availability' }
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setSortBy(option.value);
                      setActiveMobileTab('filter');
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg transition ${sortBy === option.value ? 'bg-teal-50 text-teal-600 border border-teal-200' : 'hover:bg-gray-50'}`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Filters (Desktop) */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-20">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-800">Filters</h2>
                <button
                  onClick={clearFilters}
                  className="text-sm text-teal-600 hover:text-teal-700 font-medium"
                >
                  Clear All
                </button>
              </div>

              {/* Search Input */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search Doctors
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by name or specialization..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedCategory('All')}
                    className={`w-full text-left px-3 py-2 rounded-lg transition ${selectedCategory === 'All' ? 'bg-teal-50 text-teal-600 border border-teal-200' : 'hover:bg-gray-50'}`}
                  >
                    All Categories
                  </button>
                  {categoriesList.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition ${selectedCategory === category ? 'bg-teal-50 text-teal-600 border border-teal-200' : 'hover:bg-gray-50'}`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Symptoms Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Symptoms
                </label>
                <div className="space-y-2">
                  {symptomsList.map((symptom) => (
                    <button
                      key={symptom}
                      onClick={() => toggleSymptom(symptom)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition flex items-center justify-between ${selectedSymptoms.includes(symptom) ? 'bg-teal-50 text-teal-600 border border-teal-200' : 'hover:bg-gray-50'}`}
                    >
                      <span>{symptom}</span>
                      {selectedSymptoms.includes(symptom) && (
                        <CheckCircle className="w-4 h-4" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort Options */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                >
                  <option value="rating">Highest Rating</option>
                  <option value="experience">Most Experienced</option>
                  <option value="fee">Lowest Fee</option>
                  <option value="availability">Availability</option>
                </select>
              </div>
            </div>
          </div>

          {/* Main Content - Doctors List */}
          <div className="lg:col-span-3">
            {/* Stats Bar */}
            <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
              <div className="flex flex-wrap items-center justify-between">
                <div>
                  <p className="text-gray-600">
                    Showing <span className="font-semibold">{sortedDoctors.length}</span> of{' '}
                    <span className="font-semibold">{dummyDoctors.length}</span> doctors
                  </p>
                  {selectedSymptoms.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className="text-sm text-gray-500">Symptoms:</span>
                      {selectedSymptoms.map(symptom => (
                        <span
                          key={symptom}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-teal-100 text-teal-800"
                        >
                          {symptom}
                          <button
                            onClick={() => toggleSymptom(symptom)}
                            className="ml-2 text-teal-600 hover:text-teal-800"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                {selectedCategory !== 'All' && (
                  <div className="flex items-center mt-2 lg:mt-0">
                    <Filter className="w-4 h-4 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-600">
                      Category: <span className="font-semibold">{selectedCategory}</span>
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Search Icon (when search input is hidden) */}


            {/* Doctors Grid */}
            {sortedDoctors.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {sortedDoctors.map((doctor) => (
                  <div
                    key={doctor.id}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start space-x-4">
                          <div className={`${doctor.imageColor} w-16 h-16 rounded-full flex items-center justify-center`}>
                            <Users className="w-8 h-8 text-gray-600" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="text-lg font-semibold text-gray-900">
                                {doctor.name}
                              </h3>
                              {doctor.isVerified && (
                                <Award className="w-5 h-5 text-teal-500" />
                              )}
                            </div>
                            <p className="text-teal-600 font-medium">{doctor.specialization}</p>
                            <div className="flex items-center mt-1">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span className="ml-1 text-gray-700 font-medium">
                                {doctor.rating}
                              </span>
                              <span className="mx-2 text-gray-300">•</span>
                              <span className="text-gray-600">
                                {doctor.experience} years experience
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-teal-700">
                            ₹{doctor.consultationFee}
                          </div>
                          <div className="text-sm text-gray-500">Consultation fee</div>
                        </div>
                      </div>

                      <div className=" flex justify-center items-center gap-2">
                        <div className="flex items-center text-gray-600 text-xs md:text-[14px]">
                          <Clock className="md:w-4 md:h-4 mr-2 w-3 h-3" />
                          <span className="font-medium">{doctor.availability}</span>
                          <span className="mx-2">•</span>
                          <span>Next slot: {doctor.nextSlot}</span>
                        </div>

                        <div className="flex items-center text-gray-600 text-xs md:text-[14px]">
                          <span className="mx-2">•</span>
                          <MapPin className="w-4 h-4 mr-2" />
                          <span>Languages: {doctor.languages.join(', ')}</span>
                        </div>


                      </div>
                      <div>
                        {doctor.symptoms && doctor.symptoms.length > 0 && (
                          <div>
                            <div className="flex flex-wrap gap-2 mt-1">
                              {doctor.symptoms.map(symptom => (
                                <span
                                  key={symptom}
                                  className="px-2 py-1 bg-teal-50 text-teal-600 text-xs rounded-full"
                                >
                                  {symptom}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="pt-4 border-t">
                          <button
                            onClick={() => handleBookAppointment(doctor)}
                            className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-lg  transition duration-200">
                            Book Appointment
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  No doctors found
                </h3>
                <p className="text-gray-500 mb-6">
                  Try adjusting your filters or search criteria
                </p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition duration-200"
                >
                  Clear All Filters
                </button>
              </div>
            )}

            {/* Load More */}
            {sortedDoctors.length > 0 && (
              <div className="mt-8 text-center">
                <button className="px-8 py-3 border-2 border-teal-600 text-teal-600 rounded-lg hover:bg-teal-50 transition duration-200 font-medium">
                  Load More Doctors
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterDoctorList;