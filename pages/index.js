import React, { useEffect } from 'react'
import { HtmlHead } from '@/components/HtmlHead'
// import firebase from '@/lib/firebase'
// import { useRequireAuth } from '@/components/hooks/useRequireAuth'
import { Overview } from '@/components/Overview'
import { useDatabaseMemes } from '@/components/hooks/useDatabaseMemes'
import { Navbar } from '@/components/Navbar'
import { OverviewSort } from '@/components/OverviewSort'

const LandingPage = () => {
  const limit = 1
  //let counter = limit
  const { dbMemes, dbFilter, setFilter, setTrigger } = useDatabaseMemes(limit)
  useEffect(() => {
    //console.log(counter)
    //console.log(setTrigger)
  })
  return (
    <>
      <HtmlHead />
      <Navbar />
      <OverviewSort filter={dbFilter} onFilterChange={setFilter} />
      <button className="w-full h-8" onClick={setTrigger}>
        Load more Memes
      </button>
      <Overview memes={dbMemes} />
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
