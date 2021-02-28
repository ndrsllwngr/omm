import React from 'react'
import { PrimaryBtn, TertiaryBtn } from '@/components/ui/Buttons'
import { Dialog } from '@reach/dialog'
import VisuallyHidden from '@reach/visually-hidden'
import { IoClose } from 'react-icons/io5'
import PropTypes from 'prop-types'
import { memeType } from '@/components/types/types'
import {
  useViewOnlyCanvasCanvas,
  ViewOnlyCanvasProvider,
} from '@/components/context/viewOnlyCanvasContext'
import { ViewOnlyCanvasInner } from '@/components/meme-generator/ViewOnlyCanvas'
import { compressAccurately, dataURLtoFile, downloadFile, EImageType } from 'image-conversion'

export const DownloadMemeModal = ({ meme, showDialog, closeDialog }) => {
  return (
    <>
      <Dialog isOpen={showDialog} onDismiss={closeDialog}>
        <div className={'flex flex-col'}>
          <div className={'flex flex-row justify-end'}>
            <TertiaryBtn className="close-button" onClick={closeDialog}>
              <VisuallyHidden>Close</VisuallyHidden>
              <span aria-hidden>
                <IoClose />
              </span>
            </TertiaryBtn>
          </div>
          <div>
            <ViewOnlyCanvasProvider>
              <DownloadMemeInner meme={meme} />
            </ViewOnlyCanvasProvider>
          </div>
        </div>
      </Dialog>
    </>
  )
}

const DownloadMemeInner = ({ meme }) => {
  const { canvasRef } = useViewOnlyCanvasCanvas()
  const compressBlob = ({ blob }) => {
    console.log({ blob })
    compressAccurately(blob, {
      size: 20, // image size, e.g. 20 = 20 kb
      accuracy: 0.99,
      scale: 1,
      type: EImageType.PNG,
    }).then((res) => {
      downloadFile(res, `${meme._id}.png`)
    })
  }
  const compressDataUrl = ({ dataUrl }) => {
    console.log({ dataUrl })
    dataURLtoFile(dataUrl, EImageType.PNG).then((blob) => compressBlob({ blob }))
  }
  return (
    <>
      <ViewOnlyCanvasInner meme={meme} />

      <PrimaryBtn
        onClick={() => {
          compressDataUrl({ dataUrl: canvasRef.current.toDataURL('image/png', 1.0) })
        }}
      >
        Download (Client)
      </PrimaryBtn>
      <PrimaryBtn
        onClick={() => {
          fetch(`http://localhost:3000/api/meme/image/${meme._id}`)
            .then((res) => res.blob())
            .then((blob) => compressBlob({ blob }))
            .catch((e) => console.error(e))
        }}
      >
        Download (Server)
      </PrimaryBtn>
    </>
  )
}

DownloadMemeInner.propTypes = {
  meme: memeType,
}

DownloadMemeModal.propTypes = {
  showDialog: PropTypes.bool,
  closeDialog: PropTypes.func,
  meme: memeType,
}
