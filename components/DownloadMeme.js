import React, { useState } from 'react'
import { TertiaryBtn } from '@/components/ui/Buttons'
import { memeType } from '@/components/types/types'
import { DownloadMemeModal } from '@/components/DownloadMemeModal'

export const DownloadMeme = ({ meme }) => {
  const [showDialog, setShowDialog] = useState(false)

  return (
    <>
      <TertiaryBtn onClick={() => setShowDialog(true)}>Download</TertiaryBtn>
      <>
        <DownloadMemeModal
          showDialog={showDialog}
          closeDialog={() => setShowDialog(false)}
          meme={meme}
        />
      </>
    </>
  )
}

DownloadMeme.propTypes = {
  meme: memeType,
}
