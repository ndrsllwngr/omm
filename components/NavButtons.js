import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/components/context/authContext'
import { IoCreate, IoLogIn, IoLogOut, IoPerson } from 'react-icons/io5'

// eslint-disable-next-line react/prop-types
export const NavButtons = ({ className }) => {
  const auth = useAuth()
  const [mounted, setMounted] = useState(false)
  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <div className={className}>
      {auth && auth.user ? (
        <div className="flex">
          <Link href={'/template'}>
            <a className="block font-semibold lg:mt-0 rounded-lg hover:shadow-md text-md px-4 ml-2 py-2 text-custom-green hover:text-black hover:bg-custom-green">
              Template
            </a>
          </Link>
          <Link href={'/create'}>
            <a className="inline-flex self-center block font-semibold lg:mt-0 rounded-lg hover:shadow-md text-md px-4 ml-2 py-2 text-custom-green hover:text-black hover:bg-custom-green">
              <IoCreate size={18} className={'fill-current inline-flex self-center mr-2'} /> Meme
            </a>
          </Link>
          <Link href={'/profile'}>
            <a className="inline-flex self-center block font-semibold lg:mt-0 rounded-lg hover:shadow-md text-md px-4 ml-2 py-2 text-gray-400 hover:text-custom-green hover:bg-gray-600">
              <IoPerson size={18} className={'fill-current inline-flex self-center mr-2'} /> Profile
            </a>
          </Link>
        </div>
      ) : (
        <div className={'flex'}>
          <Link href={'/login'}>
            <a className="block font-semibold lg:mt-0 rounded-lg text-md px-4 ml-2 py-2 text-white hover:text-custom-green">
              <IoLogIn size={18} className={'fill-current inline-flex self-center mr-2'} /> Log in
            </a>
          </Link>
          <Link href={'/signup'}>
            <a className="block font-semibold lg:mt-0 rounded-lg shadow-md text-md px-4 ml-2 py-2 text-white hover:text-custom-green bg-gray-700 hover:bg-gray-600">
              Sign up
            </a>
          </Link>
        </div>
      )}
    </div>
  )
}
