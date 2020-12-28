/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import { Text, Transformer } from 'react-konva'

export const TextBox = ({ shapeProps, isSelected, onSelect, onChange }) => {
  const shapeRef = React.useRef()
  const trRef = React.useRef()

  useEffect(() => {
    if (isSelected) {
      trRef.current.nodes([shapeRef.current])
      trRef.current.getLayer().batchDraw()
    }
  }, [isSelected])

  return (
    <>
      <Text
        onClick={onSelect}
        ref={shapeRef}
        {...shapeProps}
        draggable
        onDragEnd={(e) => {
          // const node = shapeRef.current
          const newAttrs = {
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y(),
          }
          console.log({ src: 'TextBox.js - onDragEnd', newAttrs, shapeProps, target: e.target })
          onChange(newAttrs)
        }}
        onTransformEnd={(e) => {
          const node = shapeRef.current
          console.log({ src: 'onTransformEnd', shapeProps, target: e.target, node })
          const scaleX = node.scaleX()
          const scaleY = node.scaleY()

          node.scaleX(1)
          node.scaleY(1)
          const newAttrs = {
            ...shapeProps,
            x: node.x(),
            y: node.y(),
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(node.height() * scaleY),
          }
          console.log({
            src: 'TextBox.js - onTransformEnd',
            newAttrs,
            shapeProps,
            target: e.target,
            node,
          })
          onChange(newAttrs)
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
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
