import { fetchAjax } from '../utils'
import { SERVER_ROOT } from '../constants'
import { omit } from 'lodash'
import { FETCH_LOGIN_INFO, FETCH_USER_BOOKS, ADD_USER_BOOK, UPDATE_USER_BOOK } from '../constants/user'
import { IUserBookItem } from '../constants/book'

export function fetchLoginInfo (code?: string) {
  return fetchAjax({
    type: FETCH_LOGIN_INFO,
    url: SERVER_ROOT + '/api/wechat/dachui/login',
    data: {
      code,
      isNotWeixin: !!code
    }
  })
}

export function fetchUserBook () {
  return fetchAjax({
    type: FETCH_USER_BOOKS,
    url: SERVER_ROOT + '/api/reader/bookshelf',
    showLoading: true
  })
}

export function addUserBook (book: IUserBookItem) {
  return fetchAjax({
    type: ADD_USER_BOOK,
    url: SERVER_ROOT + '/api/reader/bookshelf',
    method: 'POST',
    data: omit(book, ['_id', 'chapters']),
    showLoading: true
  })
}

export function updateUserBook (book: Partial<IUserBookItem>) {
  return fetchAjax({
    type: UPDATE_USER_BOOK,
    url: SERVER_ROOT + '/api/reader/bookshelf/' + book.id,
    method: 'PUT',
    data: omit(book, ['_id', 'chapters'])
  })
}
