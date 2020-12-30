import React, { useEffect } from 'react'
import { HtmlHead } from '@/components/HtmlHead'
import firebase from '@/lib/firebase'
import { useRequireAuth } from '@/components/hooks/useRequireAuth'
import { Overview } from '@/components/Overview'
import { useDatabaseMemes } from '@/components/hooks/useDatabaseMemes'

const LandingPage = () => {
  const dbMemes = useDatabaseMemes()
  const auth = useRequireAuth()

  useEffect(() => {
    if (auth.user) {
      // You know that the user is loaded: either logged in or out!
      console.log(auth.user)
    }
    // You also have your firebase app initialized
    console.log({ firebase })
  }, [auth.user])

  return (
    <>
      <HtmlHead />
      <Overview memes={dbMemes} />
      <button
        className="w-32 focus:outline-none py-2 px-5 rounded-lg shadow-sm text-center text-gray-600 bg-white hover:bg-gray-100 font-medium border"
        onClick={auth.signOut}
      >
        Logout
      </button>
    </>
  )
}

// // Fetch data at build time
// export async function getStaticProps() {
//   // Fetch data from external API
//   const memes = await getImgFlipMemes()
//   // Pass data as parameter
//   return { props: { memes } }
// }

export default LandingPage
