
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
  title: string
  lastIndex: number
}

export const FETCH_BOOK_CHAPTERS = Symbol('FETCH_BOOK_CHAPTERS')
export const FETCH_CHAPTER_TEXT = Symbol('FETCH_CHAPTER_TEXT')
