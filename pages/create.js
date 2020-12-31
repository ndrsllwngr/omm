import React, { useState } from 'react'
import { HtmlHead } from '@/components/HtmlHead'
import { MemeKanvas } from '@/components/MemeKanvas'
import { Navbar } from '@/components/Navbar'

const CreatePage = () => {
  const [test, setTest] = useState()
  return (
    <>
      <HtmlHead />
      <Navbar />
      <MemeKanvas />
    </>
  )
}

export default CreatePage
