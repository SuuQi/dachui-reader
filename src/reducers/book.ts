import { createReducer, fetchHandle, defaultSuccessNoData, defaultSuccessByKey } from '../utils'
import { FETCH_FUZZY_SEARCH, CLEAR_FUZZY_SEARCH, IBookItem, FETCH_BOOK_DETAIL, FETCH_CATS_LIST, FETCH_HOT_BOOK_LIST } from '../constants/book'

export default createReducer({
  isFetching: false,
  searchList: [] as IBookItem[],
  searchListCount: 0,
  hotList: [],
  cats: {
    male: [],
    female: [],
    press: []
  }
}, {
  [FETCH_FUZZY_SEARCH]: fetchHandle((state, action) => ({
    ...state,
    isFetching: false,
    searchList: action.data.books ? action.data.books.map(n => ({
      ...n,
      id: n._id
    })) : [],
    searchListCount: action.data.count || 0
  })),

  [CLEAR_FUZZY_SEARCH]: state => ({
    ...state,
    searchList: [],
    searchListCount: 0
  }),

  [FETCH_BOOK_DETAIL]: fetchHandle(defaultSuccessNoData),

  [FETCH_HOT_BOOK_LIST]: fetchHandle((state, action) => ({
    ...state,
    isFetching: false,
    hotList: action.data.ranking.books ? action.data.ranking.books.map(n => ({
      ...n,
      cat: `${n.majorCate}${n.minorCate ? '-' + n.minorCate : n.minorCate}`,
      id: n._id
    })) : [],
  })),
  [FETCH_CATS_LIST]: fetchHandle(defaultSuccessByKey('cats'))
})
