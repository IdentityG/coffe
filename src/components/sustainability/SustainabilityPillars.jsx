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
      icon: "🌍",
      title: "Ethical Sourcing",
      description: "We work directly with smallholder farmers, offering fair pricing and long-term partnerships that create stable livelihoods and shared value across generations."
    },
    {
      id: 2,
      icon: "🌿",
      title: "Environmental Stewardship",
      description: "Our coffee is shade-grown in biodiverse ecosystems. Through reforestation, reduced water usage, and organic methods, we prioritize climate resilience and soil health."
    },
    {
      id: 3,
      icon: "🤝",
      title: "Community Investment",
      description: "From education to infrastructure, we reinvest in the communities that grow with us — supporting programs that empower farmers, families, and future generations."
    },
    {
      id: 4,
      icon: "🔎",
      title: "Traceable from Origin to Export",
      description: "Transparency is built into our process. Every lot we export is traceable from farm to freight — ensuring quality, accountability, and connection at every step."
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="py-16 md:py-24 bg-white text-coffee-dark overflow-hidden"
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
            className="text-lg text-black max-w-3xl mx-auto"
          >
            We’re cultivating a coffee future that’s ethical, regenerative, and rooted in trust — where every step supports both the land and the people behind each bean.
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
              className="pillar-card bg-espresso p-6 md:p-8 rounded-xl shadow-md border border-caramel/20 flex flex-col items-center text-center transition-all duration-300"
            >
              <motion.div 
                className="mb-4 text-caramel"
                variants={iconVariants}
              >
                {pillar.icon}
              </motion.div>
              
              <h3 className="text-xl font-serif font-bold text-caramel mb-3">
                {pillar.title}
              </h3>
              
              <p className="text-cream-light">
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
            className="w-24 h-1 bg-espresso rounded-full"
          />
        </div>
      </div>
    </section>
  );
};

export default SustainabilityPillars;