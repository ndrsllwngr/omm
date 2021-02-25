import React, { useState } from 'react'
import useStorage from '@/components/hooks/useStorage'
import { TertiaryBtn } from '@/components/ui/Buttons'
import { Dialog } from '@reach/dialog'
import VisuallyHidden from '@reach/visually-hidden'
import { IoClose } from 'react-icons/io5'
import PropTypes from 'prop-types'

export const ScreenshotUrl = ({ showDialog, closeDialog }) => {
  const { createExternalTemplate } = useStorage()
  const [search, setSearch] = useState('')
  const URL = `https://api.apiflash.com/v1/urltoimage?access_key=${process.env.NEXT_PUBLIC_APIFLASH_SCREENSHOT_API_KEY}&url=${search}&response_type=json&fresh=true&width=1920&height=1080`

  const handleSubmit = (e) => {
    e.preventDefault()
    fetch(URL, {
      method: 'GET',
    })
      .then((res) => {
        //console.log('res: ', res.json())
        return res.json()
      })
      .then((json) => createExternalTemplate(json.url, closeDialog))
      .catch((e) => console.error('error:', e))
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
                  name="screenShotUrl"
                  onChange={(e) => setSearch(e.target.value)}
                />
              </label>
              <input type="submit" value="Get Screenshot" />
            </form>
          </div>
        </div>
      </Dialog>
    </>
  )
}

ScreenshotUrl.propTypes = {
  showDialog: PropTypes.bool,
  closeDialog: PropTypes.func,
}
