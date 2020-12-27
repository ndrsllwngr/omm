import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { HtmlHead } from '@/components/HtmlHead'
import { NewMemeEditor } from '@/components/NewMemeEditor'

const EditPage = () => {
  return (
    <>
      <HtmlHead />
      <NewMemeEditor></NewMemeEditor>
    </>
  )
}

export default EditPage
