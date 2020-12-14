import firebase from '@/lib/firebaseNode'

const db = firebase.firestore()
const memeCollection = db.collection('memes')

export default async function handler(req, res) {
  const memes = await memeCollection.get()
  // Get data from your database
  res.status(200).json(
    memes.docs.map((doc) => {
      const data = doc.data()
      data.template = data.template.id
      return data
    })
  )
}
