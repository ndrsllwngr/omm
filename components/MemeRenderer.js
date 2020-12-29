import React from 'react'
import PropTypes from 'prop-types'
import { Stage, Layer } from 'react-konva'
import { TextBoxViewOnly } from '@/components/kanvas-utils/TextBox'
import { MemeTemplateViewOnly } from '@/components/kanvas-utils/MemeTemplate'

export const MemeRenderer = ({ meme }) => {
  return (
    <>
      <div className="flex flex-row pt-5">
        <div className="flex flex-row w-1/2">
          <Stage width={500} height={500}>
            <Layer>
              <MemeTemplateViewOnly templateUrl={meme.template}></MemeTemplateViewOnly>
            </Layer>
            <Layer>
              {meme.content.map((text, i) => {
                console.log({ src: 'MemeRenderer.js - map', text, i })
                return <TextBoxViewOnly key={text.id} textProps={{ ...text }} />
              })}
            </Layer>
          </Stage>
        </div>
      </div>
    </>
  )
}

MemeRenderer.propTypes = {
  meme: PropTypes.shape({
    template: PropTypes.string,
    created_at: PropTypes.any,
    title: PropTypes.string,
    content: PropTypes.array,
    images: PropTypes.array,
  }),
}
