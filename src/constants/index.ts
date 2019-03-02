
export const FETCH_REQUESTED = Symbol('FETCH_REQUESTED')
export const FETCH_SUCCEEDED = Symbol('FETCH_SUCCEEDED')
export const FETCH_FAILED = Symbol('FETCH_FAILED')

export type HTTP_METHOD = 'OPTIONS' | 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'TRACE' | 'CONNECT'

export const SERVER_ROOT = 'https://queenlan.cn'
// export const SERVER_ROOT = process.env.NODE_ENV === 'production' ? 'https://queenlan.cn' : 'http://localhost:3000'
export const SERVER_API_ROOT = SERVER_ROOT + '/api/book-api'
export const SERVER_CHAPTER_ROOT = SERVER_ROOT + '/api/book-chapter2'
// export const SERVER_STATICS_ROOT = SERVER_ROOT + '/api/book-statics'
export const SERVER_STATICS_ROOT = 'https://statics.zhuishushenqi.com'

