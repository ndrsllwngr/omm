import { shape, string, arrayOf, any, number, object, bool } from 'prop-types'

export const userType = shape({
  id: string,
  email: string,
  name: string,
  uid: string, // TODO why do we need this?
})

export const templateType = shape({
  id: string,
  title: string,
  createdAt: any,
  createdBy: userType,
  type: string, // STORAGE || EXTERNAL
  url: string,
  img: string, // path to storage
  height: number,
  width: number,
  name: string,
})

export const memeType = shape({
  _id: string,
  title: string,
  createdAt: any,
  createdBy: userType,
  upVotes: arrayOf(object),
  downVotes: arrayOf(object),
  forkedBy: arrayOf(userType),
  forkedFrom: userType,
  isDraft: bool,
  views: number,
  visibility: string,
  points: number,
  template: templateType,
  url: string, // if a real png was created (requirement)
  svg: string,
  json: string,
  captions: arrayOf(string),
})

// TODO atm these are identical
export const draftType = memeType
