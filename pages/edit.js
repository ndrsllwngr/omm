import React, { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { HtmlHead } from '@/components/HtmlHead'
import { Stage, Layer, Text } from 'react-konva'
import { useWindowSize } from '@/components/hooks/useWindowSize'
import { TextBox } from '@/components/editor/TextBox'

const INITIAL_STATE = [
  {
    id: 1,
    x: 50,
    y: 50,
    width: 50,
    height: 50,
    text: 'oh no',
    rotation: 0,
    isDragging: false,
    fontSize: 20,
  },
  {
    id: 2,
    x: 50,
    y: 100,
    width: 50,
    height: 50,
    text: 'hi',
    rotation: 0,
    isDragging: false,
    fontSize: 30,
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
  const [items, setItems] = useState(INITIAL_STATE)
  const [texts, setTexts] = useState(INITIAL_STATE)
  const [caption1Text, setCaption1Text] = useState('1')
  const [caption2Text, setCaption2Text] = useState('2')
  const [selectedId, selectShape] = React.useState(null)

  useEffect(() => {
    console.log({ src: 'edit.js - useEffect', texts })
  }, [texts])

  useEffect(() => {
    console.log({ src: 'edit.js - useEffect', selectedId })
  }, [selectedId])

  // useEffect(() => {
  //   // place items randomly on canvas
  //   setItems(generateShapes(width, height))
  // }, [height, width])

  // drag start function
  const handleDragStart = (e) => {
    // TODO
    // set the pressed item to dragging = true
    const id = e.target.id()
    setItems(
      items.map((item) => {
        return {
          ...item,
          isDragging: item.id === id,
        }
      })
    )
  }

  // drag end function
  const handleDragEnd = (e) => {
    // TODO
    // set all items to dragging = false
    setItems(
      items.map((item) => {
        return {
          ...item,
          isDragging: false,
        }
      })
    )
  }

  const handleText = (target, value) => {
    if (target === 'caption1Text') {
      setCaption1Text(value)
    } else {
      setCaption2Text(value)
    }
  }

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
      <div className="mb-5">
        <label htmlFor="caption_1" className="font-bold mb-1 text-gray-700 block">
          Top text
        </label>
        <input
          placeholder=""
          type="text"
          name="caption_1"
          value={caption1Text}
          onChange={(event) => handleText('caption1Text', event.target.value)}
          className="w-full px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:shadow-outline text-gray-600 font-medium"
        ></input>
      </div>
      {/* Bottom caption input */}
      <div className="mb-5">
        <label htmlFor="caption_2" className="font-bold mb-1 text-gray-700 block">
          Bottom text
        </label>
        <input
          placeholder=""
          type="text"
          name="caption_2"
          value={caption2Text}
          onChange={(event) => handleText('caption2Text', event.target.value)}
          className="w-full px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:shadow-outline text-gray-600 font-medium"
        ></input>
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
            <Text text="Try to drag a star" />
            {texts.map((text, i) => {
              console.log({ src: 'edit.js - map', text, i, selectedId })
              return (
                <TextBox
                  key={i}
                  layerRef={layerRef.current}
                  stageRef={stageRef.current}
                  containerRef={containerRef.current}
                  shapeProps={{ ...text }}
                  isSelected={text.id === selectedId}
                  onSelect={() => {
                    console.log(text.id)
                    selectShape(text.id)
                  }}
                  onChange={(newAttrs) => {
                    const textArr = texts.slice()
                    console.log({ src: 'edit.js - onChange', newAttrs })
                    textArr[i] = newAttrs
                    setTexts(textArr)
                  }}
                />
              )
            })}
          </Layer>
          {/* <Layer>
          {items &&
            items.map((item) => (
              <Star
                key={item.id}
                id={item.id}
                x={item.x}
                y={item.y}
                numPoints={5}
                innerRadius={20}
                outerRadius={40}
                fill="#89b717"
                opacity={0.8}
                draggable
                rotation={item.rotation}
                shadowColor="black"
                shadowBlur={10}
                shadowOpacity={0.6}
                shadowOffsetX={item.isDragging ? 10 : 5}
                shadowOffsetY={item.isDragging ? 10 : 5}
                scaleX={item.isDragging ? 1.2 : 1}
                scaleY={item.isDragging ? 1.2 : 1}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
              />
            ))}
        </Layer> */}
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
