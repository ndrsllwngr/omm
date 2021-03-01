import React, { useState } from 'react'
import { PrimaryBtn, TertiaryBtn } from '@/components/ui/Buttons'
import { compressAccurately, dataURLtoFile, downloadFile, EImageType } from 'image-conversion'
import { Dialog } from '@reach/dialog'
import VisuallyHidden from '@reach/visually-hidden'
import { IoClose } from 'react-icons/io5'
import PropTypes from 'prop-types'
import { memeType } from '@/components/types/types'
import { MixedCheckbox } from '@reach/checkbox'
import {
  useViewOnlyCanvasCanvas,
  ViewOnlyCanvasProvider,
} from '@/components/context/viewOnlyCanvasContext'
import { ViewOnlyCanvasInner } from '@/components/meme-generator/ViewOnlyCanvas'

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
  const [size, setSize] = useState(50)
  const [useCompression, setUseCompression] = useState(false)

  const getRootUrl = () => {
    return window.location.origin
      ? window.location.origin + '/'
      : window.location.protocol + '/' + window.location.host + '/'
  }

  const compressBlob = ({ blob }) => {
    if (!useCompression) {
      console.log({ src: 'no compression', blob })
      downloadFile(blob, `${meme._id}.png`)
    } else {
      console.log({ src: 'compression', blob, size })
      // image size, e.g. 20 = 20 kb
      compressAccurately(blob, {
        size: size,
        scale: 1,
        accuracy: 0.99,
        //type: EImageType.PNG,
      }).then((res) => {
        downloadFile(res, `${meme._id}.png`)
      })
    }
  }

  const compressDataUrl = ({ dataUrl }) => {
    console.log({ dataUrl })
    dataURLtoFile(dataUrl, EImageType.PNG).then((blob) => compressBlob({ blob }))
  }
  return (
    <>
      <ViewOnlyCanvasInner meme={meme} />
      <div className={'flex flex-row'}>
        <div>
          <label>
            <MixedCheckbox
              value={useCompression}
              checked={useCompression}
              onChange={(e) => setUseCompression(e.target.checked)}
            />
            Compress file
          </label>
          {useCompression && (
            <>
              <h4>File size in kb</h4>
              <input
                type={'number'}
                value={size}
                onChange={(e) => setSize(parseInt(e.target.value))}
                step={1}
                min={0}
              />
            </>
          )}
        </div>
      </div>
      <div className={'flex flex-row'}>
        <PrimaryBtn
          onClick={() => {
            //compressBlob({ blob: convertCanvasToImage(canvasRef.current) })
            compressDataUrl({ dataUrl: canvasRef.current.toDataURL('image/png', 1.0) })
          }}
        >
          Download (Client)
        </PrimaryBtn>
        <PrimaryBtn
          onClick={() => {
            fetch(`${getRootUrl()}api/meme/image/${meme._id}`)
              .then((res) => res.blob())
              .then((blob) => compressBlob({ blob }))
              .catch((e) => console.error(e))
          }}
        >
          Download (Server)
        </PrimaryBtn>
      </div>
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
