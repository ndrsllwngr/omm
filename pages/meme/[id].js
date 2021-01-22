import React from 'react'
import { Slideshow } from '@/components/Slideshow'
import { Navbar } from '@/components/Navbar'
import { OverviewSort } from '@/components/OverviewSort'
import { HtmlHead } from '@/components/HtmlHead'
import { useSingleMeme } from '@/components/hooks/useSingleMeme'
import { useSingleMemeContext } from '@/components/context/singlememeContext'

export default function SingleView() {
  const { currentMeme, setNext, setPrev } = useSingleMemeContext()
  useSingleMeme()

  if (!currentMeme)
    return (
      <>
        <HtmlHead title={'Meme · Loading... '} />
        <Navbar />
        <div>Loading...</div>
      </>
    )
  return (
    <>
      <HtmlHead
        title={`Meme · ${currentMeme && currentMeme.title ? currentMeme.title : 'Untitled'}`}
      />
      <Navbar />
      <div className={'max-w-7xl mx-auto mt-4'}>
        <OverviewSort
          callback={() => {
            setPrev(null)
            setNext(null)
          }}
        />
        <Slideshow />
      </div>
    </>
  )
}
