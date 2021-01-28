import React, { useEffect, useState } from 'react'
import { MemeRenderer } from '@/components/MemeRenderer'
import PropTypes from 'prop-types'
import useFirestore from '@/components/hooks/useFirestore'
import { FIRESTORE_COLLECTION } from '@/lib/constants'
import { TemplateBargraph } from './TemplateBargraph'
import Link from 'next/link'

export const TemplateDetails = ({ templateID }) => {
  const [memesFromTemplate, setMemesFromTemplate] = useState([])
  const [upVotes, setUpVotes] = useState(0)
  const [downVotes, setDownVotes] = useState([0])
  const [views, setViews] = useState([0])
  const { docs } = useFirestore(FIRESTORE_COLLECTION.MEMES)

  useEffect(() => {
    var ups = 0
    var downs = 0
    var vs = 0
    async function getMemesFromTemplate() {
      let memesFromTemplateIDs = []
      const datadocs = docs
      for (let i = 0; i < datadocs.length; i++) {
        if (datadocs[i].template.id == templateID) {
          console.log('enter true templateid')
          memesFromTemplateIDs.push(datadocs[i])
          ups += datadocs[i].upVotes.length
          downs += datadocs[i].downVotes.length
          vs += datadocs[i].views
        }
      }
      return memesFromTemplateIDs
    }
    getMemesFromTemplate()
      .then((res) => {
        setMemesFromTemplate(res)
        setUpVotes(ups)
        setDownVotes(downs)
        setViews(vs)
        console.log('res: ', res)
        console.log('ups, downs, views:', ups, downs, vs)
      })
      .catch((e) => console.log({ src: 'getMemesFromTemplates', e }))
  }, [docs, setMemesFromTemplate, templateID])

  return (
    <div className="template-details">
      <div className="barchart">
        Bar Chart
        <TemplateBargraph up={upVotes} down={downVotes} views={views}></TemplateBargraph>
      </div>
      <div className="memes-from-templates">
        {memesFromTemplate &&
          memesFromTemplate.map((meme, i) => (
            <button key={i} className="flex flex-col max-w-md">
              <Link href={`/meme/${meme.id}`}>
                <a className={'flex flex-col justify-center items-start'}>
                  <h1 className={'text-lg font-bold text-black dark:text-white truncate'}>
                    {meme.title ? meme.title : 'Untitled'}
                  </h1>
                  <MemeRenderer meme={meme} />
                </a>
              </Link>
            </button>
          ))}
      </div>
    </div>
  )
}

TemplateDetails.propTypes = {
  templateID: PropTypes.string,
}
