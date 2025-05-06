'use client';

import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

// Register ScrollTrigger with GSAP
gsap.registerPlugin(ScrollTrigger);

const CertificationsSection = () => {
  const sectionRef = useRef(null);
  const logosRef = useRef([]);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });

  // Certification and partnership data
  const certifications = [
    {
      name: "Fair Trade Certified",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/FM_RGB.jpg/640px-FM_RGB.jpg",
      link: "https://www.fairtrade.net/"
    },
    {
      name: "USDA Organic",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/USDA_organic_seal.svg/640px-USDA_organic_seal.svg.png",
      link: "https://www.usda.gov/topics/organic"
    },
    {
      name: "Rainforest Alliance",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Rainforrest-Alliance-Cert.jpg/640px-Rainforrest-Alliance-Cert.jpg",
      link: "https://www.rainforest-alliance.org/"
    },
    {
      name: "UTZ Certified",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Utz_certified_logo.svg/640px-Utz_certified_logo.svg.png",
      link: "https://utz.org/"
    },
    {
      name: "International Coffee Organization",
      logo: "https://ico.org/wp-content/uploads/2022/01/logo.png",
      link: "https://www.ico.org/"
    },
    {
      name: "Ethiopian Coffee Exporters Association",
      logo: "https://ethiopiancoffeeassociation.org/wp-content/uploads/2022/11/cropped-Logo-300x300-1.jpg", // Placeholder - you'll need to add this to your public folder
      link: "https://www.ethiopiancoffeeexporters.org/"
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

  const logoVariants = {
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
      y: -10,
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  // GSAP ScrollTrigger animations
  useEffect(() => {
    if (logosRef.current.length) {
      // Create a timeline for staggered logo animations
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom-=100',
          end: 'center center',
          toggleActions: 'play none none reverse',
        }
      });

      // Add each logo to the timeline with staggered delay
      logosRef.current.forEach((logo, index) => {
        tl.fromTo(
          logo,
          { y: 30, opacity: 0 },
          { 
            y: 0, 
            opacity: 1, 
            duration: 0.5,
            ease: 'power3.out'
          },
          index * 0.1 // Staggered delay
        );

        // Optional floating effect
        gsap.to(logo, {
          y: '-=10',
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: Math.random() * 2, // Random delay for more natural movement
        });
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
      className="py-20 md:py-28 bg-cream overflow-hidden"
    >
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={titleVariants}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-coffee-dark mb-4">
            Our Certifications & Global Affiliations
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-coffee">
            We comply with the world's leading sustainability and trade standards.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center"
        >
          {certifications.map((cert, index) => (
            <motion.a 
              key={cert.name}
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              ref={el => logosRef.current[index] = el}
              variants={logoVariants}
              whileHover="hover"
              className="bg-white p-4 rounded-lg shadow-md flex items-center justify-center h-32 w-full transition-all duration-300"
            >
              <div className="relative h-24 w-full">
                <Image
                  src={cert.logo}
                  alt={`${cert.name} certification logo`}
                  fill
                  className="object-contain"
                />
              </div>
            </motion.a>
          ))}
        </motion.div>

        <div className="text-center mt-12">
          <p className="text-coffee-light italic">
            Click on any logo to learn more about our certifications and partnerships.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;