import React from 'react'
import { useAuth } from '@/components/context/authContext'
import { IoLogOut } from 'react-icons/io5'
import { ThemeToggle } from '@/components/ThemeToggle'

export const ProfileInfo = () => {
  const auth = useAuth()
  return (
    <div className={'flex justify-between justify-center items-center'}>
      <p className={'text-md dark:text-white text-black'}>
        {auth.user.id} ({auth.user.profile.email})
      </p>
      <div className={'flex'}>
        <ThemeToggle className="inline-flex self-center mr-4 rounded-lg shadow-md hover:text-custom-green text-black dark:text-white" />
        <button
          onClick={auth.signOut}
          className="inline-flex self-center block font-semibold lg:mt-0 rounded-lg shadow-md text-md px-4 ml-2 py-2 text-white hover:text-custom-green bg-gray-700 hover:bg-gray-600"
        >
          <IoLogOut size={18} className="fill-current inline-flex self-center mr-2" /> Log out
        </button>
      </div>
    </div>
  )
}
