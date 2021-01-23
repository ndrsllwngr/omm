import React from 'react'
import { useAutoPlayOrder } from '@/components/context/autoplayContext'
import { AUTOPLAY_ORDER } from '@/lib/constants'
import { IoShuffle } from 'react-icons/io5'

export const AutoplaySort = () => {
  const { order, setOrder } = useAutoPlayOrder()

  const onClick = () => {
    order === AUTOPLAY_ORDER.RANDOM
      ? setOrder(AUTOPLAY_ORDER.ORDERED)
      : setOrder(AUTOPLAY_ORDER.RANDOM)
  }

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        className="inline-flex h-full justify-center items-center w-full shadow-sm rounded-l px-4 py-2 bg-custom-gray font-medium dark:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-200 focus:ring-gray-200"
        id="options-menu"
        aria-haspopup="true"
        aria-expanded="true"
        onClick={onClick}
      >
        <IoShuffle
          size={28}
          className={
            order === AUTOPLAY_ORDER.RANDOM
              ? `fill-current text-custom-green`
              : `fill-current text-gray-400`
          }
        />
      </button>
    </div>
  )
}
