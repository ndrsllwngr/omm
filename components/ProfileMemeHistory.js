import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { VISIBILITY } from '@/lib/constants'
import { MemeRenderer } from '@/components/MemeRenderer'
import Link from 'next/link'
import formatDistance from 'date-fns/formatDistance'
import { useAuth } from '@/components/context/authContext'
import { gql, NetworkStatus, useMutation, useQuery } from '@apollo/client'

export const ALL_PERSONAL_MEMES_QUERY = gql`
  query getAllPersonalMemes($user: UserQueryInput) {
    memes(query: { createdBy: $user, isDraft: false }, sortBy: CREATEDAT_DESC) {
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
      isDraft
      json
      points
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
      url
      views
      visibility
    }
  }
`

const UPDATE_MEME = gql`
  mutation updateMeme($query: MemeQueryInput, $set: MemeUpdateInput!) {
    updateOneMeme(query: $query, set: $set) {
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
      isDraft
      json
      points
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
      url
      views
      visibility
    }
  }
`

const DELETE_MEME = gql`
  mutation deleteMeme($query: MemeQueryInput!) {
    deleteOneMeme(query: $query) {
      _id
    }
  }
`

export const ProfileMemeHistory = ({ className }) => {
  const auth = useAuth()
  const { loading, error, data, networkStatus } = useQuery(ALL_PERSONAL_MEMES_QUERY, {
    variables: { user: { _id: auth.getUser().id } },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
  })
  const [updateOneMeme] = useMutation(UPDATE_MEME)
  const [deleteOneMeme] = useMutation(DELETE_MEME)
  const loadingMoreDrafts = networkStatus === NetworkStatus.fetchMore

  useEffect(() => {
    console.log({ src: 'ProfileMemeHistory', data, error, loading })
  }, [data, error, loading])

  if (error) return <div>Error loading memes.</div>
  if (loading && !loadingMoreDrafts) return <div>Loading</div>
  return (
    <div className={className}>
      {data &&
        data.memes.map((meme, i) => (
          <button key={i} className="flex flex-col max-w-md">
            <p className={'uppercase text-xs text-gray-600 dark:text-gray-300 font-medium'}>
              {formatDistance(new Date(meme.createdAt), new Date(), { addSuffix: true })}
              {meme.visibility && meme.visibility !== VISIBILITY.PUBLIC && (
                <span> - {meme.visibility}</span>
              )}
            </p>
            <div className={'flex flex-col justify-center items-start'}>
              <Link href={`/meme/${meme._id}`}>
                <a className={'flex flex-col justify-center items-start'}>
                  <h1 className={'text-lg font-bold text-black dark:text-white truncate'}>
                    {meme.title ? meme.title : 'Untitled'}
                  </h1>

                  <MemeRenderer meme={meme} />
                </a>
              </Link>
              {meme.visibility !== VISIBILITY.PUBLIC &&
                meme.createdBy._id.toString() === auth.getUser().id.toString() && (
                  <select
                    value={meme.visibility}
                    onChange={(e) =>
                      updateOneMeme({
                        variables: {
                          query: { _id: meme._id },
                          set: { visibility: e.target.value },
                        },
                      })
                        .then((result) => console.log(result))
                        .catch((e) => console.error(e))
                    }
                  >
                    <option value={VISIBILITY.PUBLIC}>Public</option>
                    <option value={VISIBILITY.UNLISTED}>Unlisted</option>
                    <option value={VISIBILITY.PRIVATE}>Private</option>
                  </select>
                )}
              <button
                disabled={meme.createdBy._id.toString() !== auth.getUser().id.toString()}
                onClick={() => {
                  deleteOneMeme({ variables: { query: { _id: meme._id } } })
                    .then((result) => console.log(result))
                    .catch((e) => console.error(e))
                }}
              >
                Delete
              </button>
            </div>
          </button>
        ))}
    </div>
  )
}

ProfileMemeHistory.propTypes = {
  className: PropTypes.string,
}
