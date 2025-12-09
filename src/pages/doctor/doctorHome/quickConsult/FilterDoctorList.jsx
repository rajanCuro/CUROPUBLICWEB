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
  X,
  Heart,
  MessageCircle,
  Phone
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { RiStethoscopeFill } from "react-icons/ri";
import { CiSearch } from "react-icons/ci";



function FilterDoctorList({ categories = [], symptoms = [] }) {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }, [])

  // Updated categories to match the screenshot
  const categoriesList = [
    {
      category: 'Cardiology',
      image: 'https://cdn-icons-png.flaticon.com/128/10154/10154414.png',
      description: 'Heart and cardiovascular system',
      color: 'red'
    },
    {
      category: 'Neurology',
      image: 'https://cdn-icons-png.flaticon.com/128/9133/9133531.png',
      description: 'Brain and nervous system',
      color: 'purple'
    },
    {
      category: 'Orthopedics',
      image: 'https://cdn-icons-png.flaticon.com/128/7350/7350861.png',
      description: 'Bones and musculoskeletal system',
      color: 'blue'
    },
    {
      category: 'Pediatrics',
      image: 'https://cdn-icons-png.flaticon.com/128/10154/10154319.png',
      description: 'Children\'s health and development',
      color: 'pink'
    },
    {
      category: 'Dermatology',
      image: 'https://cdn-icons-png.flaticon.com/128/7305/7305189.png',
      description: 'Skin, hair, and nails',
      color: 'orange'
    },
    {
      category: 'Ophthalmology',
      image: 'https://cdn-icons-png.flaticon.com/128/4702/4702277.png',
      description: 'Eyes and vision',
      color: 'teal'
    },
    {
      category: 'ENT',
      image: 'https://cdn-icons-png.flaticon.com/128/2721/2721021.png',
      description: 'Ear, Nose, and Throat',
      color: 'green'
    },
    {
      category: 'Oncology',
      image: 'https://cdn-icons-png.flaticon.com/128/18196/18196941.png',
      description: 'Cancer treatment and research',
      color: 'yellow'
    },
    {
      category: 'Gastroenterology',
      image: 'https://cdn-icons-png.flaticon.com/128/8549/8549885.png',
      description: 'Digestive system',
      color: 'brown'
    },
    {
      category: 'Dentistry',
      image: 'https://cdn-icons-png.flaticon.com/128/15595/15595467.png',
      description: 'Teeth and oral health',
      color: 'cyan'
    },
    {
      category: 'Physiotherapy',
      image: 'https://cdn-icons-png.flaticon.com/128/2277/2277789.png',
      description: 'Physical rehabilitation',
      color: 'indigo'
    },
    {
      category: 'General Medicine',
      image: 'https://cdn-icons-png.flaticon.com/128/17281/17281958.png',
      description: 'Primary healthcare services',
      color: 'gray'
    }
  ];

  // Updated symptoms to match the screenshot
  const symptomsList = [
    { symptom: 'Fever', icon: '🌡️', category: 'General' },
    { symptom: 'Headache', icon: '🤕', category: 'Neurological' },
    { symptom: 'Cough', icon: '😷', category: 'Respiratory' },
    { symptom: 'Sore Throat', icon: '🗣️', category: 'ENT' },
    { symptom: 'Fatigue', icon: '😴', category: 'General' },
    { symptom: 'Muscle Pain', icon: '💪', category: 'Musculoskeletal' },
    { symptom: 'Diarrhea', icon: '💦', category: 'Gastrointestinal' },
    { symptom: 'Rash', icon: '🔴', category: 'Dermatological' },
    { symptom: 'Chest Pain', icon: '❤️', category: 'Cardiac' },
    { symptom: 'Back Pain', icon: '🧍', category: 'Musculoskeletal' },
    { symptom: 'Abdominal Pain', icon: '🤰', category: 'Gastrointestinal' }
  ];
  // const categoriesList = categories.length > 0 ? categories : defaultCategories;
  // const symptomsList = symptoms.length > 0 ? symptoms : defaultSymptoms;

  // Updated doctors data to match the screenshot
  const dummyDoctors = [
    {
      id: 1,
      image: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg',
      name: 'Dr. Anya Sharma',
      specialization: 'Cardiology',
      experience: 12,
      rating: 4.8,
      isVerified: true,
      imageColor: 'bg-red-100',
      languages: ['English', 'Hindi'],
      availability: 'Available Today',
      nextSlot: '10:30 AM',
      consultationFee: 1500,
      symptoms: ['Chest Pain', 'Fatigue']
    },
    {
      id: 2,
      image: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg',
      name: 'Dr. Ben Carter',
      specialization: 'Dermatology',
      experience: 8,
      rating: 4.7,
      isVerified: true,
      imageColor: 'bg-purple-100',
      languages: ['English'],
      availability: 'Available Tomorrow',
      nextSlot: '11:00 AM',
      consultationFee: 800,
      symptoms: ['Rash', 'Skin Allergy']
    },
    {
      id: 3,
      image: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg',
      name: 'Dr. Clara Rodriguez',
      specialization: 'Pediatrics',
      experience: 15,
      rating: 4.9,
      isVerified: true,
      imageColor: 'bg-teal-100',
      languages: ['English', 'Spanish'],
      availability: 'Available Today',
      nextSlot: '2:00 PM',
      consultationFee: 600,
      symptoms: ['Fever', 'Cough']
    },
    {
      id: 4,
      image: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg',
      name: 'Dr. David Lee',
      specialization: 'Neurology',
      experience: 10,
      rating: 4.6,
      isVerified: true,
      imageColor: 'bg-indigo-100',
      languages: ['English'],
      availability: 'Available Today',
      nextSlot: '3:30 PM',
      consultationFee: 1200,
      symptoms: ['Headache', 'Migraine']
    },
    {
      id: 5,
      image: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg',
      name: 'Dr. Emily White',
      specialization: 'Orthopedics',
      experience: 18,
      rating: 4.5,
      isVerified: true,
      imageColor: 'bg-yellow-100',
      languages: ['English'],
      availability: 'Available Tomorrow',
      nextSlot: '9:00 AM',
      consultationFee: 900,
      symptoms: ['Back Pain', 'Muscle Pain']
    },
    {
      id: 6,
      image: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg',
      name: 'Dr. Alex Green',
      specialization: 'Gastroenterology',
      experience: 7,
      rating: 4.4,
      isVerified: true,
      imageColor: 'bg-orange-100',
      languages: ['English'],
      availability: 'Available Today',
      nextSlot: '4:00 PM',
      consultationFee: 1100,
      symptoms: ['Abdominal Pain', 'Diarrhea']
    },
    {
      id: 7,
      image: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg',
      name: 'Dr. Olivia Wilson',
      specialization: 'Pulmonology',
      experience: 11,
      rating: 4.7,
      isVerified: true,
      imageColor: 'bg-cyan-100',
      languages: ['English'],
      availability: 'Available Tomorrow',
      nextSlot: '1:00 PM',
      consultationFee: 1000,
      symptoms: ['Cough', 'Chest Pain']
    },
    {
      id: 8,
      image: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg',
      name: 'Dr. Robert Brown',
      specialization: 'Endocrinology',
      experience: 14,
      rating: 4.8,
      isVerified: true,
      imageColor: 'bg-pink-100',
      languages: ['English'],
      availability: 'Available Today',
      nextSlot: '11:30 AM',
      consultationFee: 1300,
      symptoms: ['Fatigue', 'Weight Issues']
    }
  ];

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [activeMobileTab, setActiveMobileTab] = useState('search');
  const navigate = useNavigate();

  const handleBookAppointment = (doctor) => {
    navigate('/doctor/quick-consult/payment', { state: { doctor } });
  };

  const filteredDoctors = dummyDoctors.filter(doctor => {
    if (selectedCategory !== 'All' && doctor.specialization !== selectedCategory) {
      return false;
    }

    if (selectedSymptoms.length > 0) {
      const hasMatchingSymptom = selectedSymptoms.some(symptom =>
        doctor.symptoms.includes(symptom)
      );
      if (!hasMatchingSymptom) return false;
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        doctor.name.toLowerCase().includes(query) ||
        doctor.specialization.toLowerCase().includes(query)
      );
    }

    return true;
  });

  const toggleSymptom = (symptom) => {
    setSelectedSymptoms(prev =>
      prev.includes(symptom)
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    );
  };

  const clearFilters = () => {
    setSelectedCategory('All');
    setSelectedSymptoms([]);
    setSearchQuery('');
    setShowSearchInput(false);
  };
  const placeholders = [
    "Search doctors...",
    "Search clinics...",
    "Search clinics...",
    "Search symptoms (fever, cough...)",
    "Search specialties (cardiologist, dentist...)"
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % placeholders.length);
    }, 1000); // change every second

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen mt-4">
      {/* Hero Section */}
      <div className="">
        <div className="container mx-auto px-4">
          <h1 className="text-sm md:text-lg   mb-2">
            Find the right specialist for your needs and consult instantly.
          </h1>
          {/* Main Search Bar */}
          <div className="w-full">
            <label className="input border w-full flex items-center gap-2">
              <CiSearch className="text-gray-500 text-lg" />

              <input
                type="search"
                className="w-full"
                placeholder={placeholders[index]}
              />
            </label>
          </div>

        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Common Symptoms Section */}
        <div className="my-2">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Common Symptoms</h2>
          <div className="flex flex-wrap gap-3">
            {symptomsList.map((item) => (
              <button
                key={item.symptom}
                onClick={() => toggleSymptom(item.symptom)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border shadow-lg flex items-center gap-2 ${selectedSymptoms.includes(item.symptom)
                  ? 'bg-teal-100 text-teal-700 border-teal-300 shadow-teal-100'
                  : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                  }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.symptom}</span>
                {selectedSymptoms.includes(item.symptom) && (
                  <span className="ml-1 inline-flex items-center justify-center w-5 h-5 bg-teal-500 text-white text-xs rounded-full">
                    ✓
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Medical Specialties */}
        <div className="mt-10">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Explore Medical Specialties</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {categoriesList.map((item) => (
              <button
                key={item.category}
                onClick={() => setSelectedCategory(item.category)}
                className={`flex flex-col items-center p-4 rounded-xl border transition-all duration-200 shadow-lg hover:shadow-xl ${selectedCategory === item.category
                  ? 'bg-teal-50 border-teal-300 ring-2 ring-teal-200'
                  : 'border-gray-200 hover:border-teal-300 hover:bg-teal-50'
                  }`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 p-2 ${item.category === 'Cardiology' ? 'bg-red-100' :
                  item.category === 'Neurology' ? 'bg-indigo-100' :
                    item.category === 'Orthopedics' ? 'bg-yellow-100' :
                      item.category === 'Pediatrics' ? 'bg-teal-100' :
                        item.category === 'Dermatology' ? 'bg-purple-100' :
                          item.category === 'Ophthalmology' ? 'bg-blue-100' :
                            item.category === 'ENT' ? 'bg-green-100' :
                              item.category === 'Oncology' ? 'bg-amber-100' :
                                item.category === 'Gastroenterology' ? 'bg-orange-100' :
                                  item.category === 'Dentistry' ? 'bg-cyan-100' :
                                    item.category === 'Physiotherapy' ? 'bg-violet-100' :
                                      'bg-gray-100'
                  }`}>
                  <img
                    src={item.image}
                    alt={item.category}
                    className="w-6 h-6 object-contain"
                  />
                </div>
                <span className="text-sm font-medium text-gray-700 mt-1">{item.category}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Available Doctors */}
        <div className="m-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm md:text-xl font-bold text-gray-900">Currently Available Doctors</h2>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setSelectedCategory('All')}
                className={`px-3 py-1 text-sm rounded-full ${selectedCategory === 'All'
                  ? 'bg-teal-100 text-teal-700'
                  : 'text-gray-600 hover:bg-gray-100'
                  }`}
              >
                All
              </button>
              <button
                onClick={clearFilters}
                className="text-[9px] md:text-sm text-gray-500 hover:text-gray-700"
              >
                Clear filters
              </button>
            </div>
          </div>

          {filteredDoctors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredDoctors.map((doctor) => (
                <div
                  onClick={() => navigate('/doctor/quick/doctor-details', { state: { doctor }, })}
                  key={doctor.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200"
                >
                  <div className="p-5">                    {/* Doctor Header */}
                    <div className="flex flex-col items-center justify-center mb-4">
                      <div className="flex flex-col items-center space-x-3">  {/* row center */}

                        {/* Profile Image */}
                        <div className="w-14 h-14 rounded-full flex items-center justify-center">
                          <img src={doctor.image} alt="" className="rounded-full h-10 w-10" />
                        </div>

                        {/* Name + Speciality */}
                        <div className="text-center">
                          <h3 className="font-bold text-gray-900">{doctor.name}</h3>

                          <div className="flex items-center justify-center mt-1">
                            <p className="text-teal-600 text-xs font-medium">
                              {doctor.specialization}
                            </p>

                            {doctor.isVerified && (
                              <CheckCircle className="w-4 h-4 text-teal-500 ml-2" />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>


                    {/* Experience and Rating */}
                    <div className="flex items-center justify-center gap-2 mb-4 ">
                      <div className="flex items-center">
                        <span className="text-gray-600 text-sm">{doctor.experience} years experience</span>
                      </div>
                      <div className="flex items-center px-2 py-1 rounded">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="ml-1 font-medium">{doctor.rating}</span>
                      </div>
                    </div>




                    {/* Languages */}
                    <div className="mb-4 flex justify-center">
                      <div className="   bg-blue-50 text-blue-600 text-center text-[10px] px-2 py-1 rounded-full ">
                        {doctor.availability}
                      </div>
                    </div>



                    {/* Action Buttons */}
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleBookAppointment(doctor)}
                        className="flex-1 bg-teal-600 hover:bg-teal-700 text-white py-2 cursor-pointer rounded-lg font-medium transition duration-200 flex items-center justify-center"
                      >
                        Contact Now
                      </button>
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
        </div>

        {/* Load More */}
        {filteredDoctors.length > 0 && (
          <div className="text-center">
            <button className="px-8 py-3 border-2 border-teal-600 text-teal-600 rounded-lg hover:bg-teal-50 transition duration-200 font-medium">
              Load More Doctors
            </button>
          </div>
        )}
      </div>

      {/* Mobile Filter Panel */}
      {showFilterPanel && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl p-6 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900">Filters</h3>
              <button
                onClick={() => setShowFilterPanel(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="font-medium text-gray-700 mb-3">Categories</h4>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setSelectedCategory('All')}
                    className={`p-3 rounded-lg border text-sm ${selectedCategory === 'All'
                      ? 'border-teal-500 bg-teal-50 text-teal-700'
                      : 'border-gray-200 text-gray-700'
                      }`}
                  >
                    All
                  </button>
                  {categoriesList.slice(0, 6).map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`p-3 rounded-lg border text-sm ${selectedCategory === category
                        ? 'border-teal-500 bg-teal-50 text-teal-700'
                        : 'border-gray-200 text-gray-700'
                        }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-700 mb-3">Symptoms</h4>
                <div className="flex flex-wrap gap-2">
                  {symptomsList.map((symptom) => (
                    <button
                      key={symptom}
                      onClick={() => toggleSymptom(symptom)}
                      className={`px-3 py-2 rounded-full text-sm ${selectedSymptoms.includes(symptom)
                        ? 'bg-teal-100 text-teal-700'
                        : 'bg-gray-100 text-gray-700'
                        }`}
                    >
                      {symptom}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  onClick={clearFilters}
                  className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium"
                >
                  Clear All
                </button>
                <button
                  onClick={() => setShowFilterPanel(false)}
                  className="flex-1 py-3 bg-teal-600 text-white rounded-lg font-medium"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-3 px-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setShowSearchInput(!showSearchInput)}
            className="flex-1 flex flex-col items-center text-gray-600"
          >
            <Search className="w-5 h-5 mb-1" />
            <span className="text-xs">Search</span>
          </button>
          <button
            onClick={() => setShowFilterPanel(true)}
            className="flex-1 flex flex-col items-center text-gray-600"
          >
            <Filter className="w-5 h-5 mb-1" />
            <span className="text-xs">Filter</span>
            {(selectedCategory !== 'All' || selectedSymptoms.length > 0) && (
              <span className="absolute top-2 right-1/4 bg-teal-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {(selectedCategory !== 'All' ? 1 : 0) + selectedSymptoms.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Search Overlay */}
      {showSearchInput && (
        <div className="lg:hidden fixed inset-0 bg-white z-50 p-4">
          <div className="flex items-center mb-6">
            <button
              onClick={() => setShowSearchInput(false)}
              className="mr-4"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search doctors, clinics, or conditions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg"
                autoFocus
              />
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="font-medium text-gray-700">Recent Searches</h3>
            <div className="flex flex-wrap gap-2">
              <button className="px-3 py-2 bg-gray-100 text-gray-700 rounded-full text-sm">
                Cardiologist
              </button>
              <button className="px-3 py-2 bg-gray-100 text-gray-700 rounded-full text-sm">
                Fever
              </button>
              <button className="px-3 py-2 bg-gray-100 text-gray-700 rounded-full text-sm">
                Dermatology
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FilterDoctorList;