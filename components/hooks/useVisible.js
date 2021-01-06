import { useState, useRef, useEffect } from 'react'

// https://www.cluemediator.com/detect-click-outside-a-react-component-using-react-hooks
export const useVisible = ({ initialIsVisible }) => {
  const [isVisible, setIsVisible] = useState(initialIsVisible)
  const ref = useRef(null)

  const handleClickOutside = (event) => {
    if (event.preventDefault) {
      event.preventDefault()
    }
    if (ref.current && !ref.current.contains(event.target)) {
      setIsVisible(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  }, [])

  return { ref, isVisible, setIsVisible }
}
