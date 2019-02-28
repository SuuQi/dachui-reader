export const SESSION_KEY = 'DACHUI_READER_SESSION_KEY'

export const FETCH_LOGIN_INFO = Symbol('FETCH_LOGIN_INFO')
export const FETCH_USER_BOOKS = Symbol('FETCH_USER_BOOKS')

export type IBookItem = {
    id: string
    lastIndex: number
}
