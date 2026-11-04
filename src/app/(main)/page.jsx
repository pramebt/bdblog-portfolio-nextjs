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
    <div className="relative w-full">
      <HomeHero />
      <div className="relative z-10 w-[100cqi] bg-background [margin-inline:calc(50%-50cqi)]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-full h-20 backdrop-blur-[5px]"
          style={{
            maskImage: 'linear-gradient(to bottom, transparent, black)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent, black)',
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-full h-14 bg-gradient-to-b from-transparent to-background"
        />
        <HomeAbout />
        <HomeSkills />
        <HomeExperience />
        <HomePersonal />
        <HomeWork />
        <HomeContact />
      </div>
    </div>
  )
}

export default HomePage
