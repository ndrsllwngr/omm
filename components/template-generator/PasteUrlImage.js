import useStorage from '@/components/hooks/useStorage'
import React, { useState } from 'react'
import { TertiaryBtn } from '@/components/ui/Buttons'
import { Dialog } from '@reach/dialog'
import VisuallyHidden from '@reach/visually-hidden'
import { IoClose } from 'react-icons/io5'
import PropTypes from 'prop-types'

export const PasteUrlImage = ({ showDialog, closeDialog }) => {
  const [url, setUrl] = useState('')
  const { createExternalTemplate } = useStorage()

  const handleSubmit = (evt) => {
    evt.preventDefault()
    if (url !== '') {
      createExternalTemplate(url, closeDialog)
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

PasteUrlImage.propTypes = {
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
