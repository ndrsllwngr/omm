import React from 'react'
import { TemplateCollection } from '@/components/template/TemplateCollection'
import { ScreenshotUrl } from '@/components/template/ScreenshotUrl'
import { Canvas } from '@/components/template/Canvas'
import { UploadImage } from '@/components/template/UploadImage'
import { PasteUrlImage } from '@/components/template/PasteUrlImage'
import { WebcamPhoto } from '@/components/template/WebcamPhoto'
import { ImgFlipCollection } from '@/components/template/ImgFlipCollection'

export default { title: 'Templates' }

export const templateCollection = () => <TemplateCollection />

export const imgFlipCollection = () => <ImgFlipCollection />

export const screenshotUrl = () => <ScreenshotUrl />

export const drawingCanvas = () => <Canvas />

export const uploadImage = () => <UploadImage />

export const pasteUrlImage = () => <PasteUrlImage />

export const webcamPhoto = () => <WebcamPhoto />
