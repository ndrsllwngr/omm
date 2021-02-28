import React, { useEffect, useState } from 'react'
import { TertiaryBtn } from '@/components/ui/Buttons'
import { Dialog } from '@reach/dialog'
import VisuallyHidden from '@reach/visually-hidden'
import { IoClose } from 'react-icons/io5'
import PropTypes from 'prop-types'
import { gql, useQuery } from '@apollo/client'
import { TemplateStackedBarChart } from '@/components/TemplateStackedBarChart'
import Link from 'next/link'
import { MemeRenderer } from '@/components/MemeRenderer'

export const TemplateDetailsModal = ({ templateId, showDialog, closeDialog }) => {
  return (
    <>
      <Dialog isOpen={showDialog} onDismiss={closeDialog}>
        <div className={'flex flex-col'}>
          <div className={'flex flex-row justify-end'}>
            <TertiaryBtn className="close-button" onClick={closeDialog}>
              <VisuallyHidden>Close</VisuallyHidden>
              <span aria-hidden>
                <IoClose />
              </span>
            </TertiaryBtn>
          </div>
          <div>
            <TemplateDetailsInner templateId={templateId} />
          </div>
        </div>
      </Dialog>
    </>
  )
}

export const ALL_PUBLIC_MEMES_QUERY = gql`
  query getAllPublicMemes {
    memes(query: { visibility: "PUBLIC", isDraft: false }, sortBy: CREATEDAT_DESC) {
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
      captions
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

const TemplateDetailsInner = ({ templateId }) => {
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
    console.log({
      src: 'meme-generator/TemplateDetails',
      loading,
      data,
      error,
      memesFromTemplate,
      templateId,
    })
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
          if (data.memes[i].template?._id === templateId) {
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
        console.log({ src: 'TemplateDetailsInner', ups, downs, vs, total, memesFromTemplateIDs })
      }
    }
  }, [data, loading, error, calculationIsDone, setCalculationIsDone, memesFromTemplate, templateId])

  return (
    <div className="template-details">
      <h2 className={'font-medium text-lg my-6'}>Chart:</h2>
      <div className="barchart">
        <TemplateStackedBarChart
          ups={upVotes}
          downs={downVotes}
          templateViews={views}
          totalViews={totalViews}
        />
      </div>
      <div className="memes-from-templates">
        <h2 className={'font-medium text-lg my-6'}>Memes which use this template:</h2>
        {memesFromTemplate &&
          memesFromTemplate.map((meme, i) => (
            <button key={i} className="flex flex-col max-w-md">
              <Link href={`/meme/${meme._id}`}>
                <a className={'flex flex-col justify-center items-start'}>
                  <h1 className={'text-lg font-bold text-black dark:text-white truncate'}>
                    {meme.title}
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

TemplateDetailsInner.propTypes = {
  templateId: PropTypes.string,
}

TemplateDetailsModal.propTypes = {
  showDialog: PropTypes.bool,
  closeDialog: PropTypes.func,
  templateId: PropTypes.string,
}
