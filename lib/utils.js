import { FILTER, SORT, VISIBILITY } from '@/lib/constants'

export const translateFilter = ({ filterEnum, yesterday, template = null }) => {
  //console.log({ yesterday, now: new Date() })
  switch (filterEnum) {
    case FILTER.NONE:
      return {
        visibility: 'PUBLIC',
        isDraft: false,
        template: template ? { _id: template._id } : null,
      }
    case FILTER.HOT:
      return {
        visibility: 'PUBLIC',
        isDraft: false,
        points_gt: 10,
        createdAt_gt: yesterday,
        template: template ? { _id: template._id } : null,
      }
    case FILTER.FRESH:
      return {
        visibility: 'PUBLIC',
        isDraft: false,
        views_lt: 3,
        createdAt_gt: yesterday,
        template: template ? { _id: template._id } : null,
      }
    case FILTER.TRENDING:
      return {
        visibility: 'PUBLIC',
        isDraft: false,
        views_gte: 3,
        createdAt_gt: yesterday,
        template: template ? { _id: template._id } : null,
      }
    default:
      console.error('filterEnum not supported', filterEnum)
  }
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

const getFilterQueryVariables = (filterEnum, yesterday) => {
  //console.log({ yesterday, now: new Date() })
  switch (filterEnum) {
    case FILTER.NONE:
      return {}
    case FILTER.HOT:
      return {
        points: { $gt: 10 },
        createdAt: { $gt: yesterday },
      }
    case FILTER.FRESH:
      return {
        views: { $lt: 3 },
        createdAt: { $gt: yesterday },
      }
    case FILTER.TRENDING:
      return {
        views: { $gte: 10 },
        createdAt: { $gt: yesterday },
      }
    default:
      console.error('filterEnum not supported', filterEnum)
  }
}

// conditions: https://docs.mongodb.com/manual/reference/method/db.collection.find/index.html#db-collection-find
// sorts: https://docs.mongodb.com/manual/reference/operator/aggregation/sort/index.html#pipe._S_sort
//        https://docs.mongodb.com/manual/reference/operator/query-comparison/
//        1 = ASC, -1 = DESC
// TODO @NDRS add filter by template to /meme/id page
export const getNavigationQueryVariables = ({ meme, sortEnum, filterEnum, yesterday }) => {
  switch (sortEnum) {
    case SORT.LATEST:
      return {
        memeId: meme._id,
        // USE MONGODB SYNTAX
        conditions: JSON.stringify({
          visibility: { $eq: VISIBILITY.PUBLIC },
          isDraft: { $eq: false },
          ...getFilterQueryVariables(filterEnum, yesterday),
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
          isDraft: { $eq: false },
          ...getFilterQueryVariables(filterEnum, yesterday),
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
          isDraft: { $eq: false },
          ...getFilterQueryVariables(filterEnum, yesterday),
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
          isDraft: { $eq: false },
          ...getFilterQueryVariables(filterEnum, yesterday),
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
          isDraft: { $eq: false },
          ...getFilterQueryVariables(filterEnum, yesterday),
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
          isDraft: { $eq: false },
          ...getFilterQueryVariables(filterEnum, yesterday),
        }),
        // USE MONGODB SYNTAX
        sorts: JSON.stringify({ points: -1 }),
      }
    default:
      console.error('sortEnum not supported', sortEnum)
  }
}
