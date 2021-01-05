import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
// import { SlideshowButton } from '@/components/SlideshowButton'
import { Slide } from '@/components/Slide'
import { useRouter } from 'next/router'

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
  const router = useRouter()

  useEffect(() => {
    console.log({ src: 'Slideshow', memes })
  }, [memes])
  //console.log(memes[1])
  //const meme = memes[slideIndex > memes.length - 1 ? memes.length - 1 : slideIndex]
  const meme = memes[1]
  if (!memes || !meme) return <div>loading..</div>
  return (
    <div className="flex flex-row justify-center">
      {/* {slideIndex !== 0 && (
        <SlideshowButton name="prev" changeSlide={() => setSlideIndex({ type: 'prev' })} />
      )} */}
      <button
        className="bg-red-900 hover:bg-blue-dark text-black font-bold py-2 px-4 rounded"
        name="prev"
        onClick={(e) => {
          e.preventDefault()
          router.push(memes[0].id)
        }}
      />
      <Slide meme={meme} />
      <button
        className="bg-red-900 hover:bg-blue-dark text-black font-bold py-2 px-4 rounded"
        name="prev"
        onClick={(e) => {
          e.preventDefault()
          router.push(memes[2].id)
        }}
      />
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
