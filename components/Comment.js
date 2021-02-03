import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { PrimaryBtn, TertiaryBtn } from '@/components/ui/Buttons'
import formatDistance from 'date-fns/formatDistance'
import { FONT_FAMILY } from '@/lib/constants'
import { useComments } from '@/components/hooks/useComments'

export const CommentInput = (meme) => {
  const [text, setText] = useState('')
  const { addComment } = useComments()

  return (
    <div>
      <div className="flex overflow-visible my-2">
        <textarea
          id="about"
          name="about"
          rows={1}
          value={text}
          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2 border-gray-300 border rounded-md font-bold"
          placeholder="Write a comment"
          style={{ fontFamily: FONT_FAMILY.COMIC_NEUE }}
          onChange={(e) => setText(e.target.value)}
        />
        <PrimaryBtn
          onClick={() => {
            if (text !== '') addComment(meme, text)
          }}
        >
          Post
        </PrimaryBtn>
      </div>
    </div>
  )
}

export const Comment = ({ comment }) => {
  return (
    <div className={'flex flex-col'}>
      <h3
        className={
          'px-2 py-2 flex items-center sm:items-baseline text-gray-500 border-t border-l border-r border-gray-200 rounded-t-lg'
        }
      >
        <span className={'font-bold mr-1 text-black dark:text-white'}>
          {comment.createdBy.name}
        </span>{' '}
        commented {formatDistance(new Date(comment.createdAt), new Date(), { addSuffix: true })}
      </h3>
      <p
        className={
          'relative bg-gray-200 dark:bg-gray-800 py-2 px-2 font-bold rounded-b-lg border border-gray-200'
        }
        style={{ fontFamily: FONT_FAMILY.COMIC_NEUE }}
      >
        {comment.text}
      </p>
    </div>
  )
}

Comment.propTypes = {
  comment: PropTypes.any,
}
