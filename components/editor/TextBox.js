/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import { Stage, Layer, Text, Transformer } from 'react-konva'

export const TextBox = ({ shapeProps, isSelected, onSelect, onChange }) => {
  const shapeRef = React.useRef()
  const trRef = React.useRef()

  useEffect(() => {
    if (isSelected) {
      trRef.current.setNode(shapeRef.current)
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
          // console.log('onDragEnd', { shapeProps, target: e.target })
          onChange({
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y(),
          })
        }}
        onTransformEnd={(e) => {
          const node = shapeRef.current
          // console.log('onTransformEnd', { shapeProps, target: e.target, node })
          const scaleX = node.scaleX()
          const scaleY = node.scaleY()

          node.scaleX(1)
          node.scaleY(1)
          onChange({
            ...shapeProps,
            x: node.x(),
            y: node.y(),
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(node.height() * scaleY),
          })
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

// const App = () => {
//   const [circles, setCircles] = React.useState(initialCircles)
//   const [selectedId, selectShape] = React.useState(null)

//   return (
//     <Stage
//       width={window.innerWidth}
//       height={window.innerHeight}
// onMouseDown={(e) => {
//   const clickedOnEmpty = e.target === e.target.getStage()
//   if (clickedOnEmpty) {
//     selectShape(null)
//   }
// }}
//     >
//       <Layer>
//         {circles.map((circ, i) => {
//           return (
//             <Circ
//               key={i}
//               shapeProps={circ}
//               isSelected={circ.id === selectedId}
//               onSelect={() => {
//                 selectShape(circ.id)
//               }}
//               onChange={(newAttrs) => {
//                 const circs = circles.slice()
//                 circs[i] = newAttrs
//                 setCircles(circs)
//               }}
//             />
//           )
//         })}
//       </Layer>
//     </Stage>
//   )
// }
