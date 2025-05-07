'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

// Register ScrollTrigger with GSAP
gsap.registerPlugin(ScrollTrigger);

const GallerySection = () => {
  const sectionRef = useRef(null);
  const galleryRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });
  const [selectedImage, setSelectedImage] = useState(null);

  // Gallery images data
  const galleryImages = [
    {
      id: 1,
      src: "/coffe.jpg",
      alt: "Coffee Beans Drying",
      category: "processing",
      aspectRatio: "square", // 1:1
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1715424875963-d6c458eacd27?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fENvZmZlZSUyMEZhcm0lMjBMYW5kc2NhcGV8ZW58MHx8MHx8fDA%3D",
      alt: "Coffee Farm Landscape",
      category: "farms",
      aspectRatio: "landscape", // 16:9
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1599578705716-8d3d9246f53b",
      alt: "Coffee Harvesting",
      category: "harvesting",
      aspectRatio: "portrait", // 3:4
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085",
      alt: "Coffee Cupping Session",
      category: "cupping",
      aspectRatio: "square", // 1:1
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      alt: "Coffee Beans Close-up",
      category: "beans",
      aspectRatio: "portrait", // 3:4
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1494412651409-8963ce7935a7",
      alt: "Export Preparation",
      category: "export prep",
      aspectRatio: "landscape", // 16:9
    },
    {
      id: 7,
      src: "https://images.unsplash.com/photo-1612668196612-70262cad2ad7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fENvZmZlZSUyMFBsYW50YXRpb258ZW58MHx8MHx8fDA%3D",
      alt: "Coffee Plantation",
      category: "farms",
      aspectRatio: "landscape", // 16:9
    },
    {
      id: 8,
      src: "https://images.unsplash.com/photo-1580933073521-dc49ac0d4e6a",
      alt: "Drying Beds",
      category: "drying beds",
      aspectRatio: "square", // 1:1
    },
    {
      id: 9,
      src: "https://images.unsplash.com/photo-1610889556528-9a770e32642f",
      alt: "Coffee Tasting",
      category: "cupping",
      aspectRatio: "portrait", // 3:4
    },
  ];

  // Animation variants for Framer Motion
  const titleVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.6, 0.05, 0.01, 0.9],
      },
    },
  };

  const galleryVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const imageVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      filter: "brightness(1.1) contrast(1.1)",
      rotate: 1,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  // GSAP ScrollTrigger animations
  useEffect(() => {
    if (galleryRef.current) {
      // Create a timeline for staggered gallery animations
      const galleryItems = galleryRef.current.querySelectorAll('.gallery-item');
      
      galleryItems.forEach((item, index) => {
        // Determine if item should animate from left or bottom based on index
        const direction = index % 3 === 0 ? 'left' : 'bottom';
        const xValue = direction === 'left' ? -50 : 0;
        const yValue = direction === 'bottom' ? 50 : 0;
        
        gsap.fromTo(
          item,
          { x: xValue, y: yValue, opacity: 0 },
          { 
            x: 0, 
            y: 0, 
            opacity: 1, 
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top bottom-=50',
              end: 'bottom center',
              toggleActions: 'play none none reverse',
            },
            delay: index * 0.05, // Slight stagger
          }
        );
        
        // Optional parallax effect
        gsap.to(item.querySelector('img'), {
          y: -20,
          ease: 'none',
          scrollTrigger: {
            trigger: item,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.5,
          },
        });
      });
    }

    return () => {
      // Clean up ScrollTrigger instances
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Handle image click for modal view
  const openModal = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <section 
      ref={sectionRef} 
      className="py-20 md:py-28 bg-coffee-dark text-cream overflow-hidden"
    >
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={titleVariants}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-caramel mb-4">
            A Glimpse Into Our World
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-cream-light">
            From the hands of farmers to the heart of global trade
          </p>
        </motion.div>

        <motion.div 
          ref={galleryRef}
          variants={galleryVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
        >
          {galleryImages.map((image) => (
            <motion.div 
              key={image.id}
              className={`gallery-item relative overflow-hidden rounded-lg shadow-md cursor-pointer
                ${image.aspectRatio === 'landscape' ? 'col-span-1 sm:col-span-2 row-span-1' : ''}
                ${image.aspectRatio === 'portrait' ? 'row-span-2' : ''}
                ${image.aspectRatio === 'square' ? '' : ''}
              `}
              variants={imageVariants}
              whileHover="hover"
              onClick={() => openModal(image)}
            >
              <div className="relative h-64 sm:h-72 w-full overflow-hidden">
                <Image
                  src={`${image.src}?auto=format&fit=crop&w=800&q=80`}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-coffee-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="inline-block px-3 py-1 bg-caramel/80 text-coffee-black text-xs font-bold rounded-full mb-2">
                      {image.category}
                    </span>
                    <h3 className="text-cream font-medium">{image.alt}</h3>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-coffee-black/90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="relative max-w-4xl max-h-[90vh] overflow-hidden rounded-lg"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[16/9] w-full">
                <Image
                  src={`${selectedImage.src}?auto=format&fit=crop&w=1600&q=90`}
                  alt={selectedImage.alt}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute top-4 right-4">
                <button 
                  onClick={closeModal}
                  className="w-10 h-10 rounded-full bg-coffee-black/50 text-cream flex items-center justify-center hover:bg-coffee-black transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-coffee-black/70">
                <h3 className="text-caramel text-xl font-bold">{selectedImage.alt}</h3>
                <p className="text-cream-light">{selectedImage.category}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GallerySection;