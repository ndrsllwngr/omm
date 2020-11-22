import React from 'react'
import PropTypes from 'prop-types'
import { STEPS, DIRECTION } from '@/lib/constants'

export const NavBottom = ({ step, navigate }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 py-5 bg-white shadow-md">
      <div className="max-w-3xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="w-1/2">
            {(step === STEPS.two || step === STEPS.three) && (
              <button
                className="w-32 focus:outline-none py-2 px-5 rounded-lg shadow-sm text-center text-gray-600 bg-white hover:bg-gray-100 font-medium border"
                onClick={() => navigate(DIRECTION.prev)}
              >
                Previous
              </button>
            )}
          </div>
          <div className="w-1/2 text-right">
            {step === STEPS.two ? (
              <button
                onClick={() => navigate(DIRECTION.next)}
                className="w-32 focus:outline-none border border-transparent py-2 px-5 rounded-lg shadow-sm text-center text-white bg-blue-500 hover:bg-blue-600 font-medium"
              >
                Complete
              </button>
            ) : (
              <button
                onClick={() => navigate(DIRECTION.next)}
                className="w-32 focus:outline-none border border-transparent py-2 px-5 rounded-lg shadow-sm text-center text-white bg-blue-500 hover:bg-blue-600 font-medium"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

NavBottom.propTypes = {
  step: PropTypes.any,
  navigate: PropTypes.func,
}
