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
