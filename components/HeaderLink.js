import React from 'react'
import { IconBase } from 'react-icons';
import { MdExplore } from "react-icons/md";

export default function HeaderLink({ icon, text, avatar, feed }) {
  return (
    <div className={`cursor-pointer flex flex-col justify-center items-center ${feed ? "text-black/60 hover:text-black dark:text-white/75 dark:hover:text-white lg:-mb-1.5 space-y-1" : "text-gray-500 hover:text-gray-700"}`}>
      {
        avatar ? <span className='h-7 w-7 lg:-mb-1'>{icon}</span> : <span>{icon}</span>
      }
      <h4 className='text-sm'>{text}</h4>

    </div>
  )
}
