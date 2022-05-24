import React, { useState } from 'react'
import Image from 'next/image'
import { MdOutlineClose, MdOutlineMoreHoriz, MdDelete, MdOutlineInsertComment } from "react-icons/md"
import { BiLike } from "react-icons/bi"
import { modalState, modalTypeState } from '../atoms/modalAtom'
import { useRecoilState } from 'recoil';
import { getPostState, handlePostState } from '../atoms/postAtom';
import { useSession } from 'next-auth/react'
import TimeAgo from 'timeago-react'

export default function Post({ post, modalPost }) {
   const { data: session } = useSession()
   const [modalOpen, setModalOpen] = useRecoilState(modalState);
   const [modalType, setModalType] = useRecoilState(modalTypeState);
   const [postState, setPostState] = useRecoilState(getPostState);
   const [showInput, setShowInput] = useState(false)
   const [liked, setLiked] = useState(false)
   const [handlePost, setHandlePost] = useRecoilState(handlePostState)

   // truncate function
   const truncate = (string, n) =>
      string?.length > n ? string.substr(0, n - 1) + '...see more' : string;

   // function to open full post
   const handleOpenPost = () => {
      setModalOpen(true);
      setModalType('gifYouUp');
      setPostState(post);
   }

   const deletePost = async () => {
      const response = await fetch(`/api/posts/${post._id}`, {
         method: 'DELETE',
         headers: { 'Content-Type': 'application/json' },
      });
      setHandlePost(true);
      setModalOpen(false);
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
               <TimeAgo datetime={post?.createdAt} className='text-xs dark:text-white/75 opacity-80'></TimeAgo>
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
         <div className='flex justify-evenly items-center dark:border-t border-gray-600/80 mx-2.5 pt-2 text-black/60 dark:text-white/75'>
            {
               modalPost ? (
                  <button className='postButton'><MdOutlineInsertComment size={25} /><h4>Comment</h4></button>
               ) : (
                  <button className={`postButton ${liked && 'text-blue-500'}`} onClick={() => setLiked(!liked)}>
                     {
                        liked ? (
                           <BiLike size={25} className='-scale-x-100' />
                        ) : (
                           <BiLike size={25} className='-scale-x-100' />
                        )
                     }
                     <h4>Like</h4>
                  </button>
               )
            }
            {
               session?.user?.email === post.email ? (
                  <button className='postButton focus:text-red-400' onClick={deletePost}>
                     <MdDelete size={25} />
                     <h4>Delete post</h4>
                  </button>
               ) : (
                  <button className='postButton'>
                     <h4>Share</h4>
                  </button>
               )
            }
         </div>
      </div>
   )
}
