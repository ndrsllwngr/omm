import React, { useEffect, useRef } from 'react'
import { useTemplateContext } from '@/components/context/viewsContext'
import { useDetectOutsideClick } from '@/components/hooks/useDetectOutsideClick'
import { gql, useQuery } from '@apollo/client'

export const ALL_PUBLIC_TEMPLATES_QUERY = gql`
  query getAllTemplates($query: MemeQueryInput, $sortBy: MemeSortByInput) {
    memes(query: $query, sortBy: $sortBy) {
      template {
        url
      }
    }
  }
`

export const TemplateFilter = () => {
  const { data } = useQuery(ALL_PUBLIC_TEMPLATES_QUERY, {
    notifyOnNetworkStatusChange: true,
  })

  useEffect(() => {
    console.log({ DATA: data })
  }, [data])

  const { template, setTemplate } = useTemplateContext()

  const dropdownRef = useRef(null)
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false)
  const onClick = () => setIsActive(!isActive)

  /*const [selectedTemplate, setSelectedTemplate] = useState('')*/

  const handleTemplateChange = (newTemplate) => {
    if (template !== newTemplate) {
      setTemplate(newTemplate)
      /*setSelectedTemplate(newTemplate)*/
      setIsActive(false)
    }
  }

  return (
    <div className="flex flex-row justify-end items-center">
      <div className="flex relative">
        <img className="h-8" src={template} />
        <button
          type="button"
          className="inline-flex justify-center w-full border-b-2 shadow-sm px-4 py-2 bg-transparent text-sm font-medium text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-200 focus:ring-gray-200"
          id="options-menu"
          aria-haspopup="true"
          aria-expanded="true"
          onClick={onClick}
        >
          Select Template
          {/* <!-- Heroicon name: chevron-down --> */}
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
                onClick={() => handleTemplateChange('')}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
              >
                Reset
              </div>

              {data.memes.map((meme, index) => {
                console.log({ URL: meme.template?.url })

                return (
                  <div
                    key={index}
                    //setzt heir ne id rein
                    onClick={() => handleTemplateChange(meme.template?.url)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    role="menuitem"
                  >
                    <img className={'w-full'} src={meme.template?.url} />
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
