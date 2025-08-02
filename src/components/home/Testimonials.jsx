'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const Testimonials = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const testimonialsRef = useRef(null);
  const brandsRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });
  
  // State for testimonial carousel
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  
  // Testimonial data
  const testimonials = [
      {
    id: 1,
    name: "James Becker",
    company: "Germany",
    quote: "Mekiya Coffee impressed us from day one. Their traceable lots from Guji and Yirgacheffe are not only consistent but also cup beautifully. We've built real trust with their team.",
    rating: 5,
    image: "/images/profile.png"
  },
  {
    id: 2,
    name: "Amina Noor",
    company: "UAE",
    quote: "What sets Mekiya apart is their attention to farmer impact. We were proud to source from women-led cooperatives in Sidamo. Our customers love the story behind the cup.",
    rating: 5,
    image: "/images/profile.png"
  },
  {
    id: 3,
    name: "Carlos Mendes",
    company: "Canada",
    quote: "We’ve been sourcing specialty lots from Ethiopia for years, and Mekiya Coffee brings a fresh level of transparency. Their logistics and sample support are exceptional.",
    rating: 5,
    image: "/images/profile.png"
  }
  ];
  
  // Partner brands data with actual coffee brand logos
  const partnerBrands = [
    {
      id: 1,
      name: "Starbucks",
      logo: "https://pngimg.com/uploads/starbucks/starbucks_PNG17.png"
    },
    {
      id: 2,
      name: "Lavazza",
      logo: "https://1000logos.net/wp-content/uploads/2020/09/Lavazza-Logo-500x313.png"
    },
    {
      id: 3,
      name: "Illy",
      logo: "https://1000logos.net/wp-content/uploads/2020/09/Illy-Logo-500x313.png"
    },
    {
      id: 4,
      name: "Peet's Coffee",
      logo: "https://1000logos.net/wp-content/uploads/2018/10/Peets-Coffee-Logo-500x281.png"
    },
    {
      id: 5,
      name: "Costa Coffee",
      logo: "https://1000logos.net/wp-content/uploads/2020/10/Costa-Coffee-Logo-500x313.png"
    },
    {
      id: 6,
      name: "Nespresso",
      logo: "https://1000logos.net/wp-content/uploads/2020/03/Nespresso-Logo-500x313.png"
    },
  ];
  
  // Auto-advance testimonial carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000); // Change testimonial every 5 seconds
    
    return () => clearInterval(interval);
  }, [testimonials.length]);
  
  // GSAP ScrollTrigger animations
  useEffect(() => {
    if (titleRef.current && testimonialsRef.current && brandsRef.current) {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top bottom-=100',
            end: 'bottom center',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Testimonials section animation
      gsap.fromTo(
        testimonialsRef.current,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: testimonialsRef.current,
            start: 'top bottom-=50',
            end: 'center center',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Brands section animation with staggered effect
      const brandLogos = brandsRef.current.querySelectorAll('.brand-logo');
      gsap.fromTo(
        brandLogos,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: brandsRef.current,
            start: 'top bottom-=50',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }

    return () => {
      // Clean up ScrollTrigger instances
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Framer Motion variants
  const testimonialVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.5 },
        scale: { duration: 0.5 }
      }
    },
    exit: (direction) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.5 },
        scale: { duration: 0.5 }
      }
    })
  };

  // Direction for testimonial animation
  const [direction, setDirection] = useState(1);

  // Handle testimonial navigation
  const nextTestimonial = () => {
    setDirection(1);
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-24 overflow-hidden bg-white text-cream"
    >
      {/* Decorative elements 
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-coffee to-transparent opacity-30"></div>
      <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-caramel/5 -z-10"></div>
      <div className="absolute bottom-20 left-10 w-32 h-32 rounded-full bg-cream/5 -z-10"></div> */}
      
      <div className="container relative z-10 mx-auto px-4">
        {/* Section title */}
        <div ref={titleRef} className="text-center mb-16">
          <div className="inline-block">
            <span className="block h-0.5 w-10 bg-espresso mx-auto mb-6"></span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-coffee-dark mb-4">
              Testimonials
            </h2>
            <p className="text-lg text-black max-w-2xl mx-auto">
              Trusted by specialty roasters and distributors worldwide
            </p>
            <span className="block h-0.5 w-10 bg-espresso mx-auto mt-6"></span>
          </div>
        </div>

        {/* Testimonials Carousel */}
        <div 
          ref={testimonialsRef} 
          className="relative max-w-4xl mx-auto mb-20"
        >
          <div className="relative overflow-hidden rounded-xl bg-coffee p-1">
            <div className="relative h-full w-full overflow-hidden rounded-lg bg-coffee-dark p-6 md:p-8">
              <AnimatePresence custom={direction} initial={false} mode="wait">
                <motion.div
                  key={currentTestimonial}
                  custom={direction}
                  variants={testimonialVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="flex flex-col md:flex-row items-center gap-6 md:gap-10"
                >
                  {/* Testimonial image */}
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden flex-shrink-0 border-2 border-caramel">
                    <img 
                      src={testimonials[currentTestimonial].image} 
                      alt={testimonials[currentTestimonial].name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Testimonial content */}
                  <div className="flex-1 text-center md:text-left">
                    <div className="mb-3">
                      {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                        <span key={i} className="text-caramel text-xl">⭐</span>
                      ))}
                    </div>
                    <blockquote className="text-lg md:text-xl italic text-cream mb-4">
                      "{testimonials[currentTestimonial].quote}"
                    </blockquote>
                    <div className="font-medium text-caramel">
                      {testimonials[currentTestimonial].name}
                    </div>
                    <div className="text-cream/70 text-sm">
                      {testimonials[currentTestimonial].company}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
              
              {/* Navigation buttons */}
              <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between pointer-events-none px-2 md:px-4">
                <motion.button
                  onClick={prevTestimonial}
                  className="w-10 h-10 rounded-full bg-coffee/50 text-cream flex items-center justify-center pointer-events-auto focus:outline-none"
                  whileHover={{ scale: 1.1, backgroundColor: 'rgba(212, 162, 78, 0.5)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </motion.button>
                <motion.button
                  onClick={nextTestimonial}
                  className="w-10 h-10 rounded-full bg-coffee/50 text-cream flex items-center justify-center pointer-events-auto focus:outline-none"
                  whileHover={{ scale: 1.1, backgroundColor: 'rgba(212, 162, 78, 0.5)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.button>
              </div>
              
              {/* Dots indicator */}
              <div className="flex justify-center mt-6 gap-2">
                {testimonials.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => {
                      setDirection(index > currentTestimonial ? 1 : -1);
                      setCurrentTestimonial(index);
                    }}
                    className={`w-2 h-2 rounded-full ${index === currentTestimonial ? 'bg-caramel' : 'bg-cream/30'}`}
                    whileHover={{ scale: 1.5 }}
                    whileTap={{ scale: 0.9 }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Partner Brands 
        <div ref={brandsRef} className="mt-20">
          <h3 className="text-2xl md:text-3xl font-serif text-center mb-10 text-cream">
            Our Trusted Partners
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8">
            {partnerBrands.map((brand) => (
              <motion.div
                key={brand.id}
                className="brand-logo aspect-square bg-cream rounded-lg p-4 flex items-center justify-center overflow-hidden"
                whileHover={{ y: -5, scale: 1.05 }}
              >
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="w-full h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                />
              </motion.div>
            ))}
          </div>
        </div>
        */}
      </div>
    </section>
  );
};

export default Testimonials;