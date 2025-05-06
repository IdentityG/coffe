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
      image: "https://images.unsplash.com/photo-1594136976553-38728eafb8bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
      quote: "With fair trade premiums, we built a new school for our children. Now my daughter dreams of becoming an agricultural engineer.",
      impact: "📚",
      impactType: "Education"
    },
    {
      id: 2,
      name: "Carlos Mendoza",
      region: "Huehuetenango, Guatemala",
      image: "https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
      quote: "The water conservation project changed everything. Our yields have improved, and we no longer worry about drought affecting our livelihood.",
      impact: "💧",
      impactType: "Water Conservation"
    },
    {
      id: 3,
      name: "Maria Gonzalez",
      region: "Antigua, Guatemala",
      image: "https://images.unsplash.com/photo-1599013886693-5fc5fd7a2b8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
      quote: "The reforestation initiative has restored our land's health. We're growing better coffee while protecting the forest that sustains us.",
      impact: "🌱",
      impactType: "Reforestation"
    },
    {
      id: 4,
      name: "Emmanuel Kofi",
      region: "Ashanti Region, Ghana",
      image: "https://images.unsplash.com/photo-1589156229687-496a31ad1d1f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=772&q=80",
      quote: "The organic farming training transformed our practices. Now we earn premium prices while preserving our soil for future generations.",
      impact: "🌱",
      impactType: "Sustainable Farming"
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="py-16 md:py-24 bg-cream text-coffee-dark overflow-hidden"
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
            className="text-lg text-coffee-light max-w-3xl mx-auto"
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
          <div className="w-24 h-1 bg-caramel/30 rounded-full"></div>
        </motion.div>
      </div>
    </section>
  );
};

export default FarmerStories;