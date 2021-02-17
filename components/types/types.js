import { shape, string, arrayOf, any, number, object, bool } from 'prop-types'

export const templateType = shape({
  id: string,
  title: string,
  createdAt: any,
  createdBy: string,
  type: string, // STORAGE || EXTERNAL
  url: string,
  img: string, // path to storage
  height: number,
  width: number,
})

export const userType = shape({
  id: string,
  email: string,
  name: string,
  uid: string, // TODO why do we need this?
})

export const memeType = shape({
  _id: string,
  title: string,
  createdAt: any,
  createdBy: any,
  upVotes: arrayOf(object),
  downVotes: arrayOf(object),
  forkedBy: arrayOf(userType),
  forkedFrom: string,
  isDraft: bool,
  views: number,
  visibility: string,
  points: number,
  template: shape({
    id: string,
    url: string,
  }),
  url: string, // if a real png was created (requirement)
  svg: string,
  json: string,
})

// TODO atm these are identical
export const draftType = memeType
