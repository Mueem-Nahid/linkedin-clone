import { useSession } from 'next-auth/react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import React from 'react'

export default function Input() {
    const { data: session } = useSession();
    return (
        <div className='bg-white dark:bg-[#1D2226] rounded-lg p-3 space-y-3 border border-gray-300 dark:border-none'>
            <div className='flex items-center space-x-2'>
                {/* avatar */}
                <div className='w-14 h-10 relative overflow-hidden border-1 cursor-pointer rounded-full'>
                    <Image
                        src={session?.user?.image}
                        alt="sidebar placeholder icon" layout='fill'
                    />
                </div>
                <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: .99 }}
                    className='rounded-full border border-gray-400 py-2.5 px-3 opacity-80 hover:opacity-100 font-medium w-full text-left'
                // onClick={() => {
                //     setModalOpen(true);
                //     setModalType('dropIn')
                // }}
                >
                    Start a post...
                </motion.button>
            </div>
        </div>
    )
}
