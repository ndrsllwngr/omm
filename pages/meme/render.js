import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { HtmlHead } from '@/components/HtmlHead'
import { NewMeme } from '@/components/NewMeme'

const RenderPage = () => {
  return (
    <>
      <HtmlHead />
      <NewMeme></NewMeme>
    </>
  )
}

export default RenderPage
