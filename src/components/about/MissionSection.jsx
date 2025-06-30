'use client';

import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger with GSAP
gsap.registerPlugin(ScrollTrigger);

const MissionSection = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });

  // Animation variants for Framer Motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: [0.6, 0.05, 0.01, 0.9],
      },
    },
  };

  // Mission, Vision, Values data
  const cards = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
        </svg>
      ),
      title: "Our Mission",
      description: "To connect exceptional, traceable Ethiopian coffees with roasters worldwide — while building sustainable livelihoods and lasting relationships with the communities who grow them."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ),
      title: "Our Vision",
      description: "To set a global benchmark for ethical coffee exports — where excellence, transparency, and community empowerment are at the heart of every harvest."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      title: "Our Values",
      description: "Quality without compromise. Transparency in every step. Environmental responsibility. Community-driven impact. Partnerships built on trust and longevity."
    }
  ];

  // GSAP ScrollTrigger animations
  useEffect(() => {
    if (cardsRef.current.length) {
      // Animate cards with ScrollTrigger
      cardsRef.current.forEach((card, index) => {
        gsap.fromTo(
          card,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: index * 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom-=100',
              end: 'center center',
              toggleActions: 'play none none reverse',
            },
          }
        );

        // Subtle parallax effect on icons
        const icon = card.querySelector('.icon-container');
        if (icon) {
          gsap.to(icon, {
            y: -15,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          });
        }
      });
    }

    return () => {
      // Clean up ScrollTrigger instances
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="py-20 md:py-28 bg-coffee-dark text-cream overflow-hidden"
    >
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.h2 
            variants={itemVariants} 
            className="text-3xl md:text-5xl font-serif font-bold text-caramel mb-4"
          >
            What Drives Us
          </motion.h2>
          <motion.p 
            variants={itemVariants} 
            className="max-w-2xl mx-auto text-lg text-cream-light"
          >
           Our purpose is rooted in Ethiopia’s highlands and extends to coffee lovers around the globe. Every bean we export reflects our belief that great coffee should create shared value — for farmers, for partners, and for the planet.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {cards.map((card, index) => (
            <div 
              key={card.title}
              ref={el => cardsRef.current[index] = el}
              className="bg-espresso p-8 rounded-xl shadow-lg transform transition-transform duration-300 hover:scale-105"
            >
              <div className="icon-container text-caramel mb-6">
                {card.icon}
              </div>
              <h3 className="text-2xl font-serif font-bold text-caramel mb-4">{card.title}</h3>
              <p className="text-cream-light">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MissionSection;