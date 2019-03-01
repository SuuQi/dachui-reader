import { createReducer, fetchHandle } from '../utils';
import { FETCH_FUZZY_SEARCH, CLEAR_FUZZY_SEARCH, IBookItem } from '../constants/book';

export default createReducer({
  isFetching: false,
  searchList: [] as IBookItem[],
  searchListCount: 0,
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
  })

})
