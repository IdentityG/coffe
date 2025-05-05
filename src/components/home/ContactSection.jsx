'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const contactInfoRef = useRef(null);
  const formRef = useRef(null);
  const mapRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: ''
  });
  
  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Here you would typically send the form data to your backend
    // For demonstration, we'll simulate a successful submission
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Reset form and show success message
      setFormData({ name: '', email: '', company: '', message: '' });
      setFormStatus({
        submitted: true,
        success: true,
        message: 'Thank you for your inquiry! We will get back to you shortly.'
      });
      
      // Reset form status after 5 seconds
      setTimeout(() => {
        setFormStatus({
          submitted: false,
          success: false,
          message: ''
        });
      }, 5000);
    } catch (error) {
      setFormStatus({
        submitted: true,
        success: false,
        message: 'Something went wrong. Please try again later.'
      });
    }
  };
  
  // GSAP ScrollTrigger animations
  useEffect(() => {
    if (titleRef.current && contactInfoRef.current && formRef.current && mapRef.current) {
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

      // Contact info animation
      gsap.fromTo(
        contactInfoRef.current,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: contactInfoRef.current,
            start: 'top bottom-=50',
            end: 'center center',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Form animation with staggered effect for form fields
      const formElements = formRef.current.querySelectorAll('.form-element');
      gsap.fromTo(
        formElements,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top bottom-=50',
            toggleActions: 'play none none reverse',
          },
        }
      );
      
      // Map animation
      gsap.fromTo(
        mapRef.current,
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: 'elastic.out(1, 0.75)',
          scrollTrigger: {
            trigger: mapRef.current,
            start: 'top bottom-=100',
            toggleActions: 'play none none reverse',
          },
        }
      );
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
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, 0.05, 0.01, 0.9],
      },
    },
  };
  
  const buttonVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05,
      backgroundColor: '#BF8830', // caramel-dark
      boxShadow: '0 4px 20px rgba(212, 162, 78, 0.3)',
      transition: { 
        type: 'spring',
        stiffness: 400,
        damping: 10
      }
    },
    tap: { 
      scale: 0.95,
      backgroundColor: '#D4A24E', // caramel
      boxShadow: '0 2px 10px rgba(212, 162, 78, 0.2)',
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-24 overflow-hidden bg-coffee-dark text-cream"
      id="contact"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-coffee to-transparent opacity-30"></div>
      <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-caramel/5 -z-10"></div>
      <div className="absolute bottom-20 left-10 w-32 h-32 rounded-full bg-cream/5 -z-10"></div>
      
      <div className="container relative z-10 mx-auto px-4">
        {/* Section title */}
        <div ref={titleRef} className="text-center mb-16">
          <div className="inline-block">
            <span className="block h-0.5 w-10 bg-caramel mx-auto mb-6"></span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-cream mb-4">
              Let's Work Together
            </h2>
            <p className="text-lg text-cream/80 max-w-2xl mx-auto">
              Interested in our premium coffee exports? Reach out to us for inquiries, samples, or partnership opportunities.
            </p>
            <span className="block h-0.5 w-10 bg-caramel mx-auto mt-6"></span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Left Column - Contact Info */}
          <div ref={contactInfoRef} className="w-full lg:w-2/5">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="bg-coffee p-8 rounded-xl shadow-xl"
            >
              <motion.h3 
                variants={itemVariants}
                className="text-2xl font-serif text-caramel mb-6"
              >
                Contact Information
              </motion.h3>
              
              <div className="space-y-6">
                <motion.div variants={itemVariants} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-caramel/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-caramel" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-caramel font-medium mb-1">Email</h4>
                    <a href="mailto:info@ubuntucoffee.com" className="text-cream/90 hover:text-caramel transition-colors">
                      info@ubuntucoffee.com
                    </a>
                  </div>
                </motion.div>
                
                <motion.div variants={itemVariants} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-caramel/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-caramel" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-caramel font-medium mb-1">Phone</h4>
                    <a href="tel:+251112345678" className="text-cream/90 hover:text-caramel transition-colors">
                      +251 11 234 5678
                    </a>
                  </div>
                </motion.div>
                
                <motion.div variants={itemVariants} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-caramel/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-caramel" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-caramel font-medium mb-1">Address</h4>
                    <p className="text-cream/90">
                      Bole Road, Addis Ababa<br />
                      Ethiopia
                    </p>
                  </div>
                </motion.div>
                
                <motion.div variants={itemVariants} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-caramel/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-caramel" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-caramel font-medium mb-1">Business Hours</h4>
                    <p className="text-cream/90">
                      Monday - Friday: 9:00 AM - 5:00 PM<br />
                      Saturday: 10:00 AM - 2:00 PM
                    </p>
                  </div>
                </motion.div>
              </div>
              
              {/* Map or Office Image */}
              <motion.div 
                ref={mapRef}
                className="mt-8 rounded-lg overflow-hidden h-64 relative"
                variants={itemVariants}
              >
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.5458654880396!2d38.7885!3d9.0092!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOcKwMDAnMzMuMSJOIDM4wrA0NycxOC42IkU!5e0!3m2!1sen!2sus!4v1635000000000!5m2!1sen!2sus" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen="" 
                  loading="lazy"
                  title="Office Location"
                  className="absolute inset-0"
                ></iframe>
              </motion.div>
            </motion.div>
          </div>
          
          {/* Right Column - Contact Form */}
          <div ref={formRef} className="w-full lg:w-3/5">
            <div className="bg-coffee p-8 rounded-xl shadow-xl">
              <h3 className="text-2xl font-serif text-caramel mb-6 form-element">
                Send Us a Message
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="form-element">
                  <label htmlFor="name" className="block text-cream/90 mb-2 font-medium">
                    Name <span className="text-caramel">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-coffee-dark border border-coffee-light focus:border-caramel focus:ring-2 focus:ring-caramel/30 outline-none transition-all text-cream"
                    placeholder="Your name"
                    aria-label="Your name"
                  />
                </div>
                
                <div className="form-element">
                  <label htmlFor="email" className="block text-cream/90 mb-2 font-medium">
                    Email <span className="text-caramel">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-coffee-dark border border-coffee-light focus:border-caramel focus:ring-2 focus:ring-caramel/30 outline-none transition-all text-cream"
                    placeholder="Your email address"
                    aria-label="Your email address"
                  />
                </div>
                
                <div className="form-element">
                  <label htmlFor="company" className="block text-cream/90 mb-2 font-medium">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-coffee-dark border border-coffee-light focus:border-caramel focus:ring-2 focus:ring-caramel/30 outline-none transition-all text-cream"
                    placeholder="Your company name"
                    aria-label="Your company name"
                  />
                </div>
                
                <div className="form-element">
                  <label htmlFor="message" className="block text-cream/90 mb-2 font-medium">
                    Message <span className="text-caramel">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="w-full px-4 py-3 rounded-lg bg-coffee-dark border border-coffee-light focus:border-caramel focus:ring-2 focus:ring-caramel/30 outline-none transition-all text-cream resize-none"
                    placeholder="Your message"
                    aria-label="Your message"
                  ></textarea>
                </div>
                
                <div className="form-element">
                  <motion.button
                    type="submit"
                    className="w-full py-4 px-6 bg-caramel text-coffee-dark font-bold rounded-lg shadow-lg hover:bg-caramel-dark transition-all focus:outline-none focus:ring-4 focus:ring-caramel/50"
                    variants={buttonVariants}
                    initial="initial"
                    whileHover="hover"
                    whileTap="tap"
                  >
                    Send Message
                  </motion.button>
                </div>
                
                {/* Form status message */}
                {formStatus.submitted && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-lg ${formStatus.success ? 'bg-green-800/40 text-green-200' : 'bg-red-800/40 text-red-200'}`}
                  >
                    {formStatus.message}
                  </motion.div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;