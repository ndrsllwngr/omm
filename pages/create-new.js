import React from 'react'
import { HtmlHead } from '@/components/HtmlHead'
import { Navbar } from '@/components/Navbar'
import { MemeEditor } from '@/components/meme/MemeEditor'
import { FabricContextProvider } from '@/components/context/fabricContext'

const CreateNewPage = () => {
  return (
    <>
      <HtmlHead />
      <Navbar />
      <FabricContextProvider>
        <MemeEditor />
      </FabricContextProvider>
    </>
  )
}

export default CreateNewPage
