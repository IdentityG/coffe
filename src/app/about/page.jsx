import React from 'react'
import AboutHero from '../../components/about/AboutHero'
import OriginSection from '../../components/about/OriginSection'
import MissionSection from '../../components/about/MissionSection'
import TeamSection from '../../components/about/TeamSection'
import ProcessSection from '../../components/about/ProcessSection'

const page = () => {
  return (
    <div className="min-h-screen bg-latte text-foreground">
      <AboutHero />
      <OriginSection />
      <MissionSection />
      <TeamSection />
      <ProcessSection />
    </div>
  )
}

export default page