import React, { useCallback, createContext, useState, useContext, useRef, useMemo } from 'react'
import { fabric } from 'fabric'
import PropTypes from 'prop-types'
// import { initAligningGuidelines } from '@/components/meme/Guidelines'

const FabricJsonContext = createContext({})
const FabricCanvasContext = createContext({})
const FabricActiveObjectContext = createContext({})
const TemplateContext = React.createContext({})

// TODO verify that this is everything we need
const emptyState = {
  id: '',
  url:
    'https://firebasestorage.googleapis.com/v0/b/online-multimedia.appspot.com/o/templates%2Fv3ZLEFAnGCJr1PMsdaPO?alt=media&token=d53c3291-070a-4064-a9d5-6e17d0f75e93',
}

const textOptions = {
  width: 200,
  top: 10,
  left: 10,
  fontSize: 24,
  fontWeight: 'normal',
  fontStyle: 'normal',
  textAlign: 'center',
  fontFamily: 'arial',
  textDecoration: 'normal',
  fill: '#000000',
}

// https://github.com/saninmersion/react-context-fabricjs
export const FabricProvider = ({ children }) => {
  const [canvas, setCanvas] = useState(null)
  const [json, setJson] = useState(null)
  const [isCopy, setIsCopy] = useState(null)
  const canvasRef = useRef(null)
  const [activeObject, setActiveObject] = useState(null)
  const [templateContext, setTemplateContext] = useState(emptyState)
  const [template, setTemplate] = useMemo(() => [templateContext, setTemplateContext], [
    templateContext,
  ])

  const initCanvas = useCallback(
    (options = {}) => {
      const canvasOptions = {
        preserveObjectStacking: true,
        selection: true,
        defaultCursor: 'default',
        backgroundColor: 'white',
        enableRetinaScaling: true,
        ...options,
      }
      let c = new fabric.Canvas(canvasRef.current, canvasOptions)
      c.renderAll()
      const textBoxTop = new fabric.Textbox('Add your text here', {
        ...textOptions,
        top: options.height - 30 - 10,
        width: options.width,
        left: 0,
      })
      const textBoxBottom = new fabric.Textbox('Add your text here', {
        ...textOptions,
        width: options.width,
        left: 0,
      })
      c.add(textBoxTop)
      c.add(textBoxBottom)
      c.renderAll()
      setCanvas(c)
      console.log({ src: 'FabricProvider.initCanvas', options, canvas, canvasRef })
    },
    [canvasRef, canvas]
  )

  const loadFromJSON = useCallback(
    (meme) => {
      console.log({ src: 'loadFromJSON.updateTemplate', template: meme.template })
      setTemplate(meme.template)
      const json = meme.json
      let c = new fabric.Canvas(canvasRef.current)
      const jsonStr = JSON.stringify(json)
      c.loadFromJSON(
        jsonStr,
        () => {
          c.renderAll.bind(c)
          c.setWidth(json.width)
          c.setHeight(json.height)
        },
        function (o, object) {
          fabric.log('fabric.log', o, object)
        }
      )
      c.renderAll()
      c.calcOffset()
      setCanvas(c)
      console.log({ src: 'FabricProvider.loadFromJSON', json, canvas })
    },
    [canvasRef, canvas, setTemplate]
  )

  const resizeCanvas = useCallback(
    ({ width, height }) => {
      canvas.setDimensions({ height, width })
    },
    [canvas]
  )

  const resetCanvas = useCallback(() => {
    setCanvas(null)
    console.log({ src: 'FabricProvider.resetCanvas', canvas, canvasRef: canvasRef.current })
  }, [canvas, canvasRef])

  const updateTemplate = useCallback(
    (template) => {
      console.log({ src: 'updateTemplate', template })
      setTemplate(template)

      const insertImage = (img, canvas) => {
        const hRatio = canvas.getWidth() / img.width
        const vRatio = canvas.getHeight() / img.height
        const ratio = Math.min(hRatio, vRatio)
        const centerShiftX = (canvas.getWidth() - img.width * ratio) / 2
        const centerShiftY = (canvas.getHeight() - img.height * ratio) / 2
        img.scaleToHeight(img.height * ratio)
        img.scaleToWidth(img.width * ratio)
        img.top = centerShiftY
        img.left = centerShiftX
        img.setCoords()
        customSelect(img)
        img.set({ id: 'TEMPLATE' })
        canvas.add(img)
        canvas.sendToBack(img)
        canvas.renderAll()
      }

      if (canvas && canvasRef.current) {
        const canvasObjects = canvas.getObjects('image')
        const templateIndex = canvasObjects.find((el) => el.id === 'TEMPLATE')
        if (!templateIndex) {
          console.log('MemeEditor.useEffect: CREATE template', template.url)
          if (canvas.getObjects)
            new fabric.Image.fromURL(template.url, (img) => {
              insertImage(img, canvas)
            })
        } else {
          // TODO copy meme and changing template afterwards is not working
          console.log(
            'MemeEditor.useEffect: REPLACE template',
            template.url,
            templateIndex,
            templateIndex.url
          )
          templateIndex.setSrc(template.url)
          canvas.remove(templateIndex)
          new fabric.Image.fromURL(template.url, (img) => {
            insertImage(img, canvas)
          })
        }
        console.log({ src: 'MemeEditor.useEffect', canvas, canvasObjects, templateIndex, template })
      }
    },
    [canvas, canvasRef, setTemplate]
  )

  // TODO @NDRS either remove it, or apply to all selectable objects
  const customSelect = (obj) => {
    return obj.set({
      borderColor: 'black',
      cornerColor: 'rgba(85,85,85)',
      cornerSize: 10,
      cornerStyle: 'circle',
      borderDashArray: [5, 5],
      transparentCorners: false,
    })
  }

  return (
    <FabricJsonContext.Provider value={{ json, setJson }}>
      <FabricCanvasContext.Provider
        value={{
          canvas,
          initCanvas,
          loadFromJSON,
          canvasRef,
          resetCanvas,
          isCopy,
          setIsCopy,
          resizeCanvas,
        }}
      >
        <FabricActiveObjectContext.Provider value={{ activeObject, setActiveObject }}>
          <TemplateContext.Provider value={{ template, updateTemplate }}>
            {children}
          </TemplateContext.Provider>
        </FabricActiveObjectContext.Provider>
      </FabricCanvasContext.Provider>
    </FabricJsonContext.Provider>
  )
}

FabricProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export function useFabricJson() {
  const context = useContext(FabricJsonContext)
  if (!context) {
    throw new Error(`useFabricJson must be used within a FabricProvider`)
  }
  return context
}

export function useFabricCanvas() {
  const context = useContext(FabricCanvasContext)
  if (!context) {
    throw new Error(`useFabricCanvas must be used within a FabricProvider`)
  }
  return context
}

export function useFabricActiveObject() {
  const context = useContext(FabricActiveObjectContext)
  if (!context) {
    throw new Error(`useFabricActiveObject must be used within a FabricProvider`)
  }
  return context
}

export function useTemplate() {
  const context = useContext(TemplateContext)
  if (!context) {
    throw new Error(`useTemplate must be used within a TemplateProvider`)
  }
  return context
}
