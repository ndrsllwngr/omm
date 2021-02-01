import React from 'react'
import { Navbar } from '@/components/Navbar'
import { Comment, CommentInput } from '@/components/Comment'

export default { title: 'UI' }

const mockComment = {
  name: 'Andy',
  createdAt: '2021-02-01T10:38:35.231Z',
  comment: "How are you doin'?",
}

export const commentInput = () => <CommentInput />

export const comment = () => <Comment comment={mockComment} />

export const navbarMain = () => <Navbar />

export const commentUI = () => (
  <div className={'flex flex-col space-y-2'}>
    <CommentInput />
    <Comment comment={mockComment} />
    <Comment comment={mockComment} />
  </div>
)
