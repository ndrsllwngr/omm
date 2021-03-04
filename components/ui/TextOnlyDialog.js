import React from 'react'
import { TertiaryBtn } from '@/components/ui/Buttons'
import { Dialog } from '@reach/dialog'
import VisuallyHidden from '@reach/visually-hidden'
import { IoClose } from 'react-icons/io5'
import PropTypes from 'prop-types'

export const TextOnlyDialog = ({ message, showDialog, closeDialog }) => {
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
            <p className={'text-black'}>{message}</p>
          </div>
        </div>
      </Dialog>
    </>
  )
}

TextOnlyDialog.propTypes = {
  showDialog: PropTypes.bool,
  closeDialog: PropTypes.func,
  message: PropTypes.string,
}
