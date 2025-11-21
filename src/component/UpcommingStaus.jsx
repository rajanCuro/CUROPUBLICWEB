// src/component/UpcommingStaus.jsx
// src/component/UpcomingStatus.jsx
import React, { useEffect, useRef } from "react";
import { FiTruck, FiCalendar, FiClock, FiMapPin, FiUser, FiPlus } from "react-icons/fi";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function UpcomingStatus() {
  const containerRef = useRef(null);
  const deliveryCardRef = useRef(null);
  const appointmentCardRef = useRef(null);
  const progressBarRef = useRef(null);
  const buttonsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Main container animation
      gsap.fromTo(containerRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Delivery card animation
      gsap.fromTo(deliveryCardRef.current,
        { x: -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.3,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: deliveryCardRef.current,
            start: "top 85%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Appointment card animation
      gsap.fromTo(appointmentCardRef.current,
        { x: 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.5,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: appointmentCardRef.current,
            start: "top 85%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Progress bar animation
      gsap.fromTo(progressBarRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.5,
          delay: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: progressBarRef.current,
            start: "top 90%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Button animations
      buttonsRef.current.forEach((button, index) => {
        if (button) {
          gsap.fromTo(button,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              delay: 0.8 + (index * 0.1),
              ease: "power2.out",
              scrollTrigger: {
                trigger: button,
                start: "top 90%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
              }
            }
          );
        }
      });

      // Floating animation for status dots
      gsap.to(".status-dot", {
        y: -5,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.5
      });

      // Pulse animation for active dot
      gsap.to(".active-dot", {
        scale: 1.2,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut"
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleButtonHover = (index) => {
    gsap.to(buttonsRef.current[index], {
      scale: 1.05,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleButtonLeave = (index) => {
    gsap.to(buttonsRef.current[index], {
      scale: 1,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleTrackOrder = () => {
    // Animate the track order button
    const tl = gsap.timeline();
    tl.to(buttonsRef.current[0], {
      scale: 0.9,
      duration: 0.1,
      ease: "power2.out"
    })
    .to(buttonsRef.current[0], {
      scale: 1,
      duration: 0.3,
      ease: "elastic.out(1, 0.5)"
    });

    // Add ripple effect
    const ripple = document.createElement('div');
    ripple.style.cssText = `
      position: absolute;
      width: 20px;
      height: 20px;
      background: rgba(255, 255, 255, 0.6);
      border-radius: 50%;
      pointer-events: none;
      transform: translate(-50%, -50%);
    `;
    buttonsRef.current[0].appendChild(ripple);

    gsap.fromTo(ripple,
      { scale: 0, opacity: 1 },
      {
        scale: 3,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        onComplete: () => {
          ripple.remove();
        }
      }
    );
  };

  const handleCalendarAction = () => {
    const tl = gsap.timeline();
    tl.to(buttonsRef.current[1], {
      y: -5,
      duration: 0.2,
      ease: "power2.out"
    })
    .to(buttonsRef.current[1], {
      y: 0,
      duration: 0.4,
      ease: "bounce.out"
    });
  };

  const handleReschedule = () => {
    gsap.fromTo(buttonsRef.current[2],
      { rotation: -5 },
      {
        rotation: 5,
        duration: 0.1,
        repeat: 5,
        yoyo: true,
        ease: "power1.inOut",
        onComplete: () => {
          gsap.to(buttonsRef.current[2], {
            rotation: 0,
            duration: 0.2,
            ease: "power2.out"
          });
        }
      }
    );
  };

  return (
    <div ref={containerRef} className="container mx-auto px-4 py-8">
      {/* MAIN CONTAINER */}
      <div className="rounded-2xl overflow-hidden  mx-auto">
        <div className="space-y-6">
          
          {/* DELIVERY STATUS CARD */}
          <div ref={deliveryCardRef} className="group relative">
            <div className="absolute -left-3 top-1/2 transform -translate-y-1/2">
              <div className="w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center status-dot active-dot">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl p-5 border-l-4 border-teal-500  relative overflow-hidden">
              {/* Animated background effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              
              {/* HEADER */}
              <div className="flex items-center gap-3 mb-3 relative z-10">
                <div className="p-2 bg-teal-100 rounded-lg group-hover:scale-110 transition-transform duration-300">
                  <FiTruck className="text-teal-600 text-lg" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 text-lg">Delivery Status</h3>
                  <p className="text-sm text-teal-600 font-medium">In Transit</p>
                </div>
                <div className="ml-auto bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs font-semibold animate-pulse">
                  Today
                </div>
              </div>

              {/* CONTENT */}
              <div className="space-y-2 relative z-10">
                <p className="text-gray-600 text-sm">
                  Order <span className="font-semibold text-gray-800">#C24-98765</span> is out for delivery
                </p>

                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <FiClock className="text-teal-700" />
                    <span>Expected by <span className="font-semibold">5:00 PM</span></span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <FiMapPin className="text-teal-700" />
                    <span>Tracking available</span>
                  </div>
                </div>

                {/* PROGRESS BAR */}
                <div className="mt-3">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Order placed</span>
                    <span>Out for delivery</span>
                    <span>Delivered</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div 
                      ref={progressBarRef}
                      className="bg-teal-700 h-2 rounded-full w-3/4 transform origin-left"
                    ></div>
                  </div>
                </div>

                {/* ACTION BUTTON */}
                <button 
                  ref={el => buttonsRef.current[0] = el}
                  onClick={handleTrackOrder}
                  onMouseEnter={() => handleButtonHover(0)}
                  onMouseLeave={() => handleButtonLeave(0)}
                  className="mt-3 bg-teal-700 hover:bg-teal-800 cursor-pointer text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 flex items-center gap-2 relative overflow-hidden"
                >
                  <span className="relative z-10">Track Order</span>
                  <FiTruck className="text-sm relative z-10" />
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-teal-800 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </button>
              </div>
            </div>
          </div>

          {/* SEPARATOR */}
          <div className="relative flex items-center justify-center">
            <div className="flex-1 border-t border-gray-200"></div>
            <div className="px-4">
              <div className="w-2 h-2 bg-gray-300 rounded-full status-dot"></div>
            </div>
            <div className="flex-1 border-t border-gray-200"></div>
          </div>

          {/* UPCOMING APPOINTMENTS CARD */}
          <div ref={appointmentCardRef} className="group relative">
            <div className="absolute -left-3 top-1/2 transform -translate-y-1/2">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center status-dot">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-5 border-l-4 border-blue-500  relative overflow-hidden">
              {/* Animated background effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

              {/* HEADER */}
              <div className="flex items-center gap-3 mb-3 relative z-10">
                <div className="p-2 bg-blue-100 rounded-lg group-hover:scale-110 transition-transform duration-300">
                  <FiCalendar className="text-blue-600 text-lg" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 text-lg">Upcoming Appointment</h3>
                  <p className="text-sm text-blue-600 font-medium">General Checkup</p>
                </div>
                <div className="ml-auto bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-semibold">
                  Confirmed
                </div>
              </div>

              {/* CONTENT */}
              <div className="space-y-3 relative z-10">
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <FiUser className="text-blue-500" />
                    <span>Dr. <span className="font-semibold text-gray-800">Alice Smith</span></span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <FiClock className="text-blue-500" />
                    <span>July 20, 2024 • <span className="font-semibold">10:00 AM</span></span>
                  </div>
                </div>

                <div className="bg-white/80 rounded-lg p-3 border border-gray-200 backdrop-blur-sm">
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold text-gray-800">Note:</span> Please arrive 15 minutes early for registration and paperwork.
                  </p>
                </div>

                {/* ACTION BUTTONS */}
                <div className="flex flex-wrap gap-3">
                  <button 
                    ref={el => buttonsRef.current[1] = el}
                    onClick={handleCalendarAction}
                    onMouseEnter={() => handleButtonHover(1)}
                    onMouseLeave={() => handleButtonLeave(1)}
                    className="bg-blue-500 hover:bg-blue-600 cursor-pointer text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 flex items-center gap-2 relative overflow-hidden"
                  >
                    <span className="relative z-10">Add to Calendar</span>
                    <FiCalendar className="text-sm relative z-10" />
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                  </button>
                  
                  <button 
                    ref={el => buttonsRef.current[2] = el}
                    onClick={handleReschedule}
                    onMouseEnter={() => handleButtonHover(2)}
                    onMouseLeave={() => handleButtonLeave(2)}
                    className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 flex items-center gap-2 relative overflow-hidden"
                  >
                    <span className="relative z-10">Reschedule</span>
                    <FiClock className="text-sm relative z-10" />
                    <div className="absolute inset-0 bg-gray-100 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* QUICK ACTIONS FOOTER */}
          <div className="text-center pt-6">
            <button className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 font-semibold transition-colors duration-300 group">
              <FiPlus className="group-hover:rotate-90 transition-transform duration-300" />
              View All Activities
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}