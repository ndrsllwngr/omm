import React, { useEffect } from 'react'
import { useTemplate } from '@/components/context/fabricContext'
import { gql, NetworkStatus, useQuery } from '@apollo/client'
import { MEDIA_TYPE } from '@/lib/constants'
import { TemplateDetails } from '@/components/meme-generator/TemplateDetails'

export const ALL_TEMPLATES = gql`
  query getAllTemplates {
    templates(query: {}, sortBy: CREATEDAT_DESC) {
      _id
      createdAt
      createdBy {
        _id
      }
      type
      mediaType
      img
      url
      width
      height
      name
    }
  }
`

export const TemplateCollection = () => {
  const { loading, error, data, networkStatus } = useQuery(ALL_TEMPLATES, {
    variables: {},
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
  })
  const { updateTemplate } = useTemplate()
  const loadingMoreTemplates = networkStatus === NetworkStatus.fetchMore

  useEffect(() => {
    console.log({ src: 'TemplateCollection', data, error, loading })
  }, [data, error, loading])

  if (error) return <div>Error loading templates.</div>
  if (loading && !loadingMoreTemplates) return <div>Loading</div>
  return (
    <>
      <div>
        {data &&
          data.templates.map((template, i) => (
            <div key={i} className={'flex flex-row'}>
              <TemplateDetails templateId={template._id} />
              <button onClick={() => updateTemplate(template)}>
                {template.mediaType === MEDIA_TYPE.VIDEO ? (
                  <video
                    preload="auto"
                    width="150"
                    height="150"
                    controls={true}
                    autoPlay={false}
                    muted={true}
                  >
                    <source src={template.url} type="video/mp4" />
                  </video>
                ) : (
                  <img src={template.url} alt="uploaded image" width="150" height="150" />
                )}
              </button>
            </div>
          ))}
      </div>
    </>
  )
}
