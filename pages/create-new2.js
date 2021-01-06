import React from 'react'
import { HtmlHead } from '@/components/HtmlHead'
import { Navbar } from '@/components/Navbar'
import { FabricContextProvider } from '@/components/context/fabricContext'
import { FabricToolbar } from '@/components/meme/FabricToolbar'
import { FabricCanvas } from '@/components/meme/FabricCanvas'

const CreateNew2Page = () => {
  return (
    <>
      <HtmlHead />
      <Navbar />
      <FabricContextProvider>
        <div style={{ display: 'flex', alignItems: 'stretch' }}>
          <div style={{ width: '100px', background: 'gray', padding: '20px 20px 0 20px' }}>
            <FabricToolbar />
          </div>
          <div style={{ flex: '1' }}>
            <FabricCanvas />
          </div>
        </div>
      </FabricContextProvider>
    </>
  )
}

export default CreateNew2Page
