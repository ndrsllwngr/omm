import React from 'react'
import { MemeProgress } from '@/components/MemeProgress'
import { Dialog } from '@reach/dialog'
import VisuallyHidden from '@reach/visually-hidden'
import { TertiaryBtn } from '@/components/ui/Buttons'
import { IoClose } from 'react-icons/io5'
import PropTypes from 'prop-types'
import useStorage from '@/components/hooks/useStorage'

export const UploadFile = ({ showDialog, closeDialog }) => {
  const { file, progress, error, createTemplate, resetState } = useStorage()

  const types = ['image/png', 'image/jpeg']

  const handleChange = (e) => {
    const selected = e.target.files[0]
    if (selected && types.includes(selected.type)) {
      createTemplate(selected, closeDialog)
    } else {
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
          <div>
            <label>
              <input type="file" onChange={handleChange} />
            </label>

            <form>
              <div className="output">
                {error && <div className="error">{error}</div>}
                {file && <div>{file.name}</div>}
                {file && <MemeProgress progress={progress} />}
              </div>
            </form>
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
