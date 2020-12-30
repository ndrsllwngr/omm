import React from 'react'
import PropTypes from 'prop-types'
import { Image } from 'react-konva'
import useImage from 'use-image'

export const MemeTemplate = ({ templateUrl }) => {
  const [templateImage] = useImage(templateUrl, 'Anonymous')
  return (
    <>
      <Image image={templateImage} />
    </>
  )
}

MemeTemplate.propTypes = {
  templateUrl: PropTypes.string,
}

export const MemeTemplateViewOnly = ({ templateUrl }) => {
  const [templateImage] = useImage(templateUrl, 'Anonymous')
  return (
    <>
      <Image image={templateImage} />
    </>
  )
}

MemeTemplateViewOnly.propTypes = {
  templateUrl: PropTypes.string,
}
