import React, { useEffect, useState } from 'react'
import { MemeProgress } from '@/components/MemeProgress'
import { Dialog } from '@reach/dialog'
import VisuallyHidden from '@reach/visually-hidden'
import { PrimaryBtn, TertiaryBtn } from '@/components/ui/Buttons'
import { IoClose } from 'react-icons/io5'
import PropTypes from 'prop-types'
import useStorage from '@/components/hooks/useStorage'
import { MEDIA_TYPE } from '@/lib/constants'

const imageTypes = ['image/png', 'image/jpeg']
const videoTypes = ['video/mp4', 'video/x-m4v']
const allTypes = [...imageTypes, ...videoTypes]

export const UploadFile = ({ showDialog, closeDialog }) => {
  const { file, progress, error, createTemplate, resetState } = useStorage()
  const [name, setName] = useState('')
  const [genericFile, setGenericFile] = useState(null)
  const [imageFile, setImageFile] = useState(null)
  const [videoFile, setVideoFile] = useState(null)
  const [metadata, setMetadata] = useState(null)

  useEffect(() => {
    return resetLocalState()
  }, [])

  const resetLocalState = () => {
    setName('')
    setImageFile(null)
    setVideoFile(null)
    setMetadata(null)
    setGenericFile(null)
  }

  const handleChange = (e) => {
    const selected = e.target.files[0]
    if (selected && allTypes.includes(selected.type)) {
      console.log(selected)
      resetLocalState()
      if (videoTypes.includes(selected.type)) {
        setGenericFile(selected)
        setVideoFile(selected)
      } else if (imageTypes.includes(selected.type)) {
        setGenericFile(selected)
        setImageFile(selected)
      }
    } else {
      resetLocalState()
      resetState()
    }
  }

  const uploadTemplate = () => {
    const selected = genericFile
    console.log('uploadTemplate', { selected })
    if (selected && allTypes.includes(selected.type)) {
      console.log(selected)
      if (videoTypes.includes(selected.type)) {
        createTemplate({
          file: selected,
          mediaType: MEDIA_TYPE.VIDEO,
          meta: { width: metadata.width, height: metadata.height, name: name },
          callback: closeDialog,
        })
      } else if (imageTypes.includes(selected.type)) {
        createTemplate({
          file: selected,
          mediaType: MEDIA_TYPE.IMAGE,
          meta: { width: metadata.width, height: metadata.height, name: name },
          callback: closeDialog,
        })
      }
    } else {
      resetLocalState()
      resetState()
    }
  }

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
          <input
            className={
              'appearance-none border border-transparent w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-md rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent'
            }
            type="text"
            value={name}
            placeholder={'Description'}
            onChange={(e) => setName(e.target.value)}
          />
          <div>
            <label>
              <input type="file" onChange={handleChange} accept={allTypes.join(',')} />
            </label>

            <form>
              <div className="output">
                {error && <div className="error">{error}</div>}
                {file && <div>{file.name}</div>}
                {file && <MemeProgress progress={progress} />}
              </div>
            </form>
            <PrimaryBtn onClick={uploadTemplate}>Upload</PrimaryBtn>
            <div>
              {videoFile && (
                <video
                  controls={true}
                  width="250"
                  style={{ display: 'none' }}
                  onLoadedMetadata={(e) => {
                    setMetadata({
                      height: e.target.videoHeight,
                      width: e.target.videoWidth,
                      duration: e.target.duration,
                    })
                  }}
                >
                  <source src={URL.createObjectURL(videoFile)} type="video/mp4" />
                </video>
              )}
              {imageFile && (
                <img
                  style={{ display: 'none' }}
                  src={URL.createObjectURL(imageFile)}
                  onLoad={(e) => {
                    setMetadata({
                      height: e.target.height,
                      width: e.target.width,
                      duration: null,
                    })
                  }}
                />
              )}
              {metadata && (
                <div>
                  <p>
                    <code>Height: {metadata.height}</code>
                  </p>
                  <p>
                    <code>Width: {metadata.width}</code>
                  </p>
                  <p>
                    <code>Duration: {metadata.duration}</code>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </Dialog>
    </>
  )
}

UploadFile.propTypes = {
  showDialog: PropTypes.bool,
  closeDialog: PropTypes.func,
}
