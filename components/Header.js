import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { BiSearchAlt2 } from "react-icons/bi";
import { AiFillHome } from "react-icons/ai";
import { BsFillPeopleFill } from "react-icons/bs";
import { MdBusinessCenter, MdMessage, MdAccountCircle, MdApps, MdNotifications } from "react-icons/md";
import HeaderLink from './HeaderLink';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';

const spring = {
    type: 'spring',
    stiffness: 700,
    damping: 30
}

export default function Header() {
    const [mounted, setMounted] = useState(false);
    const { theme, resolvedTheme, setTheme } = useTheme();
    // resolvedTheme: currentTheme [quick trick]

    // After mounting, we have access to the theme
    useEffect(() => {
        setMounted(true);
    }, []);

    console.log(theme)

    return (
        <header className='sticky top-0 z-40 bg-white dark:bg-[#1D2226] flex items-center justify-around py-1.5 px-3 focus-within:shadow-lg'>
            {/* left section */}
            <div className='flex items-center space-x-2 w-full max-w-xs'>
                {
                    mounted && (
                        <>
                            {
                                resolvedTheme === 'dark' ? (
                                    <Image src={'https://i.ibb.co/JBNCywR/linkedin-white.png'} priority width={45} height={45} />
                                ) : (
                                    <Image src={'https://i.ibb.co/M6sFx4t/linkedin-blue.png'} priority width={55} height={45} />
                                )
                            }
                        </>
                    )
                }
                <div className='flex items-center space-x-1 dark:md:bg-gray-700 py-2.5 px-4 rounded w-full'>
                    <BiSearchAlt2 size={25} />
                    <input type={"text"} placeholder="Search" className='hidden md:inline-flex bg-transparent text-sm focus:outline-none placeholder-black/70 dark:placeholder-white/75 flex-grow' />
                </div>
            </div>

            {/* right section */}
            <div className='flex items-center space-x-6'>
                <HeaderLink icon={<AiFillHome size={25} />} text='Home' feed active></HeaderLink>
                <HeaderLink icon={<BsFillPeopleFill size={25} />} text="My Network" feed></HeaderLink>
                <HeaderLink icon={<MdBusinessCenter size={25} />} text="Jobs" feed hidden></HeaderLink>
                <HeaderLink icon={<MdMessage size={25} />} text="Messaging" feed></HeaderLink>
                <HeaderLink icon={<MdNotifications size={25} />} text="Notifications" feed></HeaderLink>
                <HeaderLink icon={<MdAccountCircle size={25} />} text="Me" feed avatar hidden></HeaderLink>
                <HeaderLink icon={<MdApps size={25} />} text="Work" feed hidden></HeaderLink>
                {/* dark more toggle */}
                {
                    mounted && (
                        <div className={`bg-gray-600 flex items-center px-0.5 rounded-full h-6 w-12 cursor-pointer flex-shrink-0 relative ${resolvedTheme === 'dark' ? 'justify-end' : 'justify-start'}`}
                            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}>
                            <span className="absolute left-0">🌜</span>
                            {/* framer motion div */}
                            <motion.div className='w-5 h-5 bg-white rounded-full z-40' layout transition={spring} />
                            <span className="absolute right-0.5">🌞</span>
                        </div>
                    )
                }

            </div>
        </header>
    )
}
