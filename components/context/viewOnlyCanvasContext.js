import React, { useCallback, createContext, useState, useContext, useRef } from 'react'
import { fabric } from 'fabric'
import PropTypes from 'prop-types'
import { MEDIA_TYPE } from '@/lib/constants'

const ViewOnlyCanvasJsonContext = createContext({})
const ViewOnlyCanvasCanvasContext = createContext({})

// https://github.com/saninmersion/react-context-fabricjs
export const ViewOnlyCanvasProvider = ({ children }) => {
  const [canvas, setCanvas] = useState(null)
  const [json, setJson] = useState(null)
  const canvasRef = useRef(null)

  const loadFromJSON = useCallback(
    (meme) => {
      console.log({ src: 'loadFromJSON.updateTemplate', meme })
      const json = JSON.parse(meme.json)
      let c = new fabric.StaticCanvas(canvasRef.current)
      const jsonStr = JSON.stringify(json)
      c.loadFromJSON(
        jsonStr,
        meme.template.id.mediaType === MEDIA_TYPE.VIDEO
          ? function canvasLoaded() {
              c.renderAll.bind(c)
              let objs = json['objects']
              for (let i = 0; i < objs.length; i++) {
                if (objs[i].hasOwnProperty('video_src')) {
                  function getVideoElement(element) {
                    let videoE = document.createElement('video')
                    videoE.width = element.width
                    videoE.height = element.height
                    videoE.muted = false
                    videoE.loop = true
                    videoE.controls = true
                    //videoE.crossOrigin = 'anonymous'
                    let source = document.createElement('source')
                    source.src = element.video_src
                    source.type = 'video/mp4'
                    videoE.appendChild(source)
                    return videoE
                  }
                  let videoE = getVideoElement(objs[i])
                  let fab_video = new fabric.Image(videoE, {
                    left: objs[i]['left'],
                    top: objs[i]['top'],
                    selectable: false,
                    objectCaching: false,
                  })
                  c.add(fab_video)
                  fab_video.getElement().play()
                  fabric.util.requestAnimFrame(function render() {
                    c.renderAll()
                    fabric.util.requestAnimFrame(render)
                  })
                }
              }
            }
          : () => {
              c.renderAll.bind(c)
              c.setWidth(json.width)
              c.setHeight(json.height)
            },
        function (o, object) {
          object.set('selectable', false)
          fabric.log('fabric.log', o, object)
        }
      )
      c.renderAll()
      c.calcOffset()
      setCanvas(c)
      console.log({ src: 'FabricProvider.loadFromJSON', json, canvas })
    },
    [canvasRef, canvas]
  )

  const resetCanvas = useCallback(() => {
    setCanvas(null)
    console.log({ src: 'FabricProvider.resetCanvas', canvas, canvasRef: canvasRef.current })
  }, [canvas, canvasRef])

  return (
    <ViewOnlyCanvasJsonContext.Provider value={{ json, setJson }}>
      <ViewOnlyCanvasCanvasContext.Provider
        value={{
          canvas,
          loadFromJSON,
          canvasRef,
          resetCanvas,
        }}
      >
        {children}
      </ViewOnlyCanvasCanvasContext.Provider>
    </ViewOnlyCanvasJsonContext.Provider>
  )
}

ViewOnlyCanvasProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export function useViewOnlyCanvasJson() {
  const context = useContext(ViewOnlyCanvasJsonContext)
  if (!context) {
    throw new Error(`useViewOnlyCanvasJson must be used within a ViewOnlyCanvasProvider`)
  }
  return context
}

export function useViewOnlyCanvasCanvas() {
  const context = useContext(ViewOnlyCanvasCanvasContext)
  if (!context) {
    throw new Error(`useViewOnlyCanvasCanvas must be used within a ViewOnlyCanvasProvider`)
  }
  return context
}
