import React from 'react'
import PropTypes from 'prop-types'
import { MemeRenderer } from '@/components/MemeRenderer'
import { useFabricJson } from '@/components/context/fabricContext'
import { useRouter } from 'next/router'

export const Slide = ({ meme }) => {
  const { setJson } = useFabricJson()
  const router = useRouter()
  return (
    <div className="flex-col max-w-md">
      <div className="title">{meme.title}</div>
      <button
        onClick={() => {
          setJson(meme)
          router.push('/create')
        }}
      >
        Copy Meme
      </button>
      <MemeRenderer meme={meme} />
      {/*TODO add additional information*/}
      <div className="slide-info">{meme.title}</div>
    </div>
  )
}

Slide.propTypes = {
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
