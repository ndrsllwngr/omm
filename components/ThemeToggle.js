import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useTheme } from 'next-themes'
import { IoContrastOutline, IoMoon, IoSunny } from 'react-icons/io5'

export const ThemeToggle = ({ className }) => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <div className={className}>
      {theme !== undefined && theme === 'dark' ? (
        <button onClick={(e) => setTheme('light')}>
          <IoSunny size={18} className={'fill-current'} />
        </button>
      ) : theme === 'light' ? (
        <button onClick={(e) => setTheme('dark')}>
          <IoMoon size={18} className={'fill-current'} />
        </button>
      ) : (
        <button onClick={(e) => setTheme('dark')}>
          <IoContrastOutline size={18} className={'fill-current'} />
        </button>
      )}
    </div>
  )
}

ThemeToggle.propTypes = {
  className: PropTypes.string,
}
