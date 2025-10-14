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
      <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent my-8"></div>
      <HomeSkills />
      <HomeExperience />
      <HomePersonal />
      {/* Gradient Line Divider */}
      <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent my-8"></div>
      <HomeWork />
      <HomeContact />
    </div>
  )
}

export default HomePage