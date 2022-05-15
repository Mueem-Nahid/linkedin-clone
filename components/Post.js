import React, { useState } from 'react'
import Image from 'next/image'
import { MdOutlineClose, MdOutlineMoreHoriz } from "react-icons/md"
import { modalState, modalTypeState } from '../atoms/modalAtom'
import { useRecoilState } from 'recoil';
import { getPostState } from '../atoms/postAtom';

export default function Post({ post, modalPost }) {
   console.log('modal post:', modalPost)
   const [modalOpen, setModalOpen] = useRecoilState(modalState);
   const [modalType, setModalType] = useRecoilState(modalTypeState);
   const [postState, setPostState] = useRecoilState(getPostState);
   const [showInput, setShowInput] = useState(false)

   // truncate function
   const truncate = (string, n) =>
      string?.length > n ? string.substr(0, n - 1) + '...see more' : string;

   // function to open full post
   const handleOpenPost = () => {
      setModalOpen(true);
      setModalType('gifYouUp');
      setPostState(post);
   }

   return (
      <div className={`bg-white dark:bg-[#1D2226] ${modalPost ? 'rounded-r-lg' : 'rounded-lg'} space-y-2 py-2.5 border border-gray-300 dark:border-none`}>
         <div className='flex items-center px-2.5 cursor-pointer'>
            {/* avatar */}
            <div className='w-10 h-10 border-2 overflow-hidden relative cursor-pointer rounded-full'>
               <Image
                  src={post?.userImg}
                  alt="sidebar placeholder icon" layout='fill'
               />
            </div>
            <div className='mr-auto ml-2 leading-none'>
               <h6 className='font-medium hover:text-blue-500 hover:underline'>{post?.username}</h6>
               <p className='text-sm dark:text-white/75 opacity-80'>{post?.email}</p>
               {/* timeago  stamp */}
            </div>
            {
               modalPost ? (
                  <button onClick={() => setModalOpen(false)}>
                     <MdOutlineClose className="h-7 w-7 dark:text-white/75" />
                  </button>
               ) : (
                  <button>
                     <MdOutlineMoreHoriz className="h-7 w-7 dark:text-white/75" />
                  </button>
               )
            }
         </div>
         <div className=''>
            {
               post?.input && (
                  <div className={`px-2.5 break-all md:break-normal`}>
                     {modalPost || showInput ? (
                        <p onClick={() => setShowInput(false)}>{post?.input}</p>
                     ) : (
                        <p onClick={() => setShowInput(true)}>{truncate(post?.input, 150)}</p>
                     )}
                  </div>
               )
            }
            {
               post?.photoUrl && !modalPost && (
                  <img src={post.photoUrl} alt="post image" onClick={handleOpenPost} className='w-full cursor-pointer' />
                  // <div className='w-full h-96 cursor-pointer relative'>
                  //    <Image src={post?.photoUrl}
                  //       alt="post image" layout='fill' />
                  // </div>
               )
            }
         </div>
      </div>
   )
}
