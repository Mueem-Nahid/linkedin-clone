import { useSession, signOut } from 'next-auth/react'
import Image from 'next/image';
import React from 'react'

export default function HeaderLink({ icon, text, avatar, feed, active, hidden }) {
  const { data: session } = useSession();

  return (
    <div className={`${hidden && "hidden md:inline-flex"} cursor-pointer flex flex-col justify-center items-center ${feed ? "text-black/60 hover:text-black dark:text-white/75 dark:hover:text-white lg:-mb-1.5 space-y-1" : "text-gray-500 hover:text-gray-700"} ${active && "text-black dark:text-white"}`}>
      {
        avatar ? <div className='h-7 w-7 lg:-mb-1 overflow-hidden relative cursor-pointer rounded-full' onClick={() => avatar && signOut()}>
          <Image
            src={session?.user?.image}
            alt="user img" layout='fill'
          />
        </div> : <span className='h-7 w-7 lg:-mb-1'>{icon}</span>
      }
      <h4 className={`text-sm ${feed && "hidden lg:flex justify-center w-full mx-auto"}`}>{text}</h4>
      {active && (
        <span className="hidden lg:inline-flex h-0.5 w-[calc(100%+20px)] bg-black dark:bg-white rounded-t-full" />
      )}
    </div>
  )
}
