import React from 'react'
import { 
  HomeHero, 
  HomeSkills, 
  HomeExperience, 
  HomePersonal, 
  HomeWork, 
  HomeContact 
} from '@/components/main/home'

const HomePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <HomeHero />
      <HomeSkills />
      <HomeExperience />
      <HomePersonal />
      <HomeWork />
      <HomeContact />
    </div>
  )
}

export default HomePage