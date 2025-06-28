'use client';

import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { Phone } from 'lucide-react';


// Register ScrollTrigger with GSAP
gsap.registerPlugin(ScrollTrigger);

const TeamSection = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });

  // Team member data
  const team = [
    {
    name: "Mr. Hamdi Kamil",
    title: "General Manager",
    image: "/images/profile.png", // Replace with actual photo when available
    quote: "Bridging Ethiopia’s coffee heritage with a global future.",
    phone: {
      et: "+251-911-24-57-24",
      us: "+1-619-796-6467"
    },
    email: "Hamdikamil@icloud.com"
  },
  {
    name: "Ms. Sabrina Kamil",
    title: "Operations Manager",
    image: "/images/profile.png", // Replace with actual photo when available
    quote: "Focused on precision, quality, and sustainable growth.",
    phone: {
      et: "+251-911-27-46-56",
      us: "+1-480-410-9898"
    },
    email: "sabrina@mekiyaenterprise.com"
  },
  {
    name: "Mr. Derere Negassa",
    title: "Export Manager",
    image: "/images/profile.png", // Replace with actual photo when available
    quote: "Every shipment reflects our promise of excellence.",
    phone: {
      et: "+251-936-010-017",
      us: "+251-936-010-017"
    },
    email: ""
  }
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
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.6, 0.05, 0.01, 0.9],
      },
    },
  };

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
            delay: index * 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom-=100',
              end: 'center center',
              toggleActions: 'play none none reverse',
            },
          }
        );
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
      className="py-20 md:py-28 bg-cream-light overflow-hidden"
    >
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={titleVariants}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-coffee-dark mb-4">
            Meet the People Behind the Coffee
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-coffee">
            Our diverse team brings passion and expertise to every step of the coffee journey.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
        >
          {team.map((member, index) => (
            <motion.div 
              key={member.name}
              ref={el => cardsRef.current[index] = el}
              variants={cardVariants}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl"
              whileHover={{ 
                y: -10,
                transition: { type: "spring", stiffness: 300 }
              }}
            >
              <div className="relative h-80 w-full overflow-hidden">
                <Image
                  src={member.image}
                  alt={`${member.name}, ${member.title}`}
                  fill
                  className="object-cover object-center transition-transform duration-500 hover:scale-105"
                />
              </div>
              
              <div className="p-6 bg-gradient-to-b from-cream to-cream-light">
                <h3 className="text-xl font-bold text-coffee-dark mb-1">{member.name}</h3>
                <p className="text-caramel-dark font-medium mb-3">{member.title}</p>
                {member.quote && (
                  <p className="text-coffee italic mb-4">"{member.quote}"</p>
                )}
                {member.phone && (
  <div className="flex flex-col gap-2 mt-2 text-caramel-dark text-sm">
    {member.phone.et && (
      <a
        href={`tel:${member.phone.et}`}
        className="inline-flex items-center hover:text-caramel transition-colors"
      >
        <Phone className="w-4 h-4 mr-2" />
        {member.phone.et}
      </a>
    )}
    {member.phone.us && (
      <a
        href={`tel:${member.phone.us}`}
        className="inline-flex items-center hover:text-caramel transition-colors"
      >
        <Phone className="w-4 h-4 mr-2" />
        {member.phone.us}
      </a>
    )}
  </div>
)}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TeamSection;