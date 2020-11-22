import React, { useContext, useState, useMemo } from 'react'
import PropTypes from 'prop-types'

const emptyState = {
  caption_1_text: 'This is fine.',
  caption_1_posX: 0,
  caption_1_posY: 0,
  caption_2_text: ':)',
  caption_2_posX: 0,
  caption_2_posY: 0,
  image_url: '/assets/matt-nelson-aI3EBLvcyu4-unsplash.jpg',
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
