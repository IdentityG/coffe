'use client';

import { useState, useEffect, createContext, useContext } from 'react';
import { AnimatePresence } from 'framer-motion';
import CoffeeLoader from './CoffeeLoader';

interface LoaderContextType {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const LoaderContext = createContext<LoaderContextType | undefined>(undefined);

export const useLoader = () => {
  const context = useContext(LoaderContext);
  if (context === undefined) {
    throw new Error('useLoader must be used within a CoffeeLoaderProvider');
  }
  return context;
};

export const CoffeeLoaderProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    // If not loading anymore, wait a bit before removing the loader component
    if (!isLoading) {
      const timer = setTimeout(() => {
        setShowLoader(false);
      }, 800); // Animation exit duration
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  return (
    <LoaderContext.Provider value={{ isLoading, setIsLoading }}>
      <AnimatePresence mode="wait">
        {showLoader && <CoffeeLoader onLoadingComplete={() => setIsLoading(false)} />}
      </AnimatePresence>
      <div className={isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'}>
        {children}
      </div>
    </LoaderContext.Provider>
  );
};