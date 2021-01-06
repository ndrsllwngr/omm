import React, { useState, useEffect } from 'react'
import { fabric } from 'fabric'
import SVG from 'react-inlinesvg'

// inspired by https://github.com/aprilescobar/fabric.js-intro
// inspired by https://github.com/saninmersion/react-context-fabricjs
// uses http://fabricjs.com/
export const MemeEditor = () => {
  const [canvas, setCanvas] = useState('')
  const [imgURL, setImgURL] = useState('')
  const [svgExport, setSvgExport] = useState('')

  useEffect(() => {
    const initCanvas = () => {
      const newCanvas = new fabric.Canvas('canvas', {
        height: 800,
        width: 800,
        backgroundColor: 'pink',
      })
      setCanvas(newCanvas)
    }
    initCanvas()
  }, [])

  const addRect = (currentCanvas) => {
    const rect = new fabric.Rect({
      height: 280,
      width: 200,
      fill: 'yellow',
    })
    customSelect(rect)
    currentCanvas.add(rect)
    currentCanvas.renderAll()
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
    <div>
      <div>
        <button onClick={() => addRect(canvas)}>Rectangle</button>
        <button onClick={() => addText(canvas)}>Add Textbox</button>
        <button onClick={() => clearAll(canvas)}>Clear All</button>
        <button onClick={() => canvasEvents(canvas)}>Test</button>
        <button onClick={() => exportSVG(canvas)}>Export to SVG</button>
      </div>

      <form onSubmit={(e) => addImg(e, imgURL, canvas)}>
        <div>
          <input type="text" value={imgURL} onChange={(e) => setImgURL(e.target.value)} />
          <button type="submit">Add Image</button>
        </div>
      </form>

      <div>
        <canvas id="canvas" />
      </div>

      {svgExport !== '' && (
        <>
          <SVG src={svgExport} />
        </>
      )}
    </div>
  )
}
