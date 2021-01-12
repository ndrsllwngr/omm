import React, { useEffect, useState } from 'react'
import { fabric } from 'fabric'
import SVG from 'react-inlinesvg'
import { FabricCanvas } from '@/components/meme/FabricCanvas'
import { MemeEditorText } from '@/components/meme/MemeEditorText'
import { useFabricCanvas } from '@/components/context/fabricContext'
import useMemeUpload from '@/components/hooks/useMemeUpload'
import { useTemplate } from '@/components/context/templateContext'
import { MemeEditorImage } from '@/components/meme/MemeEditorImage'

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

// inspired by https://github.com/aprilescobar/fabric.js-intro
// inspired by https://github.com/saninmersion/react-context-fabricjs
// uses http://fabricjs.com/
// eslint-disable-next-line react/prop-types
export const MemeEditor = () => {
  const { canvas, canvasRef } = useFabricCanvas()
  const [imgURL, setImgURL] = useState('')
  const [template] = useTemplate()
  const [title, setTitle] = useState('')
  const [svgExport, setSvgExport] = useState('')
  const [jsonExport, setJsonExport] = useState({})
  const [previewMode, setPreviewMode] = useState(false)
  const [loading, success, error, setData] = useMemeUpload()

  const addImg = (e, url) => {
    e.preventDefault()
    new fabric.Image.fromURL(url, (img) => {
      img.scale(0.75)
      customSelect(img)
      canvas.add(img)
      canvas.renderAll()
      setImgURL('')
    })
    console.log({ src: 'MemeEditor.addImg', url, canvas })
  }

  const addText = () => {
    const txt = new fabric.Textbox('Add Text', {
      shadow: 'rgba(0,0,0,0.3) 5px 5px 5px',
      height: 200,
      width: 300,
    })
    customSelect(txt)
    canvas.add(txt)
    canvas.renderAll()
    console.log({ src: 'MemeEditor.addText', txt, canvas })
  }

  useEffect(() => {
    // TODO WRITE AS CALLBACK TO FIX TODO-1
    // ISSUE-1: fix logic setting template image (CREATE is getting triggered to early
    // ISSUE-2: rerender issue, if you select a new template the change won't get reflected until another object gets selected
    if (canvas && canvasRef.current) {
      const canvasObjects = canvas.getObjects('image')
      const templateIndex = canvasObjects.find((el) => el.id === 'TEMPLATE')
      if (!templateIndex) {
        const addTemplate = (url = 'https://imgflip.com/s/meme/Futurama-Fry.jpg') => {
          if (canvas.getObjects)
            new fabric.Image.fromURL(url, (img) => {
              img.scale(0.75)
              customSelect(img)
              img.set({ id: 'TEMPLATE' })
              canvas.add(img)
              canvas.sendToBack(img)
              canvas.renderAll()
            })
        }
        addTemplate(template.url)
        console.log('MemeEditor.useEffect: CREATE template', template.url)
      } else {
        templateIndex.setSrc(template.url)
        templateIndex.canvas.requestRenderAll()
        templateIndex.canvas.renderAll()
        canvas.requestRenderAll()
        canvas.renderAll()
        console.log('MemeEditor.useEffect: REPLACE template', template.url)
      }
      console.log({ src: 'MemeEditor.useEffect', canvas, canvasObjects, templateIndex, template })
    }
  }, [canvas, template, canvasRef])

  const exportSVG = () => {
    const svg = canvas.toSVG()
    const json = canvas.toJSON([
      'width',
      'height',
      'id',
      'preserveObjectStacking',
      'enableRetinaScaling',
    ])
    setSvgExport(svg)
    setJsonExport(json)
    console.log({ src: 'MemeEditor.exportSVG', svg, json })
  }

  const handlePreview = () => {
    if (previewMode) {
      setPreviewMode(false)
    } else {
      exportSVG()
      setPreviewMode(true)
    }
  }

  const generateMeme = () => {
    const json = canvas.toJSON([
      'width',
      'height',
      'id',
      'preserveObjectStacking',
      'enableRetinaScaling',
    ])
    const svg = canvas.toSVG()
    const newObj = {
      title,
      // createdAt is added during insert
      createdBy: '',
      upVotes: [],
      downVotes: [],
      forkedBy: [],
      forkedFrom: '',
      views: 0,
      template: {
        //id: template.id, TODO add template id
        url: template.url,
      },
      url: '', // TODO if a real png was created (requirement)
      svg,
      json,
    }
    console.log({ src: 'MemeEditor.generateMeme', newObj, svg, json })
    setData(newObj)
  }

  const clearAll = () => canvas.getObjects().forEach((obj) => canvas.remove(obj))

  const canvasEvents = () => {
    canvas.getObjects().forEach((obj) => console.log(obj))
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
      <div className="col-span-3 h-16 rounded-lg bg-gray-100 flex items-center justify-start space-x-2 pl-2">
        <MemeEditorText />
        <MemeEditorImage />
      </div>
      <div className="col-span-2 h-full rounded-lg bg-transparent flex justify-center">
        <FabricCanvas />
      </div>
      <div className="col-span-1 h-full rounded-lg bg-gray-100 flex flex-col justify-start space-y-2">
        <Button onClick={handlePreview}>{previewMode ? 'Hide Preview' : 'Show Preview'}</Button>
        <Button onClick={addText}>Add Textbox</Button>
        {/*<Button onClick={addTemplate}>Add Template</Button>*/}
        <Button onClick={clearAll}>Clear All</Button>
        <Button onClick={canvasEvents}>Test</Button>
        <Button onClick={exportSVG}>Export to SVG</Button>
        <Button onClick={generateMeme} disabled={loading}>
          Generate {!loading && success && 'success'} {!loading && error && 'error'}
        </Button>
        <form className={'flex justify-center space-x-2'} onSubmit={(e) => addImg(e, imgURL)}>
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
        <input
          className={
            'flex-1 appearance-none border border-transparent w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-md rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent'
          }
          type="text"
          value={title}
          placeholder={'Title'}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      {previewMode && (
        <>
          <div className={'col-span-3 h-full rounded-lg bg-gray-100 flex justify-center'}>
            <div>
              <SVG src={svgExport} />
            </div>
          </div>
          <div className={'col-span-3 h-full rounded-lg bg-gray-100 flex justify-start'}>
            <pre>
              <code>{JSON.stringify(jsonExport, null, 4)}</code>
            </pre>
          </div>
        </>
      )}
    </div>
  )
}
