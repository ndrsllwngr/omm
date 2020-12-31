import React from 'react'
import { HtmlHead } from '@/components/HtmlHead'
import { MemeKanvas } from '@/components/MemeKanvas'
import { Navbar } from '@/components/Navbar'

const CreatePage = () => {
  return (
    <>
      <HtmlHead />
      <Navbar />
      <MemeKanvas />
    </>
  )
}

export default CreatePage
