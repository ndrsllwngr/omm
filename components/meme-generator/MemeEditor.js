import React, { useState } from 'react'
import { fabric } from 'fabric'
import SVG from 'react-inlinesvg'
import { FabricCanvas } from '@/components/meme-generator/FabricCanvas'
import { TextToolbar } from '@/components/meme-generator/TextToolbar'
import {
  useFabricCanvas,
  useTemplate,
  useTitle,
  useVisibility,
} from '@/components/context/fabricContext'
import { ImageToolbar } from '@/components/meme-generator/ImageToolbar'
import { useRouter } from 'next/router'
import { useAuth } from '@/components/context/authContext'
import { FONT_FAMILY, MEDIA_TYPE, SORT, STORAGE_COLLECTION, VISIBILITY } from '@/lib/constants'
import PropTypes from 'prop-types'
import { useSortContext } from '@/components/context/viewsContext'
import { gql, useMutation } from '@apollo/client'

const ADD_MEME = gql`
  mutation AddMeme($meme: MemeInsertInput!) {
    insertOneMeme(data: $meme) {
      url
      json
      views
      points
      commentCount
      createdBy {
        _id
      }
      downVotes {
        _id
      }
      upVotes {
        _id
      }
      _id
      createdAt
      title
      visibility
      forkedFrom {
        _id
      }
      forkedBy {
        _id
      }
      template {
        _id
        createdAt
        createdBy {
          _id
        }
        height
        img
        mediaType
        type
        url
        width
        name
      }
      captions
      svg
    }
  }
`

/*
# The parameterised GraphQL mutation
mutation($todo: todos_insert_input!){
  insert_todos(objects: [$todo]) {
    returning {
      id
    }
  }
}*/

// inspired by https://github.com/aprilescobar/fabric.js-intro
// inspired by https://github.com/saninmersion/react-context-fabricjs
// uses http://fabricjs.com/
export const MemeEditor = () => {
  const router = useRouter()
  const [insertOneMeme] = useMutation(ADD_MEME)
  const { canvas, isCopy } = useFabricCanvas()
  const [imgURL, setImgURL] = useState('')
  const { template } = useTemplate()
  const { title, setTitle } = useTitle()
  const { visibility, setVisibility } = useVisibility()
  const [svgExport, setSvgExport] = useState('')
  const [jsonExport, setJsonExport] = useState({})
  const [previewMode, setPreviewMode] = useState(false)
  const { setSort } = useSortContext()
  const auth = useAuth()

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
      //shadow: 'rgba(0,0,0,0.3) 5px 5px 5px',
      shadow: null,
      width: 200,
      fontStyle: 'normal',
      fontSize: 24,
      fill: '#000000',
      textAlign: 'left',
      fontFamily: FONT_FAMILY.ANTON,
      fontWeight: 'normal',
    })
    //customSelect(txt)
    canvas.add(txt)
    canvas.renderAll()
    console.log({ src: 'MemeEditor.addText', txt, canvas })
  }

  const exportSVG = () => {
    const svg = canvas.toSVG()
    const json = canvas.toJSON([
      'width',
      'height',
      'id',
      'preserveObjectStacking',
      'enableRetinaScaling',
      'video_src',
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

  const generateMeme = ({ isDraft = false }) => {
    const canvasAsJson = canvas.toJSON([
      'width',
      'height',
      'id',
      'preserveObjectStacking',
      'enableRetinaScaling',
      'video_src',
    ])
    const svg = canvas.toSVG()
    console.log('generateMeme', auth.getUser())
    const newObj = {
      title,
      commentCount: 0,
      createdAt: new Date(),
      createdBy: { link: auth.getUser().id },
      visibility: visibility,
      upVotes: { link: [] },
      downVotes: { link: [] },
      forkedBy: { link: [] },
      isDraft: isDraft,
      points: 0,
      views: 0,
      forkedFrom: isCopy ? { link: isCopy } : null,
      template: template._id
        ? { link: template._id }
        : {
            create: {
              createdAt: new Date(),
              createdBy: { link: auth.getUser().id },
              type: 'EXTERNAL',
              mediaType: MEDIA_TYPE.IMAGE,
              img: STORAGE_COLLECTION.TEMPLATES + '/', // TODO, do we even need this one?
              url: template.url,
              width: template.width,
              height: template.height,
              name: template.name,
            },
          },
      url: '', // TODO if a real png was created (requirement)
      svg,
      json: JSON.stringify(canvasAsJson),
    }
    console.log({ src: 'MemeEditor.generateMeme', newObj, svg })
    insertOneMeme({ variables: { meme: newObj } })
      .then((result) => {
        console.log({ result })
        if (isDraft) {
          console.log(result)
          router.push(`/profile`)
        } else {
          setSort(SORT.LATEST)
          router.push(`/meme/${result.data.insertOneMeme._id}`)
        }
      })
      .catch((e) => console.error(e))
  }

  const clearAll = () => canvas?.getObjects()?.forEach((obj) => canvas.remove(obj))

  // const canvasEvents = () => {
  //   canvas.getObjects().forEach((obj) => console.log(obj))
  // }

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
        <TextToolbar />
        <ImageToolbar />
      </div>
      <div className="col-span-2 h-full rounded-lg bg-transparent flex justify-center">
        <FabricCanvas />
      </div>
      <div className="col-span-1 h-full rounded-lg bg-gray-100 flex flex-col justify-start space-y-2">
        <Button
          onClick={() => {
            console.log({ template })
            handlePreview()
          }}
        >
          {previewMode ? 'Hide Preview' : 'Show Preview'}
        </Button>
        <Button onClick={addText}>Add Textbox</Button>
        {/*<Button onClick={addTemplate}>Add Template</Button>*/}
        <Button onClick={clearAll}>Clear All</Button>
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
            'appearance-none border border-transparent w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-md rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent'
          }
          type="text"
          value={title}
          placeholder={'Title'}
          onChange={(e) => setTitle(e.target.value)}
        />
        <select value={visibility} onChange={(e) => setVisibility(e.target.value)}>
          <option value={VISIBILITY.PUBLIC}>Public</option>
          <option value={VISIBILITY.UNLISTED}>Unlisted</option>
          <option value={VISIBILITY.PRIVATE}>Private</option>
        </select>
        <Button onClick={() => generateMeme({ isDraft: true })}>Save as Draft</Button>
        <Button onClick={() => generateMeme({ isDraft: false })}>Generate</Button>
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

Button.propTypes = {
  children: PropTypes.any,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
}
