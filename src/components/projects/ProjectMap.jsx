'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import dynamic from 'next/dynamic';
import { FaCoffee } from 'react-icons/fa';

// Dynamically import the Map component with SSR disabled
const Map = dynamic(
  () => import('./Map'), // Create this component separately
  { ssr: false, loading: () => <div className="w-full h-[500px] md:h-[600px] bg-cream-light/50 rounded-xl flex items-center justify-center">Loading map...</div> }
);

const ProjectMap = () => {
  const sectionRef = useRef(null);
  const mapRef = useRef(null);
  const [activeMarker, setActiveMarker] = useState(null);
  
  // GSAP animations for scroll reveal
  useEffect(() => {
    // Register ScrollTrigger inside useEffect to avoid SSR issues
    gsap.registerPlugin(ScrollTrigger);
    
    if (sectionRef.current && mapRef.current) {
      // Reveal animation for the map container
      gsap.fromTo(
        mapRef.current,
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
            trigger: mapRef.current,
            start: 'top bottom-=100',
            end: 'bottom center',
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

  // Project data with locations
  const projects = [
    {
      id: 1,
      name: "Sidamo Education Center",
      region: "Sidamo, Ethiopia",
      type: "Education",
      position: [6.7724, 38.3941] // Latitude, Longitude
    },
    {
      id: 2,
      name: "Huehuetenango Water Project",
      region: "Huehuetenango, Guatemala",
      type: "Infrastructure",
      position: [15.3197, -91.4711]
    },
    {
      id: 3,
      name: "Antigua Sustainable Farming",
      region: "Antigua, Guatemala",
      type: "Agriculture",
      position: [14.5586, -90.7295]
    },
    {
      id: 4,
      name: "Ashanti Processing Facility",
      region: "Ashanti Region, Ghana",
      type: "Processing",
      position: [6.7470, -1.5209]
    },
    {
      id: 5,
      name: "Chiapas Community Center",
      region: "Chiapas, Mexico",
      type: "Community",
      position: [16.7569, -92.6376]
    }
  ];

  // Get icon for project type
  const getProjectIcon = (type) => {
    switch(type) {
      case 'Education': return '🎓';
      case 'Infrastructure': return '🚰';
      case 'Agriculture': return '🌱';
      case 'Processing': return '⚙️';
      case 'Community': return '🤝';
      default: return '☕';
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="py-16 md:py-24 bg-cream text-coffee-dark overflow-hidden"
      id="project-map"
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
            Where We Work
          </motion.h2>
          
          <motion.p 
            variants={textVariants}
            className="text-lg text-coffee-light max-w-3xl mx-auto"
          >
            From Ethiopia's highlands to the world — our impact is rooted in the soil.
          </motion.p>
        </motion.div>

        {/* Map container */}
        <div 
          ref={mapRef}
          className="w-full h-[500px] md:h-[600px] rounded-xl overflow-hidden shadow-lg border border-caramel/10"
        >
          <Map 
            projects={projects} 
            activeMarker={activeMarker} 
            setActiveMarker={setActiveMarker} 
          />
        </div>
        
        {/* Project legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-8 flex flex-wrap justify-center gap-4"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              whileHover={{ scale: 1.05 }}
              className={`px-4 py-2 rounded-full text-sm font-medium cursor-pointer transition-colors duration-300 flex items-center gap-2 ${activeMarker === project.id ? 'bg-caramel text-cream' : 'bg-cream-light text-coffee-light hover:bg-caramel/10'}`}
              onMouseEnter={() => setActiveMarker(project.id)}
              onMouseLeave={() => setActiveMarker(null)}
            >
              <span>{getProjectIcon(project.type)}</span>
              {project.name}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectMap;