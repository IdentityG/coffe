'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger with GSAP
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const ImpactMetrics = () => {
  const sectionRef = useRef(null);
  const metricsRef = useRef(null);
  
  // GSAP animations for counter effect
  useEffect(() => {
    if (sectionRef.current && metricsRef.current) {
      // Get all metric value elements
      const metricValues = metricsRef.current.querySelectorAll('.metric-value');
      
      // Create counter animations for each metric
      metricValues.forEach((valueEl) => {
        const targetValue = parseInt(valueEl.getAttribute('data-value'), 10);
        const prefix = valueEl.getAttribute('data-prefix') || '';
        const suffix = valueEl.getAttribute('data-suffix') || '';
        
        // Set initial value
        valueEl.textContent = prefix + '0' + suffix;
        
        // Create counter animation
        gsap.to(valueEl, {
          scrollTrigger: {
            trigger: valueEl,
            start: 'top bottom-=100',
            toggleActions: 'play none none reverse'
          },
          duration: 2,
          ease: 'power2.out',
          onUpdate: function() {
            const progress = this.progress();
            const currentValue = Math.round(progress * targetValue);
            valueEl.textContent = prefix + currentValue.toLocaleString() + suffix;
          }
        });
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

  // Animation variants for metric blocks
  const blockVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: [0.6, 0.05, 0.01, 0.9],
      },
    }),
  };

  // Animation variants for icons
  const iconVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
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

  // Sustainability metrics data
 const metrics = [
  {
    id: 1,
    icon: "🌱",
    value: 300,
    suffix: "+",
    label: "Farming Families Engaged",
    description: "Direct sourcing partnerships in Ethiopian highlands"
  },
  {
    id: 2,
    icon: "💧",
    value: 20,
    suffix: "%",
    label: "Water Savings Achieved",
    description: "Through eco-washing and conservation systems"
  },
  {
    id: 3,
    icon: "🌳",
    value: 6000,
    suffix: "+",
    label: "Shade & Native Trees Planted",
    description: "Agroforestry programs restoring biodiversity"
  },
  {
    id: 4,
    icon: "👩‍🌾",
    value: 48,
    suffix: "%",
    label: "Women-Led Initiatives",
    description: "Participation in farming, training, and cooperatives"
  },
  {
    id: 5,
    icon: "♻️",
    value: 90,
    suffix: "%",
    label: "Processing Waste Reused",
    description: "Converted into compost and fuel briquettes"
  },
  {
    id: 6,
    icon: "📦",
    value: 5,
    suffix: "+",
    label: "Countries Reached",
    description: "Early export markets across 3 continents"
  }
];

  return (
    <section 
      ref={sectionRef}
      className="py-16 md:py-24 bg-cream-light text-coffee-dark overflow-hidden"
      id="impact-metrics"
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
            Measurable Impact
          </motion.h2>
          
          <motion.p 
            variants={textVariants}
            className="text-lg text-coffee-light max-w-3xl mx-auto"
          >
            Each number reflects real progress — for people, planet, and partners.
          </motion.p>
        </motion.div>

        {/* Metrics grid */}
        <div 
          ref={metricsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.id}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={blockVariants}
              className="bg-cream-light rounded-xl overflow-hidden shadow-md border border-caramel/10 p-6 flex flex-col items-center text-center transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              {/* Icon */}
              <motion.div 
                className="text-4xl mb-4"
                variants={iconVariants}
                whileHover="hover"
              >
                {metric.icon}
              </motion.div>
              
              {/* Metric value */}
              <div className="mb-2">
                <span 
                  className="metric-value text-4xl md:text-5xl font-bold text-coffee"
                  data-value={metric.value}
                  data-prefix={metric.prefix}
                  data-suffix={metric.suffix}
                >
                  {metric.prefix}0{metric.suffix}
                </span>
              </div>
              
              {/* Label */}
              <h3 className="text-xl font-serif font-bold text-coffee-dark mb-2">
                {metric.label}
              </h3>
              
              {/* Description */}
              <p className="text-coffee-light text-sm">
                {metric.description}
              </p>
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

export default ImpactMetrics;