import React, { useCallback } from 'react'
import { Menu, MenuButton, MenuList, MenuItem } from '@reach/menu-button'
import { IoChevronDown } from 'react-icons/io5'
import { useImmer } from 'use-immer'
import { DIALOG } from '@/lib/constants'
import { UploadFile } from '@/components/template-generator/UploadFile'
import { WebcamPhoto } from '@/components/template-generator/WebcamPhoto'
import { ScreenshotUrl } from '@/components/template-generator/ScreenshotUrl'
import { PasteUrl } from '@/components/template-generator/PasteUrl'
import { DrawOnCanvas } from '@/components/template-generator/DrawOnCanvas'

export const AddTemplate = () => {
  const [showDialog, updateShowDialog] = useImmer({
    [DIALOG.UPLOAD_FILE]: false,
    [DIALOG.PASTE_URL]: false,
    [DIALOG.WEBCAM_PHOTO]: false,
    [DIALOG.SCREENSHOT_URL]: false,
    [DIALOG.DRAW_ON_CANVAS]: false,
  })
  const openDialog = useCallback(
    (dialogName) => {
      updateShowDialog((draft) => {
        draft[dialogName] = true
      })
    },
    [updateShowDialog]
  )
  const closeDialog = useCallback(
    (dialogName) => () => {
      updateShowDialog((draft) => {
        draft[dialogName] = false
      })
    },
    [updateShowDialog]
  )
  return (
    <>
      <Menu>
        <MenuButton>
          <div className={'flex items-center'}>
            Add Template
            <span className={'ml-2'} aria-hidden>
              <IoChevronDown />
            </span>
          </div>
        </MenuButton>
        <MenuList>
          <MenuItem onSelect={() => openDialog(DIALOG.UPLOAD_FILE)}>Upload an Image</MenuItem>
          <MenuItem onSelect={() => openDialog(DIALOG.PASTE_URL)}>
            Upload an Image from URL
          </MenuItem>
          <MenuItem onSelect={() => openDialog(DIALOG.WEBCAM_PHOTO)}>Take a Photo</MenuItem>
          <MenuItem onSelect={() => openDialog(DIALOG.SCREENSHOT_URL)}>
            Screenshot a Website
          </MenuItem>
          <MenuItem onSelect={() => openDialog(DIALOG.DRAW_ON_CANVAS)}>Draw an Image</MenuItem>
        </MenuList>
      </Menu>
      <>
        <UploadFile
          showDialog={showDialog[DIALOG.UPLOAD_FILE]}
          closeDialog={closeDialog(DIALOG.UPLOAD_FILE)}
        />
        <PasteUrl
          showDialog={showDialog[DIALOG.PASTE_URL]}
          closeDialog={closeDialog(DIALOG.PASTE_URL)}
        />
        <WebcamPhoto
          showDialog={showDialog[DIALOG.WEBCAM_PHOTO]}
          closeDialog={closeDialog(DIALOG.WEBCAM_PHOTO)}
        />
        <ScreenshotUrl
          showDialog={showDialog[DIALOG.SCREENSHOT_URL]}
          closeDialog={closeDialog(DIALOG.SCREENSHOT_URL)}
        />
        <DrawOnCanvas
          showDialog={showDialog[DIALOG.DRAW_ON_CANVAS]}
          closeDialog={closeDialog(DIALOG.DRAW_ON_CANVAS)}
        />
      </>
    </>
  )
}
