import React from 'react'
import AboutHero from '../../components/about/AboutHero'
import OriginSection from '../../components/about/OriginSection'
import MissionSection from '../../components/about/MissionSection'
import TeamSection from '../../components/about/TeamSection'
import ProcessSection from '../../components/about/ProcessSection'
import ImpactSection from '../../components/about/ImpactSection'
import CertificationsSection from '../../components/about/CertificationsSection'
import WhyWorkWithUs from '../../components/about/WhyWorkWithUs'

const page = () => {
  return (
    <div className="min-h-screen bg-latte text-foreground">
      <AboutHero />
      <OriginSection />
      <MissionSection />
      <TeamSection />
      <ProcessSection />
      <ImpactSection />
      <CertificationsSection />
      <WhyWorkWithUs />
    </div>
  )
}

export default page