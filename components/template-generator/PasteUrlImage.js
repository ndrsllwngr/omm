import useStorage from '@/components/hooks/useStorage'
import React, { useState } from 'react'
import { TertiaryBtn } from '@/components/ui/Buttons'
import { Dialog } from '@reach/dialog'
import VisuallyHidden from '@reach/visually-hidden'
import { IoClose } from 'react-icons/io5'
import PropTypes from 'prop-types'

export const PasteUrlImage = ({ showDialog, closeDialog }) => {
  const [userImageUrl, setUserImageUrl] = useState('')
  const [temp, setTemp] = useState('')
  const { setExternalUrl } = useStorage()

  const handleSubmit = (evt) => {
    setUserImageUrl(temp)
    setExternalUrl(temp)
    evt.preventDefault()
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
                <input type="text" name="imageUrl" onChange={(e) => setTemp(e.target.value)} />
              </label>
              <input type="submit" value="Get image" />
            </form>
            <div>
              <img src={userImageUrl} alt="" />
            </div>
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
