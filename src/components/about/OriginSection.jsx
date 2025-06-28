'use client';

import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

// Register ScrollTrigger with GSAP
gsap.registerPlugin(ScrollTrigger);

const OriginSection = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const timelineRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });

  // Animation variants for Framer Motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
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

  // Timeline data
  const timelineEvents = [
    { year: '1984 EC', title: 'Legacy Begins', description: 'Mekiya Enterprise is founded, rooted in Ethiopian agriculture and community investment' },
    { year: '2024', title: 'Specialty Coffee Launched', description: 'Mekiya Coffee officially enters the global market with shipments to Europe and the Middle East' },
    { year: 'Vision', title: 'Growing Globally', description: 'Expanding into new markets while strengthening partnerships with Ethiopian farming communities' },
  ];

  // GSAP ScrollT202rigger animations
  useEffect(() => {
    if (imageRef.current && timelineRef.current) {
      // Image entrance animation
      gsap.fromTo(
        imageRef.current,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom-=100',
            end: 'top center',
            scrub: false,
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Optional: Pin the section briefly
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top center',
        end: 'bottom center',
        toggleClass: { targets: sectionRef.current, className: 'active' },
      });
    }

    return () => {
      // Clean up ScrollTrigger instances
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section 
      id="origin-section"
      ref={sectionRef} 
      className="py-20 md:py-28 bg-cream-light overflow-hidden"
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Column - Image */}
          <div 
            ref={imageRef} 
            className="relative h-[400px] md:h-[500px] rounded-xl shadow-lg overflow-hidden order-2 lg:order-1"
          >
            <Image
              src="/images/limu1.jpg" 
              alt="Ethiopian coffee farm showing our humble beginnings"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-coffee-dark/40 to-transparent"></div>
          </div>

          {/* Right Column - Text Content */}
          <div className="order-1 lg:order-2">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="space-y-6"
            >
              <motion.h2 
                variants={itemVariants} 
                className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-coffee-dark"
              >
                Humble Beginnings, Global Purpose
              </motion.h2>
              
              <motion.p 
                variants={itemVariants} 
                className="text-lg text-coffee leading-relaxed"
              >
               Born from the entrepreneurial legacy of Mekiya Enterprise, our coffee journey began with a commitment to quality, sustainability, and empowering Ethiopian farmers. In 2024, we officially entered the specialty coffee export market—connecting highland growers to discerning roasters around the world.
              </motion.p>
              
              <motion.p 
                variants={itemVariants} 
                className="text-lg text-coffee leading-relaxed"
              >
                Our journey began with a simple belief: that exceptional coffee could create 
                sustainable livelihoods for farming communities while delighting coffee lovers worldwide. 
                Three generations later, we remain committed to that vision, combining traditional 
                knowledge with innovative practices.
              </motion.p>

              {/* Timeline */}
              <motion.div 
                variants={itemVariants}
                ref={timelineRef}
                className="pt-8"
              >
                <h3 className="text-xl font-serif font-semibold text-coffee-dark mb-4">Our Journey</h3>
                <div className="space-y-4">
                  {timelineEvents.map((event, index) => (
                    <motion.div 
                      key={event.year}
                      className="flex items-start gap-4"
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ delay: 0.6 + (index * 0.2), duration: 0.5 }}
                    >
                      <div className="flex-shrink-0 w-16 h-16 rounded-full bg-caramel flex items-center justify-center text-cream font-bold">
                        {event.year}
                      </div>
                      <div>
                        <h4 className="text-lg font-medium text-coffee-dark">{event.title}</h4>
                        <p className="text-coffee">{event.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OriginSection;