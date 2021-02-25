import React from 'react'
import { HtmlHead } from '@/components/HtmlHead'
import { Navbar } from '@/components/Navbar'
import { UploadImage } from '@/components/template-generator/UploadImage'
import { WebcamPhoto } from '@/components/template-generator/WebcamPhoto'
import { ScreenshotUrl } from '@/components/template-generator/ScreenshotUrl'
import { PasteUrlImage } from '@/components/template-generator/PasteUrlImage'
import { Canvas } from '@/components/template-generator/Canvas'
import { ProtectedRoute } from '@/components/context/authContext'
import { TemplateDetails } from '@/components/TemplateDetails'
import { SpeechToText } from '@/components/SpeechToText'
import { TextToSpeech } from '@/components/TextToSpeech'

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
        <UploadImage />
        <WebcamPhoto />
        <ScreenshotUrl />
        <PasteUrlImage />
        <Canvas />
        <Section title={'GetTemplateDetails'}>
          <TemplateDetails templateID="601c28dd66e382182031253d" />
        </Section>
        <Section title={'SpeechToText'}>
          <SpeechToText />
        </Section>
        <Section title={'TextToSpeech'}>
          <TextToSpeech />
        </Section>
      </ProtectedRoute>
    </>
  )
}

export default TemplatePage
