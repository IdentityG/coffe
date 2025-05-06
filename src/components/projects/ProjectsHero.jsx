'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

// Register ScrollTrigger with GSAP
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const ProjectsHero = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  
  // GSAP animations for parallax and scroll effects
  useEffect(() => {
    if (sectionRef.current && imageRef.current) {
      // Parallax zoom effect on the background image
      gsap.to(imageRef.current, {
        scale: 1.1,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      });
      
      // Pin the hero section briefly
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=30%',
        pin: true,
        pinSpacing: false,
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
    initial: { y: 0 },
    animate: {
      y: [0, 10, 0],
      transition: {
        duration: 1.5,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "loop"
      }
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden"
      id="projects-hero"
    >
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <div 
          ref={imageRef}
          className="relative w-full h-full scale-105"
        >
          <Image
            src="/coffe.jpg" 
            alt="Coffee farmers working together"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-coffee-black/60"></div>
        </div>
      </div>
      
      {/* Content overlay */}
      <div 
        ref={contentRef}
        className="relative z-10 container mx-auto px-4 md:px-8 text-center"
      >
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
          <motion.h1 
            variants={textVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-cream mb-6 leading-tight"
          >
            Sustainability. Community. Traceability.
          </motion.h1>
          
          <motion.p 
            variants={textVariants}
            className="text-xl md:text-2xl text-cream/90 max-w-3xl mx-auto mb-12"
          >
            Explore the real-world impact of our partnerships and projects.
          </motion.p>
          
          {/* Scroll indicator */}
          <motion.div
            variants={textVariants}
            className="mt-12"
          >
            <motion.div
              variants={scrollIndicatorVariants}
              initial="initial"
              animate="animate"
              className="inline-block"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-8 w-8 text-caramel" 
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
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsHero;