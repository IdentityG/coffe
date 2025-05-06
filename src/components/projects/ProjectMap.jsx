'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { FaCoffee, FaMapMarkerAlt } from 'react-icons/fa';

// Register ScrollTrigger with GSAP
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Create a custom icon using React Icons (rendered to HTML)
const createCustomIcon = (color = '#D4A24E') => {
  // Create a custom div element with the icon
  const customIcon = L.divIcon({
    className: 'custom-leaflet-marker',
    html: `<div style="
      color: ${color}; 
      font-size: 32px; 
      filter: drop-shadow(0 2px 2px rgba(0, 0, 0, 0.3));
      display: flex;
      align-items: center;
      justify-content: center;
      ">
      <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 384 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
        <path d="M192 0C85.97 0 0 85.97 0 192c0 77.41 26.97 99.03 172.3 309.7c9.531 13.77 29.91 13.77 39.44 0C357 291 384 269.4 384 192C384 85.97 298 0 192 0zM192 272c-44.18 0-80-35.82-80-80S147.8 112 192 112s80 35.82 80 80S236.2 272 192 272z"></path>
      </svg>
    </div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  });
  
  return customIcon;
};

// Custom marker component with animation
const AnimatedMarker = ({ position, project, isActive, setActiveMarker }) => {
  // Create different colored icons based on project type
  const getIconColor = () => {
    switch(project.type) {
      case 'Education': return '#D4A24E'; // caramel
      case 'Infrastructure': return '#3B82F6'; // blue
      case 'Agriculture': return '#10B981'; // green
      case 'Processing': return '#8B5CF6'; // purple
      case 'Community': return '#EF4444'; // red
      default: return '#D4A24E'; // default caramel
    }
  };

  return (
    <Marker 
      position={position} 
      icon={createCustomIcon(isActive ? '#6B4226' : getIconColor())}
      eventHandlers={{
        click: () => setActiveMarker(project.id),
        mouseover: () => setActiveMarker(project.id),
        mouseout: () => setActiveMarker(null)
      }}
    >
      <Popup>
        <div className="p-2">
          <h3 className="font-serif font-bold text-coffee-dark">{project.name}</h3>
          <p className="text-sm text-caramel">{project.region}</p>
          <div className="flex items-center gap-1 text-xs text-coffee-light mt-1">
            <FaCoffee />
            <span>{project.type}</span>
          </div>
        </div>
      </Popup>
    </Marker>
  );
};

const ProjectMap = () => {
  const sectionRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef(null);
  const [activeMarker, setActiveMarker] = useState(null);
  
  // GSAP animations for scroll reveal
  useEffect(() => {
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
          {typeof window !== 'undefined' && (
            <MapContainer 
              center={[10, 0]} 
              zoom={2} 
              style={{ height: '100%', width: '100%' }}
              scrollWheelZoom={false}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              
              <div ref={markersRef}>
                {projects.map((project) => (
                  <AnimatedMarker
                    key={project.id}
                    position={project.position}
                    project={project}
                    isActive={activeMarker === project.id}
                    setActiveMarker={setActiveMarker}
                  />
                ))}
              </div>
            </MapContainer>
          )}
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