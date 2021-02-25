import React, { useState } from 'react'
import { MemeProgress } from '@/components/MemeProgress'
import { Dialog } from '@reach/dialog'
import VisuallyHidden from '@reach/visually-hidden'
import { TertiaryBtn } from '@/components/ui/Buttons'
import { IoClose } from 'react-icons/io5'
import PropTypes from 'prop-types'

export const UploadImage = ({ showDialog, closeDialog }) => {
  const [otherFile, setOtherFile] = useState(null)
  const [error, setError] = useState(null)

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

UploadImage.propTypes = {
  showDialog: PropTypes.bool,
  closeDialog: PropTypes.func,
}
