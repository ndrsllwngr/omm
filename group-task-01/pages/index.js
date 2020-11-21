import React, { useState } from 'react'
import { STEPS, DIRECTION } from '@/lib/constants'
import { MemeEditor } from '@/components/MemeEditor'
import { MemeSelection } from '@/components/MemeSelection'
import { MemeResult } from '@/components/MemeResult'
import { NavTop } from '@/components/NavTop'
import { NavBottom } from '@/components/NavBottom'

const LandingPage = () => {
  const [step, setStep] = useState(STEPS.one)
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
      {step === STEPS.complete ? (
        <div className="max-w-3xl mx-auto px-4 py-10 flex flex-col justify-center h-full">
          <MemeResult setStep={setStep} />
        </div>
      ) : (
        <>
          <div className="max-w-3xl mx-auto px-4 py-10">
            <NavTop step={step} />
            <div className="py-10">
              {step === STEPS.one && <MemeSelection />}
              {step === STEPS.two && <MemeEditor />}
            </div>
          </div>
          <NavBottom step={step} navigate={navigate} />
        </>
      )}
    </>
  )
}

export default LandingPage
