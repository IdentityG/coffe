import React from 'react'
import AboutHero from '../../components/about/AboutHero'
import OriginSection from '../../components/about/OriginSection'
import MissionSection from '../../components/about/MissionSection'
import TeamSection from '../../components/about/TeamSection'

const page = () => {
  return (
    <div className="min-h-screen bg-latte text-foreground">
      <AboutHero />
      <OriginSection />
      <MissionSection />
      <TeamSection />
    </div>
  )
}

export default page