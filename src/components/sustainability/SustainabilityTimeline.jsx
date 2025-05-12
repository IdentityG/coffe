'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger with GSAP
// This is already done in FarmingPractices, so we can remove it here
// if (typeof window !== 'undefined') {
//   gsap.registerPlugin(ScrollTrigger);
// }

const SustainabilityTimeline = () => {
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);
  const lineRef = useRef(null);
  
  // GSAP animations for scroll reveal
  useEffect(() => {
    // Register ScrollTrigger here instead
    gsap.registerPlugin(ScrollTrigger);
    
    if (sectionRef.current && timelineRef.current && lineRef.current) {
      // Clear only this component's ScrollTriggers by using specific selectors
      // instead of killing all triggers
      // ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      
      // Get all milestone elements
      const milestones = timelineRef.current.querySelectorAll('.milestone');
      const years = timelineRef.current.querySelectorAll('.year');
      const contents = timelineRef.current.querySelectorAll('.content');
      const dots = timelineRef.current.querySelectorAll('.dot');
      
      // Create a master timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: timelineRef.current,
          start: 'top 70%',
          end: 'bottom 30%',
          toggleActions: 'play none none reverse',
        }
      });
      
      // Animate the line drawing
      tl.fromTo(
        lineRef.current,
        { scaleY: 0, transformOrigin: 'top center' },
        { 
          scaleY: 1, 
          duration: 1.5, 
          ease: 'power3.inOut'
        }
      );
      
      // Animate the dots with stagger
      tl.fromTo(
        dots,
        { scale: 0, opacity: 0 },
        { 
          scale: 1, 
          opacity: 1, 
          duration: 0.4, 
          stagger: 0.2, 
          ease: 'back.out(1.7)'
        },
        "-=1.2" // Start slightly before the line completes
      );
      
      // Animate the years with stagger
      tl.fromTo(
        years,
        { opacity: 0, x: -20 },
        { 
          opacity: 1, 
          x: 0, 
          duration: 0.5, 
          stagger: 0.2, 
          ease: 'power3.out'
        },
        "-=1.5" // Overlap with dots animation
      );
      
      // Animate the content with stagger
      tl.fromTo(
        contents,
        { opacity: 0, x: 30 },
        { 
          opacity: 1, 
          x: 0, 
          duration: 0.6, 
          stagger: 0.2, 
          ease: 'power3.out'
        },
        "-=1.5" // Overlap with years animation
      );
    }
    
    return () => {
      // Only kill ScrollTriggers related to this component
      const myTriggers = ScrollTrigger.getAll().filter(trigger => 
        trigger.vars.trigger && 
        (trigger.vars.trigger === timelineRef.current || 
         trigger.vars.trigger.closest('#sustainability-timeline'))
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

  // Animation variants for dot elements
  const dotVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15,
      }
    },
    hover: {
      scale: 1.3,
      backgroundColor: "#D4A24E", // caramel color
      boxShadow: "0 0 10px 2px rgba(212, 162, 78, 0.3)",
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  };

  // Sustainability milestones data
  const milestones = [
    {
      id: 1,
      year: "2010",
      title: "First Organic Certification",
      description: "Achieved our first organic certification, marking the beginning of our sustainability journey."
    },
    {
      id: 2,
      year: "2013",
      title: "Fair Trade Partnership",
      description: "Established direct trade relationships with farmers, ensuring fair compensation and sustainable practices."
    },
    {
      id: 3,
      year: "2016",
      title: "Carbon Footprint Reduction",
      description: "Implemented solar energy at processing facilities, reducing our carbon footprint by 30%."
    },
    {
      id: 4,
      year: "2019",
      title: "Rainforest Alliance Certification",
      description: "All our coffee farms achieved Rainforest Alliance certification for biodiversity protection."
    },
    {
      id: 5,
      year: "2022",
      title: "Zero-Waste Processing",
      description: "Achieved zero-waste processing by converting coffee pulp into organic fertilizer and biofuel."
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="py-16 md:py-24 bg-cream text-coffee-dark overflow-hidden"
      id="sustainability-timeline"
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
            Our Journey Toward Sustainability
          </motion.h2>
          
          <motion.p 
            variants={textVariants}
            className="text-lg text-coffee-light max-w-3xl mx-auto"
          >
            Every year, we've taken steps to protect our planet, empower our partners, and elevate coffee's future.
          </motion.p>
        </motion.div>

        {/* Timeline container */}
        <div 
          ref={timelineRef}
          className="relative max-w-4xl mx-auto"
        >
          {/* Vertical line */}
          <div 
            ref={lineRef}
            className="absolute left-[7.5rem] md:left-[9.5rem] top-0 bottom-0 w-0.5 bg-caramel/60 z-0"
            style={{ height: 'calc(100% - 3rem)' }}
          ></div>
          
          {/* Timeline milestones */}
          {milestones.map((milestone, index) => (
            <div 
              key={milestone.id}
              className={`milestone relative flex items-start mb-16 ${index === milestones.length - 1 ? 'mb-0' : ''}`}
            >
              {/* Year column */}
              <div className="year w-[7rem] md:w-[9rem] pr-4 text-right">
                <h3 className="text-xl md:text-2xl font-serif font-bold text-caramel">
                  {milestone.year}
                </h3>
              </div>
              
              {/* Dot */}
              <motion.div 
                className="dot absolute left-[7.5rem] md:left-[9.5rem] w-4 h-4 bg-caramel rounded-full z-10 -translate-x-[0.4375rem]"
                whileHover="hover"
                variants={dotVariants}
              ></motion.div>
              
              {/* Content */}
              <div className="content flex-1 pl-8">
                <div className="bg-cream-light p-5 rounded-lg shadow-md border border-caramel/10 transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <h3 className="text-xl font-serif font-bold text-coffee-dark mb-2">
                    {milestone.title}
                  </h3>
                  
                  <p className="text-coffee-light">
                    {milestone.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Decorative coffee bean element */}
        <motion.div 
          className="mt-16 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <svg className="w-16 h-16 text-caramel/30" viewBox="0 0 200 200" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 0C44.8 0 0 44.8 0 100s44.8 100 100 100 100-44.8 100-100S155.2 0 100 0zm0 180c-44.1 0-80-35.9-80-80s35.9-80 80-80 80 35.9 80 80-35.9 80-80 80z"/>
            <path d="M100 40c-33.1 0-60 26.9-60 60s26.9 60 60 60 60-26.9 60-60-26.9-60-60-60zm0 100c-22.1 0-40-17.9-40-40s17.9-40 40-40 40 17.9 40 40-17.9 40-40 40z"/>
          </svg>
        </motion.div>
      </div>
    </section>
  );
};

export default SustainabilityTimeline;