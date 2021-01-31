import { SORT, VISIBILITY } from '@/lib/constants'

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

// conditions: https://docs.mongodb.com/manual/reference/method/db.collection.find/index.html#db-collection-find
// sorts: https://docs.mongodb.com/manual/reference/operator/aggregation/sort/index.html#pipe._S_sort
//        https://docs.mongodb.com/manual/reference/operator/query-comparison/
//        1 = ASC, -1 = DESC
export const getNavigationQueryVariables = ({ meme, sortEnum }) => {
  switch (sortEnum) {
    case SORT.LATEST:
      return {
        memeId: meme._id,
        // USE MONGODB SYNTAX
        conditions: JSON.stringify({
          visibility: { $eq: VISIBILITY.PUBLIC },
        }),
        // USE MONGODB SYNTAX
        sorts: JSON.stringify({ createdAt: 1 }),
      }
    case SORT.OLDEST:
      return {
        memeId: meme._id,
        // USE MONGODB SYNTAX
        conditions: JSON.stringify({
          visibility: { $eq: VISIBILITY.PUBLIC },
        }),
        // USE MONGODB SYNTAX
        sorts: JSON.stringify({ createdAt: -1 }),
      }
    case SORT.MOST_VIEWED:
      return {
        memeId: meme._id,
        // USE MONGODB SYNTAX
        conditions: JSON.stringify({
          visibility: { $eq: VISIBILITY.PUBLIC },
        }),
        // USE MONGODB SYNTAX
        sorts: JSON.stringify({ views: 1 }),
      }
    case SORT.LEAST_VIEWED:
      return {
        memeId: meme._id,
        // USE MONGODB SYNTAX
        conditions: JSON.stringify({
          visibility: { $eq: VISIBILITY.PUBLIC },
        }),
        // USE MONGODB SYNTAX
        sorts: JSON.stringify({ views: -1 }),
      }
    case SORT.MOST_POINTS:
      return {
        memeId: meme._id,
        // USE MONGODB SYNTAX
        conditions: JSON.stringify({
          visibility: { $eq: VISIBILITY.PUBLIC },
        }),
        // USE MONGODB SYNTAX
        sorts: JSON.stringify({ points: 1 }),
      }
    case SORT.LEAST_POINTS:
      return {
        memeId: meme._id,
        // USE MONGODB SYNTAX
        conditions: JSON.stringify({
          visibility: { $eq: VISIBILITY.PUBLIC },
        }),
        // USE MONGODB SYNTAX
        sorts: JSON.stringify({ points: -1 }),
      }
    default:
      console.error('sortEnum not supported', sortEnum)
  }
}
