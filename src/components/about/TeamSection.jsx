'use client';

import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

// Register ScrollTrigger with GSAP
gsap.registerPlugin(ScrollTrigger);

const TeamSection = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });

  // Team member data
  const team = [
    {
      name: "Alemu Tadesse",
      title: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80",
      quote: "Our journey began on a single hillside farm.",
      linkedin: "https://linkedin.com"
    },
    {
      name: "Grace Njoroge",
      title: "Head of Sustainability",
      image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=800&q=80",
      quote: "Every bean tells a story of care and fairness.",
      linkedin: "https://linkedin.com"
    },
    {
      name: "Carlos Mendoza",
      title: "Logistics Lead",
      image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=800&q=80",
      quote: "We connect farms to roasters around the world.",
      linkedin: "https://linkedin.com"
    },
    {
      name: "Makeda Abebe",
      title: "Quality Control Manager",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80",
      quote: "Excellence in every cup begins with our selection.",
      linkedin: "https://linkedin.com"
    },
    {
      name: "David Chen",
      title: "International Sales Director",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80",
      quote: "Building relationships as rich as our coffee.",
      linkedin: "https://linkedin.com"
    },
    {
      name: "Sophia Kimani",
      title: "Head of Farmer Relations",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80",
      quote: "Supporting our growers is at the heart of what we do.",
      linkedin: "https://linkedin.com"
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
                {member.linkedin && (
                  <a 
                    href={member.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-caramel hover:text-caramel-dark transition-colors"
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5 mr-2" 
                      fill="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                    <span>Connect</span>
                  </a>
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