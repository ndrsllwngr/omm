import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { STEPS, DIRECTION } from '@/lib/constants'
import { MemeEditor } from '@/components/MemeEditor'
import { MemeSelection } from '@/components/MemeSelection'
import { MemeResult } from '@/components/MemeResult'
import { NavTop } from '@/components/NavTop'
import { NavBottom } from '@/components/NavBottom'
import { HtmlHead } from '@/components/HtmlHead'

const LandingPage = ({ memes }) => {
  const [step, setStep] = useState(STEPS.one)
  useEffect(() => {
    console.log({ memes })
  }, [memes])
  const navigate = (direction) => {
    let page
    switch (direction) {
      case DIRECTION.prev:
        switch (step) {
          case STEPS.complete:
            page = STEPS.two
            break
          case STEPS.one:
          case STEPS.two:
            page = STEPS.one
            break
          default:
            console.error('Step not supported.', { step })
        }
        break
      case DIRECTION.next:
        switch (step) {
          case STEPS.complete:
            page = STEPS.complete
            break
          case STEPS.one:
            page = STEPS.two
            break
          case STEPS.two:
            page = STEPS.complete
            break
          default:
            console.error('Step not supported.', { step })
        }
        break
      default:
        console.error('Direction not supported.', { direction })
    }
    setStep(page)
  }
  return (
    <>
      <HtmlHead />
      {step === STEPS.complete ? (
        <div className="max-w-3xl mx-auto px-4 py-10 flex flex-col justify-center h-full">
          <MemeResult setStep={setStep} />
        </div>
      ) : (
        <>
          <div className="max-w-3xl mx-auto px-4 py-10">
            <NavTop step={step} />
            <div className="py-10">
              {step === STEPS.one && <MemeSelection memes={memes} />}
              {step === STEPS.two && <MemeEditor />}
            </div>
          </div>
          <NavBottom step={step} navigate={navigate} />
        </>
      )}
    </>
  )
}

LandingPage.propTypes = {
  memes: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string,
      width: PropTypes.number,
      height: PropTypes.number,
      name: PropTypes.string,
    })
  ),
}

// Fetch data at build time
export async function getStaticProps() {
  // Fetch data from external API
  const res = await fetch(`https://api.imgflip.com/get_memes`)
  const data = await res.json()
  let memes = []
  if (data !== null || data !== undefined) {
    const dataStripped = data.data.memes.map((meme) => {
      return {
        url: meme.url,
        width: meme.width,
        height: meme.height,
        name: meme.name,
      }
    })
    memes = dataStripped
    console.log({ memes })
  }

  // Pass data to the page via props
  return { props: { memes } }
}

export default LandingPage
