import React, { useState } from 'react'
import useStorage from '@/components/hooks/useStorage'
import { PrimaryBtn, TertiaryBtn } from '@/components/ui/Buttons'
import { Dialog } from '@reach/dialog'
import VisuallyHidden from '@reach/visually-hidden'
import { IoClose } from 'react-icons/io5'

export const ScreenshotUrl = () => {
  const [search, setSearch] = useState('')
  const URL = `https://api.apiflash.com/v1/urltoimage?access_key=${process.env.NEXT_PUBLIC_APIFLASH_SCREENSHOT_API_KEY}&url=${search}&response_type=json&fresh=true&width=1920&height=1080`
  const { setExternalUrl } = useStorage()

  const [showDialog, setShowDialog] = useState(false)
  const open = () => setShowDialog(true)
  const close = () => setShowDialog(false)

  const getScreenshot = () =>
    fetch(URL, {
      method: 'GET',
    })
      .then((res) => {
        //console.log('res: ', res.json())
        return res.json()
      })
      .then((json) => setExternalUrl(json.url))
      .catch((e) => console.error('error:', e))

  const handleSubmit = (e) => {
    e.preventDefault()
    const test = getScreenshot()
    console.log(test)
    /*{ async () => {
        console.log('entering async')
        await memeFirestore.collection(FIRESTORE_COLLECTION.TEMPLATES.add({
          createdAt: firebase.firestore.Timestamp.now(),
          url: test,
        })
      }}}*/
  }

  return (
    <>
      <PrimaryBtn onClick={open}>Take a Screenshot from URL</PrimaryBtn>
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
