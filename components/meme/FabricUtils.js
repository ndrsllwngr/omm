// https://github.com/fabricjs/fabricjs.com/blob/gh-pages/js/kitchensink/controller.js

// STYLE

export const getActiveStyle = (styleName, object, canvas) => {
  object = object || canvas.getActiveObject()
  if (!object) return ''

  return object.getSelectionStyles && object.isEditing
    ? object.getSelectionStyles()[styleName] || ''
    : object[styleName] || ''
}

export const setActiveStyle = (styleName, value, object, canvas) => {
  object = object || canvas.getActiveObject()
  if (!object) return

  if (object.setSelectionStyles && object.isEditing) {
    const style = {}
    style[styleName] = value
    object.setSelectionStyles(style)
    object.setCoords()
  } else {
    object.set(styleName, value)
  }

  object.setCoords()
  canvas.requestRenderAll()
}

// PROP

export const getActiveProp = (name, canvas) => {
  const object = canvas.getActiveObject()
  if (!object) return ''

  return object[name] || ''
}

export const setActiveProp = (name, value, canvas) => {
  const object = canvas.getActiveObject()
  if (!object) return
  object.set(name, value).setCoords()
  canvas.renderAll()
}

// OBJECTS

export const sendBackwards = (canvas) => {
  const activeObject = canvas.getActiveObject()
  if (activeObject) {
    canvas.sendBackwards(activeObject)
  }
}

export const sendToBack = (canvas) => {
  const activeObject = canvas.getActiveObject()
  if (activeObject) {
    canvas.sendToBack(activeObject)
  }
}

export const bringForward = (canvas) => {
  const activeObject = canvas.getActiveObject()
  if (activeObject) {
    canvas.bringForward(activeObject)
  }
}

export const bringToFront = (canvas) => {
  const activeObject = canvas.getActiveObject()
  if (activeObject) {
    canvas.bringToFront(activeObject)
  }
}

export const getSelected = (canvas) => {
  return canvas.getActiveObject()
}

export const removeSelected = (canvas) => {
  const activeObjects = canvas.getActiveObjects()
  // TODO permit removal of TEMPLATE obj
  canvas.discardActiveObject()
  if (activeObjects.length) {
    canvas.remove.apply(canvas, activeObjects)
  }
}

export const getObjectCaching = (canvas) => {
  return getActiveProp('objectCaching', canvas)
}

export const setObjectCaching = (value, canvas) => {
  return setActiveProp('objectCaching', value, canvas)
}

export const getNoScaleCache = (canvas) => {
  return getActiveProp('noScaleCache', canvas)
}

export const setNoScaleCache = (value, canvas) => {
  return setActiveProp('noScaleCache', value, canvas)
}

// CANVAS

export const getCanvasBgColor = (canvas) => {
  return canvas.backgroundColor
}

export const setCanvasBgColor = (canvas) => {
  canvas.backgroundColor = value
  canvas.renderAll()
}

// EXPORT

export const saveJSON = (withDefaults, canvas) => {
  canvas.includeDefaultValues = withDefaults
  return JSON.stringify(canvas.toJSON())
}

export const rasterizeSVG = (canvas) => {
  return canvas.toSVG()
}

// IMPORT

export const loadJSON = (json, canvas) => {
  canvas.loadFromJSON(json, function () {
    canvas.renderAll()
  })
}

// NEW

export const getOpacity = (object, canvas) => {
  return getActiveStyle('opacity', object, canvas) * 100
}
export const setOpacity = (value, object, canvas) => {
  setActiveStyle('opacity', parseInt(value, 10) / 100, object, canvas)
}

export const getFill = (object, canvas) => {
  return getActiveStyle('fill', object, canvas)
}
export const setFill = (value, object, canvas) => {
  setActiveStyle('fill', value, object, canvas)
}

export const isBold = (object, canvas) => {
  return getActiveStyle('fontWeight', object, canvas) === 'bold'
}
export const toggleBold = (object, canvas) => {
  setActiveStyle(
    'fontWeight',
    getActiveStyle('fontWeight', object, canvas) === 'bold' ? '' : 'bold',
    object,
    canvas
  )
}
export const isItalic = (object, canvas) => {
  return getActiveStyle('fontStyle', object, canvas) === 'italic'
}
export const toggleItalic = (object, canvas) => {
  setActiveStyle(
    'fontStyle',
    getActiveStyle('fontStyle', object, canvas) === 'italic' ? '' : 'italic',
    object,
    canvas
  )
}

export const isUnderline = (object, canvas) => {
  return (
    getActiveStyle('textDecoration', object, canvas).indexOf('underline') > -1 ||
    getActiveStyle('underline', object, canvas)
  )
}
export const toggleUnderline = (object, canvas) => {
  const value = isUnderline(object, canvas)
    ? getActiveStyle('textDecoration', object, canvas).replace('underline', '')
    : getActiveStyle('textDecoration', object, canvas) + ' underline'

  setActiveStyle('textDecoration', value, object, canvas)
  setActiveStyle('underline', !getActiveStyle('underline', object, canvas), object, canvas)
}

export const isLinethrough = (object, canvas) => {
  return (
    getActiveStyle('textDecoration', object, canvas).indexOf('line-through') > -1 ||
    getActiveStyle('linethrough', object, canvas)
  )
}
export const toggleLinethrough = (object, canvas) => {
  const value = isLinethrough(object, canvas)
    ? getActiveStyle('textDecoration', object, canvas).replace('line-through', '')
    : getActiveStyle('textDecoration', object, canvas) + ' line-through'

  setActiveStyle('textDecoration', value, object, canvas)
  setActiveStyle('linethrough', !getActiveStyle('linethrough', object, canvas), object, canvas)
}
export const isOverline = (object, canvas) => {
  return (
    getActiveStyle('textDecoration', object, canvas).indexOf('overline') > -1 ||
    getActiveStyle('overline', object, canvas)
  )
}
export const toggleOverline = (object, canvas) => {
  const value = isOverline(object, canvas)
    ? getActiveStyle('textDecoration', object, canvas).replace('overline', '')
    : getActiveStyle('textDecoration', object, canvas) + ' overline'

  setActiveStyle('textDecoration', value, object, canvas)
  setActiveStyle('overline', !getActiveStyle('overline', object, canvas), object, canvas)
}

export const getText = (object, canvas) => {
  return getActiveProp('text', object, canvas)
}
export const setText = (value, object, canvas) => {
  setActiveProp('text', value, canvas)
}

export const getTextAlign = (object, canvas) => {
  const str = getActiveProp('textAlign', object, canvas)
  return str.replace(/^\w/, (c) => c.toUpperCase())
}
export const setTextAlign = (value, object, canvas) => {
  setActiveProp('textAlign', value.toLowerCase(), canvas)
}

export const getFontFamily = (object, canvas) => {
  return getActiveProp('fontFamily', object, canvas).toLowerCase()
}
export const setFontFamily = (value, object, canvas) => {
  setActiveProp('fontFamily', value.toLowerCase(), canvas)
}
