import React from 'react'
import { Navbar } from '@/components/Navbar'
import { Comment, CommentInput } from '@/components/Comment'
import {
  IconBtn,
  PrimaryBtn,
  SecondaryBtn,
  TertiaryBtn,
  VoteDownBtn,
  VoteUpBtn,
  ToggleIconBtn,
  ToggleStateIconBtn,
  Badge,
} from '@/components/ui/Buttons'
import {
  IoArrowBack,
  IoCaretDownOutline,
  IoCaretUpOutline,
  IoPlay,
  IoShuffle,
} from 'react-icons/io5'
import { ShareButtons } from '@/components/ui/ShareButtons'
import { TextOnlyDialog } from '@/components/ui/TextOnlyDialog'

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

export const primaryBtn = () => <PrimaryBtn>Button</PrimaryBtn>

export const secondaryBtn = () => <SecondaryBtn>Button</SecondaryBtn>

export const tertiaryBtn = () => <TertiaryBtn>Button</TertiaryBtn>

export const voteDownBtn = () => (
  <VoteDownBtn>
    <IoCaretDownOutline size={22} className={'fill-current inline-flex self-center'} />
  </VoteDownBtn>
)

export const voteUpBtn = () => (
  <VoteUpBtn>
    <IoCaretUpOutline size={22} className={'fill-current inline-flex self-center'} />
  </VoteUpBtn>
)

export const iconBtn = () => (
  <IconBtn>
    <IoArrowBack size={28} className={`fill-current`} />
  </IconBtn>
)

export const toggleIconBtn = () => (
  <ToggleIconBtn>
    <IoShuffle size={28} className={`fill-current`} />
  </ToggleIconBtn>
)

export const toggleStateIconBtn = () => (
  <ToggleStateIconBtn>
    <IoPlay size={28} className="py-1 fill-current" />
  </ToggleStateIconBtn>
)

export const badge = () => <Badge>Badge</Badge>

export const shareBtns = () => <ShareButtons id={123456} />

export const textOnlyDialog = () => (
  <TextOnlyDialog showDialog={true} closeDialog={() => {}} message={'Lorem ipsum.'} />
)
