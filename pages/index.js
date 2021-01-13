import React, { useEffect } from 'react'
import { HtmlHead } from '@/components/HtmlHead'
// import firebase from '@/lib/firebase'
// import { useRequireAuth } from '@/components/hooks/useRequireAuth'
import { Overview } from '@/components/Overview'
import { useDatabaseMemes } from '@/components/hooks/useDatabaseMemes'
import { Navbar } from '@/components/Navbar'
import { OverviewSort } from '@/components/OverviewSort'

const limit = 20
const LandingPage = () => {
  //let counter = limit
  const { dbMemes, dbFilter, setFilter, triggerNextMemes, endOfFiles } = useDatabaseMemes(limit)
  useEffect(() => {
    //console.log(counter)
    //console.log(setTrigger)
    //console.log(dbMemes.length)
  })
  return (
    <>
      <HtmlHead />
      <Navbar />

      <OverviewSort filter={dbFilter} onFilterChange={setFilter} />
      <Overview memes={dbMemes} triggerNextMemes={triggerNextMemes} endOfFiles={endOfFiles} />
      <button className="w-full h-8" onClick={triggerNextMemes}>
        Load more Memes
      </button>
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
