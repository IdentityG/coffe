'use client';

import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const Sustainability = () => {
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);
  const titleRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });

  // Sustainability principles data
  const sustainabilityPrinciples = [
    {
      id: 1,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2a9 9 0 0 1 9 9c0 4.97-4.03 9-9 9A9 9 0 0 1 3 11c0-4.97 4.03-9 9-9z"></path>
          <path d="M12 6v6l4 2"></path>
          <path d="M5 12h2"></path>
          <path d="M17 12h2"></path>
          <path d="M12 19v2"></path>
        </svg>
      ),
      title: "Long-term Partnerships",
      description: "We maintain direct relationships with farmers spanning decades, ensuring fair compensation and sustainable livelihoods."
    },
    {
      id: 2,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 12a10 10 0 1 0 20 0 10 10 0 1 0-20 0"></path>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
          <path d="M2 12h20"></path>
        </svg>
      ),
      title: "Global Responsibility",
      description: "Our commitment to environmental stewardship extends across our entire supply chain, from farm to cup."
    },
    {
      id: 3,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v1"></path>
          <path d="M12 21v-1"></path>
          <path d="M4.22 4.22l.77.77"></path>
          <path d="M18.5 18.5l.77.77"></path>
          <path d="M2 12h1"></path>
          <path d="M21 12h-1"></path>
          <path d="M4.22 19.78l.77-.77"></path>
          <path d="M18.5 5.5l.77-.77"></path>
          <path d="M12 18a6 6 0 0 0 0-12v12z"></path>
        </svg>
      ),
      title: "Biodiversity Conservation",
      description: "We promote shade-grown coffee cultivation that preserves forest canopies and protects vital habitats for birds and wildlife."
    },
    {
      id: 4,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path>
          <path d="M8 11h8"></path>
          <path d="M12 15V7"></path>
        </svg>
      ),
      title: "Organic Practices",
      description: "Our farmers use natural fertilizers and pest management techniques, avoiding harmful chemicals that damage ecosystems."
    },
    {
      id: 5,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16.5 9.4l-9-5.19"></path>
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
          <path d="M3.27 6.96L12 12.01l8.73-5.05"></path>
          <path d="M12 22.08V12"></path>
        </svg>
      ),
      title: "Community Investment",
      description: "We reinvest in coffee-growing communities through education programs, healthcare initiatives, and infrastructure development."
    }
  ];

  // GSAP ScrollTrigger animations
  useEffect(() => {
    if (titleRef.current && timelineRef.current) {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top bottom-=100',
            end: 'bottom center',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Timeline items animation with staggered effect
      const timelineItems = timelineRef.current.querySelectorAll('.timeline-item');
      timelineItems.forEach((item, index) => {
        gsap.fromTo(
          item,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: item,
              start: 'top bottom-=50',
              end: 'bottom center',
              toggleActions: 'play none none reverse',
            },
            delay: index * 0.1, // Staggered delay
          }
        );
      });

      // Parallax effect for the background
      gsap.to('.sustainability-bg', {
        y: -80,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.5,
        },
      });
    }

    return () => {
      // Clean up ScrollTrigger instances
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Framer Motion variants
  const iconVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        type: 'spring',
        stiffness: 200,
        damping: 10
      }
    },
    hover: { 
      scale: 1.1,
      color: '#D4A24E', // caramel color on hover
      transition: { 
        type: 'spring',
        stiffness: 300,
        damping: 15
      }
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-24 overflow-hidden bg-white"
    >
      {/* Background image with overlay 
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="sustainability-bg absolute inset-0 bg-cover bg-center opacity-10" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=2578')" }}>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-cream via-cream/90 to-cream"></div>
      </div> */}

      {/* Decorative elements 
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-epresso to-transparent opacity-70"></div>
      <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-caramel/5 -z-10"></div> */}
      
      <div className="container relative z-10 mx-auto px-4">
        {/* Section title */}
        <div ref={titleRef} className="text-center mb-16">
          <div className="inline-block">
            <span className="block h-0.5 w-10 bg-espresso mx-auto mb-6"></span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-coffee-dark mb-4">
              Sustainability & Ethical Sourcing
            </h2>
            <p className="text-lg text-black max-w-2xl mx-auto">
              Our commitment to environmental stewardship and social responsibility guides every decision we make
            </p>
            <span className="block h-0.5 w-10 bg-espresso mx-auto mt-6"></span>
          </div>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="max-w-4xl mx-auto">
          {sustainabilityPrinciples.map((principle, index) => (
            <div 
              key={principle.id}
              className={`timeline-item relative flex flex-col md:flex-row items-center md:items-start gap-6 mb-16 last:mb-0 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
            >
              {/* Timeline line */}
              <div className="absolute left-1/2 md:left-auto md:inset-x-1/2 top-16 bottom-0 w-px bg-cream-light -z-10 transform -translate-x-1/2"></div>
              
              {/* Icon */}
              <motion.div 
                className="relative z-10 w-16 h-16 rounded-full bg-cream-light shadow-md flex items-center justify-center text-espresso border-2 border-caramel/20"
                variants={iconVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                whileHover="hover"
                transition={{ delay: index * 0.1 }}
              >
                {principle.icon}
              </motion.div>
              
              {/* Content */}
              <div className={`flex-1 ${index % 2 !== 0 ? 'md:text-right' : ''}`}>
                <h3 className="text-xl font-bold text-coffee-dark mb-2">{principle.title}</h3>
                <p className="text-black">{principle.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <Link 
            href="/sustainability" 
            className="group relative inline-flex items-center justify-center px-8 py-3 bg-coffee text-cream-light font-medium uppercase tracking-widest text-sm overflow-hidden transition-all duration-300 hover:bg-coffee-dark border-2 border-coffee hover:border-coffee-dark rounded-md hover:shadow-lg"
          >
            <span className="relative z-10 flex items-center justify-center transition-colors duration-300">
              <span>Learn More About Our Practices</span>
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
        </motion.div>
      </div>
    </section>
  );
};

export default Sustainability;