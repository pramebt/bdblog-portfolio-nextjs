import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Navbar from './navbar'
import Image from 'next/image'

const HeaderMain = ({ user }) => {
  return (
    <header className='fixed top-0 inset-x-0 z-40 bg-background/80 backdrop-blur-md border-b border-border shadow-sm'>
      <div className='max-w-7xl mx-auto px-3 sm:px-4 xl:px-0 flex items-center justify-between h-14 sm:h-16'>
        {/* Logo */}
        <Button variant="ghost" size="sm" asChild className="p-0 h-auto hover:bg-transparent">
          <Link href="/" className='flex items-center gap-2 text-foreground'>
            
            <Image src="/images/common/terminal-box-fill.svg" alt="BD Blog" width={20} height={20} />
            <h2 className='text-md sm:text-md md:text-lg  font-bold'>BD Blog</h2>
          </Link>
        </Button>

        {/* Menu */}
        
        <Navbar user={user} />
      </div>
    </header>
  )
}

export default HeaderMain