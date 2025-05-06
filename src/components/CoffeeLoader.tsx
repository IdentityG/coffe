import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface CoffeeLoaderProps {
  onLoadingComplete: () => void;
}

const CoffeeLoader = ({ onLoadingComplete }: CoffeeLoaderProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const timer = setTimeout(() => {
      if (progress < 100) {
        setProgress(prev => Math.min(prev + 10, 100));
      } else {
        setTimeout(() => {
          onLoadingComplete();
        }, 500); // Small delay before transition
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [progress, onLoadingComplete]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.3
      }
    },
    exit: { 
      opacity: 0,
      transition: { 
        when: "afterChildren",
        staggerChildren: 0.1,
        staggerDirection: -1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 100 
      }
    },
    exit: { 
      y: -20, 
      opacity: 0,
      transition: { 
        type: "tween", 
        ease: "easeInOut" 
      }
    }
  };

  const beanVariants = {
    hidden: { rotate: 0, scale: 0.8, opacity: 0 },
    visible: { 
      rotate: 360, 
      scale: 1, 
      opacity: 1,
      transition: { 
        duration: 1.5, 
        repeat: Infinity, 
        repeatType: "loop" 
      }
    },
    exit: { 
      scale: 0, 
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div 
      className="fixed inset-0 flex flex-col items-center justify-center bg-coffee-black z-50"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div 
        className="mb-8"
        variants={{
          hidden: { rotate: 0, scale: 0.8, opacity: 0 },
          visible: { 
            rotate: 360, 
            scale: 1, 
            opacity: 1,
            transition: { 
              duration: 1.5, 
              repeat: Infinity, 
              repeatType: "loop" as const
            }
          },
          exit: { 
            scale: 0, 
            opacity: 0,
            transition: { duration: 0.3 }
          }
        }}
      >
        <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="beanGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8B5A2B" />
              <stop offset="50%" stopColor="#6F4E37" />
              <stop offset="100%" stopColor="#523A28" />
            </linearGradient>
            <linearGradient id="beanGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#D4A24E" />
              <stop offset="50%" stopColor="#BF8830" />
              <stop offset="100%" stopColor="#A67728" />
            </linearGradient>
            <filter id="beanShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000" floodOpacity="0.3" />
            </filter>
          </defs>
          
          {/* Main coffee bean group */}
          <g filter="url(#beanShadow)">
            {/* Left bean with detailed shape */}
            <path 
              d="M38 15C22 15 10 30 10 50C10 70 22 85 38 85C54 85 65 70 65 50C65 30 54 15 38 15ZM38 25C28 25 22 37 22 50C22 63 28 75 38 75C48 75 53 63 53 50C53 37 48 25 38 25Z" 
              fill="url(#beanGradient1)"
              stroke="#3C2A21"
              strokeWidth="1"
            />
            
            {/* Right bean with detailed shape */}
            <path 
              d="M62 15C46 15 35 30 35 50C35 70 46 85 62 85C78 85 90 70 90 50C90 30 78 15 62 15ZM62 25C72 25 78 37 78 50C78 63 72 75 62 75C52 75 47 63 47 50C47 37 52 25 62 25Z" 
              fill="url(#beanGradient2)"
              stroke="#A67728"
              strokeWidth="1"
            />
            
            {/* Bean details - center creases */}
            <path 
              d="M38 25C33 32 30 40 30 50C30 60 33 68 38 75" 
              stroke="#3C2A21"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
            />
            
            <path 
              d="M62 25C67 32 70 40 70 50C70 60 67 68 62 75" 
              stroke="#A67728"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
            />
            
            {/* Highlight details */}
            <path 
              d="M34 30C32 35 31 42 31 50" 
              stroke="#8B5A2B"
              strokeWidth="0.7"
              strokeLinecap="round"
              fill="none"
              opacity="0.7"
            />
            
            <path 
              d="M66 30C68 35 69 42 69 50" 
              stroke="#D4A24E"
              strokeWidth="0.7"
              strokeLinecap="round"
              fill="none"
              opacity="0.7"
            />
            
            {/* Surface texture details */}
            <path 
              d="M42 30C44 35 45 42 45 50" 
              stroke="#523A28"
              strokeWidth="0.5"
              strokeLinecap="round"
              fill="none"
              opacity="0.5"
            />
            
            <path 
              d="M58 30C56 35 55 42 55 50" 
              stroke="#BF8830"
              strokeWidth="0.5"
              strokeLinecap="round"
              fill="none"
              opacity="0.5"
            />
          </g>
        </svg>
      </motion.div>
      
      <motion.h1 
        className="text-4xl md:text-5xl font-bold mb-4 text-caramel font-serif tracking-wider"
        variants={itemVariants}
      >
        Ubuntu Coffee Export
      </motion.h1>
      
      <motion.div 
        className="w-64 h-2 bg-coffee-dark rounded-full overflow-hidden mb-4"
        variants={itemVariants}
      >
        <motion.div 
          className="h-full bg-caramel"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
      
      <motion.p 
        className="text-caramel text-lg font-serif"
        variants={itemVariants}
      >
        Brewing excellence worldwide
      </motion.p>
    </motion.div>
  );
};

export default CoffeeLoader;