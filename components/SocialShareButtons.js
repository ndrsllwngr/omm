import React from 'react'
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  EmailShareButton,
  EmailIcon,
  RedditShareButton,
  RedditIcon,
  TelegramShareButton,
  TelegramIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from 'react-share'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import { memeType } from '@/components/types/types'
import { SingleMeme } from '@/components/SingleMeme'
//https://www.npmjs.com/package/react-share
export const SocialShareButtons = ({ id }) => {
  const url = `${window.location.origin}` + '/meme/' + `${id}`

  const style = 'w-8 h-8 mx-1 rounded-full'
  return (
    <div className="flex flex-row justify-end my-2">
      <FacebookShareButton url={url}>
        <FacebookIcon className={style} />
      </FacebookShareButton>
      <TwitterShareButton url={url}>
        <TwitterIcon className={style} />
      </TwitterShareButton>
      <EmailShareButton url={url}>
        <EmailIcon className={style} />
      </EmailShareButton>
      <RedditShareButton url={url}>
        <RedditIcon className={style} />
      </RedditShareButton>
      <TelegramShareButton url={url}>
        <TelegramIcon className={style} />
      </TelegramShareButton>
      <WhatsappShareButton url={url}>
        <WhatsappIcon className={style} />
      </WhatsappShareButton>
    </div>
  )
}
SocialShareButtons.propTypes = {
  id: PropTypes.string,
}
