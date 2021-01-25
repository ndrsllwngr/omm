import React, { useEffect } from 'react'
import SVG from 'react-inlinesvg'
import { memeType } from '@/components/types/types'

export const MemeRenderer = ({ meme }) => {
  useEffect(() => {
    // console.log({ meme })
  }, [meme])
  return (
    <div>
      {/*<FabricCanvas jsonData={meme} />*/}
      <SVG className={'object-scale-down w-full h-full'} src={meme.svg} />
    </div>
  )
}

MemeRenderer.propTypes = {
  meme: memeType,
}
