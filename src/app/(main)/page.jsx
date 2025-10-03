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
      <HomeSkills />
      <HomeExperience />
      <HomePersonal />
      <HomeWork />
      <HomeContact />
    </div>
  )
}

export default HomePage