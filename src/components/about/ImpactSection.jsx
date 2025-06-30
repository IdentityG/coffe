'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger with GSAP
gsap.registerPlugin(ScrollTrigger);

// Counter component for animating numbers
const AnimatedCounter = ({ value, duration = 2.5 }) => {
  const [count, setCount] = useState(0);
  const nodeRef = useRef(null);
  const isInView = useInView(nodeRef, { once: true, margin: "-10%" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = parseInt(value.toString().replace(/,/g, ''));
      const incrementTime = Math.floor(duration * 1000 / end);
      
      // Don't let increment time be too small
      const timer = setInterval(() => {
        start += Math.ceil(end / (duration * 1000 / 30));
        if (start > end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(start);
        }
      }, incrementTime > 30 ? incrementTime : 30);

      return () => clearInterval(timer);
    }
  }, [value, duration, isInView]);

  return <span ref={nodeRef}>{count.toLocaleString()}</span>;
};

const ImpactSection = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });

  // Impact statistics data
  const impactStats = [
    {
      icon: "🌾",
      metric: "300+",
      label: "Farming Families Engaged",
      description: "We work directly with smallholder producers across Ethiopia’s highlands to ensure traceability and fair value."
    },
    {
      icon: "📚",
      metric: "12+",
      label: "Community Education & Training",
      description: "Through partnerships, we support farmer training and literacy programs that promote long-term economic resilience."
    },
    {
      icon: "💧",
      metric: "45%",
      label: "Water-Conscious Processing",
      description: "We invest in water-saving infrastructure to reduce waste during washed and honey processing."
    },
    {
      icon: "🌍",
      metric: "100%",
      label: "Committed to Ethical Trade",
      description: "Our export practices prioritize transparency, long-term relationships, and shared success with producers and partners alike."
    },
    {
      icon: "👩‍🌾",
      metric: "52%",
      label: "Empowering Women in Coffee",
      description: "We support women-led roles in farming, processing, and cooperative leadership — creating more inclusive coffee value chains."
    },
    {
      icon: "🌱",
      metric: "25,000",
      label: "Growing Trees, Growing Futures",
      description: "Our reforestation and shade-tree programs contribute to better yields, soil health, and carbon capture."
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
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.6, 0.05, 0.01, 0.9],
      },
    },
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
      rotate: [0, -10, 10, -10, 0],
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      }
    }
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

      // Optional parallax effect on the section background
      gsap.to(sectionRef.current, {
        backgroundPosition: '50% 70%',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
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
      className="py-20 md:py-28 bg-cream-light text-cream overflow-hidden bg-[url('/coffee-farm-bg.jpg')] bg-cover bg-center bg-fixed bg-opacity-20 relative"
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-cream-light/80"></div>
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={titleVariants}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-coffee-dark mb-4">
            Our Impact Begins at the Source
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-coffee/80">
            Mekiya Coffee is more than an exporter — we’re a partner in agricultural resilience, rural prosperity, and sustainable growth. Together with our farmers, we cultivate more than coffee.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {impactStats.map((stat, index) => (
            <motion.div 
              key={stat.label}
              ref={el => cardsRef.current[index] = el}
              variants={cardVariants}
              className="bg-coffee-dark rounded-xl shadow-lg p-6 transform transition-all duration-300 hover:shadow-xl hover:scale-105"
            >
              <motion.div 
                className="text-4xl mb-4"
                variants={iconVariants}
                whileHover="hover"
              >
                {stat.icon}
              </motion.div>
              
              <h3 className="text-3xl md:text-4xl font-bold text-caramel mb-2">
                {stat.metric.includes('+') || stat.metric.includes('%') ? (
                  <>
                    <AnimatedCounter value={stat.metric.replace(/[^0-9]/g, '')} />
                    {stat.metric.includes('+') ? '+' : '%'}
                  </>
                ) : (
                  <AnimatedCounter value={stat.metric} />
                )}
              </h3>
              
              <h4 className="text-xl font-medium text-cream mb-3">{stat.label}</h4>
              
              <p className="text-cream-light text-sm">{stat.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ImpactSection;