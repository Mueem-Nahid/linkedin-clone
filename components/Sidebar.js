import Image from 'next/image'
import React from 'react'
import { FaBookmark } from "react-icons/fa"

export default function Sidebar() {
    return (
        <div className='space-y-2 min-w-max max-w-lg'>
            {/* top */}
            <div className='bg-white dark:bg-[#1D2226] rounded-lg overflow-hidden relative flex flex-col items-center text-center border border-gray-300 dark:border-none'>
                <div className='relative w-full h-14'>
                    <Image src="https://i.ibb.co/HVkhBwk/Linked-In-Default-Background.webp" layout="fill" priority />
                </div>
                {/* avatar */}
                <div className='w-14 h-14 border-2 overflow-hidden absolute top-4 cursor-pointer rounded-full'>
                    <Image
                        src="https://i.ibb.co/5LN7z9Z/placeholder-icon.png"
                        alt="sidebar placeholder icon" layout='fill'
                    />
                </div>
                <div className='mt-4 py-4 space-x-0.5'>
                    <h4 className='hover:underline decoration-purple-700 underline-offset-1 cursor-pointer'>Mueem</h4>
                    <p className='text-black/60 dark:text-white/75 text-sm'>mueem@gmail.com</p>
                </div>
                <div className='hidden md:inline text-left dark:text-white/75 text-sm'>
                    <div className='font-medium sidebarButton space-y-0.5'>
                        <div className='flex justify-between space-x-2'>
                            <h4>Who viewed your profile</h4>
                            <span className="text-blue-500">321</span>
                        </div>
                        <div className='flex justify-between space-x-2'>
                            <h4>Views of your post</h4>
                            <span className="text-blue-500">1,892</span>
                        </div>
                    </div>
                    <div className="sidebarButton">
                        <h4 className="leading-4 text-xs">
                            Access exclusive tools & insights
                        </h4>
                        <h4 className="dark:text-white font-medium">
                            <span className="w-3 h-3 bg-gradient-to-tr from-yellow-700 to-yellow-200 inline-block rounded-sm mr-1" />{" "}
                            Try Premium for free
                        </h4>
                    </div>

                    <div className="sidebarButton flex items-center space-x-1.5">
                        <FaBookmark className='-ml-0.5' />
                        <h4 className="dark:text-white font-medium">My items</h4>
                    </div>
                </div>
            </div>
            {/* bottom */}
        </div>
    )
}
