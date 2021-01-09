import React from 'react'
import { HtmlHead } from '@/components/HtmlHead'
import { Navbar } from '@/components/Navbar'
import { FabricToolbar } from '@/components/meme/FabricToolbar'
import { FabricCanvas } from '@/components/meme/FabricCanvas'

const Create2Page = () => {
  return (
    <>
      <HtmlHead />
      <Navbar />
      <div style={{ display: 'flex', alignItems: 'stretch' }}>
        <div style={{ width: '100px', background: 'gray', padding: '20px 20px 0 20px' }}>
          <FabricToolbar />
        </div>
        <div style={{ flex: '1' }}>
          <FabricCanvas />
        </div>
      </div>
    </>
  )
}

export default Create2Page
