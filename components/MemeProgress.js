import React, { useEffect } from 'react'
import useStorage from '@/lib/useStorage'
import { motion } from 'framer-motion'
import PropTypes from 'prop-types'

export const MemeProgress = ({ file, setFile }) => {
  const { progress, url } = useStorage(file)

  useEffect(() => {
    if (url) {
      setFile(null)
    }
  }, [setFile, url])

  return (
    <div className="h-5 w-48 bg-purple-400 ">
      <motion.div initial={{ width: 0 }} animate={{ width: progress }}></motion.div>
    </div>
  )
}

MemeProgress.propTypes = {
  file: PropTypes.any,
  setFile: PropTypes.func,
}
