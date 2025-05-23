// Add this import at the top of your page file
import Hero from '../components/home/Hero';
import AboutSection from '@/components/home/AboutSection';
import ProductShowcase from '@/components/home/ProductShowcase';
import Sustainability from '@/components/home/Sustainability';
import GlobalReach from '@/components/home/GlobalReach';
import Testimonials from '@/components/home/Testimonials';
import ContactSection from '@/components/home/ContactSection';
import GallerySection from '@/components/home/GallerySection';

export default function Home() {
  return (
    <div className="min-h-screen bg-latte text-foreground">
      <Hero />
      <AboutSection />
      <ProductShowcase />
      <Sustainability />
      <GallerySection />
      <GlobalReach />
      <Testimonials />
      <ContactSection />
    </div>
  );
}
