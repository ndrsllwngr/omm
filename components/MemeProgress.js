import React from 'react'
import { motion } from 'framer-motion'
import PropTypes from 'prop-types'

export const MemeProgress = ({ progress }) => {
  return (
    <div className="h-5 w-48 bg-purple-400 ">
      <motion.div initial={{ width: 0 }} animate={{ width: progress }} />
    </div>
  )
}

MemeProgress.propTypes = {
  progress: PropTypes.any,
}
