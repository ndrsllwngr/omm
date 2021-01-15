import React, { useEffect } from 'react'
import useStorage from '@/components/hooks/useStorage'
import { motion } from 'framer-motion'
import PropTypes from 'prop-types'

export const MemeProgress = ({ otherFile, setOtherFile }) => {
  const { progress, url, setFile } = useStorage()

  useEffect(() => {
    setFile(otherFile)
  }, [otherFile, setFile])

  useEffect(() => {
    if (url) {
      setOtherFile(null)
    }
  }, [setOtherFile, url])

  return (
    <div className="h-5 w-48 bg-purple-400 ">
      <motion.div initial={{ width: 0 }} animate={{ width: progress }} />
    </div>
  )
}

MemeProgress.propTypes = {
  otherFile: PropTypes.any,
  setOtherFile: PropTypes.func,
}
