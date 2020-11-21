import React, { useContext, useState, useMemo } from 'react'
import PropTypes from 'prop-types'

const emptyState = {
  topCaption: 'This is fine.',
  bottomCaption: ':)',
  url: '/assets/matt-nelson-aI3EBLvcyu4-unsplash.jpg',
  memeRef: React.createRef(),
}

const MemeContext = React.createContext()

export function MemeProvider({ children }) {
  const [memeContext, setMemeContext] = useState(emptyState)
  const value = useMemo(() => [memeContext, setMemeContext], [memeContext])
  return <MemeContext.Provider value={value}>{children}</MemeContext.Provider>
}

MemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export function useMeme() {
  const context = useContext(MemeContext)
  if (!context) {
    throw new Error(`useMeme must be used within a MemeProvider`)
  }
  return context
}
