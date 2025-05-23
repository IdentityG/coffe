'use client';

import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-20%" });

  // Animation variants for text content
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

  const itemVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, 0.05, 0.01, 0.9],
      },
    },
  };

  // GSAP ScrollTrigger for parallax
  useEffect(() => {
    const image = imageRef.current;

    const parallaxEffect = gsap.to(image, {
      yPercent: 20,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });

    return () => {
      parallaxEffect.scrollTrigger?.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-32 bg-gradient-to-b from-cream-light to-latte overflow-hidden"
    >
      {/* Decorative coffee bean shapes */}
      <div className="absolute top-12 left-8 w-24 h-24 rounded-full bg-caramel/5 -z-10"></div>
      <div className="absolute bottom-20 right-12 w-40 h-40 rounded-full bg-coffee/5 -z-10"></div>
      <div className="absolute top-1/3 right-1/4 w-16 h-16 rounded-full bg-caramel/5 -z-10"></div>
      
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
          {/* Image Column */}
          <motion.div
            ref={imageRef}
            className="w-full md:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-xl ring-1 ring-coffee/10">
              <img
                src="https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?q=80&w=2070"
                alt="Freshly roasted coffee beans with steam rising"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-coffee-dark/30 to-transparent" />
            </div>
          </motion.div>

          {/* Content Column */}
          <motion.div
            className="w-full md:w-1/2 text-center md:text-left"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <div className="relative">
              <motion.div 
                className="absolute -left-6 top-1/2 w-1 h-20 bg-caramel rounded-full opacity-70 hidden md:block"
                initial={{ scaleY: 0 }}
                animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
              
              <motion.h2
                variants={itemVariants}
                className="text-4xl md:text-5xl font-bold text-coffee-dark mb-4"
              >
                Rooted in Purpose
              </motion.h2>

              <motion.h3
                variants={itemVariants}
                className="text-xl md:text-2xl font-medium text-caramel mb-6"
              >
                Ubuntu Coffee Export – Sourcing ethically, exporting globally
              </motion.h3>
            </div>

            <motion.p
              variants={itemVariants}
              className="text-coffee/90 mb-8 leading-relaxed"
            >
              Since our inception, we've been dedicated to bridging the gap between exceptional coffee growers and discerning roasters worldwide. Our journey began with a simple belief: that great coffee can create positive change in farming communities while delivering outstanding quality to consumers.
            </motion.p>

            <motion.ul
              variants={itemVariants}
              className="space-y-4 text-coffee/80"
            >
              {[
                'Family-owned since 1995',
                'Partnerships with over 300 farmers',
                'Certified organic and fair trade',
              ].map((item, index) => (
                <motion.li
                  key={index}
                  className="flex items-center justify-center md:justify-start gap-3"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <span className="w-2 h-2 bg-caramel/90 rounded-full shadow-sm" />
                  {item}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;