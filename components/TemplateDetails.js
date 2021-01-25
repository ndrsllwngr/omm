import React, { useEffect, useState } from 'react'
import { MemeRenderer } from '@/components/MemeRenderer'
import PropTypes from 'prop-types'
import useFirestore from '@/components/hooks/useFirestore'
import { FIRESTORE_COLLECTION } from '@/lib/constants'

export const TemplateDetails = ({ templateID }) => {
  const [memesFromTemplate, setMemesFromTemplate] = useState([])
  const { docs } = useFirestore(FIRESTORE_COLLECTION.MEMES)

  useEffect(() => {
    async function getMemesFromTemplate() {
      let memesFromTemplateIDs = []
      const datadocs = docs
      for (let i = 0; i < datadocs.length; i++) {
        if (datadocs[i].template.id == templateID) {
          console.log('enter true templateid')
          memesFromTemplateIDs.push(datadocs[i])
        }
      }
      return memesFromTemplateIDs
    }
    getMemesFromTemplate()
      .then((res) => {
        setMemesFromTemplate(res)
        console.log('res: ', res)
      })
      .catch((e) => console.log({ src: 'getMemesFromTemplates', e }))
  }, [docs, setMemesFromTemplate, templateID])

  //TODO: load svg? or how is the meme_child composed?
  return (
    <div className="template-details">
      {memesFromTemplate &&
        memesFromTemplate.map((meme, i) => (
          <button
            key={i}
            onClick={() => {
              console.log(meme)
            }}
          >
            <div>
              <MemeRenderer meme={meme} />
            </div>
          </button>
        ))}
    </div>
  )
}

TemplateDetails.propTypes = {
  templateID: PropTypes.string,
}
