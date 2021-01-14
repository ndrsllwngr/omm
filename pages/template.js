import React from 'react'
import { HtmlHead } from '@/components/HtmlHead'
import { Navbar } from '@/components/Navbar'
import { UploadImage } from '@/components/UploadImage'
import { WebcamPhoto } from '@/components/WebcamPhoto'
import { ScreenshotUrl } from '@/components/ScreenshotUrl'
import { PasteUrlImage } from '@/components/PasteUrlImage'
import { Canvas } from '@/components/drawing/Canvas'
import { ProtectedRoute } from '@/components/context/authContext'
// eslint-disable-next-line react/prop-types
const Section = ({ children, title }) => {
  return (
    <div className={'bg-white rounded-lg m-2 p-2 flex flex-col'}>
      <p className="my-2 font-bold">{title}</p>
      {children}
    </div>
  )
}

const TemplatePage = () => {
  return (
    <>
      <ProtectedRoute>
        <HtmlHead />
        <Navbar />
        <Section title={'UploadImage'}>
          <UploadImage />
        </Section>
        <Section title={'WebcamPhoto'}>
          <WebcamPhoto />
        </Section>
        <Section title={'ScreenshotUrl'}>
          <ScreenshotUrl />
        </Section>
        <Section title={'PasteUrlImage'}>
          <PasteUrlImage />
        </Section>
        <Section title={'DrawonCanvas'}>
          <Canvas />
        </Section>
      </ProtectedRoute>
    </>
  )
}

export default TemplatePage
