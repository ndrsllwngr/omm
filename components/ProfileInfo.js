import React from 'react'
import { useAuth } from '@/components/context/authContext'
import { IoLogOut } from 'react-icons/io5'
import { ThemeToggle } from '@/components/ThemeToggle'
import { SecondaryBtn } from '@/components/ui/Buttons'

export const ProfileInfo = () => {
  const auth = useAuth()
  return (
    <div className={'flex justify-between justify-center items-center'}>
      <p className={'text-md dark:text-white text-black'}>
        {auth.user.name} ({auth.user.email})
      </p>
      <div className={'flex'}>
        <ThemeToggle className="inline-flex self-center mr-4 rounded-lg shadow-md hover:text-custom-green text-black dark:text-white" />
        <SecondaryBtn onClick={auth.signOut}>
          <IoLogOut size={18} className="fill-current inline-flex self-center mr-2" /> Log out
        </SecondaryBtn>
      </div>
    </div>
  )
}
