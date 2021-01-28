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
      // TODO
      return 'CREATEDAT_DESC'
    case SORT.MOST_POINTS:
      // TODO
      return 'CREATEDAT_DESC'
    default:
      console.error('sortEnum not supported', sortEnum)
  }
}
