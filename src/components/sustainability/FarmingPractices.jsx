'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

const FarmingPractices = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const practicesRef = useRef(null);
  
  // GSAP animations for scroll reveal
  useEffect(() => {
    // Register ScrollTrigger with GSAP inside useEffect
    gsap.registerPlugin(ScrollTrigger);
    
    if (sectionRef.current && imageRef.current && practicesRef.current) {
      // Parallax effect on the image
      gsap.fromTo(
        imageRef.current,
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
            trigger: imageRef.current,
            start: 'top bottom-=100',
            end: 'bottom center',
            toggleActions: 'play none none reverse',
          }
        }
      );
      
      // Subtle parallax effect on the image as user scrolls
      gsap.to(imageRef.current.querySelector('img'), {
        y: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.5,
        }
      });
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
      rotate: 10,
      scale: 1.1,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
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
      className="py-16 md:py-24 bg-coffee/5 text-coffee-dark overflow-hidden"
      id="farming-practices"
    >
      <div className="container mx-auto px-4 md:px-8">
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
          className="text-center mb-16"
        >
          <motion.h2 
            variants={textVariants}
            className="text-3xl md:text-4xl font-serif font-bold text-coffee mb-4"
          >
            Sustainable Farming Practices
          </motion.h2>
          
          <motion.p 
            variants={textVariants}
            className="text-lg text-coffee-light max-w-3xl mx-auto"
          >
            From soil to shipment, we protect what matters.
          </motion.p>
        </motion.div>

        {/* Content container */}
        <div className="flex flex-col lg:flex-row gap-8 md:gap-12 items-center">
          {/* Image container - left side */}
          <div 
            ref={imageRef}
            className="w-full lg:w-1/2 relative overflow-hidden rounded-xl shadow-lg"
          >
            <div className="relative h-[300px] md:h-[400px] lg:h-[500px] w-full overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=800&q=80"
                alt="Sustainable coffee farming"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                onError={(e) => {
                  console.error('Image failed to load:', e);
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-coffee-black/50 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <span className="inline-block px-3 py-1 bg-caramel/80 text-coffee-black text-xs font-bold rounded-full mb-2">
                  Shade-grown coffee
                </span>
              </div>
            </div>
          </div>
          
          {/* Practices container - right side */}
          <div 
            ref={practicesRef}
            className="w-full lg:w-1/2 space-y-6"
          >
            {practices.map((practice, index) => (
              <motion.div
                key={practice.id}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={practiceVariants}
                className="flex items-start gap-4 p-4 rounded-lg hover:bg-cream/50 transition-colors duration-300"
              >
                <motion.div 
                  className="text-caramel mt-1 flex-shrink-0"
                  variants={iconVariants}
                  whileHover="hover"
                >
                  {practice.icon}
                </motion.div>
                
                <div>
                  <h3 className="text-xl font-serif font-bold text-coffee-dark mb-2">
                    {practice.title}
                  </h3>
                  
                  <p className="text-coffee-light">
                    {practice.description}
                  </p>
                </div>
              </motion.div>
            ))}
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              viewport={{ once: true }}
              className="mt-8 pt-6 border-t border-caramel/20"
            >
              <p className="text-coffee italic">
                "Our commitment to sustainable farming isn't just good for the planet—it produces exceptional coffee with distinctive character and depth."
              </p>
              <p className="text-right text-sm text-coffee-light mt-2">— Ubuntu Coffee Export Team</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FarmingPractices;