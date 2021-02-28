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

/*
Implementing the share buttons, we use a external library (react-share), which provides wrapper and icons for social media links
https://www.npmjs.com/package/react-share
 */

export const ShareButtons = ({ id }) => {
  //Get URL of given meme
  const url = `${window.location.origin}` + '/meme/' + `${id}`

  //Inline css style as a constant string
  const style =
    'w-8 h-8 mx-1 rounded-full bg-black hover:bg-gray-700 text-white dark:bg-white dark:text-black dark:hover:bg-gray-300 fill-current '
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
ShareButtons.propTypes = {
  id: PropTypes.string,
}
