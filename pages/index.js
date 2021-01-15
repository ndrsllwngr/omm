import React, { useEffect, useState } from 'react'
import { HtmlHead } from '@/components/HtmlHead'
import firebase from '@/lib/firebase'
// import { useRequireAuth } from '@/components/hooks/useRequireAuth'
import { Overview } from '@/components/Overview'
import { Navbar } from '@/components/Navbar'
import { OverviewSort } from '@/components/OverviewSort'
import { FIRESTORE_COLLECTION } from '@/lib/constants'
import { useReloadContext } from '@/components/context/reloadContext'

const LandingPage = () => {
  const [showNewMemes, setShowNewMemes] = useState(false)
  const { reload, setReload } = useReloadContext()
  const [counter, setCounter] = useState(0)
  const [date, setDate] = useState(firebase.firestore.Timestamp.now())
  useEffect(() => {
    const db = firebase.firestore()
    let unsub = db
      .collection(FIRESTORE_COLLECTION.MEMES)
      .where('createdAt', '>', date)
      .onSnapshot(function (snapshot) {
        snapshot.docChanges().forEach(function (change) {
          if (change.type === 'added') {
            setCounter(counter + 1)
            setShowNewMemes(true)
          }
        })
      })
    return () => unsub()
  }, [reload])

  return (
    <>
      {showNewMemes && (
        <button
          onClick={() => {
            setReload(!reload),
              setShowNewMemes(false),
              setCounter(0),
              setDate(firebase.firestore.Timestamp.now())
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
