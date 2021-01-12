import React, { useContext, useState, useMemo } from 'react'
import PropTypes from 'prop-types'

// TODO verify that this is everything we need
const emptyState = {
  id: '',
  url:
    'https://firebasestorage.googleapis.com/v0/b/online-multimedia.appspot.com/o/templates%2Fv3ZLEFAnGCJr1PMsdaPO?alt=media&token=d53c3291-070a-4064-a9d5-6e17d0f75e93',
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
