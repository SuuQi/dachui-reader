import { createReducer, fetchHandle, defaultSuccessByKey } from '../utils'
import { FETCH_LOGIN_INFO, FETCH_USER_BOOKS, ADD_USER_BOOK, UPDATE_USER_BOOK } from '../constants/user'
import { IUserBookItem } from '../constants/book'

export default createReducer({
  isFetching: false,
  books: [] as IUserBookItem[],
}, {
  [FETCH_LOGIN_INFO]: fetchHandle((state, action) => ({
    ...state,
    isFetching: false,
    sessionId: action.data.session_key || ''
  })),

  [FETCH_USER_BOOKS]: fetchHandle(defaultSuccessByKey('books')),
  [ADD_USER_BOOK]: fetchHandle(defaultSuccessByKey('books')),
  [UPDATE_USER_BOOK]: fetchHandle(defaultSuccessByKey('books')),

})
