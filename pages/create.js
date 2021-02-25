import React, { useCallback, useState } from 'react'
import { HtmlHead } from '@/components/HtmlHead'
import { Navbar } from '@/components/Navbar'
import { MemeEditor } from '@/components/meme-generator/MemeEditor'
import { TemplateCollection } from '@/components/template-generator/TemplateCollection'
import { ProtectedRoute } from '@/components/context/authContext'
import { ImgFlipCollection } from '@/components/template-generator/ImgFlipCollection'
import { AddTemplate } from '@/components/meme-generator/AddTemplate'

const CreatePage = () => {
  const [openTab, setOpenTab] = useState(1)

  return (
    <>
      <ProtectedRoute>
        <HtmlHead title={'Create a New Meme'} />
        <Navbar />
        <div className="p-8 grid grid-cols-12 gap-6">
          <div className="col-span-9 h-full rounded-lg bg-gray-100 flex items-start justify-center space-x-2 pl-2">
            <MemeEditor />
          </div>
          <div className="col-span-3 h-full rounded-lg bg-gray-100 items-start justify-center space-x-2 pl-2">
            <AddTemplate />
            <ul className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row" role="tablist">
              <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                <a
                  className={
                    'text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal ' +
                    (openTab === 1 ? 'text-white bg-gray-600' : 'text-gray-600 bg-white')
                  }
                  onClick={(e) => {
                    e.preventDefault()
                    setOpenTab(1)
                  }}
                  data-toggle="tab"
                  href="#link1"
                  role="tablist"
                >
                  Templates
                </a>
              </li>
              <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                <a
                  className={
                    'text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal ' +
                    (openTab === 2 ? 'text-white bg-gray-600' : 'text-gray-600 bg-white')
                  }
                  onClick={(e) => {
                    e.preventDefault()
                    setOpenTab(2)
                  }}
                  data-toggle="tab"
                  href="#link2"
                  role="tablist"
                >
                  ImgFlip API
                </a>
              </li>
            </ul>
            <div className="relative flex flex-col min-w-0 break-words">
              <div className="flex-auto">
                <div className="tab-content tab-space">
                  <div className={openTab === 1 ? 'block' : 'hidden'} id="link1">
                    <div className="col-span-3 h-full rounded-lg bg-gray-100 flex items-start justify-center flex space-x-2 overflow-y-auto max-h-screen">
                      <TemplateCollection />
                    </div>
                  </div>
                  <div className={openTab === 2 ? 'block' : 'hidden'} id="link2">
                    <div className="col-span-3 h-full rounded-lg bg-gray-100 flex items-start justify-center flex space-x-2 overflow-y-auto max-h-screen">
                      <ImgFlipCollection />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    </>
  )
}

export default CreatePage
