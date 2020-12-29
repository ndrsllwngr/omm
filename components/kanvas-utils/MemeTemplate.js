import React from 'react'
import PropTypes from 'prop-types'
import { Image } from 'react-konva'
import useImage from 'use-image'

export const MemeTemplate = ({ templateUrl }) => {
  const [templateImage] = useImage(templateUrl, 'Anonymous')
  return (
    <>
      <Image image={templateImage}></Image>
    </>
  )
}

MemeTemplate.propTypes = {
  templateUrl: PropTypes.string,
}
