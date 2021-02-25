import React, { useCallback } from 'react'
import { Menu, MenuButton, MenuList, MenuItem } from '@reach/menu-button'
import { IoChevronDown } from 'react-icons/io5'
import { useImmer } from 'use-immer'
import { DIALOG } from '@/lib/constants'
import { UploadImage } from '@/components/template-generator/UploadImage'
import { WebcamPhoto } from '@/components/template-generator/WebcamPhoto'
import { ScreenshotUrl } from '@/components/template-generator/ScreenshotUrl'
import { PasteUrlImage } from '@/components/template-generator/PasteUrlImage'
import { Canvas } from '@/components/template-generator/Canvas'

export const AddTemplate = () => {
  const [showDialog, updateShowDialog] = useImmer({
    [DIALOG.UPLOAD_IMAGE]: false,
    [DIALOG.PASTE_URL]: false,
    [DIALOG.TAKE_WEBCAM_PHOTO]: false,
    [DIALOG.SCREENSHOT_URL]: false,
    [DIALOG.DRAW_IMAGE]: false,
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
          <MenuItem onSelect={() => openDialog(DIALOG.UPLOAD_IMAGE)}>Upload an Image</MenuItem>
          <MenuItem onSelect={() => openDialog(DIALOG.PASTE_URL)}>
            Upload an Image from URL
          </MenuItem>
          <MenuItem onSelect={() => openDialog(DIALOG.TAKE_WEBCAM_PHOTO)}>Take a Photo</MenuItem>
          <MenuItem onSelect={() => openDialog(DIALOG.SCREENSHOT_URL)}>
            Screenshot a Website
          </MenuItem>
          <MenuItem onSelect={() => openDialog(DIALOG.DRAW_IMAGE)}>Draw an Image</MenuItem>
        </MenuList>
      </Menu>
      <>
        <UploadImage
          showDialog={showDialog[DIALOG.UPLOAD_IMAGE]}
          closeDialog={closeDialog(DIALOG.UPLOAD_IMAGE)}
        />
        <PasteUrlImage
          showDialog={showDialog[DIALOG.PASTE_URL]}
          closeDialog={closeDialog(DIALOG.PASTE_URL)}
        />
        <WebcamPhoto
          showDialog={showDialog[DIALOG.TAKE_WEBCAM_PHOTO]}
          closeDialog={closeDialog(DIALOG.TAKE_WEBCAM_PHOTO)}
        />
        <ScreenshotUrl
          showDialog={showDialog[DIALOG.SCREENSHOT_URL]}
          closeDialog={closeDialog(DIALOG.SCREENSHOT_URL)}
        />
        <Canvas
          showDialog={showDialog[DIALOG.DRAW_IMAGE]}
          closeDialog={closeDialog(DIALOG.DRAW_IMAGE)}
        />
      </>
    </>
  )
}
