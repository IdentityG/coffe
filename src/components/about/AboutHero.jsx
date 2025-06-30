'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

// Register ScrollTrigger with GSAP
gsap.registerPlugin(ScrollTrigger);

const AboutHero = () => {
  const heroRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);

  // Animation variants for Framer Motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
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

  // GSAP ScrollTrigger animations
  useEffect(() => {
    if (imageRef.current && contentRef.current) {
      // Parallax effect on the background image
      gsap.to(imageRef.current, {
        scale: 1.1,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Fade out content on scroll
      gsap.to(contentRef.current, {
        opacity: 0,
        y: -50,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'center center',
          end: 'bottom top',
          scrub: true,
        },
      });
    }

    return () => {
      // Clean up ScrollTrigger instances
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section 
      ref={heroRef} 
      className="relative min-h-[85vh] w-full overflow-hidden flex items-center justify-center"
    >
      {/* Background Image with Parallax Effect */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <div ref={imageRef} className="w-full h-full scale-105">
          <Image
            src="/images/coffee3.jpg"
            alt="Ethiopian coffee farm landscape"
            fill
            priority
            className="object-cover"
          />
        </div>
        {/* Overlay */}
        <div className="absolute inset-0 bg-espresso-dark/60"></div>
      </div>

      {/* Content */}
      <div 
        ref={contentRef}
        className="relative z-10 container mx-auto px-4 md:px-20 text-center"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto"
        >
          <motion.h1 
            variants={itemVariants} 
            className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 text-cream leading-tight"
          >
            Our Journey Begins in Ethiopia’s Highlands
          </motion.h1>
          
          <motion.p 
            variants={itemVariants} 
            className="text-lg md:text-xl text-cream-light mb-10 max-w-3xl mx-auto"
          >
            Driven by a family legacy and a passion for quality, Mekiya Coffee entered the specialty coffee export world in 2024, partnering with farmers across Ethiopia to share our country’s finest beans with the world.
          </motion.p>
          
          <motion.div 
            variants={itemVariants}
            className="mt-12"
          >
            <motion.a 
              href="#about-content"
              className="inline-flex items-center text-caramel hover:text-caramel-light transition-colors duration-300"
              whileHover={{ y: 5 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <span className="mr-2 text-lg">Scroll to learn more</span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6 animate-bounce" 
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
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutHero;