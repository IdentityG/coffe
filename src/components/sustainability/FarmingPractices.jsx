'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const FarmingPractices = () => {
  const sectionRef = useRef(null);
  const illustrationRef = useRef(null);
  const practicesRef = useRef(null);
  
  // GSAP animations for scroll reveal
  useEffect(() => {
    // Keep the registration
    gsap.registerPlugin(ScrollTrigger);
    
    if (sectionRef.current && illustrationRef.current && practicesRef.current) {
      // Animation for the illustration area
      gsap.fromTo(
        illustrationRef.current,
        { 
          y: 50,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: illustrationRef.current,
            start: 'top bottom-=100',
            end: 'bottom center',
            toggleActions: 'play none none reverse',
          }
        }
      );
      
      // Animate the decorative elements
      const decorativeElements = illustrationRef.current.querySelectorAll('.decorative-element');
      decorativeElements.forEach((element, index) => {
        gsap.to(element, {
          y: -10 - (index * 5),
          rotation: index % 2 === 0 ? 5 : -5,
          ease: 'sine.inOut',
          duration: 2 + (index * 0.5),
          repeat: -1,
          yoyo: true,
          delay: index * 0.2
        });
      });
    }
    
    return () => {
      // Only kill ScrollTriggers related to this component
      const myTriggers = ScrollTrigger.getAll().filter(trigger => 
        trigger.vars.trigger && 
        (trigger.vars.trigger === illustrationRef.current || 
         trigger.vars.trigger.closest('#farming-practices'))
      );
      myTriggers.forEach(trigger => trigger.kill());
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

  // Animation variants for practice items
  const practiceVariants = {
    hidden: { x: 20, opacity: 0 },
    visible: (i) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: i * 0.15,
        duration: 0.6,
        ease: [0.6, 0.05, 0.01, 0.9],
      },
    }),
  };

  // Animation variants for icons
  const iconVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    },
    hover: {
      rotate: [0, 10, -5, 0],
      scale: 1.15,
      transition: {
        duration: 0.3,
        ease: "backInOut"
      }
    }
  };

  // Sustainable farming practices data
  const practices = [
    {
      id: 1,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        </svg>
      ),
      title: "Shade-Grown Coffee",
      description: "Our coffee grows under a natural forest canopy, preserving biodiversity and providing habitat for native birds and wildlife."
    },
    {
      id: 2,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v6"></path>
          <path d="M17.66 8.35l-4.24 4.24"></path>
          <path d="M2 12h6"></path>
          <path d="M8.35 17.66l4.24-4.24"></path>
          <path d="M22 12h-6"></path>
          <path d="M15.65 6.34l-4.24 4.24"></path>
          <path d="M12 22v-6"></path>
          <path d="M8.35 6.34l4.24 4.24"></path>
        </svg>
      ),
      title: "Water Conservation",
      description: "We implement water-saving processing methods and rainwater harvesting systems to minimize our environmental footprint."
    },
    {
      id: 3,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
      ),
      title: "Organic Fertilization",
      description: "Coffee pulp and organic matter are composted and returned to the soil, creating a sustainable nutrient cycle without chemical fertilizers."
    },
    {
      id: 4,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
          <line x1="9" y1="9" x2="9.01" y2="9"></line>
          <line x1="15" y1="9" x2="15.01" y2="9"></line>
        </svg>
      ),
      title: "Natural Pest Management",
      description: "We maintain ecological balance through biodiversity rather than pesticides, protecting both the environment and worker health."
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="py-20 md:py-28 bg-cream-light text-coffee-dark overflow-hidden"
      id="farming-practices"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section title and description */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
          className="text-center mb-16 md:mb-20"
        >
          <motion.h2 
            variants={textVariants}
            className="text-4xl md:text-5xl font-serif font-bold text-coffee mb-4"
          >
            Sustainable Farming Practices
          </motion.h2>
          
          <motion.p 
            variants={textVariants}
            className="text-lg md:text-xl text-coffee-light max-w-3xl mx-auto"
          >
            From soil to shipment, we protect what matters.
          </motion.p>
        </motion.div>

        {/* Content container */}
        <div className="flex flex-col lg:flex-row gap-10 md:gap-16 items-center">
          {/* Illustration container - left side (replacing image) */}
          <div 
            ref={illustrationRef}
            className="w-full lg:w-5/12 relative overflow-hidden rounded-2xl shadow-2xl bg-gradient-to-b from-caramel/10 to-coffee/10 p-6"
          >
            <div className="relative h-[350px] md:h-[450px] lg:h-[550px] w-full overflow-hidden flex items-center justify-center">
              {/* Decorative background elements */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-caramel decorative-element"></div>
                <div className="absolute top-40 right-10 w-16 h-16 rounded-full bg-coffee decorative-element"></div>
                <div className="absolute bottom-20 left-20 w-24 h-24 rounded-full bg-caramel decorative-element"></div>
                <div className="absolute bottom-40 right-20 w-12 h-12 rounded-full bg-coffee decorative-element"></div>
              </div>
              
              {/* Main illustration */}
              <div className="relative z-10 w-full max-w-md">
                {/* Coffee plant illustration */}
                <svg viewBox="0 0 400 400" className="w-full h-auto">
                  {/* Ground/soil */}
                  <path d="M50,300 C100,280 300,280 350,300 L350,350 L50,350 Z" fill="#8B5A2B" />
                  
                  {/* Plant stem */}
                  <motion.path 
                    d="M200,300 L200,150" 
                    stroke="#5D4037" 
                    strokeWidth="8" 
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                  />
                  
                  {/* Coffee leaves */}
                  <motion.g
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 1 }}
                  >
                    <path d="M200,260 C230,240 260,260 240,290" fill="#388E3C" className="decorative-element" />
                    <path d="M200,230 C170,210 140,230 160,260" fill="#43A047" className="decorative-element" />
                    <path d="M200,200 C230,180 260,200 240,230" fill="#388E3C" className="decorative-element" />
                    <path d="M200,170 C170,150 140,170 160,200" fill="#43A047" className="decorative-element" />
                  </motion.g>
                  
                  {/* Coffee beans/cherries */}
                  <motion.g
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1.5 }}
                  >
                    <circle cx="230" cy="250" r="8" fill="#D4A24E" className="decorative-element" />
                    <circle cx="170" cy="220" r="8" fill="#D4A24E" className="decorative-element" />
                    <circle cx="240" cy="190" r="8" fill="#D4A24E" className="decorative-element" />
                    <circle cx="160" cy="180" r="8" fill="#D4A24E" className="decorative-element" />
                  </motion.g>
                  
                  {/* Sun */}
                  <motion.g
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.8 }}
                    transition={{ duration: 1, delay: 0.2 }}
                  >
                    <circle cx="320" cy="80" r="30" fill="#FFD54F" />
                    <motion.g 
                      animate={{ 
                        rotate: 360 
                      }} 
                      transition={{ 
                        duration: 20, 
                        repeat: Infinity, 
                        ease: "linear" 
                      }}
                      style={{ originX: "320px", originY: "80px" }}
                    >
                      <path d="M320,30 L320,10" stroke="#FFD54F" strokeWidth="4" />
                      <path d="M320,150 L320,130" stroke="#FFD54F" strokeWidth="4" />
                      <path d="M370,80 L390,80" stroke="#FFD54F" strokeWidth="4" />
                      <path d="M250,80 L270,80" stroke="#FFD54F" strokeWidth="4" />
                      <path d="M355,45 L370,30" stroke="#FFD54F" strokeWidth="4" />
                      <path d="M270,130 L285,145" stroke="#FFD54F" strokeWidth="4" />
                      <path d="M355,115 L370,130" stroke="#FFD54F" strokeWidth="4" />
                      <path d="M270,30 L285,15" stroke="#FFD54F" strokeWidth="4" />
                    </motion.g>
                  </motion.g>
                  
                  {/* Rain drops */}
                  <motion.g
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 0.7, y: 0 }}
                    transition={{ duration: 1, delay: 1.8 }}
                  >
                    <motion.path 
                      d="M100,50 Q100,70 90,75 Q80,70 80,50 Q90,45 100,50" 
                      fill="#90CAF9"
                      animate={{ y: [0, 100, 0] }}
                      transition={{ duration: 4, repeat: Infinity, repeatDelay: 1 }}
                      className="decorative-element"
                    />
                    <motion.path 
                      d="M130,30 Q130,50 120,55 Q110,50 110,30 Q120,25 130,30" 
                      fill="#90CAF9"
                      animate={{ y: [0, 100, 0] }}
                      transition={{ duration: 3, repeat: Infinity, repeatDelay: 0.5, delay: 0.7 }}
                      className="decorative-element"
                    />
                    <motion.path 
                      d="M160,50 Q160,70 150,75 Q140,70 140,50 Q150,45 160,50" 
                      fill="#90CAF9"
                      animate={{ y: [0, 100, 0] }}
                      transition={{ duration: 5, repeat: Infinity, repeatDelay: 0.2, delay: 0.3 }}
                      className="decorative-element"
                    />
                  </motion.g>
                </svg>
              </div>
              
              {/* Overlay text */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                <span className="inline-block px-4 py-2 bg-caramel/90 text-white text-sm font-semibold rounded-md shadow-md mb-2">
                  Sustainable Ecosystem
                </span>
                <p className="text-coffee-dark text-xs md:text-sm">
                  Balancing nature and agriculture for better coffee.
                </p>
              </div>
            </div>
          </div>
          
          {/* Practices container - right side */}
          <div 
            ref={practicesRef}
            className="w-full lg:w-7/12 space-y-6 md:space-y-8"
          >
            {practices.map((practice, index) => (
              <motion.div
                key={practice.id}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={practiceVariants}
                className="flex items-start gap-4 p-5 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1"
              >
                <motion.div 
                  className="text-caramel p-2 bg-caramel/10 rounded-full mt-1 flex-shrink-0"
                  variants={iconVariants}
                  whileHover="hover"
                  initial="hidden"
                  animate="visible"
                >
                  {practice.icon}
                </motion.div>
                
                <div>
                  <h3 className="text-xl md:text-2xl font-serif font-semibold text-coffee-dark mb-2">
                    {practice.title}
                  </h3>
                  
                  <p className="text-coffee-light text-base leading-relaxed">
                    {practice.description}
                  </p>
                </div>
              </motion.div>
            ))}
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: practices.length * 0.15 + 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="mt-10 pt-8 border-t-2 border-caramel/30 bg-caramel/5 p-6 rounded-lg shadow-inner"
            >
              <p className="text-coffee-dark italic text-lg md:text-xl leading-relaxed">
                "Our commitment to sustainable farming isn't just good for the planet—it produces exceptional coffee with distinctive character and depth."
              </p>
              <p className="text-right text-md text-coffee-light mt-4 font-medium">— The Ubuntu Coffee Export Team</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FarmingPractices;