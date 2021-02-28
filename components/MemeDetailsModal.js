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

export const MemeDetailsModal = ({ memeId, showDialog, closeDialog }) => {
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
            <MemeDetailsInner memeId={memeId} />
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

const MemeDetailsInner = ({ memeId }) => {
  const [memesFromTemplate, setMemesFromTemplate] = useState([])
  const [forkedFrom, setForkedFrom] = useState([])
  //const [forks, setForks] = useState([])
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
      memeId,
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
          if (data.memes[i]._id === memeId) {
            console.log('enter true memeId')
            memesFromTemplateIDs.push(data.memes[i])
            ups += data.memes[i].upVotes.length
            downs += data.memes[i].downVotes.length
            vs += data.memes[i].views
          }
          if (data.memes[i]._id === memeId && data.memes[i].forkedFrom) {
            setForkedFrom(data.memes.filter((meme) => meme._id === data.memes[i].forkedFrom._id))
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
  }, [data, loading, error, calculationIsDone, setCalculationIsDone, memesFromTemplate, memeId])

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
        {forkedFrom?.length > 0 && <h2 className={'font-medium text-lg my-6'}>Forked from:</h2>}
        {forkedFrom &&
          forkedFrom.map((meme, i) => (
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

MemeDetailsInner.propTypes = {
  memeId: PropTypes.string,
}

MemeDetailsModal.propTypes = {
  showDialog: PropTypes.bool,
  closeDialog: PropTypes.func,
  memeId: PropTypes.string,
}
