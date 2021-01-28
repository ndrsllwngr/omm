import { SORT, VISIBILITY } from '@/lib/constants'

export const DIRECTION = {
  PREV: 'prev',
  NEXT: 'next',
}

export const translateSort = (sortEnum) => {
  switch (sortEnum) {
    case SORT.LATEST:
      return 'CREATEDAT_DESC'
    case SORT.OLDEST:
      return 'CREATEDAT_ASC'
    case SORT.MOST_VIEWED:
      return 'VIEWS_DESC'
    case SORT.LEAST_VIEWED:
      return 'VIEWS_ASC'
    case SORT.LEAST_POINTS:
      return 'POINTS_ASC'
    case SORT.MOST_POINTS:
      return 'POINTS_DESC'
    default:
      console.error('sortEnum not supported', sortEnum)
  }
}

export const getNavigationQueryVariables = ({ direction, meme, sortEnum }) => {
  switch (direction) {
    case DIRECTION.PREV:
      switch (sortEnum) {
        case SORT.LATEST:
          return {
            query: { visibility: VISIBILITY.PUBLIC, createdAt_lt: meme.createdAt },
            sortBy: 'CREATEDAT_DESC',
          }
        case SORT.OLDEST:
          return {
            query: { visibility: VISIBILITY.PUBLIC, createdAt_gt: meme.createdAt },
            sortBy: 'CREATEDAT_ASC',
          }
        case SORT.MOST_VIEWED:
          return {
            query: {
              visibility: VISIBILITY.PUBLIC,
              views_lte: meme.views,
              _id_ne: meme._id,
            },
            sortBy: 'VIEWS_DESC',
          }
        case SORT.LEAST_VIEWED:
          return {
            query: {
              visibility: VISIBILITY.PUBLIC,
              views_gte: meme.views,
              _id_ne: meme._id,
            },
            sortBy: 'VIEWS_ASC',
          }
        case SORT.MOST_POINTS:
          return {
            query: {
              visibility: VISIBILITY.PUBLIC,
              points_lte: meme.points,
              _id_ne: meme._id,
            },
            sortBy: 'POINTS_DESC',
          }
        case SORT.LEAST_POINTS:
          return {
            query: {
              visibility: VISIBILITY.PUBLIC,
              points_gte: meme.points,
              _id_ne: meme._id,
            },
            sortBy: 'POINTS_ASC',
          }
        default:
          console.error('sortEnum not supported', sortEnum)
      }
      break
    case DIRECTION.NEXT:
      switch (sortEnum) {
        case SORT.LATEST:
          return {
            query: { visibility: VISIBILITY.PUBLIC, createdAt_gt: meme.createdAt },
            sortBy: 'CREATEDAT_ASC',
          }
        case SORT.OLDEST:
          return {
            query: { visibility: VISIBILITY.PUBLIC, createdAt_lt: meme.createdAt },
            sortBy: 'CREATEDAT_DESC',
          }
        case SORT.MOST_VIEWED:
          return {
            query: {
              visibility: VISIBILITY.PUBLIC,
              views_gte: meme.views,
              _id_ne: meme._id,
            },
            sortBy: 'VIEWS_ASC',
          }
        case SORT.LEAST_VIEWED:
          return {
            query: {
              visibility: VISIBILITY.PUBLIC,
              views_lte: meme.views,
              _id_ne: meme._id,
            },
            sortBy: 'VIEWS_DESC',
          }
        case SORT.MOST_POINTS:
          return {
            query: {
              visibility: VISIBILITY.PUBLIC,
              points_gte: meme.points,
              _id_ne: meme._id,
            },
            sortBy: 'POINTS_ASC',
          }
        case SORT.LEAST_POINTS:
          return {
            query: {
              visibility: VISIBILITY.PUBLIC,
              points_lte: meme.points,
              _id_ne: meme._id,
            },
            sortBy: 'POINTS_DESC',
          }
        default:
          console.error('sortEnum not supported', sortEnum)
      }
      break
    default:
      console.error('direction not supported', direction)
  }
}
