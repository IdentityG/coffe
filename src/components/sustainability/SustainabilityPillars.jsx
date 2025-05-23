'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger with GSAP
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const SustainabilityPillars = () => {
  const sectionRef = useRef(null);
  const pillarsRef = useRef(null);
  
  // GSAP animations for scroll reveal
  useEffect(() => {
    if (pillarsRef.current && sectionRef.current) {
      const pillarCards = pillarsRef.current.querySelectorAll('.pillar-card');
      
      // Create a timeline for staggered animations
      gsap.fromTo(
        pillarCards,
        { 
          y: 50,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: pillarsRef.current,
            start: 'top bottom-=100',
            end: 'center center',
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

  // Animation variants for pillar cards
  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: [0.6, 0.05, 0.01, 0.9],
      },
    }),
    hover: {
      y: -10,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
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
      scale: 1.1,
      rotate: 5,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  };

  // Sustainability pillars data
  const pillars = [
    {
      id: 1,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
      ),
      title: "Ethical Sourcing",
      description: "We pay fair prices to farmers and invest in their communities, ensuring sustainable livelihoods and long-term partnerships."
    },
    {
      id: 2,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        </svg>
      ),
      title: "Environmental Stewardship",
      description: "Our shade-grown coffee preserves biodiversity, protects soil health, and minimizes water usage through responsible farming practices."
    },
    {
      id: 3,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      ),
      title: "Community Development",
      description: "We support education, healthcare, and infrastructure in coffee-growing regions, empowering communities to thrive beyond coffee production."
    },
    {
      id: 4,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
        </svg>
      ),
      title: "Transparent Supply Chain",
      description: "From farm to cup, we maintain full traceability and accountability, sharing the journey of our coffee with customers and stakeholders."
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="py-16 md:py-24 bg-cream-light text-coffee-dark overflow-hidden"
      id="sustainability-pillars"
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
          className="text-center mb-16"
        >
          <motion.h2 
            variants={textVariants}
            className="text-3xl md:text-4xl font-serif font-bold text-coffee mb-4"
          >
            Our Approach to Sustainability
          </motion.h2>
          
          <motion.p 
            variants={textVariants}
            className="text-lg text-coffee-light max-w-3xl mx-auto"
          >
            We believe in a model that's ethical, regenerative, and rooted in transparency.
          </motion.p>
        </motion.div>

        {/* Pillars grid */}
        <div 
          ref={pillarsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6"
        >
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.id}
              custom={index}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true, margin: "-50px" }}
              variants={cardVariants}
              className="pillar-card bg-cream p-6 md:p-8 rounded-xl shadow-md border border-caramel/20 flex flex-col items-center text-center transition-all duration-300"
            >
              <motion.div 
                className="mb-4 text-caramel"
                variants={iconVariants}
              >
                {pillar.icon}
              </motion.div>
              
              <h3 className="text-xl font-serif font-bold text-coffee-dark mb-3">
                {pillar.title}
              </h3>
              
              <p className="text-coffee-light">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Decorative element */}
        <div className="mt-16 flex justify-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="w-24 h-1 bg-caramel/30 rounded-full"
          />
        </div>
      </div>
    </section>
  );
};

export default SustainabilityPillars;