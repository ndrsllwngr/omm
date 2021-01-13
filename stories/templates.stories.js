import React from 'react'
import { ImageSelection } from '@/components/ImageSelection'
import { ScreenshotUrl } from '@/components/ScreenshotUrl'
import { Canvas } from '@/components/drawing/Canvas'
import { UploadImage } from '@/components/UploadImage'
import { PasteUrlImage } from '@/components/PasteUrlImage'
import { WebcamPhoto } from '@/components/WebcamPhoto'

export default { title: 'Templates' }

export const templateOverview = () => <ImageSelection />

export const screenshotUrl = () => <ScreenshotUrl />

export const drawingCanvas = () => <Canvas />

export const uploadImage = () => <UploadImage />

export const pasteUrlImage = () => <PasteUrlImage />

export const webcamPhoto = () => <WebcamPhoto />
