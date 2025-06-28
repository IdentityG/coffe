'use client';

import { useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Export the coffee products data so it can be imported in other components
export const coffeeProducts = [
   {
    id: 1,
    name: "Yirgacheffe",
    origin: "Gedeo Zone, Southern Ethiopia",
    grade: "Grade 1",
    process: "Washed",
    altitude: "1,800–2,200 meters",
    harvest: "October–December",
    certifications: ["Organic", "Fair Trade"],
    flavor_profile: ["Jasmine", "Lemon", "Bergamot", "Black Tea"],
    roast_level: "Light to Medium",
    price: 18.99,
    image: "/images/yirga1.jpg",
    description: "Floral aroma with citrusy brightness. Yirgacheffe is renowned for clean, complex flavors and vibrant acidity.",
    size_options: ["250g", "500g", "1kg"],
    brewing_methods: ["Pour Over", "Drip", "AeroPress"],
    story: "Sourced from smallholder farms in the Gedeo Zone, Yirgacheffe beans are carefully washed and sun-dried under traditional methods.",
    farm_images: [
      "/images/yirga2.jpg",
      "/images/yirga1.jpg"
    ]
  },
  {
    id: 2,
    name: "Sidamo",
    origin: "Sidama Region, Ethiopia",
    grade: "Grade 2",
    process: "Natural",
    altitude: "1,500–2,200 meters",
    harvest: "November–February",
    certifications: ["Organic"],
    flavor_profile: ["Berry", "Wine", "Cocoa", "Lemon Zest"],
    roast_level: "Medium",
    price: 17.99,
    image: "/images/sidamo1.jpg",
    description: "Naturally processed for a fruit-forward cup with balanced body and sweet acidity.",
    size_options: ["250g", "500g", "1kg"],
    brewing_methods: ["French Press", "Cold Brew", "Moka Pot"],
    story: "From highland farms in Sidama, this coffee showcases berry tones and wine-like complexity through natural processing.",
    farm_images: [
      "/images/sidamo2.jpg",
      "/images/sidamo3.jpg"
    ]
  },
  {
    id: 3,
    name: "Guji",
    origin: "Guji Zone, Oromia Region",
    grade: "Grade 1",
    process: "Natural",
    altitude: "1,800–2,100 meters",
    harvest: "November–January",
    certifications: ["Organic", "Fair Trade"],
    flavor_profile: ["Peach", "Apricot", "Clove", "Tropical Fruit"],
    roast_level: "Medium",
    price: 19.99,
    image: "/images/gujii1.webp",
    description: "Fruity and spicy, Guji coffees offer a dynamic cup filled with sweet, stone fruit and warm spice tones.",
    size_options: ["250g", "500g", "1kg"],
    brewing_methods: ["Pour Over", "AeroPress", "Drip"],
    story: "Guji's volcanic soils and high altitudes produce exceptional coffees known for their bold character and aromatic intensity.",
    farm_images: [
      "/images/gujii2.webp",
      "/images/gujii3.webp"
    ]
  },
  {
    id: 4,
    name: "Harrar",
    origin: "Eastern Ethiopia (Harari)",
    grade: "Grade 4",
    process: "Natural",
    altitude: "1,510-2,120 meters",
    harvest: "October–February",
    certifications: ["Organic"],
    flavor_profile: ["Raisin", "Blueberry", "Wine", "Spice"],
    roast_level: "Medium-Dark",
    price: 18.49,
    image: "/images/harar1.jpeg",
    description: "Bold and rustic with wine-like body and chocolate undertones, Harrar coffees are full of intensity.",
    size_options: ["250g", "500g", "1kg"],
    brewing_methods: ["Espresso", "Moka Pot", "French Press"],
    story: "Handpicked and sun-dried, Harrar beans deliver a rich, dry-processed flavor Ethiopia is famous for.",
    farm_images: [
      "/images/harar2.jpg",
      "/images/harar1.jpeg"
    ]
  },
  {
    id: 5,
    name: "Limu",
    origin: "Jimma Zone, Oromia Region",
    grade: "Grade 2",
    process: "Washed",
    altitude: "1,700–2,100 meters",
    harvest: "October–December",
    certifications: ["Rainforest Alliance"],
    flavor_profile: ["Citrus", "Black Tea", "Floral", "Honey"],
    roast_level: "Medium-Light",
    price: 21.99,
    image: "/images/limu1.jpg",
    description: "Bright citrus acidity and floral complexity define this washed Limu coffee.",
    size_options: ["250g", "500g", "1kg"],
    brewing_methods: ["Pour Over", "AeroPress", "Siphon"],
    story: "Collected from certified farms near Jimma, Limu is known for refined acidity and aromatic elegance.",
   farm_images: [
      "/images/limu2.avif",
      "/images/limu3.webp"
    ]
  },
  {
    id: 6,
    name: "Lekempti",
    origin: "East Wollega, Oromia",
    grade: "Grade 4",
    process: "Natural",
    altitude: "1,600–2,100 meters",
    harvest: "October–January",
    certifications: ["Organic", "Fair Trade"],
    flavor_profile: ["Nutty", "Spice", "Cocoa", "Mild Citrus"],
    roast_level: "Medium",
    price: 17.49,
    image: "/images/lekempti1.jpg",
    description: "Nutty and spicy with mild acidity, Lekempti offers a well-rounded cup with gentle complexity.",
    size_options: ["250g", "500g", "1kg"],
    brewing_methods: ["French Press", "Drip", "Pour Over"],
    story: "Harvested in East Wollega and sun-dried, this coffee showcases the region’s balanced, earthy tones.",
    farm_images: [
      "/images/lekempti2.jpg",
      "/images/lekempti3.webp"
    ]
  },
];

const ProductShowcase = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const gridRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });

  // GSAP ScrollTrigger animations
  useEffect(() => {
    if (titleRef.current && gridRef.current) {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top bottom-=100',
            end: 'bottom center',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Grid animation
      gsap.fromTo(
        gridRef.current,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top bottom-=50',
            end: 'center center',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Card tilt on scroll - smoother animation with eased scrub
      const cards = gridRef.current.querySelectorAll('.coffee-card');
      cards.forEach((card, index) => {
        const direction = index % 2 === 0 ? 1 : -1;
        
        gsap.to(card, {
          rotateY: direction * 3, // Reduced rotation for subtlety
          scrollTrigger: {
            trigger: card,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.5, // Added smooth scrubbing
          },
          ease: 'power1.inOut', // Added easing
        });
      });
    }

    return () => {
      // Clean up ScrollTrigger instances
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Framer Motion variants
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

  // Enhanced card variants with smoother animation
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 70, // Reduced stiffness for smoother motion
        damping: 20, // Increased damping for less bouncing
        mass: 1.2, // Added mass for more natural physics
        velocity: 2, // Controlled velocity
        duration: 0.8, // Slightly longer duration
      },
    },
  };

  // Enhanced image hover animation
  const imageVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.08, // Slightly reduced scale for subtlety
      transition: { 
        type: "tween", 
        ease: [0.33, 1, 0.68, 1], // Custom cubic-bezier for smooth motion
        duration: 0.7, // Longer duration for smoother feel
      }
    }
  };

  // Certification badge component
  const CertificationBadge = ({ type }) => {
    const badgeColors = {
      'Organic': 'bg-green-100 text-green-800 border-green-300',
      'Fair Trade': 'bg-blue-100 text-blue-800 border-blue-300',
      'Rainforest Alliance': 'bg-emerald-100 text-emerald-800 border-emerald-300',
    };

    return (
      <motion.span 
        className={`text-xs px-2 py-1 rounded-full border ${badgeColors[type]} inline-block mr-1 mb-1`}
        whileHover={{ y: -2, scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {type}
      </motion.span>
    );
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-20 bg-cream overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-cream-light to-transparent opacity-70"></div>
      <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-caramel/5 -z-10"></div>
      <div className="absolute bottom-20 left-10 w-32 h-32 rounded-full bg-coffee/5 -z-10"></div>
      
      <div className="container mx-auto px-4">
        {/* Section title */}
        <div ref={titleRef} className="text-center mb-16">
          <div className="inline-block">
            <span className="block h-0.5 w-10 bg-caramel mx-auto mb-6"></span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-coffee-dark mb-4">
              Our Coffees
            </h2>
            <p className="text-lg text-coffee/80 max-w-2xl mx-auto">
              Exceptional single-origin coffees sourced directly from farmers and cooperatives around Ethiopia
            </p>
            <span className="block h-0.5 w-10 bg-caramel mx-auto mt-6"></span>
          </div>
        </div>

        {/* Product grid */}
        <motion.div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {coffeeProducts.map((product) => (
            <motion.div
              key={product.id}
              className="coffee-card bg-cream-light rounded-xl overflow-hidden shadow-lg will-change-transform perspective-1000"
              variants={cardVariants}
              whileHover={{ 
                scale: 1.03, // Reduced scale for subtlety
                y: -5, // Slight lift effect
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                transition: { 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 20,
                  mass: 0.8,
                  duration: 0.4 
                }
              }}
              layout // Added layout animation for smooth transitions
            >
              <div className="relative overflow-hidden aspect-[4/3]">
                <motion.div
                  className="w-full h-full"
                  variants={imageVariants}
                  initial="initial"
                  whileHover="hover"
                >
                  <motion.img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    loading="lazy" // Added for performance
                    initial={{ opacity: 0.8 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                </motion.div>
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-coffee-black/60 to-transparent"
                  whileHover={{ opacity: 0.7 }}
                  transition={{ duration: 0.3 }}
                ></motion.div>
              </div>
              
              <div className="p-6">
                <motion.h3 
                  className="text-xl font-bold text-coffee-dark mb-2 transition-colors duration-300"
                  whileHover={{ color: "#D4A24E" }} // caramel color
                >
                  {product.name}
                </motion.h3>
                
                <p className="text-coffee/80 mb-4">
                  {product.origin} | {product.process} | {product.grade}
                </p>
                
                <div className="mb-4">
                  {product.certifications.map((cert, index) => (
                    <CertificationBadge key={index} type={cert} />
                  ))}
                </div>
                
                <motion.div
                  className="mt-4 inline-block"
                  whileHover={{ x: 5 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 400,
                    damping: 15 
                  }}
                >
                  <Link 
                    href={`/products/${product.id}`}
                    className="text-caramel hover:text-caramel-dark font-medium flex items-center"
                  >
                    View Details
                    <motion.svg 
                      className="w-4 h-4 ml-2" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                      initial={{ x: 0 }}
                      whileHover={{ x: 3 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </motion.svg>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <div className="text-center mt-16">
          <Link 
            href="/products" 
            className="group relative inline-flex items-center justify-center px-8 py-3 bg-coffee text-cream-light font-medium uppercase tracking-widest text-sm overflow-hidden transition-all duration-300 hover:bg-coffee-dark border-2 border-coffee hover:border-coffee-dark rounded-md hover:shadow-lg"
          >
            <span className="relative z-10 flex items-center justify-center transition-colors duration-300">
              <span>Explore All Products</span>
              <svg 
                className="ml-2 w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;