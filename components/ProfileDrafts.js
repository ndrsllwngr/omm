import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { MemeRenderer } from '@/components/MemeRenderer'
import { useFabricJson } from '@/components/context/fabricContext'
import { useRouter } from 'next/router'
import formatDistance from 'date-fns/formatDistance'
import { gql, NetworkStatus, useQuery } from '@apollo/client'
import { useAuth } from '@/components/context/authContext'

export const ALL_PERSONAL_DRAFTS_QUERY = gql`
  query getAllPersonalDrafts($user: UserQueryInput) {
    drafts(query: { createdBy: $user }, sortBy: CREATEDAT_DESC) {
      _id
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

export const ProfileDrafts = ({ className }) => {
  const auth = useAuth()
  const { loading, error, data, networkStatus } = useQuery(ALL_PERSONAL_DRAFTS_QUERY, {
    variables: { user: { _id: auth.user.id } },
    // Setting this value to true will make the component rerender when
    // the "networkStatus" changes, so we are able to know if it is fetching
    // more data
    notifyOnNetworkStatusChange: true,
  })
  const loadingMoreDrafts = networkStatus === NetworkStatus.fetchMore
  const router = useRouter()
  const { setJson } = useFabricJson()

  useEffect(() => {
    console.log({ src: 'ProfileDrafts', data, error, loading })
  }, [data, error, loading])

  if (error) return <div>Error loading drafts.</div>
  if (loading && !loadingMoreDrafts) return <div>Loading</div>
  return (
    <div className={className}>
      {data &&
        data.drafts.map((draft, i) => (
          <button
            key={i}
            className="flex flex-col max-w-md"
            onClick={() => {
              setJson(draft)
              deleteDoc(draft.id)
                .then((doc) => {
                  console.log('Document successfully deleted!')
                  router.push('/create')
                })
                .catch((e) => console.error('Error removing document: ', e))
            }}
          >
            <p className={'uppercase text-xs text-gray-600 dark:text-gray-300 font-medium'}>
              {formatDistance(new Date(draft.createdAt), new Date(), { addSuffix: true })}
            </p>
            <h1 className={'text-lg font-bold text-black dark:text-white truncate'}>
              {draft.title ? draft.title : 'Untitled'}
            </h1>
            <MemeRenderer meme={draft} />
          </button>
        ))}
    </div>
  )
}

ProfileDrafts.propTypes = {
  className: PropTypes.string,
}
