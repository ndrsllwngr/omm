import { shape, string, arrayOf, any, bool, number } from 'prop-types'

export const templateType = shape({
  id: string.isRequired,
  title: string,
  createdAt: any.isRequired,
  createdBy: string.isRequired,
  type: string.isRequired, // STORAGE || EXTERNAL
  url: string.isRequired,
  img: string, // path to storage
  height: number,
  width: number,
})

export const memeHistoryType = shape({
  id: string.isRequired,
  memeId: string.isRequired,
  createdAt: any.isRequired,
})

export const userType = shape({
  id: string.isRequired,
  email: string.isRequired,
  name: string,
  uid: string.isRequired, // TODO why do we need this?
})

// TODO add views count
export const memeType = shape({
  _id: string.isRequired,
  title: string.isRequired,
  createdAt: any.isRequired,
  createdBy: any.isRequired,
  upVotes: arrayOf(string).isRequired,
  downVotes: arrayOf(string).isRequired,
  forkedBy: arrayOf(string).isRequired,
  forkedFrom: string,
  views: number.isRequired,
  visibility: string.isRequired,
  points: number.isRequired,
  template: shape({
    id: string,
    url: string.isRequired,
  }).isRequired,
  url: string, // if a real png was created (requirement)
  svg: string.isRequired,
  json: string.isRequired,
})

// TODO atm these are identical
export const draftType = memeType
