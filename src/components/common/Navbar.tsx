'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);
  
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Products', path: '/products' },
    { name: 'Sustainability', path: '/sustainability' },
    { name: 'Contact', path: '/contact' },
  ];
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  const menuItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: [0.6, 0.05, 0.01, 0.9],
      },
    }),
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };
  
  const menuContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };
  
  return (
    <motion.header 
      className="fixed w-full z-50 bg-coffee-dark shadow-lg"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ 
        type: "spring",
        stiffness: 300,
        damping: 30,
        duration: 0.8
      }}
    >
      <div className="container mx-auto px-4 py-4 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center z-50 relative">
            <motion.div 
              className="flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg 
                width="48" 
                height="48" 
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
            </motion.div>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link href={link.path} key={link.name}>
                <motion.div 
                  className={`relative font-medium ${pathname === link.path ? 'text-caramel font-bold' : 'text-cream-light'} hover:text-caramel transition-colors duration-300`}
                  whileHover={{
                    y: -2,
                    transition: { duration: 0.2 },
                  }}
                >
                  {link.name}
                  {pathname === link.path ? (
                    <motion.div 
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-caramel"
                      layoutId="navbar-underline"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  ) : (
                    <motion.div 
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-caramel scale-x-0 origin-left"
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.div>
              </Link>
            ))}
          </nav>
          
          {/* Mobile Menu Button */}
          <motion.button 
            className="md:hidden text-cream-light focus:outline-none z-[60] relative"
            onClick={toggleMenu}
            whileTap={{ scale: 0.9 }}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            <div className="w-8 h-6 flex flex-col justify-between">
              <motion.span 
                className="w-full h-0.5 bg-cream-light rounded-full"
                animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 10 : 0 }}
                transition={{ duration: 0.3 }}
              />
              <motion.span 
                className="w-full h-0.5 bg-cream-light rounded-full"
                animate={{ opacity: isOpen ? 0 : 1 }}
                transition={{ duration: 0.3 }}
              />
              <motion.span 
                className="w-full h-0.5 bg-cream-light rounded-full"
                animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -10 : 0 }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </motion.button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="fixed inset-0 z-40 bg-coffee-dark flex flex-col justify-center items-center md:hidden"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.5, ease: [0.6, 0.05, 0.01, 0.9] }}
          >
            <motion.nav
              className="flex flex-col items-center justify-center space-y-12 w-full px-8" // Increased spacing
              variants={menuContainerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  custom={i}
                  variants={menuItemVariants}
                >
                  <Link 
                    href={link.path} 
                    onClick={() => setIsOpen(false)}
                    className="block"
                  >
                    <motion.div 
                      className={`text-center py-4 text-3xl ${pathname === link.path ? 'text-caramel font-bold' : 'text-cream-light'}`} // Increased text size and padding
                      whileHover={{ scale: 1.1, color: '#D4A24E' }}
                      transition={{ duration: 0.2 }}
                    >
                      {link.name}
                      {pathname === link.path && (
                        <motion.div 
                          className="h-0.5 bg-caramel mt-2 mx-auto w-16" // Increased underline width and spacing
                          layoutId="mobile-navbar-underline"
                        />
                      )}
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;