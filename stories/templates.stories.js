import React from 'react'
import { ScreenshotUrl } from '@/components/template-generator/ScreenshotUrl'
import { DrawOnCanvas } from '@/components/template-generator/DrawOnCanvas'
import { UploadFile } from '@/components/template-generator/UploadFile'
import { PasteUrl } from '@/components/template-generator/PasteUrl'
import { WebcamPhoto } from '@/components/template-generator/WebcamPhoto'
import { noop } from '@/lib/noop'
import { AddTemplate } from '@/components/template-generator/AddTemplate'
import { TemplateDetails } from '@/components/meme-generator/TemplateDetails'
import { TemplateDetailsModal } from '@/components/meme-generator/TemplateDetailsModal'

export default { title: 'Templates' }

export const addTemplateBtn = () => <AddTemplate />

export const screenshotUrl = () => <ScreenshotUrl showDialog={true} closeDialog={noop} />

export const drawingCanvas = () => <DrawOnCanvas showDialog={true} closeDialog={noop} />

export const uploadImage = () => <UploadFile showDialog={true} closeDialog={noop} />

export const pasteUrlImage = () => <PasteUrl showDialog={true} closeDialog={noop} />

export const webcamPhoto = () => <WebcamPhoto showDialog={true} closeDialog={noop} />

export const templateDetails = () => <TemplateDetails templateId="603ae7c75ccaaa412080d586" />

export const templateDetailsModal = () => (
  <TemplateDetailsModal
    showDialog={true}
    closeDialog={noop}
    templateId="603ae7c75ccaaa412080d586"
  />
)
