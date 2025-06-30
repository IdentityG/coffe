'use client';

import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const GlobalReach = () => {
  const sectionRef = useRef(null);
  const mapRef = useRef(null);
  const titleRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });

  // Export destination data
  const exportDestinations = [
    {
      id: 1,
      country: "United States",
      position: { top: "30%", left: "19%" },
      flag: "🇺🇸",
      scale: 1.2,
    },
    {
      id: 2,
      country: "Germany",
      position: { top: "26%", left: "48%" },
      flag: "🇩🇪",
      scale: 1.1,
    },
    {
      id: 3,
      country: "South Korea",
      position: { top: "32%", left: "78%" },
      flag: "🇰🇷",
      scale: 1,
    },
    {
      id: 4,
      country: "UAE",
      position: { top: "38%", left: "58%" },
      flag: "🇦🇪",
      scale: 0.9,
    },
    {
      id: 5,
      country: "Australia",
      position: { top: "65%", left: "82%" },
      flag: "🇦🇺",
      scale: 1.1,
    },
    {
      id: 6,
      country: "Brazil",
      position: { top: "58%", left: "30%" },
      flag: "🇧🇷",
      scale: 1,
    },
    {
      id: 7,
      country: "Canada",
      position: { top: "22%", left: "20%" },
      flag: "🇨🇦",
      scale: 1,
    },
    {
      id: 8,
      country: "Japan",
      position: { top: "30%", left: "82%" },
      flag: "🇯🇵",
      scale: 1,
    },
    {
      id: 9,
      country: "UK",
      position: { top: "24%", left: "45%" },
      flag: "🇬🇧",
      scale: 0.9,
    },
  ];

  // Origin point (Ethiopia - a major coffee exporter)
  const originPoint = { top: "42%", left: "54%" };

  // GSAP ScrollTrigger animations
  useEffect(() => {
    if (titleRef.current && mapRef.current) {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top bottom-=100',
            end: 'bottom center',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Map fade in
      gsap.fromTo(
        mapRef.current,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: mapRef.current,
            start: 'top bottom-=50',
            end: 'center center',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Animate connection lines
      const lines = document.querySelectorAll('.connection-line');
      lines.forEach((line) => {
        gsap.fromTo(
          line,
          { strokeDashoffset: 1000 },
          {
            strokeDashoffset: 0,
            duration: 1.5,
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: mapRef.current,
              start: 'top center',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // Markers staggered animation
      const markers = document.querySelectorAll('.location-marker');
      gsap.fromTo(
        markers,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: mapRef.current,
            start: 'top center',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }

    return () => {
      // Clean up ScrollTrigger instances
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Framer Motion variants
  const markerVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.3,
      transition: { 
        type: 'spring',
        stiffness: 300,
        damping: 10
      }
    },
    pulse: {
      scale: [1, 1.1, 1],
      opacity: [1, 0.8, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: 'loop'
      }
    }
  };

  const flagVariants = {
    initial: { opacity: 1, y: 0 },  // Changed from opacity: 0 to 1 and y: 10 to 0
    hover: { 
      scale: 1.05,  // Added subtle scale effect on hover
      transition: { duration: 0.2 }
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-24 overflow-hidden bg-white"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-cream to-transparent opacity-70"></div>
      <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-caramel/5 -z-10"></div>
      <div className="absolute bottom-20 left-10 w-32 h-32 rounded-full bg-coffee/5 -z-10"></div>
      
      <div className="container relative z-10 mx-auto px-4">
        {/* Section title */}
        <div ref={titleRef} className="text-center mb-16">
          <div className="inline-block">
            <span className="block h-0.5 w-10 bg-espresso mx-auto mb-6"></span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-coffee-dark mb-4">
              Global Reach
            </h2>
            <p className="text-lg text-black max-w-2xl mx-auto">
              We proudly export to over 25 countries worldwide
            </p>
            <span className="block h-0.5 w-10 bg-espresso mx-auto mt-6"></span>
          </div>
        </div>

        {/* Map container */}
        <div 
          ref={mapRef} 
          className="relative max-w-5xl mx-auto aspect-[16/9] md:aspect-[2/1] bg-cream rounded-xl overflow-hidden shadow-lg"
        >
          {/* World map background */}
          <div className="absolute inset-0 bg-cover bg-center opacity-20" 
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1589519160732-57fc6ea83bc8?q=80&w=2070')" }}>
          </div>
          
          {/* SVG Map Overlay */}
          <div className="absolute inset-0 p-4">
            <svg 
              className="w-full h-full" 
              viewBox="0 0 1000 500" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* World map outline - simplified for this example */}
              <path 
                d="M150,150 Q200,100 250,150 T350,150 T450,150 T550,150 T650,150 T750,150 Q800,200 750,250 T650,250 T550,250 T450,250 T350,250 T250,250 Q200,300 150,250 Z" 
                fill="none" 
                stroke="#6F4E37" 
                strokeWidth="1.5" 
                strokeOpacity="0.3"
              />
              
              {/* Connection lines from origin to destinations */}
              {exportDestinations.map((destination) => {
                // Calculate path coordinates
                const startX = parseFloat(originPoint.left) * 10; // Scale for SVG
                const startY = parseFloat(originPoint.top) * 5;   // Scale for SVG
                const endX = parseFloat(destination.position.left) * 10;
                const endY = parseFloat(destination.position.top) * 5;
                
                // Create curved path
                const midX = (startX + endX) / 2;
                const midY = Math.min(startY, endY) - 30; // Curve upward
                
                return (
                  <path 
                    key={`line-${destination.id}`}
                    className="connection-line"
                    d={`M${startX},${startY} Q${midX},${midY} ${endX},${endY}`}
                    stroke="#D4A24E"
                    strokeWidth="1.5"
                    strokeDasharray="5,5"
                    fill="none"
                    strokeDashoffset="1000"
                  />
                );
              })}
            </svg>
          </div>
          
          {/* Origin marker */}
          <motion.div 
            className="absolute w-6 h-6 -ml-3 -mt-3 location-marker origin-marker"
            style={{ 
              top: originPoint.top, 
              left: originPoint.left,
            }}
            initial="initial"
            animate="pulse"
            variants={markerVariants}
          >
            <div className="w-full h-full rounded-full bg-coffee flex items-center justify-center text-cream-light text-xs font-bold">
              <span>☕</span>
            </div>
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-xs font-medium text-coffee-dark bg-cream-light px-2 py-0.5 rounded-full shadow-sm">
              Ethiopia
            </div>
          </motion.div>
          
          {/* Destination markers */}
          {exportDestinations.map((destination) => (
            <motion.div 
              key={destination.id}
              className="absolute w-5 h-5 -ml-2.5 -mt-2.5 location-marker"
              style={{ 
                top: destination.position.top, 
                left: destination.position.left,
                zIndex: 10
              }}
              initial="initial"
              whileHover="hover"
              variants={markerVariants}
            >
              <div className="w-full h-full rounded-full bg-espresso flex items-center justify-center shadow-md">
                <div className="w-2 h-2 rounded-full bg-cream-light"></div>
              </div>
              
              {/* Country flag and name tooltip - now always visible */}
              <motion.div 
                className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-xs font-medium text-coffee-dark bg-cream-light px-2 py-1 rounded-full shadow-sm z-20"
                variants={flagVariants}
                initial="initial"
                whileHover="hover"
                animate="initial"  // Added this line to make it always visible
              >
                <span className="mr-1">{destination.flag}</span>
                {destination.country}
              </motion.div>
            </motion.div>
          ))}
        </div>
        
        {/* Stats or additional info */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto text-center">
          <div className="bg-cream rounded-lg p-6 shadow-sm">
            <div className="text-3xl font-bold text-espresso mb-2">5+</div>
            <div className="text-black font-medium">Countries Served</div>
          </div>
          <div className="bg-cream rounded-lg p-6 shadow-sm">
            <div className="text-3xl font-bold text-espresso mb-2">2</div>
            <div className="text-black font-medium">Continents</div>
          </div>
          <div className="bg-cream rounded-lg p-6 shadow-sm">
            <div className="text-3xl font-bold text-espresso mb-2">1+</div>
            <div className="text-black font-medium">Years of Export</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GlobalReach;