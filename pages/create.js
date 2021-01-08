import React from 'react'
import { HtmlHead } from '@/components/HtmlHead'
import { Navbar } from '@/components/Navbar'
import { MemeEditor } from '@/components/meme/MemeEditor'

const CreateNewPage = () => {
  return (
    <>
      <HtmlHead />
      <Navbar />
      <MemeEditor />
    </>
  )
}

export default CreateNewPage
