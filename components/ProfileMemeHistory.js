import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { VISIBILITY } from '@/lib/constants'
import { MemeRenderer } from '@/components/MemeRenderer'
import Link from 'next/link'
import formatDistance from 'date-fns/formatDistance'
import { useAuth } from '@/components/context/authContext'
import { gql, NetworkStatus, useQuery } from '@apollo/client'

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
        id {
          _id
        }
      }
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

export const ProfileMemeHistory = ({ className }) => {
  const auth = useAuth()
  const { loading, error, data, networkStatus } = useQuery(ALL_PERSONAL_MEMES_QUERY, {
    variables: { user: { _id: auth.getUser().id } },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
  })
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
  )
}

ProfileMemeHistory.propTypes = {
  className: PropTypes.string,
}
