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
      <div className="p-8 grid grid-cols-12 gap-6">
        <div className="col-span-9 h-full rounded-lg bg-gray-100 flex items-start justify-center space-x-2 pl-2">
          <MemeEditor />
        </div>
        <div className="col-span-3 h-full rounded-lg bg-gray-100 flex items-start justify-center flex space-x-2 pl-2">
          <ImageSelection />
        </div>
      </div>
    </>
  )
}

export default CreatePage
