import React from 'react'
import { HtmlHead } from '@/components/HtmlHead'
import { Navbar } from '@/components/Navbar'
import { UploadImage } from '@/components/templates/UploadImage'
import { WebcamPhoto } from '@/components/templates/WebcamPhoto'
import { ScreenshotUrl } from '@/components/templates/ScreenshotUrl'
import { PasteUrlImage } from '@/components/templates/PasteUrlImage'
import { Canvas } from '@/components/templates/Canvas'
import { ProtectedRoute } from '@/components/context/authContext'
import PropTypes from 'prop-types'

const Section = ({ children, title }) => {
  return (
    <div className={'bg-white rounded-lg m-2 p-2 flex flex-col'}>
      <p className="my-2 font-bold">{title}</p>
      {children}
    </div>
  )
}

Section.propTypes = {
  children: PropTypes.any,
  title: PropTypes.string,
}

const TemplatePage = () => {
  return (
    <>
      <ProtectedRoute>
        <HtmlHead title={'Create a New Template'} />
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
