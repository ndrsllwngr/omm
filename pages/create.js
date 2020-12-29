import React, { useEffect, useState, useRef } from 'react'
// import PropTypes from 'prop-types'
import { HtmlHead } from '@/components/HtmlHead'
import { Stage, Layer, Image } from 'react-konva'
import { useWindowSize } from '@/components/hooks/useWindowSize'
import { TextBox } from '@/components/editor/TextBox'
import { useImmer } from 'use-immer'
import useImage from 'use-image'

const TEXT_STATE = {
  id: 0,
  x: 50,
  y: 50,
  width: 50,
  height: 50,
  text: 'Oh no',
  rotation: 0,
  isDragging: false,
  fontSize: 20,
}

const INITIAL_STATE = [
  {
    template: 'https://i.imgflip.com/1if1k1.jpg?a447020',
    created_at: '1609268374',
    title: 'My Meme',
    content: [
      {
        id: 1,
        x: 150,
        y: 64,
        width: 50,
        height: 100,
        text: 'Oh no',
        rotation: 0,
        isDragging: false,
        fontSize: 30,
      },
      {
        id: 2,
        title: 'Meme 2',
        x: 366,
        y: 20,
        width: 150,
        height: 50,
        text: 'This is fine!',
        rotation: 0,
        isDragging: false,
        fontSize: 25,
      },
    ],
    images: [],
  },
]

