import { createReducer, fetchHandle, defaultSuccessByKey } from '../utils';
import { FETCH_FUZZY_SEARCH } from '../constants/book';

export default createReducer({
    searchList: []
}, {
    [FETCH_FUZZY_SEARCH]: fetchHandle(defaultSuccessByKey('searchList'))
})
