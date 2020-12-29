import React, { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { HtmlHead } from '@/components/HtmlHead'
import { Stage, Layer } from 'react-konva'
import { useWindowSize } from '@/components/hooks/useWindowSize'
import { TextBox } from '@/components/editor/TextBox'
import { useImmer } from 'use-immer'

const INITIAL_STATE = [
  {
    template: 'url',
    created_at: '1609268374',
    title: 'My Meme',
    content: [
      {
        id: 1,
        x: 50,
        y: 50,
        width: 50,
        height: 50,
        text: 'Oh no',
        rotation: 0,
        isDragging: false,
        fontSize: 20,
      },
      {
        id: 2,
        title: 'Meme 2',
        x: 50,
        y: 100,
        width: 50,
        height: 50,
        text: 'Fine',
        rotation: 0,
        isDragging: false,
        fontSize: 30,
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

const Edit = () => {
  const { width, height } = useWindowSize()
  const stageRef = useRef(null)
  const layerRef = useRef(null)
  const containerRef = useRef(null)
  const [meme, updateMeme] = useImmer(INITIAL_STATE)
  const [selectedId, selectShape] = useState(null)

  function updateTextAttrs(textAttrs) {
    updateMeme((draft) => {
      console.log({ textAttrs: textAttrs })
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
        console.log({ id, coor, newVal })
        draft[0].content[index][coor] = parseInt(newVal)
      }
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
      <div className="flex flex-row">
        {meme[0].content.map((text, i) => {
          return (
            <div key={i} className="mb-5">
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
              <input
                placeholder=""
                type="number"
                name={`text_${text.id}_coor_x`}
                value={text.x}
                onChange={(event) => updateCoor(text.id, 'x', event.target.value)}
                className="w-full px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:shadow-outline text-gray-600 font-medium"
              ></input>
              <input
                placeholder=""
                type="number"
                name={`text_${text.id}_coor_y`}
                value={text.y}
                onChange={(event) => updateCoor(text.id, 'y', event.target.value)}
                className="w-full px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:shadow-outline text-gray-600 font-medium"
              ></input>
            </div>
          )
        })}
        <div className="mb-5">
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

      <button onClick={handleExport}>Click here to log stage data URL</button>
      <button onClick={toggleMode}>Toggle Edit/View</button>
      <div ref={containerRef} className=".container flex flex-row">
        <Stage
          ref={stageRef}
          width={width}
          height={height}
          onMouseDown={(e) => {
            const clickedOnEmpty = e.target === e.target.getStage()
            if (clickedOnEmpty) {
              selectShape(null)
            }
          }}
        >
          <Layer ref={layerRef}>
            {meme[0].content.map((text, i) => {
              console.log({ src: 'edit.js - map', text, i, selectedId })
              return (
                <TextBox
                  key={i}
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
    </>
  )
}

Edit.propTypes = {
  memes: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string,
      width: PropTypes.number,
      height: PropTypes.number,
      name: PropTypes.string,
    })
  ),
}

export default Edit
