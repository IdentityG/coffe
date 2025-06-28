'use client';

import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

// Register ScrollTrigger with GSAP
gsap.registerPlugin(ScrollTrigger);

const WhyWorkWithUs = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const ctaRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });

  // Benefits data
  const benefits = [
    {
      icon: "🌱",
      title: "Traceable from Farm to Freight",
      description: "Our beans are sourced through direct relationships with Ethiopian farmers, with full visibility from origin to export."
    },
    {
      icon: "🤝",
      title: "Built on Long-Term Relationships",
      description: "We prioritize mutual trust — working closely with both producers and roasters to ensure consistency, growth, and shared goals."
    },
    {
      icon: "🌍",
      title: "Global Export Readiness",
      description: "With Mekiya Enterprise’s backing, our logistics operations are optimized for smooth international delivery and customs compliance."
    },
    {
      icon: "⚖️",
      title: "Transparent, Ethical Pricing",
      description: "We offer clear, fair pricing structures that support both farmer livelihoods and client confidence."
    },
    {
      icon: "🌐",
      title: "Origin Expertise & Regional Selection",
      description: "Our coffees consistently score 85+ points on specialty coffee scales."
    },
    {
      icon: "📈",
      title: "Growing Together",
      description: "Our focus is on partnerships — not just transactions. As you grow, we grow with you."
    },
  ];

  // Animation variants for Framer Motion
  const titleVariants = {
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      y: -5,
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const iconVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.2,
      rotate: [0, -10, 10, -5, 0],
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      }
    }
  };

  const ctaVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        delay: 0.5,
        ease: [0.6, 0.05, 0.01, 0.9],
      },
    },
  };

  // GSAP ScrollTrigger animations
  useEffect(() => {
    if (cardsRef.current.length) {
      // Create a timeline for staggered card animations
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom-=100',
          end: 'center center',
          toggleActions: 'play none none reverse',
        }
      });

      // Add each card to the timeline with staggered delay
      cardsRef.current.forEach((card, index) => {
        tl.fromTo(
          card,
          { y: 50, opacity: 0 },
          { 
            y: 0, 
            opacity: 1, 
            duration: 0.6,
            ease: 'power3.out'
          },
          index * 0.1 // Staggered delay
        );
      });

      // Animate CTA section
      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: ctaRef.current,
              start: 'top bottom-=50',
              end: 'top center',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }

    return () => {
      // Clean up ScrollTrigger instances
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="py-20 md:py-28 bg-coffee text-cream overflow-hidden"
    >
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={titleVariants}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-caramel mb-4">
            Why Work With Mekiya Coffee Export?
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-cream-light">
           We're more than suppliers — we're collaborators in quality, sustainability, and long-term value creation.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {benefits.map((benefit, index) => (
            <motion.div 
              key={benefit.title}
              ref={el => cardsRef.current[index] = el}
              variants={cardVariants}
              whileHover="hover"
              className="bg-coffee-light rounded-xl shadow-md p-6 transform transition-all duration-300"
            >
              <motion.div 
                className="text-4xl mb-4 inline-block"
                variants={iconVariants}
                whileHover="hover"
              >
                {benefit.icon}
              </motion.div>
              
              <h3 className="text-xl font-bold text-caramel mb-2">{benefit.title}</h3>
              
              <p className="text-cream-light">{benefit.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          ref={ctaRef}
          variants={ctaVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center py-10 px-4 md:px-8 bg-coffee-dark rounded-xl shadow-lg max-w-4xl mx-auto"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-caramel mb-4">
            Start Your Coffee Journey With Us
          </h3>
          
          <p className="text-cream-light mb-6 max-w-2xl mx-auto">
            Ready to experience the finest Ethiopian coffee and exceptional service? 
            Let's discuss how we can meet your specific coffee needs.
          </p>
          
          <Link 
            href="/contact" 
            className="inline-block bg-caramel hover:bg-caramel-dark text-coffee-black font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            Contact Us
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyWorkWithUs;