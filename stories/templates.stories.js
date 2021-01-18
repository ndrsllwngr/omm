import React from 'react'
import { TemplateCollection } from '@/components/templates/TemplateCollection'
import { ScreenshotUrl } from '@/components/templates/ScreenshotUrl'
import { Canvas } from '@/components/templates/Canvas'
import { UploadImage } from '@/components/templates/UploadImage'
import { PasteUrlImage } from '@/components/templates/PasteUrlImage'
import { WebcamPhoto } from '@/components/templates/WebcamPhoto'
import { ImgFlipCollection } from '@/components/templates/ImgFlipCollection'

export default { title: 'Templates' }

export const templateCollection = () => <TemplateCollection />

export const imgFlipCollection = () => <ImgFlipCollection />

export const screenshotUrl = () => <ScreenshotUrl />

export const drawingCanvas = () => <Canvas />

export const uploadImage = () => <UploadImage />

export const pasteUrlImage = () => <PasteUrlImage />

export const webcamPhoto = () => <WebcamPhoto />
