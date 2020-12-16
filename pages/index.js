import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { HtmlHead } from '@/components/HtmlHead'
import { useUser } from '@/components/context/userContext'
import firebase from '@/lib/firebase'
import { getImgFlipMemes } from '@/lib/external-meme-api'
import { Slideshow } from '@/components/Slideshow'

const LandingPage = ({ memes }) => {
  useEffect(() => {
    console.log({ memes })
  }, [memes])
  // Our custom hook to get context values
  const { loadingUser, user } = useUser()

  useEffect(() => {
    if (!loadingUser) {
      // You know that the user is loaded: either logged in or out!
      console.log(user)
    }
    // You also have your firebase app initialized
    console.log(firebase)
  }, [loadingUser, user])

  return (
    <>
      <HtmlHead />
      <Slideshow memes={memes} />
    </>
  )
}

LandingPage.propTypes = {
  memes: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string,
      width: PropTypes.number,
      height: PropTypes.number,
      name: PropTypes.string,
    })
  ),
}

// Fetch data at build time
export async function getStaticProps() {
  // Fetch data from external API
  const memes = await getImgFlipMemes()
  // Pass data as parameter
  return { props: { memes } }
}

export default LandingPage
