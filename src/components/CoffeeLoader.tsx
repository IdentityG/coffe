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
      className="fixed inset-0 flex flex-col items-center justify-center bg-[#1a0c05] z-50"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div 
        className="mb-8"
        variants={beanVariants}
      >
        <svg width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <motion.path 
            d="M50 10C30 10 15 30 15 50C15 70 30 90 50 90C70 90 85 70 85 50C85 30 70 10 50 10ZM50 30C40 30 35 40 35 50C35 60 40 70 50 70C60 70 65 60 65 50C65 40 60 30 50 30Z" 
            fill="#8B4513"
            stroke="#D2691E"
            strokeWidth="2"
          />
        </svg>
      </motion.div>
      
      <motion.h1 
        className="text-4xl md:text-5xl font-bold mb-4 text-[#D2691E] font-serif tracking-wider"
        variants={itemVariants}
      >
        Ubuntu Coffee Export
      </motion.h1>
      
      <motion.div 
        className="w-64 h-2 bg-[#3c2415] rounded-full overflow-hidden mb-4"
        variants={itemVariants}
      >
        <motion.div 
          className="h-full bg-[#D2691E]"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
      
      <motion.p 
        className="text-[#D2691E] text-lg font-serif"
        variants={itemVariants}
      >
        Brewing excellence worldwide
      </motion.p>
    </motion.div>
  );
};

export default CoffeeLoader;