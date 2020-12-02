import React from 'react'
import { NewMemeEditor } from '@/components/NewMemeEditor'
import { NewMeme } from '@/components/NewMeme'

export default { title: 'Meme Editor v2' }

export const memeEditor = () => <NewMemeEditor />

export const meme = () => <NewMeme />
