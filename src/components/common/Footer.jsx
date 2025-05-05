'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { once: true, margin: "-10%" });

  // Animation variants
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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.6, 0.05, 0.01, 0.9],
      },
    },
  };

  const socialIconVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
    },
    hover: { 
      scale: 1.2,
      color: '#D4A24E', // caramel color on hover
      transition: { 
        type: 'spring',
        stiffness: 300,
        damping: 10
      }
    }
  };

  // GSAP ScrollTrigger animations
  useEffect(() => {
    if (footerRef.current) {
      // Footer fade in animation
      gsap.fromTo(
        footerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top bottom-=100',
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

  // Quick links data
  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Products', path: '/products' },
    { name: 'Sustainability', path: '/sustainability' },
    { name: 'Contact', path: '/contact' },
  ];

  // Social media data
  const socialLinks = [
    {
      name: 'Instagram',
      url: 'https://instagram.com/ubuntucoffee',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 7.5h.75c.966 0 1.75.784 1.75 1.75v8.5A1.75 1.75 0 0117.25 19.5h-10.5A1.75 1.75 0 015 17.75v-8.5c0-.966.784-1.75 1.75-1.75h.75m9 1.5a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
        </svg>
      ),
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/company/ubuntucoffee',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.5v2.25A2.25 2.25 0 0118.75 18H5.25A2.25 2.25 0 013 15.75V8.25A2.25 2.25 0 015.25 6H10" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 6h3a2 2 0 012 2v3" />
        </svg>
      ),
    },
    {
      name: 'WhatsApp',
      url: 'https://wa.me/251112345678',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
        </svg>
      ),
    },
  ];

  // Certification badges data
  const certifications = [
    { name: 'Organic Certified', image: '/organic-badge.svg' },
    { name: 'Fair Trade', image: '/fair-trade-badge.svg' },
    { name: 'Rainforest Alliance', image: '/rainforest-badge.svg' },
  ];

  return (
    <footer ref={footerRef} className="bg-coffee-dark text-cream pt-16 pb-8 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Brand Column */}
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="flex items-center">
              <svg 
                width="40" 
                height="40" 
                viewBox="0 0 512 512" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="mr-3"
              >
                <path 
                  d="M300.3 129.7C234.8 129.7 182 182.5 182 248C182 313.5 234.8 366.3 300.3 366.3C365.8 366.3 418.6 313.5 418.6 248C418.6 182.5 365.8 129.7 300.3 129.7ZM300.3 307.7C267.3 307.7 240.6 281 240.6 248C240.6 215 267.3 188.3 300.3 188.3C333.3 188.3 360 215 360 248C360 281 333.3 307.7 300.3 307.7Z" 
                  className="fill-caramel"
                />
                <path 
                  d="M211.7 129.7C146.2 129.7 93.4 182.5 93.4 248C93.4 313.5 146.2 366.3 211.7 366.3C277.2 366.3 330 313.5 330 248C330 182.5 277.2 129.7 211.7 129.7ZM211.7 307.7C178.7 307.7 152 281 152 248C152 215 178.7 188.3 211.7 188.3C244.7 188.3 271.4 215 271.4 248C271.4 281 244.7 307.7 211.7 307.7Z" 
                  className="fill-coffee"
                />
              </svg>
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-cream">
                Ubuntu Coffee Export
              </h2>
            </div>
            <p className="text-cream/80 max-w-md">
              Exporting excellence since 1995. We connect exceptional Ethiopian coffee growers with discerning roasters worldwide, fostering sustainable partnerships and delivering premium quality.
            </p>
            <div className="pt-4">
              <p className="text-caramel font-medium">Export License: ETH/COF/EXP/2023-1145</p>
            </div>
          </motion.div>

          {/* Quick Links Column */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-xl font-serif font-bold text-caramel mb-6">Quick Links</h3>
            <nav className="flex flex-col space-y-3">
              {quickLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.path}
                  className="text-cream/80 hover:text-caramel transition-colors duration-300 w-fit"
                >
                  <motion.span 
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                    className="flex items-center"
                  >
                    <span className="w-1.5 h-1.5 bg-caramel/70 rounded-full mr-2" />
                    {link.name}
                  </motion.span>
                </Link>
              ))}
            </nav>
            
            {/* Certification Badges */}
            <div className="pt-6">
              <h4 className="text-lg font-medium text-caramel mb-4">Certifications</h4>
              <div className="flex flex-wrap gap-4">
                {certifications.map((cert) => (
                  <motion.div 
                    key={cert.name}
                    className="bg-coffee p-2 rounded-md flex items-center justify-center w-16 h-16"
                    whileHover={{ scale: 1.05 }}
                    title={cert.name}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-caramel" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                    </svg>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact & Socials Column */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-xl font-serif font-bold text-caramel mb-6">Contact Us</h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-caramel/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-caramel" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-caramel font-medium mb-1">Email</h4>
                  <a href="mailto:info@ubuntucoffee.com" className="text-cream/80 hover:text-caramel transition-colors">
                    info@ubuntucoffee.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-caramel/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-caramel" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-caramel font-medium mb-1">Phone</h4>
                  <a href="tel:+251112345678" className="text-cream/80 hover:text-caramel transition-colors">
                    +251 11 234 5678
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-caramel/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-caramel" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-caramel font-medium mb-1">Address</h4>
                  <p className="text-cream/80">
                    Bole Road, Addis Ababa<br />
                    Ethiopia
                  </p>
                </div>
              </div>
            </div>
            
            {/* Social Media Links */}
            <div className="pt-6">
              <h4 className="text-lg font-medium text-caramel mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-coffee flex items-center justify-center text-cream/80 hover:text-caramel transition-colors"
                    variants={socialIconVariants}
                    whileHover="hover"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Bottom Bar with Copyright */}
        <div className="pt-8 mt-8 border-t border-coffee-light/30">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.p 
              className="text-cream/60 text-sm text-center md:text-left"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.8 }}
            >
              © {new Date().getFullYear()} Ubuntu Coffee Export. All rights reserved.
            </motion.p>
            <motion.div 
              className="flex space-x-4 mt-4 md:mt-0"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 1 }}
            >
              <a href="/privacy" className="text-cream/60 hover:text-caramel text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="text-cream/60 hover:text-caramel text-sm transition-colors">
                Terms of Service
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;