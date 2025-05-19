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
    name: "Yirga cheffe",
    origin: "Sidama, Ethiopia",
    grade: "Grade +1",
    process: "Washed",
    image: "https://images.unsplash.com/photo-1580933073521-dc49ac0d4e6a?q=80&w=2069",
    certifications: ["Organic", "Fair Trade"],
    // Additional data for product detail page
    description: "A bright, complex coffee with floral and citrus notes. Grown in the highlands of Ethiopia, this coffee showcases the unique terroir of the Yirgacheffe region.",
    altitude: "1,800-2,200 meters",
    harvest: "October-December",
    flavor_profile: ["Jasmine", "Lemon", "Bergamot", "Black Tea"],
    roast_level: "Light to Medium",
    price: 18.99,
    size_options: ["250g", "500g", "1kg"],
    brewing_methods: ["Pour Over", "Drip", "AeroPress"],
    story: "Our Ethiopian Yirgacheffe comes from small-scale farmers who are part of the Yirgacheffe Coffee Farmers Cooperative Union. These farmers use traditional methods passed down through generations, growing coffee under the shade of native trees.",
    farm_images: [
      "https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?q=80&w=2574",
      "https://images.unsplash.com/photo-1523287409476-a9e70a25af3f?q=80&w=2570"
    ]
  },
  {
    id: 2,
    name: "Yirga Cheffe",
    origin: "Sidama, Ethiopia",
    grade: "Yirga Cheffe Grade +2",
    process: "Washed",
    image: "https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?q=80&w=2070",
    certifications: ["Rainforest Alliance"],
    // Additional data for product detail page
    description: "A well-balanced coffee with caramel sweetness and a smooth, clean finish. Colombia's rich volcanic soil and ideal climate produce beans of exceptional quality.",
    altitude: "1,400-1,800 meters",
    harvest: "April-June, October-December",
    flavor_profile: ["Caramel", "Chocolate", "Walnut", "Red Apple"],
    roast_level: "Medium",
    price: 16.99,
    size_options: ["250g", "500g", "1kg"],
    brewing_methods: ["Espresso", "French Press", "Drip"],
    story: "Our Yirga Cheffe Grade +2 comes from family-owned farms in the Sidama region. These farmers take pride in their meticulous approach to cultivation and processing, resulting in beans of exceptional quality and consistency.",
    farm_images: [
      "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=2578",
      "https://images.unsplash.com/photo-1499744937866-d7e566a20a61?q=80&w=2670"
    ]
  },
  {
    id: 3,
    name: "Sidamo",
    origin: "Sidama, Ethiopia",
    grade: "Grade +1",
    process: "Natural",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=1974",
    certifications: ["Organic"],
    // Additional data for product detail page
    description: "A full-bodied, earthy coffee with low acidity and notes of dark chocolate, cedar, and spice. The unique wet-hulling process gives this coffee its distinctive character.",
    altitude: "900-1,500 meters",
    harvest: "October-March",
    flavor_profile: ["Dark Chocolate", "Cedar", "Tobacco", "Earthy Spice"],
    roast_level: "Medium-Dark",
    price: 17.99,
    size_options: ["250g", "500g", "1kg"],
    brewing_methods: ["French Press", "Cold Brew", "Moka Pot"],
    story: "Our Sumatra Mandheling is sourced from small-holder farmers around Sidama. The traditional wet-hulling process (known locally as 'Giling Basah') gives these beans their distinctive earthy character and full body.",
    farm_images: [
      "https://images.unsplash.com/photo-1504113888839-1c8eb50233d3?q=80&w=2415",
      "https://images.unsplash.com/photo-1551609189-aba53e01a0bb?q=80&w=2574"
    ]
  },
  {
    id: 4,
    name: "Guji",
    origin: "Oromia, Ethiopia",
    grade: "Grade +4",
    process: "Natural",
    image: "https://images.unsplash.com/photo-1497636577773-f1231844b336?q=80&w=1974",
    certifications: ["Fair Trade", "Organic"],
    // Additional data for product detail page
    description: "A sweet, complex coffee with notes of honey, orange, and almond. The honey processing method enhances the natural sweetness of these high-grown beans.",
    altitude: "1,500-1,900 meters",
    harvest: "December-March",
    flavor_profile: ["Honey", "Orange", "Almond", "Cinnamon"],
    roast_level: "Medium",
    price: 19.99,
    size_options: ["250g", "500g", "1kg"],
    brewing_methods: ["Pour Over", "AeroPress", "Drip"],
    story: "Our Guji coffee comes from the Oromia region Guji, which has been a pioneer in sustainable coffee production. Their honey processing method involves removing the cherry skin while leaving some of the fruit mucilage on the bean during drying, resulting in a sweeter cup.",
    farm_images: [
      "https://images.unsplash.com/photo-1524350876685-274059728c24?q=80&w=2671",
      "https://images.unsplash.com/photo-1591287038628-9a63d8f50dbb?q=80&w=2574"
    ]
  },
  {
    id: 5,
    name: "Limu",
    origin: "Oromia, Ethiopia",
    grade: "Grade +2",
    process: "Washed",
    image: "https://cdn.pixabay.com/photo/2017/04/21/12/11/coffe-2248569_640.jpg",
    certifications: ["Rainforest Alliance"],
    // Additional data for product detail page
    description: "A bright, juicy coffee with pronounced acidity and notes of blackcurrant, grapefruit, and blackberry. Kenya's unique soil conditions and processing methods produce some of the world's most distinctive coffees.",
    altitude: "1,700-2,100 meters",
    harvest: "October-December",
    flavor_profile: ["Blackcurrant", "Grapefruit", "Blackberry", "Tomato"],
    roast_level: "Medium-Light",
    price: 21.99,
    size_options: ["250g", "500g", "1kg"],
    brewing_methods: ["Pour Over", "AeroPress", "Siphon"],
    story: "Our Limu beans come from small farms in the foothills ofOromia region. The 'Grade +2' designation indicates the largest bean size, which often correlates with higher quality. These beans are processed at centralized washing stations where meticulous sorting and fermentation bring out their distinctive flavors.",
    farm_images: [
      "https://images.unsplash.com/photo-1612392062631-94b23bc8c510?q=80&w=2574",
      "https://images.unsplash.com/photo-1500423079914-b65af272b8db?q=80&w=2670"
    ]
  },
  {
    id: 6,
    name: "DJimma",
    origin: "Oromia, Ethiopia",
    grade: "Grade +5",
    process: "Natural",
    image: "https://cdn.pixabay.com/photo/2017/04/28/13/07/coffee-2268307_640.jpg",
    certifications: ["Organic"],
    // Additional data for product detail page
    description: "A refined coffee with elegant acidity, full body, and notes of chocolate, spice, and subtle fruit. Grown in volcanic soil at high altitudes in the Antigua Valley.",
    altitude: "1,500-1,800 meters",
    harvest: "January-March",
    flavor_profile: ["Chocolate", "Cinnamon", "Apple", "Orange"],
    roast_level: "Medium",
    price: 18.49,
    size_options: ["250g", "500g", "1kg"],
    brewing_methods: ["Espresso", "Pour Over", "French Press"],
    story: "Our DJimma Antigua is grown on the slopes of the Oromia region in the Jimma. The rich volcanic soil, high altitude, and cool nights create ideal growing conditions. These beans are carefully harvested and processed by farmers who have been growing coffee for generations.",
    farm_images: [
      "https://images.unsplash.com/photo-1477764160862-7a51f3f29cfb?q=80&w=2670",
      "https://images.unsplash.com/photo-1629227071576-e393f3b6c6b6?q=80&w=2670"
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
              Exceptional single-origin coffees sourced directly from farmers and cooperatives around the world
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
        
      </div>
    </section>
  );
};

export default ProductShowcase;