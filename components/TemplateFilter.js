import React, { useEffect, useRef } from 'react'
import { useTemplateContext } from '@/components/context/viewsContext'
import { useDetectOutsideClick } from '@/components/hooks/useDetectOutsideClick'
import { gql, useQuery } from '@apollo/client'
import { MEDIA_TYPE } from '@/lib/constants'
//Query all templates
export const ALL_PUBLIC_TEMPLATES_QUERY = gql`
  query getAllTemplates($query: TemplateQueryInput, $sortBy: TemplateSortByInput) {
    templates(query: $query, sortBy: $sortBy) {
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
  }
`
// Get templates from database
export const TemplateFilter = () => {
  const { data } = useQuery(ALL_PUBLIC_TEMPLATES_QUERY, {
    notifyOnNetworkStatusChange: true,
  })

  useEffect(() => {
    console.log({ src: 'TemplateFilter', data })
  }, [data])

  // Get template state and set function from context
  const { template, setTemplate } = useTemplateContext()
  // Init reference to html element
  const dropdownRef = useRef(null)
  // Get outside click detection hook to close dropdown
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false)
  // Open and close dropdown
  const onClick = () => setIsActive(!isActive)
  // Handles changes to template filter
  const handleTemplateChange = (newTemplate) => {
    if (template !== newTemplate) {
      setTemplate(newTemplate)
      setIsActive(false)
    }
  }

  return (
    <div className="flex flex-row justify-end items-center">
      <div className="flex relative">
        {template?.mediaType === MEDIA_TYPE.IMAGE && <img className={'h-8'} src={template?.url} />}
        {template?.mediaType === MEDIA_TYPE.VIDEO && (
          <video
            preload="auto"
            width="32"
            height="32"
            controls={false}
            autoPlay={false}
            muted={true}
          >
            <source src={template?.url} type="video/mp4" />
          </video>
        )}
        <button
          type="button"
          className="inline-flex justify-center w-full border-b-2 shadow-sm px-4 py-2 bg-transparent text-sm font-medium text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-200 focus:ring-gray-200"
          id="options-menu"
          aria-haspopup="true"
          aria-expanded="true"
          onClick={onClick}
        >
          Select Template
          <svg
            className="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        {isActive && (
          <div
            ref={dropdownRef}
            className="origin-top-right absolute right-0 mt-10 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"
          >
            <div
              className="py-1 h-80 overflow-auto"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              <div
                onClick={() => handleTemplateChange(null)}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
              >
                Reset
              </div>

              {data.templates.map((template, index) => (
                <div
                  key={index}
                  onClick={() => handleTemplateChange(template)}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                >
                  {template.mediaType === MEDIA_TYPE.IMAGE && (
                    <img className={'w-full'} src={template.url} />
                  )}
                  {template.mediaType === MEDIA_TYPE.VIDEO && (
                    <video
                      preload="auto"
                      width="150"
                      height="150"
                      controls={false}
                      autoPlay={false}
                      muted={true}
                    >
                      <source src={template.url} type="video/mp4" />
                    </video>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
