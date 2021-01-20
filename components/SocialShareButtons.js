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
import PropTypes from 'prop-types'
//https://www.npmjs.com/package/react-share
export const SocialShareButtons = ({ id }) => {
  const url = `${window.location.origin}` + '/meme/' + `${id}`
  const style = 'w-8 h-8 mx-1 rounded-full bg-custom-gray fill-current text-custom-green'
  return (
    <div className="flex flex-row justify-end my-2">
      <FacebookShareButton url={url}>
        <FacebookIcon
          className={style}
          iconFillColor={'inherit'}
          bgStyle={{ fill: 'transparent' }}
        />
      </FacebookShareButton>

      <TwitterShareButton url={url}>
        <TwitterIcon
          className={style}
          iconFillColor={'inherit'}
          bgStyle={{ fill: 'transparent' }}
        />
      </TwitterShareButton>
      <EmailShareButton url={url}>
        <EmailIcon className={style} iconFillColor={'inherit'} bgStyle={{ fill: 'transparent' }} />
      </EmailShareButton>
      <RedditShareButton url={url}>
        <RedditIcon className={style} iconFillColor={'inherit'} bgStyle={{ fill: 'transparent' }} />
      </RedditShareButton>
      <TelegramShareButton url={url}>
        <TelegramIcon
          className={style}
          iconFillColor={'inherit'}
          bgStyle={{ fill: 'transparent' }}
        />
      </TelegramShareButton>
      <WhatsappShareButton url={url}>
        <WhatsappIcon
          className={style}
          iconFillColor={'inherit'}
          bgStyle={{ fill: 'transparent' }}
        />
      </WhatsappShareButton>
    </div>
  )
}
SocialShareButtons.propTypes = {
  id: PropTypes.string,
}
