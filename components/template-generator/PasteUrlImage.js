import useStorage from '@/components/hooks/useStorage'
import React, { useState } from 'react'
import { PrimaryBtn, TertiaryBtn } from '@/components/ui/Buttons'
import { Dialog } from '@reach/dialog'
import VisuallyHidden from '@reach/visually-hidden'
import { IoClose } from 'react-icons/io5'

export const PasteUrlImage = () => {
  const [userImageUrl, setUserImageUrl] = useState('')
  const [temp, setTemp] = useState('')
  const { setExternalUrl } = useStorage()
  const [showDialog, setShowDialog] = useState(false)
  const open = () => setShowDialog(true)
  const close = () => setShowDialog(false)

  const handleSubmit = (evt) => {
    setUserImageUrl(temp)
    setExternalUrl(temp)
    evt.preventDefault()
  }

  return (
    <>
      <PrimaryBtn onClick={open}>Upload Image from URL</PrimaryBtn>
      <Dialog isOpen={showDialog} onDismiss={close}>
        <div className={'flex flex-col'}>
          <div className={'flex flex-row justify-end'}>
            <TertiaryBtn className="close-button" onClick={close}>
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
