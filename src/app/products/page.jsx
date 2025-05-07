'use client';

import React from 'react'
import ProjectsHero from '../../components/projects/ProjectsHero'
import ProductShowcase from '../../components/projects/ProductShowcase'
import dynamic from 'next/dynamic'

// Dynamically import ProjectMap with SSR disabled
const ProjectMap = dynamic(
  () => import('../../components/projects/ProjectMap'),
  { ssr: false }
)

const page = () => {
  return (
    <div className="min-h-screen bg-latte text-foreground">
     <ProjectsHero />
     <ProductShowcase />
     <ProjectMap />
    </div>
  )
}

export default page