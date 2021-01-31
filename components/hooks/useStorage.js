import { useState, useEffect } from 'react'
import firebase from '@/lib/firebase'
import { STORAGE_COLLECTION } from '@/lib/constants'
import { useAuth } from '@/components/context/authContext'
import { gql, useMutation } from '@apollo/client'
import ObjectID from 'bson-objectid'

// TODO createdBy should be User
// TODO remove width, height
const ADD_TEMPLATE = gql`
  mutation AddMeme($template: TemplateInsertInput!) {
    insertOneTemplate(data: $template) {
      _id
      createdAt
      createdBy {
        _id
      }
      height
      img
      type
      url
      width
    }
  }
`

const useStorage = () => {
  const [insertOneTemplate] = useMutation(ADD_TEMPLATE)
  const [file, setFile] = useState(null)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState(null)
  const [externalUrl, setExternalUrl] = useState('')
  const auth = useAuth()

  useEffect(() => {
    // references
    if (file !== null) {
      const memeStorage = firebase.storage()
      const objId = ObjectID.generate()
      const storageRef = memeStorage
        .ref()
        .child(STORAGE_COLLECTION.TEMPLATES)
        .child(objId.toString())

      storageRef.put(file).on(
        'state_changed',
        (snap) => {
          let percentage = (snap.bytesTransferred / snap.totalBytes) * 100
          setProgress(percentage)
          console.log('percentage:', percentage)
          console.log('in file', file)
        },
        (err) => {
          setError(err)
          console.log(err)
        },
        async () => {
          console.debug(`STORAGE_COLLECTION.TEMPLATES`, 'WRITE', 'useStorage', 'useEffect', file)
          insertOneTemplate({
            variables: {
              template: {
                createdAt: new Date(),
                createdBy: { link: auth.getUser().id },
                img: STORAGE_COLLECTION.TEMPLATES + '/' + objId.toString(), // TODO, do we even need this one?
                type: 'STORAGE',
                url: await storageRef.getDownloadURL(),
                width: 1024,
                height: 768,
              },
            },
          })
            .then(() => {
              setFile(null)
            })
            .catch((e) => console.error(e))
            .finally(() => console.log('ADD TEMPLATE / INTERNAL'))
        }
      )
    }
    if (externalUrl !== '') {
      insertOneTemplate({
        variables: {
          template: {
            createdAt: new Date(),
            createdBy: { link: auth.getUser().id },
            type: 'EXTERNAL',
            img: STORAGE_COLLECTION.TEMPLATES + '/', // TODO, do we even need this one?
            url: externalUrl,
            width: 1024,
            height: 768,
          },
        },
      })
        .then(() => {
          setExternalUrl('')
        })
        .catch((e) => console.error(e))
        .finally(() => console.log('ADD TEMPLATE / EXTERNAL'))
    }
  }, [file, auth, externalUrl, insertOneTemplate])

  return { progress, error, setFile, setExternalUrl }
}

export default useStorage
