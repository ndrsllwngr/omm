import React from 'react'
import PropTypes from 'prop-types'
import { Stage, Layer } from 'react-konva'
import { TextBoxViewOnly } from '@/components/kanvas-utils/TextBox'
import { MemeTemplateViewOnly } from '@/components/kanvas-utils/MemeTemplate'

export const MemeRenderer = ({ meme }) => {
  return (
    <>
      <Stage width={500} height={500}>
        <Layer>
          <MemeTemplateViewOnly templateUrl={meme.template} />
        </Layer>
        <Layer>
          {meme.content.map((text, i) => {
            console.log({ src: 'MemeRenderer.js - map', text, i })
            return <TextBoxViewOnly key={text.id} textProps={{ ...text }} />
          })}
        </Layer>
      </Stage>
    </>
  )
}

MemeRenderer.propTypes = {
  meme: PropTypes.shape({
    template: PropTypes.string,
    created_at: PropTypes.any,
    title: PropTypes.string,
    content: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        x: PropTypes.number,
        y: PropTypes.number,
        width: PropTypes.number,
        height: PropTypes.number,
        text: PropTypes.string,
        rotation: PropTypes.number,
        isDragging: PropTypes.bool,
        fontSize: PropTypes.number,
        fontStyle: PropTypes.string,
        fill: PropTypes.string,
      })
    ),
    images: PropTypes.array,
  }),
}
