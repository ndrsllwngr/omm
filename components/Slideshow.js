import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { SlideshowButton } from '@/components/SlideshowButton'
import { Slide } from '@/components/Slide'
import { SINGLEVIEWNAVIGATION } from '@/lib/constants'

// const reducer = (slideIndex, arg) => {
//   switch (arg.type) {
//     case 'next':
//       return ++slideIndex
//     case 'prev':
//       return slideIndex === 0 ? 0 : --slideIndex
//     default:
//       console.error('Argument not supportet.', arg)
//   }
// }

export const Slideshow = ({ memes }) => {
  // const [slideIndex, setSlideIndex] = useReducer(reducer, 0)

  useEffect(() => {
    console.log({ src: 'Slideshow', memes })
  }, [memes])
  //console.log(memes[1])
  //const meme = memes[slideIndex > memes.length - 1 ? memes.length - 1 : slideIndex]
  const prevMeme = memes[SINGLEVIEWNAVIGATION.prev]
  const currentMeme = memes[SINGLEVIEWNAVIGATION.current]
  const nextMeme = memes[SINGLEVIEWNAVIGATION.next]

  if (!memes || !currentMeme) return <div>loading..</div>
  return (
    <div className="flex flex-row justify-center">
      {/*alternative would be to use css disbable*/}
      {prevMeme.id && <SlideshowButton name="prev" changeSlide={prevMeme.id} />}
      <Slide meme={currentMeme} />
      {nextMeme.id && <SlideshowButton name="prev" changeSlide={nextMeme.id} />}
      {/* // {slideIndex !== memes.length - 1 && (
      //   <SlideshowButton name="next" changeSlide={() => setSlideIndex({ type: 'next' })} />
      // )} */}
    </div>
  )
}

Slideshow.propTypes = {
  memes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.any,
      template: PropTypes.string,
      created_at: PropTypes.any,
      title: PropTypes.string,
      imgPath: PropTypes.string,
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
    })
  ),
}
