import { createReducer, fetchHandle, defaultSuccessByKey } from '../utils';
import { FETCH_LOGIN_INFO, IBookItem, FETCH_USER_BOOKS } from '../constants/user';

export default createReducer({
  isFetching: false,
  books: [] as IBookItem[],
}, {
  [FETCH_LOGIN_INFO]: fetchHandle((state, action) => ({
    ...state,
    isFetching: false,
    sessionId: action.data.session_key || ''
  })),

  [FETCH_USER_BOOKS]: fetchHandle(defaultSuccessByKey('books'))

})
