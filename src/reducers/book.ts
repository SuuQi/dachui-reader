import { createReducer, fetchHandle } from '../utils';
import { FETCH_FUZZY_SEARCH, CLEAR_FUZZY_SEARCH, FETCH_BOOK_CHAPTERS, IBookItem, IChaptersData } from '../constants/book';

export default createReducer({
  isFetching: false,
  searchList: [] as IBookItem[],
  searchListCount: 0,

  chaptersData: {
    _id: '',
    book: '',
    chaptersUpdated: '',
    updated: '',
    chapters: []
  } as IChaptersData
}, {
  [FETCH_FUZZY_SEARCH]: fetchHandle((state, action) => ({
    ...state,
    isFetching: false,
    searchList: action.data.books || [],
    searchListCount: action.data.count || 0
  })),

  [CLEAR_FUZZY_SEARCH]: state => ({
    ...state,
    searchList: [],
    searchListCount: 0
  }),

  [FETCH_BOOK_CHAPTERS]: fetchHandle((state, action) => ({
    ...state,
    isFetching: false,
    chaptersData: action.data.mixToc
  }))
})
