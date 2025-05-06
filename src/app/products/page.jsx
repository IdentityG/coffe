import React from 'react'
import ProjectsHero from '../../components/projects/ProjectsHero'
import ProductShowcase from '../../components/projects/ProductShowcase'
import ProjectMap from '../../components/projects/ProjectMap'

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