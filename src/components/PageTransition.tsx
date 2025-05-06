'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  
  // This effect runs when the pathname changes
  useEffect(() => {
    setIsTransitioning(true);
    
    // Reset scroll position on page change
    window.scrollTo(0, 0);
    
    // After the transition completes, set transitioning to false
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 1500); // Total transition duration
    
    return () => clearTimeout(timer);
  }, [pathname]);

  // GSAP animation for the coffee bean during transition
  useEffect(() => {
    if (isTransitioning && overlayRef.current) {
      const beans = overlayRef.current.querySelectorAll('.coffee-bean');
      
      gsap.fromTo(
        beans,
        { 
          rotate: 0,
          scale: 0.8,
          opacity: 0 
        },
        { 
          rotate: 360,
          scale: 1,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out'
        }
      );
    }
  }, [isTransitioning]);

  // Page transition variants
  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.6, 0.05, 0.01, 0.9],
        when: 'beforeChildren',
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.4,
        ease: [0.6, 0.05, 0.01, 0.9],
      },
    },
  };

  // Overlay transition variants
  const overlayVariants = {
    initial: { 
      scaleY: 0,
      originY: 0 
    },
    animate: {
      scaleY: 1,
      transition: { 
        duration: 0.5, 
        ease: [0.76, 0, 0.24, 1] 
      }
    },
    exit: {
      scaleY: 0,
      originY: 1,
      transition: { 
        duration: 0.5, 
        ease: [0.76, 0, 0.24, 1],
        delay: 0.5 
      }
    }
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {isTransitioning && (
          <motion.div
            ref={overlayRef}
            className="fixed inset-0 z-50 bg-coffee-dark flex items-center justify-center overflow-hidden"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={overlayVariants}
          >
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Coffee bean animation during transition */}
              <motion.div 
                className="coffee-bean absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  transition: { duration: 0.5, delay: 0.2 }
                }}
                exit={{ 
                  opacity: 0, 
                  scale: 0.5,
                  transition: { duration: 0.3 } 
                }}
              >
                <svg width="100%" height="100%" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path 
                    d="M300.3 129.7C234.8 129.7 182 182.5 182 248C182 313.5 234.8 366.3 300.3 366.3C365.8 366.3 418.6 313.5 418.6 248C418.6 182.5 365.8 129.7 300.3 129.7ZM300.3 307.7C267.3 307.7 240.6 281 240.6 248C240.6 215 267.3 188.3 300.3 188.3C333.3 188.3 360 215 360 248C360 281 333.3 307.7 300.3 307.7Z" 
                    className="fill-caramel"
                    stroke="#D4A24E"
                    strokeWidth="1"
                  />
                  <path 
                    d="M211.7 129.7C146.2 129.7 93.4 182.5 93.4 248C93.4 313.5 146.2 366.3 211.7 366.3C277.2 366.3 330 313.5 330 248C330 182.5 277.2 129.7 211.7 129.7ZM211.7 307.7C178.7 307.7 152 281 152 248C152 215 178.7 188.3 211.7 188.3C244.7 188.3 271.4 215 271.4 248C271.4 281 244.7 307.7 211.7 307.7Z" 
                    className="fill-coffee"
                    stroke="#6F4E37"
                    strokeWidth="1"
                  />
                </svg>
              </motion.div>
              
              {/* Steam animation */}
              <motion.div 
                className="absolute left-1/2 top-1/3 -translate-x-1/2"
                initial={{ opacity: 0, y: 0 }}
                animate={{ 
                  opacity: [0, 0.5, 0],
                  y: [-10, -30],
                  transition: { 
                    duration: 1.5, 
                    times: [0, 0.5, 1],
                    repeat: 1,
                    repeatType: "loop" 
                  }
                }}
              >
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path 
                    d="M12 6C10.5 6 9.5 7 8.5 8.5C7.5 10 5.5 10 4 10C4 12.5 6 13.5 8 13.5C10 13.5 11 12.5 11 11C11 13 12.5 14 14 14C16 14 17 12 17 10.5C15.5 10.5 14.5 9.5 14 8C13.5 6.5 12.5 6 12 6Z" 
                    className="fill-cream-light"
                    fillOpacity="0.7"
                  />
                </svg>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageVariants}
          className="w-full"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default PageTransition;