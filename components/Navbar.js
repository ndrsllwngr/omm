import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/components/context/authContext'
import { IoCreate, IoLogIn, IoPerson } from 'react-icons/io5'
import PropTypes from 'prop-types'
import { PrimaryBtn, TertiaryBtn } from '@/components/ui/Buttons'

//https://tailwindcomponents.com/component/responsive-navbar-2
export const Navbar = () => {
  return (
    <nav className="flex items-center bg-custom-gray shadow-lg">
      <div className={'max-w-7xl w-full mx-auto flex justify-between items-center flex-wrap py-4'}>
        <div className="flex lg:w-auto justify-between w-full lg:border-b-0 pl-6 pr-2 border-solid border-b-2 border-gray-300 pb-5 lg:pb-0">
          {/* Logo */}
          <Link
            href={'/'}
            className="flex cursor-pointer items-center flex-shrink-0 text-gray-800 mr-16 h-2"
          >
            <a>
              <img className={'h-10'} src={`/assets/logo/itsfine.svg`} alt={'Its fine'} />
            </a>
          </Link>
          {/* ToggleButton */}
          <div className="block lg:hidden ">
            <button
              id="nav"
              className="flex items-center px-3 py-2 border-2 rounded text-white border-custom-green hover:text-white hover:border-custom-green"
            >
              <svg
                className="fill-current h-3 w-3"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Menu</title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
              </svg>
            </button>
          </div>
          {/* Searchbox */}
          <div className="text-white hidden ml-14 lg:flex lg:min-w-80 self-center">
            <input
              className="border-b-2 border-white text-white bg-transparent h-10 py-2 px-4 text-md focus:outline-none"
              type="search"
              name="search"
              placeholder="Search"
            />
            <button type="submit" className="absolute right-0 top-0 mt-3 mr-2" />
          </div>
        </div>

        <div className="w-full lg:flex lg:items-center lg:w-auto px-8 lg:px-0">
          <NavButtons className={'flex'} />
        </div>
      </div>
    </nav>
  )
}

const NavButtons = ({ className }) => {
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
            <TertiaryBtn mono={true}>Template</TertiaryBtn>
          </Link>
          <Link href={'/create'}>
            <PrimaryBtn>
              <IoCreate size={18} className={'fill-current inline-flex self-center mr-2'} /> Meme
            </PrimaryBtn>
          </Link>
          <Link href={'/profile'}>
            <TertiaryBtn mono={true}>
              <IoPerson size={18} className={'fill-current inline-flex self-center mr-2'} /> Profile
            </TertiaryBtn>
          </Link>
        </div>
      ) : (
        <div className={'flex'}>
          <Link href={'/login'}>
            <TertiaryBtn mono={true}>
              <IoLogIn size={18} className={'fill-current inline-flex self-center mr-2'} /> Log in
            </TertiaryBtn>
          </Link>
          <Link href={'/signup'}>
            <PrimaryBtn>Sign up</PrimaryBtn>
          </Link>
        </div>
      )}
    </div>
  )
}

NavButtons.propTypes = {
  className: PropTypes.string,
}
