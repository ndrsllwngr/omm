import React from 'react'
import { HtmlHead } from '@/components/HtmlHead'
import { Navbar } from '@/components/Navbar'
import { MemeEditor } from '@/components/meme/MemeEditor'
import { ImageSelection } from '@/components/ImageSelection'
import { ProtectedRoute } from '@/components/context/authContext'
import { FlipImage } from '@/components/FlipImage'

const CreatePage = () => {
  return (
    <>
      <ProtectedRoute>
        <HtmlHead title={'Create a New Meme'} />
        <Navbar />
        <div className="p-8 grid grid-cols-12 gap-6">
          <div className="col-span-9 h-full rounded-lg bg-gray-100 flex items-start justify-center space-x-2 pl-2">
            <MemeEditor />
          </div>
          <div className="col-span-3 h-full rounded-lg bg-gray-100 flex items-start justify-center flex space-x-2 pl-2">
            <ImageSelection />
          </div>
          <div className="col-span-3 h-full rounded-lg bg-gray-100 flex items-start justify-center flex space-x-2 pl-2">
            <FlipImage />
          </div>
        </div>
      </ProtectedRoute>
    </>
  )
}

export default CreatePage
