import React, { useEffect, useState } from 'react'
import { MemeRenderer } from '@/components/MemeRenderer'
import PropTypes from 'prop-types'
import { TemplateStackedBarChart } from '@/components/TemplateStackedBarChart'
import Link from 'next/link'
import { gql, useQuery } from '@apollo/client'

export const ALL_PUBLIC_MEMES_QUERY = gql`
  query getAllPublicMemes {
    memes {
      _id
      commentCount
      createdAt
      createdBy {
        _id
      }
      downVotes {
        _id
      }
      forkedBy {
        _id
      }
      forkedFrom {
        _id
      }
      json
      svg
      template {
        id {
          _id
          createdAt
          createdBy {
            _id
          }
          height
          img
          mediaType
          type
          url
          width
          name
        }
        url
      }
      title
      upVotes {
        _id
      }
      points
      url
      views
      visibility
    }
  }
`

export const TemplateDetails = ({ templateID }) => {
  const [memesFromTemplate, setMemesFromTemplate] = useState([])
  const [upVotes, setUpVotes] = useState(0)
  const [downVotes, setDownVotes] = useState(0)
  const [views, setViews] = useState(0)
  const [totalViews, setTotalViews] = useState(0)
  const [calculationIsDone, setCalculationIsDone] = useState(false)
  const { loading, error, data } = useQuery(ALL_PUBLIC_MEMES_QUERY, {
    variables: {},
    notifyOnNetworkStatusChange: true,
  })

  useEffect(() => {
    console.log({ src: 'TemplateDetails', loading, data, error, memesFromTemplate })
    if (!loading && !error && data && !calculationIsDone) {
      setCalculationIsDone(true)
      let ups = 0
      let downs = 0
      let vs = 0
      let total = 0
      let memesFromTemplateIDs = []
      if (!loading && !error && data?.memes?.length > 0) {
        for (let i = 0; i < data.memes.length; i++) {
          total += data.memes[i].views
          if (data.memes[i].template?.id?._id === templateID) {
            console.log('enter true templateid')
            memesFromTemplateIDs.push(data.memes[i])
            ups += data.memes[i].upVotes.length
            downs += data.memes[i].downVotes.length
            vs += data.memes[i].views
          }
        }
        setMemesFromTemplate(memesFromTemplateIDs)
        setUpVotes(ups)
        setDownVotes(downs)
        setViews(vs)
        setTotalViews(total)
        console.log('res: ', memesFromTemplateIDs)
        console.log('ups, downs, views:', ups, downs, vs)
      }
    }
  }, [data, loading, error, calculationIsDone, setCalculationIsDone, memesFromTemplate, templateID])

  // useEffect(() => {
  //   var ups = 0
  //   var downs = 0
  //   var vs = 0
  //   var total = 0
  //   async function getMemesFromTemplate() {
  //     let memesFromTemplateIDs = []
  //     const datadocs = docs
  //     for (let i = 0; i < datadocs.length; i++) {
  //       total += datadocs[i].views
  //       if (datadocs[i].template.id == templateID) {
  //         console.log('enter true templateid')
  //         memesFromTemplateIDs.push(datadocs[i])
  //         ups += datadocs[i].upVotes.length
  //         downs += datadocs[i].downVotes.length
  //         vs += datadocs[i].views
  //       }
  //     }
  //     return memesFromTemplateIDs
  //   }
  //   getMemesFromTemplate()
  //     .then((res) => {
  //       setMemesFromTemplate(res)
  //       setUpVotes(ups)
  //       setDownVotes(downs)
  //       setViews(vs)
  //       setTotalViews(total)
  //       console.log('res: ', res)
  //       console.log('ups, downs, views:', ups, downs, vs)
  //     })
  //     .catch((e) => console.log({ src: 'getMemesFromTemplates', e }))
  // }, [docs, setMemesFromTemplate, templateID])

  return (
    <div className="template-details">
      <div className="barchart">
        <TemplateStackedBarChart
          ups={upVotes}
          downs={downVotes}
          templateViews={views}
          totalViews={totalViews}
        />
      </div>
      <div className="memes-from-templates">
        {memesFromTemplate &&
          memesFromTemplate.map((meme, i) => (
            <button key={i} className="flex flex-col max-w-md">
              <Link href={`/meme/${meme._id}`}>
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
