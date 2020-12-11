import React from 'react'

export const SingleViewButton = ({ className, name, trigger }) => {
  return (
    <button className={className} onClick={trigger}>
      {name}
    </button>
  )
}

SingleViewButton.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  trigger: PropTypes.function,
}
