import { createReducer, fetchHandle } from '../utils';
import { FETCH_FUZZY_SEARCH, CLEAR_FUZZY_SEARCH } from '../constants/book';

export default createReducer({
    isFetching: false,
    searchList: [],
    searchListCount: 0
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
    })
})
