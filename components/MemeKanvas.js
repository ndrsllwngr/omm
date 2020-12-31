import React, { useEffect, useState, useRef } from 'react'
import { Stage, Layer } from 'react-konva'
// import { useWindowSize } from '@/components/hooks/useWindowSize'
import { TextBox } from '@/components/kanvas-utils/TextBox'
import { MemeTemplate } from '@/components/kanvas-utils/MemeTemplate'
import { useImmer } from 'use-immer'
import { MEME_KANVAS_NEW_TEXT, MEME_KANVAS_INITIAL_STATE } from '@/lib/constants'
import { MemeRenderer } from '@/components/MemeRenderer'
import { DropDown } from '@/components/DropDown'
import { ColorPicker } from '@/components/ColorPicker'

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

export const MemeKanvas = () => {
  // const { width, height } = useWindowSize()
  const stageRef = useRef(null)
  const layerRef = useRef(null)
  const containerRef = useRef(null)
  const [meme, updateMeme] = useImmer(MEME_KANVAS_INITIAL_STATE)
  const [selectedId, selectShape] = useState(null)
  const [previewMode, setPreviewMode] = useState(false)

  function updateTextAttrs(textAttrs) {
    updateMeme((draft) => {
      const index = draft.content.findIndex((el) => el.id === textAttrs.id)
      if (index !== -1) {
        draft.content[index] = textAttrs
      }
    })
  }

  function updateTitle(newVal) {
    updateMeme((draft) => {
      draft.title = newVal
    })
  }

  function updateValue(id, key, newVal) {
    updateMeme((draft) => {
      const index = draft.content.findIndex((el) => el.id === id)
      if (index !== -1) {
        draft.content[index][key] = newVal
      }
    })
  }

  function addText() {
    updateMeme((draft) => {
      const currentMaxId = draft.content.reduce((prev, current) =>
        prev.id > current.id ? prev : current
      )
      const newId = currentMaxId.id + 1
      draft.content.push({ ...MEME_KANVAS_NEW_TEXT, id: newId })
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

  return (
    <>
      <div className="flex flex-row pt-5 bg-custom-gray">
        {!previewMode ? (
          <div ref={containerRef} className="flex flex-row w-1/2">
            <Stage
              ref={stageRef}
              width={500}
              height={500}
              onMouseDown={(e) => {
                // TODO @NDRS reset selectedShape properly
                const clickedOnEmpty = e.target === e.target.getStage()
                if (clickedOnEmpty) {
                  selectShape(null)
                }
              }}
            >
              <Layer>
                <MemeTemplate templateUrl={meme.template} />
              </Layer>
              <Layer ref={layerRef}>
                {meme.content.map((text, i) => {
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
        ) : (
          <div className="flex flex-row w-1/2">
            <MemeRenderer meme={meme} />
          </div>
        )}
        <div className="flex flex-col w-1/2">
          <div className="flex flex-row mb-5">
            <div className="flex flex-col">
              <label htmlFor="caption_1" className="font-bold mb-1 text-gray-50 block">
                Title
              </label>
              <input
                placeholder=""
                type="text"
                name={`title`}
                value={meme.title}
                onChange={(event) => updateTitle(event.target.value)}
                className="w-full px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:shadow-outline text-gray-600 font-medium"
              />
            </div>
          </div>
          {meme.content.map((text, i) => {
            return (
              <div key={text.id} className="flex flex-row">
                <div className="flex flex-col mb-5">
                  <div className="flex flex-col mb-2">
                    <label htmlFor="caption_1" className="font-bold mb-1 text-gray-50 block">
                      Text {text.id}
                    </label>
                    <input
                      placeholder=""
                      type="text"
                      name={`text_${text.id}`}
                      value={text.text}
                      onChange={(event) => updateValue(text.id, 'text', event.target.value)}
                      className="w-full px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:shadow-outline text-gray-600 font-medium"
                    />
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
                        onChange={(event) =>
                          updateValue(text.id, 'x', parseInt(event.target.value))
                        }
                        className="w-full px-4 py-3 rounded-r-lg shadow-sm focus:outline-none focus:shadow-outline text-gray-600 font-medium"
                      />
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
                        onChange={(event) =>
                          updateValue(text.id, 'y', parseInt(event.target.value))
                        }
                        className="w-full px-4 py-3 rounded-r-lg shadow-sm focus:outline-none focus:shadow-outline text-gray-600 font-medium"
                      />
                    </div>
                    <div className="flex relative ">
                      <span className="inline-flex items-center px-4 py-3 rounded-l-lg shadow-sm focus:outline-none focus:shadow-outline text-gray-600 font-source font-medium bg-gray-100">
                        FONT
                      </span>
                      <input
                        placeholder=""
                        type="number"
                        name={`text_${text.id}_font_size`}
                        value={text.fontSize}
                        onChange={(event) =>
                          updateValue(text.id, 'fontSize', parseInt(event.target.value))
                        }
                        className="w-full px-4 py-3 rounded-r-lg shadow-sm focus:outline-none focus:shadow-outline text-gray-600 font-medium"
                      />
                    </div>
                  </div>
                  <div className="flex flex-row space-x-2">
                    <div className="flex relative ">
                      <DropDown
                        currentStyle={text.fontStyle}
                        options={['normal', 'bold', 'italic']}
                        cb={(style) => updateValue(text.id, 'fontStyle', style)}
                      />
                    </div>
                    <div className="flex relative">
                      <ColorPicker
                        selectedColor={text.fill}
                        cb={(color) => updateValue(text.id, 'fill', color)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )
          })}

          <div className="flex flex-row space-x-5 mt-5">
            <button
              className="bg-custom-green hover:bg-green-400 focus:ring-custom-green focus:ring-offset-custom-green text-custom-gray transition ease-in duration-200 text-center text-base font-semibold py-2 px-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2"
              onClick={addText}
            >
              Add text
            </button>
            <button
              className="bg-custom-green hover:bg-green-400 focus:ring-custom-green focus:ring-offset-custom-green text-custom-gray transition ease-in duration-200 text-center text-base font-semibold py-2 px-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2"
              onClick={handleExport}
            >
              Download
            </button>
            <button
              disabled={true}
              className="bg-gray-600 hover:bg-gray-700 focus:ring-gray-500 focus:ring-offset-gray-200 text-white transition ease-in duration-200 text-center text-base font-semibold py-2 px-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2"
              onClick={handleExport}
            >
              Generate
            </button>
            <button
              className="bg-gray-600 hover:bg-gray-700 focus:ring-gray-500 focus:ring-offset-gray-200 text-white transition ease-in duration-200 text-center text-base font-semibold py-2 px-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2"
              onClick={() => setPreviewMode(!previewMode)}
            >
              {previewMode ? 'Edit' : 'Preview'}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
