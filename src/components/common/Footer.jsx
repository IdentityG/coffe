'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Don't register ScrollTrigger here - move it inside useEffect
// gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);
  // Change margin to a positive value to make it trigger earlier
  const isInView = useInView(footerRef, { once: true, margin: "10%" });

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
    // Register ScrollTrigger inside useEffect to avoid hydration issues
    gsap.registerPlugin(ScrollTrigger);
    
    if (footerRef.current) {
      // Modified to show immediately on first load without requiring scroll
      gsap.fromTo(
        footerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          // Remove ScrollTrigger for immediate animation
          // or modify it to trigger immediately
          immediateRender: true, // Ensure it renders immediately
          delay: 0.5 // Small delay after page load
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
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      ),
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/company/ubuntucoffee',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/>
        </svg>
      ),
    },
    {
      name: 'WhatsApp',
      url: 'https://wa.me/251112345678',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
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
          // Change this to always be visible, not dependent on view
          animate="visible"
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
                Mekiya Coffee Export
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
              // Change this to always be visible
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              © {new Date().getFullYear()} Mekiya Coffee Export. All rights reserved.
            </motion.p>
            <motion.div 
              className="flex space-x-4 mt-4 md:mt-0"
              initial={{ opacity: 0 }}
              // Change this to always be visible
              animate={{ opacity: 1 }}
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