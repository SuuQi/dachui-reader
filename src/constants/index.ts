
export const FETCH_REQUESTED = Symbol('FETCH_REQUESTED')
export const FETCH_SUCCEEDED = Symbol('FETCH_SUCCEEDED')
export const FETCH_FAILED = Symbol('FETCH_FAILED')

/** http请求中没有请求体的请求类型集合 */
export const PARAMS_METHOD = ['get', 'delete', 'GET', 'DELETE'];
