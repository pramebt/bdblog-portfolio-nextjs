import React from 'react'
import { 
  HomeHero, 
  HomeAbout,
  HomeSkills, 

  HomeExperience, 
  HomePersonal, 
  HomeWork, 
  HomeContact 
} from '@/components/main/home'

const HomePage = () => {
  return (
    <div className="w-full min-h-screen bg-background">
      <HomeHero />
      <HomeAbout />
      {/* Gradient Line Divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent my-12"></div>
      <HomeSkills />
      <HomeExperience />
      <HomePersonal />
      {/* Gradient Line Divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent my-12"></div>
      <HomeWork />
      <HomeContact />
    </div>
  )
}

export default HomePage