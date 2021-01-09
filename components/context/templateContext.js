import React, { useContext, useState, useMemo } from 'react'
import PropTypes from 'prop-types'

const emptyState = {
  name: 'This is fine meme template',
  created_at: '1609268374',
  type: 'EXTERNAL',
  img: 'STORAGE_PATH_TO_IMG',
  url:
    'https://firebasestorage.googleapis.com/v0/b/online-multimedia.appspot.com/o/templates%2Fv3ZLEFAnGCJr1PMsdaPO?alt=media&token=d53c3291-070a-4064-a9d5-6e17d0f75e93',
  width: 1024,
  height: 768,
}

const TemplateContext = React.createContext({})

export function TemplateProvider({ children }) {
  const [templateContext, setTemplateContext] = useState(emptyState)
  const value = useMemo(() => [templateContext, setTemplateContext], [templateContext])
  return <TemplateContext.Provider value={value}>{children}</TemplateContext.Provider>
}

TemplateProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export function useTemplate() {
  const context = useContext(TemplateContext)
  if (!context) {
    throw new Error(`useTemplate must be used within a TemplateProvider`)
  }
  return context
}
