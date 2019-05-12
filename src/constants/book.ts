
export const FETCH_FUZZY_SEARCH = Symbol('FETCH_FUZZY_SEARCH')
export const CLEAR_FUZZY_SEARCH = Symbol('CLEAR_FUZZY_SEARCH')

export interface IBookItem {
  id: string
  title: string
  cover: string
  shortIntro: string // 短简介
  author: string
  cat: string, // 分类
  lastChapter: string
  wordCount: number // 字数
}

export interface IChapterOrigin {
  title: string
  link: string
}

export interface IChapterItem extends IChapterOrigin {
  index: number
  body: string
  /** 当前阅读到哪一页 */
  pageIndex: number
}

interface IChaptersDataOrigin {
  id: string
  book: string // 另一个id，未知含义
  chaptersUpdated: string // 最近更新时间 2018-02-06T12:12:47.907Z
  updated: string // 最近更新时间 2018-02-06T12:12:47.907Z
}

export interface IChaptersData extends IChaptersDataOrigin {
  chapters: IChapterOrigin[]
}

export interface IUserBookItem extends IChaptersDataOrigin {
  title: string,
  cover: string,
  author: string,
  lastIndex: number
}

export type IBookGender = 'male' | 'female'
export type IBookType = 'hot' | 'new' | 'reputation' | 'over'

export const FETCH_BOOK_CHAPTERS = Symbol('FETCH_BOOK_CHAPTERS')
export const FETCH_BOOK_DETAIL = Symbol('FETCH_BOOK_DETAIL')
export const FETCH_CHAPTER_TEXT = Symbol('FETCH_CHAPTER_TEXT')
export const FETCH_HOT_BOOK_LIST = Symbol('FETCH_HOT_BOOK_LIST')
export const FETCH_CATS_LIST = Symbol('FETCH_CATS_LIST')
export const FETCH_CATS_BOOKS_LIST = Symbol('FETCH_CATS_BOOKS_LIST')


export const BOOK_DEFAULT_LIMIT = 20
export const BOOK_CATS_TYPE_ARRAY: IBookType[] = ['hot', 'new', 'reputation', 'over']
