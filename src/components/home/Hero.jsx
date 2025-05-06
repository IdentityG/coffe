'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  // Slide data with Corretto-style coffee-themed content
  const slides = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      headline: 'Our Delicious Offer',
      subtext: 'Premium coffee beans sourced from the finest plantations around the world',
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1507133750040-4a8f57021571?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
      headline: 'The Coffee Herald',
      subtext: 'Discover the art and science behind every perfect cup',
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      headline: 'Online Coffee Shop',
      subtext: 'Bringing the finest coffee varieties directly to your doorstep',
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for forward, -1 for backward
  const slideInterval = useRef(null);
  const textRef = useRef(null);
  const heroRef = useRef(null);
  const bgImageRef = useRef(null);

  // GSAP animation for text elements
  useEffect(() => {
    if (textRef.current) {
      const tl = gsap.timeline();
      tl.fromTo(
        textRef.current.querySelector('h1'),
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
      )
        .fromTo(
          textRef.current.querySelector('p'),
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4, ease: 'power3.out' },
          '-=0.4'
        )
        .fromTo(
          textRef.current.querySelector('.btn-wrapper'),
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.2, ease: 'power3.out' },
          '-=0.2'
        );
    }
  }, [currentSlide]);

  // Parallax effect when scrolling
  useEffect(() => {
    // Create parallax effect for background image and text content
    if (bgImageRef.current && textRef.current) {
      // Background image moves slower than scroll speed (parallax)
      gsap.to(bgImageRef.current, {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Text content moves faster than background (creates depth)
      gsap.to(textRef.current, {
        yPercent: -20,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Fade out text as user scrolls
      gsap.to(textRef.current, {
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: '20% top',
          end: '40% top',
          scrub: true,
        },
      });
    }

    return () => {
      // Clean up ScrollTrigger instances
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Auto-transition slides
  useEffect(() => {
    // Start the interval
    slideInterval.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setDirection(1);
    }, 8000); // 8 seconds per slide

    // Clear the interval on component unmount
    return () => {
      if (slideInterval.current) {
        clearInterval(slideInterval.current);
      }
    };
  }, [slides.length]);

  // Manual navigation
  const goToSlide = (index) => {
    if (slideInterval.current) {
      clearInterval(slideInterval.current);
    }
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
    
    // Restart the interval
    slideInterval.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setDirection(1);
    }, 8000);
  };

  // Animation variants for slides - Corretto-style fade effect
  const slideVariants = {
    enter: {
      opacity: 0,
      scale: 1.05,
      position: 'absolute',
    },
    center: {
      opacity: 1,
      scale: 1,
      position: 'relative',
      transition: {
        opacity: { duration: 1.5 },
        scale: { duration: 1.8 },
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      position: 'absolute',
      transition: {
        opacity: { duration: 1.5 },
        scale: { duration: 1.8 },
      },
    },
  };

  return (
    <div ref={heroRef} className="relative w-full h-[92vh] overflow-hidden hero-section">
      <AnimatePresence initial={false} mode="sync">
        <motion.div
          key={slides[currentSlide].id}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0 w-full h-full"
        >
          {/* Background Image with Overlay */}
          <div 
            ref={bgImageRef}
            className="absolute inset-0 bg-cover bg-center will-change-transform" 
            style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
          >
            {/* Single overlay with gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-coffee-black/80 to-coffee-black/60"></div>
          </div>

          {/* Text Content */}
          <div 
            ref={textRef}
            className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 md:px-12 lg:px-24 will-change-transform"
          >
            {/* Decorative line */}
            <div className="w-16 h-0.5 bg-caramel mb-6 shadow-glow"></div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-cream-light mb-4 md:mb-6 tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] font-bold">
              {slides[currentSlide].headline}
            </h1>
            
            <div className="w-16 h-0.5 bg-caramel mb-6 shadow-glow"></div>
            
            <p className="text-xl md:text-2xl text-cream mb-8 md:mb-10 font-light drop-shadow-[0_2px_3px_rgba(0,0,0,0.7)]">
              {slides[currentSlide].subtext}
            </p>
            
            {/* Button */}
            <div className="btn-wrapper">
              <Link 
                href="/menu" 
                className="group relative inline-flex items-center justify-center px-8 py-3 bg-caramel text-coffee-black font-medium uppercase tracking-widest text-sm overflow-hidden transition-all duration-300 hover:bg-caramel-dark border-2 border-cream-light hover:border-caramel-dark hover:shadow-lg hover:shadow-caramel/20"
              >
                <span className="relative z-10 flex items-center justify-center group-hover:text-cream-light transition-colors duration-300">
                  <span>Discover More</span>
                  <svg 
                    className="ml-2 w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </Link>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center space-x-4">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentSlide === index ? 'bg-caramel scale-150' : 'bg-cream-light/50 hover:bg-cream-light'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-12 right-8 hidden md:flex flex-col items-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <span className="text-cream-light/70 text-sm mb-2 tracking-widest">SCROLL</span>
        <motion.div
          animate={{
            y: [0, 8, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "loop",
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5V19M12 19L5 12M12 19L19 12" stroke="rgba(245, 230, 211, 0.7)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;