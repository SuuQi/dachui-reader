
export const FETCH_FUZZY_SEARCH = Symbol('FETCH_FUZZY_SEARCH')
export const CLEAR_FUZZY_SEARCH = Symbol('CLEAR_FUZZY_SEARCH')


export interface IBookItem {
  _id: string
  title: string
  cover: string
  shortIntro: string
}

export interface IChapterItem {
  link: string
  title: string
}

export interface IChaptersData {
  _id: string
  book: string
  chaptersUpdated: string
  updated: string
  chapters: IChapterItem[]
}

export const FETCH_BOOK_CHAPTERS = Symbol('FETCH_BOOK_CHAPTERS')
