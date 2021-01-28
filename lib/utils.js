import { SORT } from '@/lib/constants'

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

export const translateSortPrevMeme = (sortEnum) => {
  switch (sortEnum) {
    case SORT.LATEST:
      return 'CREATEDAT_DESC'
    case SORT.OLDEST:
      return 'CREATEDAT_ASC'
    case SORT.MOST_VIEWED:
      return 'VIEWS_DESC'
    case SORT.LEAST_VIEWED:
      return 'VIEWS_ASC'
    case SORT.MOST_POINTS:
      return 'POINTS_DESC'
    case SORT.LEAST_POINTS:
      return 'POINTS_ASC'
    default:
      console.error('sortEnum not supported', sortEnum)
  }
}

export const translateSortNextMeme = (sortEnum) => {
  switch (sortEnum) {
    case SORT.LATEST:
      return 'CREATEDAT_ASC'
    case SORT.OLDEST:
      return 'CREATEDAT_DESC'
    case SORT.MOST_VIEWED:
      return 'VIEWS_ASC'
    case SORT.LEAST_VIEWED:
      return 'VIEWS_DESC'
    case SORT.MOST_POINTS:
      return 'POINTS_ASC'
    case SORT.LEAST_POINTS:
      return 'POINTS_DESC'
    default:
      console.error('sortEnum not supported', sortEnum)
  }
}
