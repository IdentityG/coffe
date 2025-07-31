'use client';

import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

// Register ScrollTrigger with GSAP
gsap.registerPlugin(ScrollTrigger);

const ProcessSection = () => {
  const sectionRef = useRef(null);
  const stepsRef = useRef([]);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });

  // Process steps data
  const processSteps = [
    {
      icon: "🌱",
      title: "Harvesting",
      description: "Hand-picked at peak ripeness from high-altitude farms in Ethiopia’s renowned coffee regions. Our relationships with farmers ensure careful handling from the beginning.",
      image: "/images/coffee5.jpg"
    },
    {
      icon: "🧺",
      title: "Processing",
      description: "We employ washed, natural, and honey methods — preserving each bean’s origin character while blending traditional knowledge with modern infrastructure for consistent quality.",
      image: "/images/process.jpg"
    },
    {
      icon: "🏭",
      title: "Quality Control",
      description: "Each batch is evaluated through rigorous physical sorting, cupping, and moisture testing. Only the finest beans — by flavor and structure — meet Mekiya’s export standard.",
      image: "/images/quality.webp"
    },
    {
      icon: "📦",
      title: "Packaging",
      description: "Our coffee is packed in climate-controlled environments using GrainPro-lined bags and eco-conscious materials to maintain freshness.",
      image: "/images/package.webp"
    },
    {
      icon: "🚢",
      title: "Global Shipping",
      description: "With established logistics partners and a commitment to full traceability, we ensure timely, transparent delivery — from Ethiopian farms to roasters across the world.",
      image: "/images/shipping.avif"
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
      transition: {
        duration: 0.3,
        yoyo: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // GSAP ScrollTrigger animations
  useEffect(() => {
    if (stepsRef.current.length) {
      // Create a timeline for each step
      stepsRef.current.forEach((step, index) => {
        // Alternate slide-in direction based on index
        const direction = index % 2 === 0 ? -50 : 50;
        
        gsap.fromTo(
          step,
          { x: direction, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: step,
              start: 'top bottom-=100',
              end: 'top center',
              toggleActions: 'play none none reverse',
            },
          }
        );

        // Animate the image
        const image = step.querySelector('.step-image');
        if (image) {
          gsap.fromTo(
            image,
            { scale: 0.8, opacity: 0.5 },
            {
              scale: 1,
              opacity: 1,
              duration: 1.2,
              delay: 0.2,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: step,
                start: 'top bottom-=50',
                end: 'top center',
                toggleActions: 'play none none reverse',
              },
            }
          );
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
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={titleVariants}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-caramel mb-4">
            From Farm to Freight: Our Process
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-cream-light">
            Every bean we export follows a meticulous journey — one that blends heritage, quality, and sustainability from Ethiopia’s highlands to the global stage.
          </p>
        </motion.div>

        {/* Process Steps - Vertical on mobile, horizontal on desktop */}
        <div className="space-y-16 md:space-y-0 md:grid md:grid-cols-5 md:gap-4 lg:gap-8">
          {processSteps.map((step, index) => (
            <div 
              key={step.title}
              ref={el => stepsRef.current[index] = el}
              className={`relative ${index % 2 === 0 ? 'md:mt-0' : 'md:mt-12'}`}
            >
              {/* Step Number Line (visible on desktop) */}
              <div className="hidden md:block absolute top-10 w-full">
                <div className={`h-0.5 bg-caramel-dark ${index === processSteps.length - 1 ? 'w-0' : 'w-full'}`}></div>
              </div>
              
              {/* Step Content */}
              <div className="flex md:flex-col items-start md:items-center text-center">
                {/* Icon */}
                <motion.div 
                  className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-full bg-espresso flex items-center justify-center text-2xl md:text-3xl mb-0 md:mb-4 mr-4 md:mr-0 z-10"
                  variants={iconVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                >
                  <span>{step.icon}</span>
                </motion.div>
                
                <div className="md:mt-4">
                  {/* Step Number (visible on mobile) */}
                  <div className="flex md:hidden items-center mb-1">
                    <span className="text-caramel font-bold mr-2">Step {index + 1}</span>
                    <div className="h-px bg-caramel-dark flex-grow"></div>
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-xl md:text-2xl font-bold text-caramel mb-2">{step.title}</h3>
                  
                  {/* Description */}
                  <p className="text-cream-light text-sm md:text-base mb-4">{step.description}</p>
                  
                  {/* Image - Hidden on mobile, visible on larger screens */}
                  <div className="hidden md:block step-image relative w-full h-32 rounded-lg overflow-hidden mt-4">
                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-coffee-dark/30"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;