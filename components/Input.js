import { useSession } from 'next-auth/react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { MdInsertPhoto, MdVideoCameraBack, MdBusinessCenter, MdArticle } from "react-icons/md"
import React from 'react'
import { useRecoilState } from 'recoil'
import { modalState, modalTypeState } from '../atoms/modalAtom'

export default function Input() {
    const { data: session } = useSession();
    const [modalOpen, setModalOpen] = useRecoilState(modalState);
    const [modalType, setModalType] = useRecoilState(modalTypeState);

    return (
        <div className='bg-white dark:bg-[#1D2226] rounded-lg p-3 space-y-3 border border-gray-300 dark:border-none'>
            <div className='flex items-center space-x-2'>
                {/* avatar */}
                <div className='w-12 h-10 relative overflow-hidden border-1 cursor-pointer rounded-full'>
                    <Image
                        src={session?.user?.image}
                        alt="sidebar placeholder icon" layout='fill'
                    />
                </div>
                <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: .99 }}
                    className='rounded-full border border-gray-400 py-2.5 px-3 opacity-80 hover:opacity-100 font-medium w-full text-left'
                    onClick={() => {
                        setModalOpen(true);
                        setModalType('dropIn')
                    }}
                >
                    Start a post...
                </motion.button>
            </div>
            <div className='flex items-center justify-center flex-wrap gap-4 md:gap-x-10'>
                <button className="inputButton group">
                    <MdInsertPhoto className="text-blue-400" size={25} />
                    <h4 className="opacity-80 group-hover:opacity-100">Photo</h4>
                </button>
                <button className="inputButton group">
                    <MdVideoCameraBack className="text-green-400" size={25} />
                    <h4 className="opacity-80 group-hover:opacity-100">Video</h4>
                </button>
                <button className="inputButton group ">
                    <MdBusinessCenter className="text-blue-300" size={25} />
                    <h4 className="opacity-80 group-hover:opacity-100">Job</h4>
                </button>
                <button className="inputButton group">
                    <MdArticle className="text-red-400" size={25} />
                    <h4 className="opacity-80 group-hover:opacity-100 whitespace-nowrap">
                        Write Article
                    </h4>
                </button>
            </div>
        </div>
    )
}
