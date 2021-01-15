import React from 'react'
import { HtmlHead } from '@/components/HtmlHead'
import firebase from '@/lib/firebase'
import { Overview } from '@/components/Overview'
import { Navbar } from '@/components/Navbar'
import { OverviewSort } from '@/components/OverviewSort'
import { useMemeReload } from '@/components/hooks/useMemeReload'
import { useFilterContext } from '@/components/context/filterContext'

const LandingPage = () => {
  const { setFilter } = useFilterContext()
  const { showNewMemes, setShowNewMemes, setCounter, setDate, counter } = useMemeReload()
  return (
    <>
      {showNewMemes && (
        <button
          onClick={() => {
            //needed when we do not trigger setFilter('Latest')
            //setReload(!reload),
            setShowNewMemes(false), setCounter(0), setDate(firebase.firestore.Timestamp.now())
            setFilter('Latest')
          }}
          className="w-full h-8"
        >
          Load {counter} new Memes
        </button>
      )}
      <HtmlHead />
      <Navbar />
      <OverviewSort />
      <Overview />

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
