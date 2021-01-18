import React from 'react'
import { TemplateCollection } from '@/components/template-generator/TemplateCollection'
import { ScreenshotUrl } from '@/components/template-generator/ScreenshotUrl'
import { Canvas } from '@/components/template-generator/Canvas'
import { UploadImage } from '@/components/template-generator/UploadImage'
import { PasteUrlImage } from '@/components/template-generator/PasteUrlImage'
import { WebcamPhoto } from '@/components/template-generator/WebcamPhoto'
import { ImgFlipCollection } from '@/components/template-generator/ImgFlipCollection'

export default { title: 'Templates' }

export const templateCollection = () => <TemplateCollection />

export const imgFlipCollection = () => <ImgFlipCollection />

export const screenshotUrl = () => <ScreenshotUrl />

export const drawingCanvas = () => <Canvas />

export const uploadImage = () => <UploadImage />

export const pasteUrlImage = () => <PasteUrlImage />

export const webcamPhoto = () => <WebcamPhoto />
