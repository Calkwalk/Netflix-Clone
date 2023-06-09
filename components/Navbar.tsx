import React, { useCallback, useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';

import NavbarItem from './NavbarItem';
import MobileMenu from './MobileMenu';
import AccountMenu from './AccountMenu';

import { BsChevronDown, BsSearch, BsBell } from 'react-icons/bs';

const TOP_OFFSET = 66;

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showBackground, setShowBackground] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if(window.scrollY >= TOP_OFFSET) {
        setShowBackground(true);
      } else {
        setShowBackground(false);
      }
    }
    
    window.addEventListener('scroll', handleScroll);

    return() =>{
      window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const toggleMobileMenu = useCallback(() =>{
    setShowMobileMenu(current => !current);
  }, []);

  const toggleAccountMenu = useCallback(() =>{
    setShowAccountMenu(current => !current);
  }, []);
  
  return (
    <>
    <Head>
        <title>Netflix Clone</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    <nav className='w-full flex flex-row justify-start items-center fixed z-40'>

      {/* container */}
      <div className={`px-4 md:px-16 py-6 
        w-full flex flex-row items-center transition duration-500
        ${ showBackground  ? 'bg-zinc-900 bg-opacity-90' : '' }`
      }>
        
        {/* Logo */}
        <Image className='h-4 lg:h-7' src='/images/logo.png' alt='Logo' />
      

        {/* Nav items for lg screen */}
        <div className='flex-row ml-8 gap-7 hidden lg:flex'>
          <NavbarItem label='Home' />
          <NavbarItem label='Series' />
          <NavbarItem label='films' />
          <NavbarItem label='New & Popular' />
          <NavbarItem label='My List' />
          <NavbarItem label='Browse by Language' />
        </div>

        {/* Mobile menu */}
        <div onClick={toggleMobileMenu} className='lg:hidden flex flex-row select-none items-center gap-2 ml-8 cursor-pointer relative'>
          <p className='text-white text-sm '>Browse</p>
          <BsChevronDown className={`text-white transition ${showMobileMenu ? 'rotate-180' : 'rotate-0'}`} />
          <MobileMenu visible={showMobileMenu} />
        </div>

        {/* Profile */}
        <div className='flex flex-row gap-7 items-center ml-auto'>
          <div className='text-gray-200 hover:text-gray-300 cursor-pointer'>
            <BsSearch />
          </div>
          <div className='text-gray-200 hover:text-gray-300 cursor-pointer'>
            <BsBell />
          </div>

          <div onClick={toggleAccountMenu} className='flex flex-row items-center gap-2 cursor-pointer realtive'>
            <div className='w-6 h-6 lg:w-10 lg:h-10 rounded-full overflow-hidden'>
              <Image src='/images/default-blue.png' alt='Profile' />
            </div>
            <BsChevronDown className={`text-white transition ${showAccountMenu ? 'rotate-180' : 'rotate-0'}`} />
            <AccountMenu visible={showAccountMenu} />
          </div>

        </div>
      </div>
    </nav>
    </>
    
  )
}

export default Navbar