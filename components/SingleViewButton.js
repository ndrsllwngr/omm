import React from 'react'

export const SingleViewButton = ({ className, value }) => {
  return <button className={className}>{value}</button>
}

SingleViewButton.propTypes = {
  className: PropTypes.string,
  value: PropTypes.string,
}
