'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

interface CoffeeLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const CoffeeLink = ({ href, children, className = '', onClick }: CoffeeLinkProps) => {
  const [isHovering, setIsHovering] = useState(false);
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // If there's a custom onClick handler, call it
    if (onClick) onClick();
    
    // Add a small delay before navigation to allow for exit animations
    setTimeout(() => {
      router.push(href);
    }, 100);
  };

  return (
    <Link 
      href={href} 
      onClick={handleClick}
      className={className}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <motion.span
        animate={{
          scale: isHovering ? 1.05 : 1,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 10 }}
        className="inline-block"
      >
        {children}
      </motion.span>
    </Link>
  );
};

export default CoffeeLink;