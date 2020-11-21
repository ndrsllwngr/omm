import React from 'react'
import PropTypes from 'prop-types'
import { STEPS } from '@/lib/constants'

export const NavTop = ({ step }) => {
  const totalSteps = Object.keys(STEPS).length - 1
  return (
    <div>
      <div className="border-b-2 py-4 border-gray-300">
        <div
          className="uppercase tracking-wide text-xs font-bold text-gray-500 mb-1 leading-tight"
          x-text="``"
        >{`Step: ${step} of ${totalSteps}`}</div>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex-1">
            {step === STEPS.one && (
              <div>
                <div className="text-lg font-bold text-gray-700 leading-tight">Choose meme</div>
              </div>
            )}
            {step === STEPS.two && (
              <div>
                <div className="text-lg font-bold text-gray-700 leading-tight">Add text</div>
              </div>
            )}
            {step === STEPS.three && (
              <div>
                <div className="text-lg font-bold text-gray-700 leading-tight">
                  Tell me about yourself
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center md:w-64">
            <div className="w-full bg-white rounded-full mr-2">
              <div
                className="rounded-full bg-green-500 text-xs leading-none h-2 text-center text-white"
                style={{ width: `${parseInt((step / totalSteps) * 100)}%` }}
              ></div>
            </div>
            <div className="text-xs w-10 text-gray-600">{`${parseInt(
              (step / totalSteps) * 100
            )}%`}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

NavTop.propTypes = {
  step: PropTypes.any,
}
