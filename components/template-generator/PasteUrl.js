import useStorage from '@/components/hooks/useStorage'
import React, { useState } from 'react'
import { TertiaryBtn } from '@/components/ui/Buttons'
import { Dialog } from '@reach/dialog'
import VisuallyHidden from '@reach/visually-hidden'
import { IoClose } from 'react-icons/io5'
import PropTypes from 'prop-types'
import { MEDIA_TYPE } from '@/lib/constants'

export const PasteUrl = ({ showDialog, closeDialog }) => {
  const [url, setUrl] = useState('')
  const [name, setName] = useState('')
  const [width] = useState(null)
  const [height] = useState(null)
  const { createExternalTemplate } = useStorage()

  const resetLocalState = () => {
    setName('')
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    if (url !== '') {
      createExternalTemplate({
        url: url,
        meta: { name: name, width: width, height: height },
        callback: closeDialog,
        mediaType: MEDIA_TYPE.IMAGE,
      })
      resetLocalState()
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
            <form onSubmit={handleSubmit}>
              <label>
                URL
                <input
                  type="text"
                  name="imageUrl"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
              </label>
              <input type="submit" value="Get image" />
            </form>
          </div>
        </div>
      </Dialog>
    </>
  )
}

PasteUrl.propTypes = {
  showDialog: PropTypes.bool,
  closeDialog: PropTypes.func,
}

/*const fetchImage = (imageUrl) => {
    fetch(imageUrl)
      .then((res) => {
        return res.blob()
      })
      .then((blob) => {
        console.log(blob)
      })
  }

  .then((blob) => {
        setFile(blob)
        console.log('blob:', blob)
      })*/
