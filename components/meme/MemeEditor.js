import React, { useState, useContext } from 'react'
import { fabric } from 'fabric'
import SVG from 'react-inlinesvg'
import { FabricContext } from '@/components/context/fabricContext'
import { FabricCanvas } from '@/components/meme/FabricCanvas'

// inspired by https://github.com/aprilescobar/fabric.js-intro
// inspired by https://github.com/saninmersion/react-context-fabricjs
// uses http://fabricjs.com/
// eslint-disable-next-line react/prop-types
export const MemeEditor = () => {
  const { canvas } = useContext(FabricContext)
  const [imgURL, setImgURL] = useState('')
  const [svgExport, setSvgExport] = useState('')
  const [jsonExport, setJsonExport] = useState({})
  const [previewMode, setPreviewMode] = useState(false)

  // eslint-disable-next-line react/prop-types
  const Button = ({ children, type = 'button', disabled = false, onClick }) => {
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className={
          'flex-shrink-0 bg-purple-600 text-white text-base font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200'
        }
        type={type}
      >
        {children}
      </button>
    )
  }

  const addImg = (e, url, currentCanvas) => {
    e.preventDefault()
    new fabric.Image.fromURL(url, (img) => {
      img.scale(0.75)
      customSelect(img)
      currentCanvas.add(img)
      currentCanvas.renderAll()
      setImgURL('')
    })
  }

  const addText = (currentCanvas) => {
    const txt = new fabric.Textbox('Add Text', {
      shadow: 'rgba(0,0,0,0.3) 5px 5px 5px',
      height: 200,
      width: 300,
    })
    customSelect(txt)
    currentCanvas.add(txt)
    currentCanvas.renderAll()
  }

  const exportSVG = (currentCanvas) => {
    const svg = currentCanvas.toSVG()
    console.log(currentCanvas.toSVG())
    console.log(currentCanvas.toJSON())
    setSvgExport(svg)
  }

  const handlePreview = (currentCanvas) => {
    if (previewMode) {
      setPreviewMode(false)
    } else {
      const svg = currentCanvas.toSVG()
      const json = currentCanvas.toJSON()
      console.log({ svg, json })
      setSvgExport(svg)
      setJsonExport(json)
      setPreviewMode(true)
    }
  }

  const clearAll = (currentCanvas) =>
    currentCanvas.getObjects().forEach((obj) => currentCanvas.remove(obj))

  const canvasEvents = (currentCanvas) => {
    currentCanvas.getObjects().forEach((obj) => console.log(obj))
  }

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
    <div className="p-8 grid grid-cols-3 gap-6">
      <div className="col-span-3 h-16 rounded-lg bg-gray-100 flex items-center justify-center space-x-2">
        <Button onClick={() => handlePreview(canvas)}>{previewMode ? 'Edit' : 'Preview'}</Button>
        <Button onClick={() => addText(canvas)}>Add Textbox</Button>
        <Button disabled={true}>Change template</Button>
        <Button onClick={() => clearAll(canvas)}>Clear All</Button>
        <Button onClick={() => canvasEvents(canvas)}>Test</Button>
        <Button onClick={() => exportSVG(canvas)}>Export to SVG</Button>
      </div>
      <div className="col-span-2 h-full rounded-lg bg-transparent flex justify-center">
        <FabricCanvas />
      </div>
      <div className="col-span-1 h-full rounded-lg bg-gray-100">
        <form
          className={'flex justify-center space-x-2'}
          onSubmit={(e) => addImg(e, imgURL, canvas)}
        >
          <input
            className={
              'flex-1 appearance-none border border-transparent w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-md rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent'
            }
            type="text"
            value={imgURL}
            onChange={(e) => setImgURL(e.target.value)}
          />
          <Button type="submit">Add Image</Button>
        </form>
      </div>
      {previewMode && (
        <>
          <div className={'col-span-3 h-full rounded-lg bg-gray-100 flex justify-center'}>
            <div>
              <SVG src={svgExport} />
            </div>
          </div>
          <div className={'col-span-3 h-full rounded-lg bg-gray-100 flex justify-center'}>
            <pre>
              <code>{JSON.stringify(jsonExport, null, 4)}</code>
            </pre>
          </div>
        </>
      )}
    </div>
  )
}
