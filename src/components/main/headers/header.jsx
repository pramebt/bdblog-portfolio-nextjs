import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Navbar from './navbar'
import Image from 'next/image'

const HeaderMain = ({ user }) => {
  return (
    <header className='fixed mt-10 top-0 inset-x-0 z-40 '>
      <div className="flex items-center justify-center">
      <Navbar user={user} />
      </div>
    </header>
  )
}

export default HeaderMain