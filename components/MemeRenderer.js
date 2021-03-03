import React from 'react'
import SVG from 'react-inlinesvg'
import { memeType } from '@/components/types/types'
import { MEDIA_TYPE } from '@/lib/constants'
import { ViewOnlyCanvas } from '@/components/meme-generator/ViewOnlyCanvas'

export const MemeRenderer = ({ meme }) => {
  if (meme.template?.mediaType === MEDIA_TYPE.VIDEO) {
    return (
      <>
        <ViewOnlyCanvas meme={meme} />
      </>
    )
  }
  return (
    <>
      <SVG className={'object-scale-down w-full h-full'} src={meme.svg} />
    </>
  )
}

MemeRenderer.propTypes = {
  meme: memeType,
}