// Download URI
// function from https://stackoverflow.com/a/15832662/512042
function downloadURI(uri, name) {
  var link = document.createElement('a')
  link.download = name
  link.href = uri
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

const CreatePage = () => {
  const { width, height } = useWindowSize()
  const stageRef = useRef(null)
  const layerRef = useRef(null)
  const containerRef = useRef(null)
  const [meme, updateMeme] = useImmer(INITIAL_STATE)
  const [templateImage] = useImage(meme[0].template, 'Anonymous')
  const [selectedId, selectShape] = useState(null)

  function updateTextAttrs(textAttrs) {
    updateMeme((draft) => {
      const index = draft[0].content.findIndex((el) => el.id === textAttrs.id)
      if (index !== -1) {
        draft[0].content[index] = textAttrs
      }
    })
  }

  function updateTextValue(id, newText) {
    updateMeme((draft) => {
      const index = draft[0].content.findIndex((el) => el.id === id)
      if (index !== -1) {
        draft[0].content[index].text = newText
      }
    })
  }

  function updateTitle(newVal) {
    updateMeme((draft) => {
      draft[0].title = newVal
    })
  }

  function updateCoor(id, coor, newVal) {
    updateMeme((draft) => {
      const index = draft[0].content.findIndex((el) => el.id === id)
      if (index !== -1) {
        draft[0].content[index][coor] = parseInt(newVal)
      }
    })
  }

  function addText() {
    updateMeme((draft) => {
      const currentMaxId = draft[0].content.reduce((prev, current) =>
        prev.id > current.id ? prev : current
      )
      const newId = currentMaxId.id + 1
      draft[0].content.push({ ...TEXT_STATE, id: newId })
    })
  }

  useEffect(() => {
    console.log({ src: 'edit.js - useEffect', meme })
  }, [meme])

  useEffect(() => {
    console.log({ src: 'edit.js - useEffect', selectedId })
  }, [selectedId])

  // drag start function
  // const handleDragStart = (e) => {
  //   // TODO
  //   // set the pressed item to dragging = true
  //   const id = e.target.id()
  //   setItems(
  //     items.map((item) => {
  //       return {
  //         ...item,
  //         isDragging: item.id === id,
  //       }
  //     })
  //   )
  // }

  // // drag end function
  // const handleDragEnd = (e) => {
  //   // TODO
  //   // set all items to dragging = false
  //   setItems(
  //     items.map((item) => {
  //       return {
  //         ...item,
  //         isDragging: false,
  //       }
  //     })
  //   )
  // }

  // export function
  const handleExport = () => {
    const uri = stageRef.current.toDataURL()
    console.log(uri)
    // we also can save uri as file
    // but in the demo on Konva website it will not work
    // because of iframe restrictions
    // but feel free to use it in your apps:
    downloadURI(uri, 'stage.png')
  }

  const toggleMode = () => {}
  return (
    <>
      <HtmlHead />
      {/* Top caption input */}
      <div className="flex flex-row pt-5">
        <div ref={containerRef} className="flex flex-row w-1/2">
          <Stage
            ref={stageRef}
            width={500}
            height={500}
            onMouseDown={(e) => {
              const clickedOnEmpty = e.target === e.target.getStage()
              if (clickedOnEmpty) {
                selectShape(null)
              }
            }}
          >
            <Layer>
              <Image image={templateImage}></Image>
            </Layer>
            <Layer ref={layerRef}>
              {meme[0].content.map((text, i) => {
                console.log({ src: 'edit.js - map', text, i, selectedId })
                return (
                  <TextBox
                    key={text.id}
                    layerRef={layerRef.current}
                    containerRef={containerRef.current}
                    textProps={{ ...text }}
                    isSelected={text.id === selectedId}
                    onSelect={() => {
                      console.log(text.id)
                      selectShape(text.id)
                    }}
                    onChange={(newAttrs) => {
                      updateTextAttrs(newAttrs)
                    }}
                  />
                )
              })}
            </Layer>
          </Stage>
        </div>
        <div className="flex flex-col w-1/2">
          <div className="flex flex-row mb-5">
            <div className="flex flex-col">
              <label htmlFor="caption_1" className="font-bold mb-1 text-gray-700 block">
                Title
              </label>
              <input
                placeholder=""
                type="text"
                name={`title`}
                value={meme[0].title}
                onChange={(event) => updateTitle(event.target.value)}
                className="w-full px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:shadow-outline text-gray-600 font-medium"
              ></input>
            </div>
          </div>
          {meme[0].content.map((text, i) => {
            return (
              <div key={text.id} className="flex flex-row">
                <div className="flex flex-col mb-5">
                  <div className="flex flex-col mb-2">
                    <label htmlFor="caption_1" className="font-bold mb-1 text-gray-700 block">
                      Text {text.id}
                    </label>
                    <input
                      placeholder=""
                      type="text"
                      name={`text_${text.id}`}
                      value={text.text}
                      onChange={(event) => updateTextValue(text.id, event.target.value)}
                      className="w-full px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:shadow-outline text-gray-600 font-medium"
                    ></input>
                  </div>
                  <div className="flex flex-row space-x-2">
                    <div className="flex relative">
                      <span className="inline-flex items-center px-4 py-3 rounded-l-lg shadow-sm focus:outline-none focus:shadow-outline text-gray-600 font-source font-medium bg-gray-100">
                        X
                      </span>
                      <input
                        placeholder=""
                        type="number"
                        name={`text_${text.id}_coor_x`}
                        value={text.x}
                        onChange={(event) => updateCoor(text.id, 'x', event.target.value)}
                        className="w-full px-4 py-3 rounded-r-lg shadow-sm focus:outline-none focus:shadow-outline text-gray-600 font-medium"
                      ></input>
                    </div>
                    <div className="flex relative ">
                      <span className="inline-flex items-center px-4 py-3 rounded-l-lg shadow-sm focus:outline-none focus:shadow-outline text-gray-600 font-source font-medium bg-gray-100">
                        Y
                      </span>
                      <input
                        placeholder=""
                        type="number"
                        name={`text_${text.id}_coor_y`}
                        value={text.y}
                        onChange={(event) => updateCoor(text.id, 'y', event.target.value)}
                        className="w-full px-4 py-3 rounded-r-lg shadow-sm focus:outline-none focus:shadow-outline text-gray-600 font-medium"
                      ></input>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}

          <div className="flex flex-row space-x-5 mt-5">
            <button
              className="bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white transition ease-in duration-200 text-center text-base font-semibold py-2 px-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2"
              onClick={addText}
            >
              Add text
            </button>
            <button
              className="bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white transition ease-in duration-200 text-center text-base font-semibold py-2 px-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2"
              onClick={handleExport}
            >
              Download
            </button>
            <button
              className="bg-green-600 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200 text-white transition ease-in duration-200 text-center text-base font-semibold py-2 px-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2"
              onClick={handleExport}
            >
              Generate
            </button>
            <button
              className="bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500 focus:ring-offset-yellow-200 text-white transition ease-in duration-200 text-center text-base font-semibold py-2 px-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2"
              onClick={toggleMode}
            >
              Toggle Edit/View
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default CreatePage
