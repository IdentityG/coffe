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

const FarmerStories = () => {
  const sectionRef = useRef(null);
  const storiesRef = useRef(null);
  
  // GSAP animations for scroll reveal
  useEffect(() => {
    if (sectionRef.current && storiesRef.current) {
      // Get all story cards
      const storyCards = storiesRef.current.querySelectorAll('.story-card');
      const storyImages = storiesRef.current.querySelectorAll('.story-image');
      
      // Create a timeline for staggered animations
      storyCards.forEach((card, index) => {
        // Subtle zoom effect on images
        gsap.fromTo(
          storyImages[index],
          { scale: 1.1 },
          {
            scale: 1,
            duration: 1.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom-=100',
              end: 'bottom center',
              toggleActions: 'play none none reverse',
              scrub: 0.5
            }
          }
        );
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

  // Animation variants for story cards
  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.2,
        duration: 0.8,
        ease: [0.6, 0.05, 0.01, 0.9],
      },
    }),
    hover: {
      y: -10,
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  // Animation variants for impact icons
  const iconVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 0.3
      }
    },
    hover: {
      scale: 1.2,
      rotate: 5,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  };

  // Farmer stories data
 const stories = [
  {
    id: 1,
    name: "Abeba Desta",
    region: "Sidamo, Ethiopia",
    image: "/images/profile.png",
    quote: "With support from Mekiya Coffee, our village school has expanded. Now my daughter dreams of becoming an agricultural engineer.",
    impact: "📚",
    impactType: "Education"
  },
  {
    id: 2,
    name: "Tesfaye Buli",
    region: "Guji, Ethiopia",
    image: "/images/profile.png",
    quote: "The new water-saving wet mill helped us reduce waste and improve bean quality. It changed how we process coffee in our community.",
    impact: "💧",
    impactType: "Water Conservation"
  },
  {
    id: 3,
    name: "Meaza Tulu",
    region: "Yirgacheffe, Ethiopia",
    image: "/images/profile.png",
    quote: "Replanting native trees on our farm has brought back birds and healthier soil. We grow better coffee while preserving the forest.",
    impact: "🌱",
    impactType: "Reforestation"
  },
  {
    id: 4,
    name: "Dereje Alemu",
    region: "Jimma, Ethiopia",
    image: "/images/profile.png",
    quote: "After organic farming training, we stopped using chemicals. The land is thriving — and so are our prices and our health.",
    impact: "🌿",
    impactType: "Sustainable Farming"
  }
];

  return (
    <section 
      ref={sectionRef}
      className="py-16 md:py-24 bg-white text-coffee-dark overflow-hidden"
      id="farmer-stories"
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
            Stories From the Soil
          </motion.h2>
          
          <motion.p 
            variants={textVariants}
            className="text-lg text-black max-w-3xl mx-auto"
          >
            We don't just buy coffee. We invest in communities.
          </motion.p>
        </motion.div>

        {/* Stories grid */}
        <div 
          ref={storiesRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {stories.map((story, index) => (
            <motion.div
              key={story.id}
              custom={index}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true, margin: "-50px" }}
              variants={cardVariants}
              className="story-card bg-cream-light rounded-xl overflow-hidden shadow-md border border-caramel/10 flex flex-col h-full transform transition-all duration-300"
            >
              {/* Farmer image */}
              <div className="relative h-64 overflow-hidden">
                <div className="story-image absolute inset-0 w-full h-full">
                  <Image
                    src={story.image}
                    alt={`${story.name} - Coffee Farmer`}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-coffee-black/70 to-transparent"></div>
                
                {/* Impact icon */}
                <motion.div 
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-caramel/90 flex items-center justify-center text-xl shadow-lg"
                  variants={iconVariants}
                  whileHover="hover"
                  title={story.impactType}
                >
                  {story.impact}
                </motion.div>
              </div>
              
              {/* Content */}
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-serif font-bold text-coffee-dark mb-1">
                    {story.name}
                  </h3>
                  
                  <p className="text-caramel text-sm font-medium mb-4">
                    {story.region}
                  </p>
                  
                  <p className="text-coffee-light italic">
                    "{story.quote}"
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Decorative element */}
        <motion.div 
          className="mt-16 flex justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="w-24 h-1 bg-espresso rounded-full"></div>
        </motion.div>
      </div>
    </section>
  );
};

export default FarmerStories;