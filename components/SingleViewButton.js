import React from 'react'

export const SingleViewButton = ({ className, name }) => {
  return <button className={className}>{name}</button>
}

SingleViewButton.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
}
