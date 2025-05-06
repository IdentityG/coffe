import React from 'react'
import SustainabilityHero from '../../components/sustainability/SustainabilityHero'
import SustainabilityPillars from '../../components/sustainability/SustainabilityPillars'
import FarmingPractices from '../../components/sustainability/FarmingPractices'
import SustainabilityTimeline from '../../components/sustainability/SustainabilityTimeline'
import FarmerStories from '../../components/sustainability/FarmerStories'
import ImpactMetrics from '../../components/sustainability/ImpactMetrics'

const page = () => {
  return (
    <div className="min-h-screen bg-latte text-foreground">
      <SustainabilityHero />
      <SustainabilityPillars />
      <FarmingPractices />
      <SustainabilityTimeline />
      <FarmerStories />
      <ImpactMetrics />
    </div>
  )
}

export default page