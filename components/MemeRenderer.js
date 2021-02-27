import React, { useEffect, useLayoutEffect } from 'react'
import SVG from 'react-inlinesvg'
import { memeType } from '@/components/types/types'
import { MEDIA_TYPE } from '@/lib/constants'
import { FabricCanvas } from '@/components/meme-generator/FabricCanvas'
import { useFabricJson } from '@/components/context/fabricContext'

export const MemeRenderer = ({ meme }) => {
  const { setJson } = useFabricJson()
  useLayoutEffect(() => {
    // TODO @NDRS not working yet
    console.log({ meme }, meme.template.id.mediaType)
    if (meme.template.id.mediaType === MEDIA_TYPE.VIDEO) {
      setJson(meme)
    }
    return setJson(null)
  }, [])
  if (meme.template.id.mediaType === MEDIA_TYPE.VIDEO) {
    return (
      <>
        <FabricCanvas />
      </>
    )
  }
  return (
    <>
      {/*<FabricCanvas jsonData={meme} />*/}
      <SVG className={'object-scale-down w-full h-full'} src={meme.svg} />
    </>
  )
}

MemeRenderer.propTypes = {
  meme: memeType,
}
