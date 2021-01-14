import React from 'react'
import { HtmlHead } from '@/components/HtmlHead'
// import firebase from '@/lib/firebase'
// import { useRequireAuth } from '@/components/hooks/useRequireAuth'
import { Overview } from '@/components/Overview'
import { Navbar } from '@/components/Navbar'
import { OverviewSort } from '@/components/OverviewSort'

const LandingPage = () => {
  return (
    <>
      <HtmlHead />
      <Navbar />
      <OverviewSort />
      <Overview />
      {/* <button className="w-full h-8" onClick={triggerNextMemes}>
        Load more Memes
      </button> */}
      {/* Button to refetch new memes witch werre added
        checks if new memes are available and then onclick to refresh page(siehe next link)
      
      */}
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
