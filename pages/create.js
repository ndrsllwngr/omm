import React, { useState } from 'react'
import { HtmlHead } from '@/components/HtmlHead'
import { MemeKanvas } from '@/components/MemeKanvas'

const CreatePage = () => {
  const [test, setTest] = useState()
  return (
    <>
      <HtmlHead />
      <MemeKanvas />
    </>
  )
}

export default CreatePage
