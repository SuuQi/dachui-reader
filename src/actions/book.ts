import { fetchAjax } from '../utils'
import { FETCH_FUZZY_SEARCH, CLEAR_FUZZY_SEARCH, FETCH_BOOK_CHAPTERS, FETCH_CHAPTER_TEXT, FETCH_BOOK_DETAIL, FETCH_HOT_BOOK_LIST, FETCH_CATS_LIST, FETCH_CATS_BOOKS_LIST, BOOK_DEFAULT_LIMIT, IBookGender, IBookType } from '../constants/book'
import { SERVER_API_ROOT, SERVER_CHAPTER_ROOT } from '../constants'

export function fuzzySearch (query: string) {
  return fetchAjax({
    type: FETCH_FUZZY_SEARCH,
    url: SERVER_API_ROOT + '/book/fuzzy-search',
    showLoading: true,
    data: {
      query
    }
  })
}

export function clearFuzzySearch () {
  return {
    type: CLEAR_FUZZY_SEARCH
  }
}

export function fetchBookChapters (bookId: string) {
  return fetchAjax({
    type: FETCH_BOOK_CHAPTERS,
    url: `${SERVER_API_ROOT}/mix-atoc/${bookId}?view=chapters`
  })
}

export function fetchBookChapterText (link: string) {
  return fetchAjax({
    type: FETCH_CHAPTER_TEXT,
    url: `${SERVER_CHAPTER_ROOT}/chapter/${encodeURIComponent(link)}`
  })
}

export function fetchBookDetail (bookId: string) {
  return fetchAjax({
    type: FETCH_BOOK_DETAIL,
    url: `${SERVER_API_ROOT}/book/${bookId}`
  })
}

export function fetchCatsList () {
  return fetchAjax({
    type: FETCH_CATS_LIST,
    url: `${SERVER_API_ROOT}/cats/lv2`
  })
}

export function fetchHotBookList () {
  return fetchAjax({
    type: FETCH_HOT_BOOK_LIST,
    url: `${SERVER_API_ROOT}/ranking/54d43437d47d13ff21cad58b`,
    showLoading: true
  })
}

/** 获取分类列表 */
export function fetchCatsBooksList (gender: IBookGender, major: string, minor: string, type: IBookType = 'hot', start: number = 0, limit: number = BOOK_DEFAULT_LIMIT) {
  return fetchAjax({
    type: FETCH_CATS_BOOKS_LIST,
    url: `${SERVER_API_ROOT}/book/by-categories`,
    data: {
      gender,
      type,
      major,
      minor,
      start,
      limit,
    }
  })
}
