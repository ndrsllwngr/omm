import React, { useState } from 'react'
import { MemeProgress } from '@/components/MemeProgress'
import { Dialog } from '@reach/dialog'
import VisuallyHidden from '@reach/visually-hidden'
import { PrimaryBtn, TertiaryBtn } from '@/components/ui/Buttons'
import { IoClose } from 'react-icons/io5'

export const UploadImage = () => {
  const [otherFile, setOtherFile] = useState(null)
  const [error, setError] = useState(null)
  const [showDialog, setShowDialog] = useState(false)
  const open = () => setShowDialog(true)
  const close = () => setShowDialog(false)

  const types = ['image/png', 'image/jpeg']

  const handleChange = (e) => {
    let selected = e.target.files[0]

    if (selected && types.includes(selected.type)) {
      setOtherFile(selected)
      setError('')
    } else {
      setOtherFile(null)
      setError('Please select an image.')
    }
  }

  return (
    <>
      <PrimaryBtn onClick={open}>Upload Image</PrimaryBtn>
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
            <label>
              <input type="file" onChange={handleChange} />
            </label>

            <form>
              <div className="output">
                {error && <div className="error">{error}</div>}
                {otherFile && <div>{otherFile.name}</div>}
                {otherFile && <MemeProgress otherFile={otherFile} setOtherFile={setOtherFile} />}
              </div>
            </form>
          </div>
        </div>
      </Dialog>
    </>
  )
}
