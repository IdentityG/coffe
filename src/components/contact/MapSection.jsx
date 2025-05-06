'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger with GSAP
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const MapSection = () => {
  const sectionRef = useRef(null);
  const mapContainerRef = useRef(null);
  const addressRef = useRef(null);

  // GSAP animations for map reveal on scroll
  useEffect(() => {
    if (mapContainerRef.current && addressRef.current) {
      // Map container animation
      gsap.fromTo(
        mapContainerRef.current,
        { 
          y: 100,
          opacity: 0,
          scale: 0.9
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: mapContainerRef.current,
            start: 'top bottom-=100',
            end: 'bottom center',
            toggleActions: 'play none none reverse',
            // markers: true, // Enable for debugging
          }
        }
      );

      // Address block animation
      gsap.fromTo(
        addressRef.current,
        { 
          x: -50,
          opacity: 0
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.3,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: addressRef.current,
            start: 'top bottom-=50',
            end: 'bottom center',
            toggleActions: 'play none none reverse',
          }
        }
      );
    }

    return () => {
      // Clean up ScrollTrigger instances
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Animation variants for text elements
  const textVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.6, 0.05, 0.01, 0.9],
      },
    },
  };

  return (
    <section 
      ref={sectionRef}
      className="py-16 md:py-24 bg-cream text-coffee-dark overflow-hidden"
      id="location"
    >
      <div className="container mx-auto px-4 md:px-8">
        {/* Section title and description */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
          className="text-center mb-12 md:mb-16"
        >
          <motion.h2 
            variants={textVariants}
            className="text-3xl md:text-4xl font-serif font-bold text-coffee mb-4"
          >
            Where to Find Us
          </motion.h2>
          
          <motion.p 
            variants={textVariants}
            className="text-lg text-coffee-light max-w-2xl mx-auto"
          >
            From Ethiopia to the world — visit us or ship direct.
          </motion.p>
        </motion.div>

        {/* Map and address container */}
        <div className="flex flex-col lg:flex-row gap-8 md:gap-12">
          {/* Map container */}
          <div 
            ref={mapContainerRef}
            className="w-full lg:w-2/3 h-[300px] md:h-[400px] lg:h-[500px] rounded-xl overflow-hidden shadow-lg"
          >
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.5376689671584!2d38.7584054!3d9.0203637!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85cef5ab402d%3A0x8467b6b037a24d49!2sAddis%20Ababa%2C%20Ethiopia!5e0!3m2!1sen!2sus!4v1651234567890!5m2!1sen!2sus" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubuntu Coffee Export Location"
              className="filter grayscale hover:grayscale-0 transition-all duration-500"
            />
          </div>

          {/* Address information */}
          <div 
            ref={addressRef}
            className="w-full lg:w-1/3 bg-coffee/5 p-6 md:p-8 rounded-xl shadow-md flex flex-col justify-center"
          >
            <div className="mb-6 border-l-4 border-caramel pl-4">
              <h3 className="text-xl font-serif font-bold text-coffee-dark mb-2">Headquarters</h3>
              <address className="not-italic text-coffee-light">
                <p className="mb-1">Ubuntu Coffee Export Center</p>
                <p className="mb-1">Bole Road, Addis Ababa</p>
                <p className="mb-4">Ethiopia, East Africa</p>
                <p className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-caramel" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <span>+251 11 123 4567</span>
                </p>
              </address>
            </div>

            <div className="mb-6 border-l-4 border-caramel pl-4">
              <h3 className="text-xl font-serif font-bold text-coffee-dark mb-2">Export Office</h3>
              <address className="not-italic text-coffee-light">
                <p className="mb-1">Djibouti Port Facility</p>
                <p className="mb-1">Djibouti City</p>
                <p className="mb-4">Djibouti, East Africa</p>
                <p className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-caramel" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <span>+253 21 987 6543</span>
                </p>
              </address>
            </div>

            <div className="mt-auto">
              <h4 className="text-lg font-medium text-coffee-dark mb-3">Business Hours</h4>
              <ul className="text-coffee-light">
                <li className="flex justify-between mb-1">
                  <span>Monday - Friday:</span>
                  <span>8:00 AM - 5:00 PM</span>
                </li>
                <li className="flex justify-between mb-1">
                  <span>Saturday:</span>
                  <span>9:00 AM - 2:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Sunday:</span>
                  <span>Closed</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapSection;