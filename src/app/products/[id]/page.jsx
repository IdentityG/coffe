'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';
// Import the coffee products data
import { coffeeProducts } from '../../../components/home/ProductShowcase';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Find the product with the matching id
    const productId = parseInt(id);
    const foundProduct = coffeeProducts.find(p => p.id === productId);
    
    if (foundProduct) {
      setProduct(foundProduct);
    }
    
    setIsLoading(false);
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <div className="animate-pulse text-coffee-dark">Loading...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-cream text-coffee-dark">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p className="mb-6">Sorry, we couldn't find the coffee you're looking for.</p>
        <Link 
          href="/products"
          className="px-6 py-2 bg-caramel text-cream-light rounded-md hover:bg-caramel-dark transition-colors"
        >
          Browse Our Coffees
        </Link>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === product.farm_images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? product.farm_images.length - 1 : prev - 1
    );
  };

  return (
    <div className="bg-cream min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-8">
          <nav className="flex text-sm">
            <Link href="/" className="text-coffee/60 hover:text-coffee transition-colors">
              Home
            </Link>
            <span className="mx-2 text-coffee/40">/</span>
            <Link href="/products" className="text-coffee/60 hover:text-coffee transition-colors">
              Products
            </Link>
            <span className="mx-2 text-coffee/40">/</span>
            <span className="text-coffee-dark font-medium">{product.name}</span>
          </nav>
        </div>

        {/* Product Detail */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-6">
            <motion.div 
              className="relative rounded-xl overflow-hidden aspect-square bg-cream-light shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-coffee-black/40 to-transparent"></div>
              <div className="absolute bottom-4 left-4">
                {product.certifications.map((cert, index) => (
                  <span 
                    key={index}
                    className={`text-xs px-2 py-1 rounded-full border bg-opacity-90 inline-block mr-1 mb-1 ${
                      cert === 'Organic' ? 'bg-green-100 text-green-800 border-green-300' :
                      cert === 'Fair Trade' ? 'bg-blue-100 text-blue-800 border-blue-300' :
                      'bg-emerald-100 text-emerald-800 border-emerald-300'
                    }`}
                  >
                    {cert}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Farm Images Carousel */}
            {product.farm_images && product.farm_images.length > 0 && (
              <motion.div 
                className="relative rounded-xl overflow-hidden aspect-video bg-cream-light shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <img 
                  src={product.farm_images[currentImageIndex]} 
                  alt={`${product.name} farm`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-coffee-black/30 to-transparent"></div>
                
                {/* Navigation arrows */}
                <button 
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-cream/80 flex items-center justify-center text-coffee-dark hover:bg-cream transition-colors"
                  aria-label="Previous image"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button 
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-cream/80 flex items-center justify-center text-coffee-dark hover:bg-cream transition-colors"
                  aria-label="Next image"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                
                {/* Image counter */}
                <div className="absolute bottom-3 right-3 bg-cream/80 text-coffee-dark text-xs px-2 py-1 rounded-md">
                  {currentImageIndex + 1} / {product.farm_images.length}
                </div>
              </motion.div>
            )}
          </div>

          {/* Product Info */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div>
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-coffee-dark mb-2">{product.name}</h1>
              <div className="flex flex-wrap items-center text-coffee/80 mb-4">
                <span className="mr-3">{product.origin}</span>
                <span className="w-1 h-1 rounded-full bg-caramel mx-2"></span>
                <span className="mr-3">{product.process}</span>
                <span className="w-1 h-1 rounded-full bg-caramel mx-2"></span>
                <span>{product.grade}</span>
              </div>
            </div>

            <div className="border-t border-b border-coffee/10 py-6">
              <p className="text-coffee-dark/90 leading-relaxed">{product.description}</p>
            </div>

            {/* Product Details */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-coffee/60 mb-1">Altitude</p>
                <p className="text-coffee-dark font-medium">{product.altitude}</p>
              </div>
              <div>
                <p className="text-coffee/60 mb-1">Harvest</p>
                <p className="text-coffee-dark font-medium">{product.harvest}</p>
              </div>
              <div>
                <p className="text-coffee/60 mb-1">Roast Level</p>
                <p className="text-coffee-dark font-medium">{product.roast_level}</p>
              </div>
            </div>

            {/* Flavor Profile */}
            <div>
              <h3 className="text-coffee-dark font-medium mb-3">Flavor Profile</h3>
              <div className="flex flex-wrap gap-2">
                {product.flavor_profile.map((flavor, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-cream-light rounded-full text-coffee-dark text-sm border border-coffee/10"
                  >
                    {flavor}
                  </span>
                ))}
              </div>
            </div>

            {/* Brewing Methods */}
            <div>
              <h3 className="text-coffee-dark font-medium mb-3">Recommended Brewing Methods</h3>
              <div className="flex flex-wrap gap-2">
                {product.brewing_methods.map((method, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-cream-light rounded-full text-coffee-dark text-sm border border-coffee/10"
                  >
                    {method}
                  </span>
                ))}
              </div>
            </div>

            {/* Available Sizes - Informational Only */}
            <div>
              <h3 className="text-coffee-dark font-medium mb-3">Available Sizes</h3>
              <div className="flex flex-wrap gap-2">
                {product.size_options.map((size, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-cream-light rounded-full text-coffee-dark text-sm border border-coffee/10"
                  >
                    {size}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Product Story */}
        <motion.div 
          className="mt-16 bg-cream-light rounded-xl p-8 shadow-sm"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h2 className="text-2xl font-serif font-bold text-coffee-dark mb-4">The Story</h2>
          <p className="text-coffee-dark/90 leading-relaxed">{product.story}</p>
        </motion.div>
      </div>
    </div>
  );
}