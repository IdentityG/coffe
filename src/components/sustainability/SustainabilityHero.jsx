'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

// Register ScrollTrigger with GSAP
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const SustainabilityHero = () => {
  const sectionRef = useRef(null);
  const backgroundRef = useRef(null);
  
  // GSAP animations for parallax effect
  useEffect(() => {
    if (backgroundRef.current) {
      gsap.to(backgroundRef.current, {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true
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

  // Animation variants for scroll indicator
  const scrollIndicatorVariants = {
    initial: { y: 0, opacity: 0.6 },
    animate: {
      y: [0, 10, 0],
      opacity: [0.6, 1, 0.6],
      transition: {
        duration: 2,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "loop"
      }
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-[80vh] w-full flex items-center justify-center overflow-hidden"
    >
      {/* Background image with parallax effect */}
      <div 
        ref={backgroundRef}
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat z-0"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1591142968516-2f5708f1eff9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
          transform: 'scale(1.1)' // Slightly larger to allow for parallax movement
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-coffee-black/80 via-coffee-dark/70 to-coffee-black/80 z-10"></div>
      
      {/* Content container */}
      <div className="container mx-auto px-4 md:px-8 relative z-20 text-center py-16 md:py-24">
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
          className="max-w-4xl mx-auto"
        >
          {/* Main heading */}
          <motion.h1 
            variants={textVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-caramel mb-6 leading-tight"
          >
            Rooted in Responsibility
          </motion.h1>
          
          {/* Subheading */}
          <motion.p 
            variants={textVariants}
            className="text-lg md:text-xl text-cream-light max-w-2xl mx-auto mb-12"
          >
            Our journey to a more sustainable coffee supply chain
          </motion.p>
          
          {/* CTA Button */}
          <motion.div
            variants={textVariants}
            className="mb-16"
          >
            <Link 
              href="/contact"
              className="inline-block px-8 py-3 bg-caramel hover:bg-caramel-dark text-coffee-black font-medium rounded-full transition-colors duration-300 transform hover:scale-105"
            >
              Contact Us Now
            </Link>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Scroll indicator - Fixed centering with flex layout */}
      <div className="absolute bottom-32 w-full flex justify-center items-center z-20">
        <motion.div
          variants={scrollIndicatorVariants}
          initial="initial"
          animate="animate"
          className="flex flex-col items-center"
        >
          <span className="text-cream-light text-sm mb-2">Scroll to contact form</span>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6 text-caramel" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19 14l-7 7m0 0l-7-7m7 7V3" 
            />
          </svg>
        </motion.div>
      </div>
      
      {/* Decorative coffee bean elements */}
      <motion.div 
        className="absolute top-1/4 left-8 md:left-16 w-20 h-20 opacity-20 z-10"
        initial={{ opacity: 0, rotate: 0 }}
        animate={{ 
          opacity: 0.2, 
          rotate: 360,
          transition: { duration: 20, repeat: Infinity, ease: "linear" } 
        }}
      >
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 0C44.8 0 0 44.8 0 100s44.8 100 100 100 100-44.8 100-100S155.2 0 100 0zm0 180c-44.1 0-80-35.9-80-80s35.9-80 80-80 80 35.9 80 80-35.9 80-80 80z" fill="#F5E6D3"/>
          <path d="M100 40c-33.1 0-60 26.9-60 60s26.9 60 60 60 60-26.9 60-60-26.9-60-60-60zm0 100c-22.1 0-40-17.9-40-40s17.9-40 40-40 40 17.9 40 40-17.9 40-40 40z" fill="#F5E6D3"/>
        </svg>
      </motion.div>
      
      <motion.div 
        className="absolute bottom-1/3 right-8 md:right-16 w-16 h-16 opacity-20 z-10"
        initial={{ opacity: 0, rotate: 0 }}
        animate={{ 
          opacity: 0.2, 
          rotate: -360,
          transition: { duration: 15, repeat: Infinity, ease: "linear" } 
        }}
      >
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 0C44.8 0 0 44.8 0 100s44.8 100 100 100 100-44.8 100-100S155.2 0 100 0zm0 180c-44.1 0-80-35.9-80-80s35.9-80 80-80 80 35.9 80 80-35.9 80-80 80z" fill="#D4A24E"/>
          <path d="M100 40c-33.1 0-60 26.9-60 60s26.9 60 60 60 60-26.9 60-60-26.9-60-60-60zm0 100c-22.1 0-40-17.9-40-40s17.9-40 40-40 40 17.9 40 40-17.9 40-40 40z" fill="#D4A24E"/>
        </svg>
      </motion.div>
    </section>
  );
};

export default SustainabilityHero;