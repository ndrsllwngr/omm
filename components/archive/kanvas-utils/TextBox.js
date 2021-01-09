import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Text, Transformer } from 'react-konva'

export const TextBox = ({ textProps, isSelected, onSelect, onChange, layerRef, containerRef }) => {
  const shapeRef = React.useRef(null)
  const trRef = React.useRef(null)

  useEffect(() => {
    if (isSelected) {
      trRef.current.nodes([shapeRef.current])
      trRef.current.getLayer().batchDraw()
    }
  }, [isSelected])

  // useEffect(() => {
  //   console.log({ src: 'TextBox.js - useEffect', textProps })
  // }, [textProps])

  return (
    <>
      <Text
        onClick={onSelect}
        ref={shapeRef}
        {...textProps}
        draggable
        onDragEnd={(e) => {
          // const node = shapeRef.current
          const newAttrs = {
            ...textProps,
            x: parseInt(e.target.x()),
            y: parseInt(e.target.y()),
          }
          // console.log({ src: 'TextBox.js - onDragEnd', newAttrs, textProps, target: e.target })
          onChange(newAttrs)
        }}
        onTransformEnd={(_e) => {
          const node = shapeRef.current
          // console.log({ src: 'onTransformEnd', textProps, target: e.target, node })
          const scaleX = node.scaleX()
          const scaleY = node.scaleY()

          node.scaleX(1)
          node.scaleY(1)
          const newAttrs = {
            ...textProps,
            x: parseInt(node.x()),
            y: parseInt(node.y()),
            width: parseInt(Math.max(5, node.width() * scaleX)),
            height: parseInt(Math.max(node.height() * scaleY)),
            rotation: parseInt(shapeRef.current.rotation()),
          }
          // console.log({
          //   src: 'TextBox.js - onTransformEnd',
          //   newAttrs,
          //   textProps,
          //   target: e.target,
          //   node,
          // })
          onChange(newAttrs)
        }}
        onDblClick={(_e) => {
          const textNode = shapeRef.current
          const tr = trRef.current
          const layer = layerRef
          // const stage = stageRef
          const container = containerRef
          // hide text node and transformer:
          textNode.hide()
          tr.hide()
          layer.draw()

          // create textarea over canvas with absolute position
          // first we need to find position for textarea
          // how to find it?

          // at first lets find position of text node relative to the stage:
          var textPosition = textNode.absolutePosition()

          // then lets find position of stage container on the page:
          var stageBox = container.getBoundingClientRect()

          // so position of textarea will be the sum of positions above:
          var areaPosition = {
            x: stageBox.left + textPosition.x,
            y: stageBox.top + textPosition.y,
          }

          // create textarea and style it
          var textarea = document.createElement('textarea')
          document.body.appendChild(textarea)

          // apply many styles to match text on canvas as close as possible
          // remember that text rendering on canvas and on the textarea can be different
          // and sometimes it is hard to make it 100% the same. But we will try...
          textarea.value = textNode.text()
          textarea.style.position = 'absolute'
          textarea.style.top = areaPosition.y + 'px'
          textarea.style.left = areaPosition.x + 'px'
          textarea.style.width = textNode.width() - textNode.padding() * 2 + 'px'
          textarea.style.height = textNode.height() - textNode.padding() * 2 + 5 + 'px'
          textarea.style.fontSize = textNode.fontSize() + 'px'
          textarea.style.border = 'none'
          textarea.style.padding = '0px'
          textarea.style.margin = '0px'
          textarea.style.overflow = 'hidden'
          textarea.style.background = 'none'
          textarea.style.outline = 'none'
          textarea.style.resize = 'none'
          textarea.style.lineHeight = textNode.lineHeight()
          textarea.style.fontFamily = textNode.fontFamily()
          textarea.style.transformOrigin = 'left top'
          textarea.style.textAlign = textNode.align()
          textarea.style.color = textNode.fill()
          const rotation = textNode.rotation()
          var transform = ''
          if (rotation) {
            transform += 'rotateZ(' + rotation + 'deg)'
          }

          var px = 0
          // also we need to slightly move textarea on firefox
          // because it jumps a bit
          var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1
          if (isFirefox) {
            px += 2 + Math.round(textNode.fontSize() / 20)
          }
          transform += 'translateY(-' + px + 'px)'

          textarea.style.transform = transform

          // reset height
          textarea.style.height = 'auto'
          // after browsers resized it we can set actual value
          textarea.style.height = textarea.scrollHeight + 3 + 'px'

          textarea.focus()

          function removeTextarea() {
            textarea.parentNode.removeChild(textarea)
            window.removeEventListener('click', handleOutsideClick)
            textNode.show()
            tr.show()
            // tr.forceUpdate()
            layer.draw()
          }

          function setTextareaWidth(newWidth) {
            if (!newWidth) {
              // set width for placeholder
              newWidth = textNode.placeholder.length * textNode.fontSize()
            }
            // some extra fixes on different browsers
            var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
            var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1
            if (isSafari || isFirefox) {
              newWidth = Math.ceil(newWidth)
            }

            var isEdge = document.documentMode || /Edge/.test(navigator.userAgent)
            if (isEdge) {
              newWidth += 1
            }
            textarea.style.width = newWidth + 'px'
          }

          textarea.addEventListener('keydown', function (e) {
            // hide on enter
            // but don't hide on shift + enter
            if (e.keyPress === 13 && !e.shiftKey) {
              textNode.text(textarea.value)
              removeTextarea()
            }
            // on esc do not set value back to node
            if (e.keyPress === 27) {
              removeTextarea()
            }
          })

          textarea.addEventListener('keydown', function (_e) {
            const scale = textNode.getAbsoluteScale().x
            setTextareaWidth(textNode.width() * scale)
            textarea.style.height = 'auto'
            textarea.style.height = textarea.scrollHeight + textNode.fontSize() + 'px'
          })

          function handleOutsideClick(e) {
            if (e.target !== textarea) {
              const newAttrs = {
                ...textProps,
                text: textarea.value,
              }
              // console.log({
              //   src: 'TextBox.js - handleOutsideClick',
              //   newAttrs,
              // })
              onChange(newAttrs)
              // textNode.text(textarea.value)
              removeTextarea()
            }
          }
          setTimeout(() => {
            window.addEventListener('click', handleOutsideClick)
          })
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          enabledAnchors={['middle-left', 'middle-right', 'top-center', 'bottom-center']}
          boundBoxFunc={(oldBox, newBox) => {
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox
            }
            return newBox
          }}
        />
      )}
    </>
  )
}

TextBox.propTypes = {
  textProps: PropTypes.object,
  isSelected: PropTypes.bool,
  onSelect: PropTypes.func,
  onChange: PropTypes.func,
  layerRef: PropTypes.func,
  containerRef: PropTypes.func,
}

export const TextBoxViewOnly = ({ textProps }) => {
  return (
    <>
      <Text {...textProps} />
    </>
  )
}

TextBoxViewOnly.propTypes = {
  textProps: PropTypes.object,
}
