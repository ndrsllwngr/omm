import React from 'react'
import { HtmlHead } from '@/components/HtmlHead'
import { Navbar } from '@/components/Navbar'
import { MemeEditor } from '@/components/meme/MemeEditor'
import { ImageSelection } from '@/components/ImageSelection'

const CreatePage = () => {
  return (
    <>
      <HtmlHead />
      <Navbar />
      <ImageSelection />
      <MemeEditor />
    </>
  )
}

export default CreatePage
