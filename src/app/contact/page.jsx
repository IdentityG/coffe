import React from 'react'
import ContactHero from '../../components/contact/ContactHero'
import ContactSection from '../../components/home/ContactSection'
import MapSection from '../../components/contact/MapSection'

const page = () => {
  return (
    <div className="min-h-screen bg-latte text-foreground">
     <ContactHero />
     <ContactSection />
     <MapSection />
    </div>
  )
}

export default page